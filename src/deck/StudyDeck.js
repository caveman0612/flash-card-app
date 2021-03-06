import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import BreadCumbNav from "../Layout/BreadCumbNav";
import { useParams, Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const StudyDeck = () => {
  const { deckId } = useParams();
  const _initialDeckState = {
    name: "",
    description: "",
    id: "",
    cards: [null, null, null],
  };
  const _initialCardState = {
    id: "",
    front: "Study files loading",
    back: "",
    deckId,
  };
  const [flipped, setFlipped] = useState(false);
  const [count, setCount] = useState(1);
  const [card, setCard] = useState(_initialCardState);
  const [deck, setDeck] = useState(_initialDeckState);

  //call deck api and setting deck
  useEffect(() => {
    const abortController = new AbortController();
    async function apiCall() {
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
      setCard(deck.cards[count - 1]);
    }
    apiCall();
    return () => abortController.abort();
  }, [count, deckId]);

  //handle next which tracks count and current card.
  function handleNext() {
    // reset if count is at end
    if (count === deck.cards.length) {
      const restart = window.confirm("Restart Cards");
      if (restart) {
        setCount(1);
      }
      // set card to next and add count to one
    } else {
      setCount(count + 1);
    }
    setFlipped(false);
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
              onClick={() => setFlipped(!flipped)}
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
