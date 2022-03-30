import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BreadCumbNav from "../Layout/BreadCumbNav";
import DeckForm from "../Layout/DeckForm";
import { createDeck } from "../utils/api";

const AddDeck = () => {
  //set variables
  const history = useHistory();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [deckToCreate, setDeckToCreate] = useState(null);
  const [newDeckId, setNewDeckId] = useState(null);

  // set form as key presses
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  // makes new deck and returns id
  useEffect(() => {
    if (deckToCreate) {
      const abortController = new AbortController();
      createDeck(deckToCreate, abortController.signal).then((deck) =>
        setNewDeckId(deck.id)
      );
    }
  }, [deckToCreate]);

  //when deck id is returned it pushes to new deck
  useEffect(() => {
    if (newDeckId) {
      history.push(`/decks/${newDeckId}`);
    }
  }, [history, newDeckId]);

  //submits new deck and sets deck to state
  async function handleSubmit(event) {
    event.preventDefault();
    const newDeck = {
      name: formData.name,
      description: formData.description,
    };
    setDeckToCreate(newDeck);
  }

  return (
    <div className="container">
      <BreadCumbNav current={"Create Deck"} />
      {/* using dumby form for adding decks */}
      <DeckForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deck={formData}
        url={`/`}
      />
    </div>
  );
};

export default AddDeck;
