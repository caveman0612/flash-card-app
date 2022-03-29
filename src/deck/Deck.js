import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import BreadCumbNav from "../Layout/BreadCumbNav";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import { FaTrash, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

const Deck = () => {
  let { deckId } = useParams();
  const history = useHistory();
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

  function handleCardDelete(id) {
    const action = window.confirm("Delete this card");
    if (action) {
      const abortController = new AbortController();
      deleteCard(id, abortController.signal);
      history.go(0);
    }
  }

  function handleDelete() {
    const confirm = window.confirm("Delete this deck?");
    if (confirm) {
      const abortController = new AbortController();
      deleteDeck(deck.id, abortController.signal);
      history.push("/");
    }
  }

  return (
    <div className="container w-75">
      <BreadCumbNav current={deck.name} />
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <section className="d-flex">
          <Link
            to={`/decks/${deckId}/edit`}
            className="btn btn-secondary mr-2 d-flex align-items-center"
          >
            <MdEdit size={20} />
            Edit
          </Link>
          <Link
            to={`/decks/${deckId}/study`}
            className="btn btn-primary d-flex align-items-center mr-2"
          >
            <FaSave size={20} className="mr-2" />
            Study
          </Link>
          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-primary d-flex align-items-center"
          >
            <AiOutlinePlus size={20} />
            Add Cards
          </Link>
          <button
            className="ml-auto btn btn-danger p-2 "
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </section>
        <section className="mt-4">
          <h2>Cards</h2>
          {deck.cards.map((item) => {
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
          })}
        </section>
      </div>
    </div>
  );
};

export default Deck;
