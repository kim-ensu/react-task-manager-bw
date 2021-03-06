import React, { useState } from "react";
import { useParams } from "react-router";
import { Card } from "./Card/Card";
import { AddCard } from "./AddCard/AddCard";
import "./styles.scss";
import { useSelector } from "react-redux";
import { TODAY } from "/src/utils/constants";

function compareDate(a, b) {
   if (a.date < b.date) {
      return 1;
   }
   if (a.date > b.date) {
      return -1;
   }
   return 0;
}


export const CardList = () => {
   const cards = useSelector(state => state.cards);
   const cardsHistory = useSelector(state => state.cardsHistory);
   const { id } = useParams();

   const sortedCards = cards.sort(compareDate);

   const cardsRender = (cardsArray) => {
      if (cardsArray == sortedCards) {
         return (
            <ul className="cardslist">
               { cardsArray.map((card, index) => (
                  <Card
                     key={ index }
                     reward={ card.reward }
                     task={ card.task }
                     id={ id }
                  />
               )) }
               <AddCard />
            </ul>
         )
      } else if (Object.keys(cardsArray).length == 0) {
         return (
            <div className="emptyHistory"></div>
         )
      }
      else {
         return (Object.keys(cardsArray).map(date => (
            <div key={ Math.random() }>
               <h3>{ TODAY === date ? <span>Today</span> : "" } { date }</h3>
               <ul className="cardslist">
                  {
                     cardsArray[date].map((card, index) => (
                        <Card
                           key={ index }
                           reward={ card.reward }
                           task={ card.task }
                           id={ id }
                        />
                     ))
                  }
               </ul>
            </div>
         ))

         )
      }
   }

   if (id === 'history') { return cardsRender(cardsHistory) }

   return (
      cardsRender(cards)
   )
}