import React, { useState, useEffect } from "react";
import { readDeck, readCard } from "../utils/api";
import BreadCumbNav from "../Layout/BreadCumbNav";
import { useParams, Link, useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const StudyDeck = () => {
  const { deckId } = useParams();
  const history = useHistory();

  const _initialDeckState = {
    name: "",
    description: "",
    id: "",
    cards: [],
  };
  const _initialCardState = { id: "1", front: "", back: "", deckId };

  const [deck, setDeck] = useState(_initialDeckState);
  const [card, setCard] = useState(_initialCardState);

  const [flipped, setFlippd] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();
    readCard(card.id, abortController.signal).then(setCard).catch(console.log);
    return () => abortController.abort();
  }, [card.id]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  function handleNext() {
    if (count === deck.cards.length) {
      const restart = window.confirm("Restart Cards");
      setCard(_initialCardState);
      if (restart) history.push(`/decks/${deck.id}/study`);
      setCount(1);
    } else {
      setCard({ ...card, id: card.id + 1 });
      setCount(count + 1);
    }
    setFlippd(false);
  }

  return (
    <div className="container">
      <BreadCumbNav
        previous={{ name: deck.name, url: `/decks/${deck.id}` }}
        current="Study"
      />
      <h1>Study: {deck.name}</h1>
      {deck.cards.length <= 2 ? (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in this deck.
          </p>
          <div className="d-flex">
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary d-flex align-items-center"
            >
              <AiOutlinePlus size={20} />
              Add Cards
            </Link>
          </div>
        </div>
      ) : (
        <div className="card card-body" key={card.id}>
          <p>{`Card ${count} of ${deck.cards.length}`}</p>
          {!flipped ? (
            <p>{card.front}</p>
          ) : (
            <div>
              <p>{card.back}</p>
            </div>
          )}
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => setFlippd(!flipped)}
            >
              Flip
            </button>
            {!flipped ? null : (
              <button className="btn btn-primary ml-2" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyDeck;
