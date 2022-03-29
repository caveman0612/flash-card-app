import React from "react";

const CardForm = ({ handleSubmit, card, handleChange, handleClick }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          type="text"
          className="form-control"
          id="front"
          name="front"
          placeholder="Front side of card"
          value={card.front}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          placeholder="Back side of card"
          value={card.back}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-secondary mr-2" onClick={handleClick}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        submit
      </button>
    </form>
  );
};

export default CardForm;
