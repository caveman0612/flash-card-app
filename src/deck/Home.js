import React, { useState, useEffect } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { Link } from "react-router-dom";
import { FaEye, FaSave, FaTrash } from "react-icons/fa";

const Home = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(console.log);
    return () => abortController.abort();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm("Delete this deck?");
    if (confirm) {
      const abortController = new AbortController();
      await deleteDeck(id, abortController.signal);
      await listDecks(abortController.signal).then(setDecks).catch(console.log);
    }
  }

  return (
    <div className="container">
      <Link to="/decks/new" className="btn btn-secondary">
        <strong>+</strong> Create Decks
      </Link>
      {decks.map((deck) => (
        <div className="card mt-3" key={deck.id} id={deck.id}>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h2>{deck.name}</h2>
              <p>{deck.cards.length} cards</p>
            </div>
            <p className="">{deck.description}</p>
            <div className="d-flex">
              <Link
                to={`/decks/${deck.id}`}
                className="btn btn-secondary mr-3 d-flex align-items-center"
              >
                <FaEye size={20} className="mr-2 " />
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary d-flex align-items-center"
              >
                <FaSave size={20} className="mr-2" />
                Study
              </Link>
              <button
                className="ml-auto btn btn-danger p-2 "
                onClick={() => handleDelete(deck.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
