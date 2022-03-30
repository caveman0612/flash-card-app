import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import BreadCumbNav from "../Layout/BreadCumbNav";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import { FaTrash, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import CardOnDeck from "../card/CardOnDeck";

const Deck = () => {
  //seting variables
  let { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({
    name: "Loading deck",
    description: "",
    id: "",
    cards: [],
  });
  const [cardToDelete, setCardToDelete] = useState(null);
  const [deckToDelete, setDeckToDelete] = useState(null);

  //calling api to set current deck
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(() => console.log("abort"));
    return () => abortController.abort();
  }, [deckId, cardToDelete]);

  //calling api to delete card using card id
  useEffect(() => {
    const abortController = new AbortController();
    if (cardToDelete) {
      deleteCard(cardToDelete, abortController.signal).catch(console.log);
    }
    return () => abortController.abort();
  }, [cardToDelete]);

  //calling api to delete deck and pushing to home
  useEffect(() => {
    const abortController = new AbortController();
    if (deckToDelete) {
      deleteDeck(deckToDelete, abortController.signal).catch(console.log);
    }
    return () => abortController.abort();
  }, [deckToDelete]);

  // card id to be deleted
  function handleCardDelete(id) {
    const action = window.confirm("Delete this card");
    if (action) {
      setCardToDelete(id);
    }
  }

  //seeting deck id to be deleted
  function handleDeckDelete() {
    const confirm = window.confirm("Delete this deck?");
    if (confirm) {
      setDeckToDelete(deck.id);
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
            onClick={handleDeckDelete}
          >
            <FaTrash />
          </button>
        </section>
        <section className="mt-4">
          <h2>Cards</h2>
          {deck.cards.map((item) => {
            return (
              <CardOnDeck
                handleCardDelete={handleCardDelete}
                item={item}
                deckId={deckId}
                key={item.id}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Deck;
