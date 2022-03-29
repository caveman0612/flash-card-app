import React, { useState, useEffect } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { Link } from "react-router-dom";
import { FaEye, FaSave, FaTrash } from "react-icons/fa";

const Home = () => {
  //setting state
  const [decks, setDecks] = useState([]);

  //getting list of decks from api
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(console.log);
    return () => abortController.abort();
  }, []);

  // deleting deck and getting new list of decks
  async function handleDelete(id) {
    //confirm with user
    const confirm = window.confirm("Delete this deck?");
    if (confirm) {
      const abortController = new AbortController();
      //delete deck
      await deleteDeck(id, abortController.signal);
      //get new list
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
