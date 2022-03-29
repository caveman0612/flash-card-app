import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../deck/Home";
import AddDeck from "../deck/AddDeck";
import Deck from "../deck/Deck";
import EditDeck from "../deck/EditDeck";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";
import Header from "./Header";
import NotFound from "./NotFound";
import StudyDeck from "../deck/StudyDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <AddDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
