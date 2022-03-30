import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import BreadCumbNav from "../Layout/BreadCumbNav";
import DeckForm from "../Layout/DeckForm";

const EditDeck = () => {
  //setting up variables
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    name: "",
    description: "",
    id: "",
    cards: [],
  });

  const [deckToSubmit, setDeckToSubmit] = useState(null);

  //calling api for current deck
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  //api call to update deck
  useEffect(() => {
    if (deckToSubmit) {
      const abortController = new AbortController();
      updateDeck(deckToSubmit, abortController.signal).catch(console.log);
      return () => abortController.abort();
    }
  }, [deckToSubmit]);

  //updating deck and setting state
  function handleSubmit(event) {
    event.preventDefault();
    const newDeck = { ...deck };
    setDeckToSubmit(newDeck);
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
      {/* using dumby form for editing deck */}
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
