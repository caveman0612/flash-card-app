import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import BreadCumbNav from "../Layout/BreadCumbNav";
import CardForm from "../Layout/CardForm";

const AddCard = () => {
  //set initial state
  const _initialDeckState = {
    name: "",
    description: "",
    id: "",
    cards: [],
  };
  const _initialFormState = { front: "", back: "" };

  //set variables
  const { deckId } = useParams();
  const history = useHistory();

  //set states
  const [deck, setDeck] = useState(_initialDeckState);
  const [formData, setFormData] = useState(_initialFormState);
  const [newCardToAdd, setNewCardToAdd] = useState(null);

  //api to get current deck
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  //api call to create new deck
  useEffect(() => {
    if (newCardToAdd) {
      const abortController = new AbortController();
      createCard(deck.id, newCardToAdd, abortController.signal);
      return () => abortController.abort();
    }
  }, [deck.id, newCardToAdd]);

  //push to deck page
  function handleClick() {
    history.push(`/decks/${deckId}`);
  }

  //handle form change
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  //handle form submit and set new card state
  function handleSubmit(event) {
    event.preventDefault();
    const newCard = {
      deckId: deck.id,
      front: formData.front,
      back: formData.back,
    };
    setNewCardToAdd(newCard);
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
