import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BreadCumbNav from "../Layout/BreadCumbNav";
import DeckForm from "../Layout/DeckForm";
import { createDeck } from "../utils/api";

const AddDeck = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const history = useHistory();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newDeck = {
      name: formData.name,
      description: formData.description,
    };

    const abortController = new AbortController();
    const deckWithId = await createDeck(newDeck, abortController.signal);
    history.push(`/decks/${deckWithId.id}`);
  }

  return (
    <div className="container">
      <BreadCumbNav current={"Create Deck"} />
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
