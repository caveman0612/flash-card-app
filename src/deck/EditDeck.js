import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import BreadCumbNav from "../Layout/BreadCumbNav";
import DeckForm from "../Layout/DeckForm";

const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    name: "",
    description: "",
    id: "",
    cards: [],
  });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(deck, abortController.signal);
  }

  function handleChange(event) {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <BreadCumbNav
        current={"Edit Deck"}
        previous={{ name: deck.name, url: `/decks/${deck.id}` }}
      />
      <DeckForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deck={deck}
        url={`/decks/${deckId}`}
      />
    </div>
  );
};

export default EditDeck;
