import React from "react";
import { Link } from "react-router-dom";

const DeckForm = ({ handleSubmit, deck, handleChange, url }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Deck Name"
          value={deck.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          placeholder="Brief description of the deck"
          value={deck.description}
          onChange={handleChange}
        />
      </div>
      <Link to={url} className="btn btn-secondary mr-2">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default DeckForm;
