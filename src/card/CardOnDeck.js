import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

//dummy card on the deck page
const CardOnDeck = ({ item, deckId, handleCardDelete }) => {
  return (
    <div className="card card-body mt-3" key={item.id}>
      <div className="row">
        <div className="left col-6">
          <p>{item.front}</p>
        </div>
        <div className="right col-6">
          <p>{item.back}</p>
          <div className="d-flex justify-content-end">
            <Link
              to={`/decks/${deckId}/cards/${item.id}/edit`}
              className="btn btn-secondary d-flex align-items-center"
            >
              <MdEdit size={20} />
              Edit
            </Link>
            <button
              className=" btn btn-danger p-2 ml-2"
              onClick={() => handleCardDelete(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOnDeck;
