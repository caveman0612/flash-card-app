import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import BreadCumbNav from "../Layout/BreadCumbNav";
import CardForm from "../Layout/CardForm";

const AddCard = () => {
  const _initialDeckState = {
    name: "",
    description: "",
    id: "",
    cards: [],
  };
  const _initialFormState = { front: "", back: "" };

  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(_initialDeckState);
  const [formData, setFormData] = useState(_initialFormState);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  function handleClick() {
    history.push(`/decks/${deckId}`);
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newCard = {
      deckId: deck.id,
      front: formData.front,
      back: formData.back,
    };
    const abortController = new AbortController();
    createCard(deck.id, newCard, abortController.signal);
    setFormData(_initialFormState);
  }

  return (
    <div>
      <BreadCumbNav
        previous={{ name: deck.name, url: `/decks/${deck.id}` }}
        current="Add Card"
      />
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        card={formData}
        handleClick={handleClick}
      />
    </div>
  );
};

export default AddCard;
