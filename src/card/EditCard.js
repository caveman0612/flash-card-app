import React, { useEffect, useState } from "react";
import BreadCumbNav from "../Layout/BreadCumbNav";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import CardForm from "../Layout/CardForm";

const EditCard = () => {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const _initialDeckState = {
    name: "",
    description: "",
    id: "",
    cards: [],
  };
  const _initialCardState = { id: "", front: "", back: "", deckId };

  const [deck, setDeck] = useState(_initialDeckState);
  const [card, setCard] = useState(_initialCardState);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then(setCard).catch(console.log);
    return () => abortController.abort();
  }, [cardId]);

  function handleclick() {
    history.push(`/decks/${deckId}`);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(card, abortController.signal);
    history.push(`/decks/${deckId}`);
  }

  function handleChange(event) {
    setCard({ ...card, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <BreadCumbNav
        current={`Edit Card ${card.id}`}
        previous={{ name: deck.name, url: `/decks/${deck.id}` }}
      />
      <CardForm
        handleSubmit={handleSubmit}
        card={card}
        handleChange={handleChange}
        handleclick={handleclick}
      />
    </div>
  );
};

export default EditCard;
