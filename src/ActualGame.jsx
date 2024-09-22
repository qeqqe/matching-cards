import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import beer from "../svg/beer.svg";
import cake from "../svg/cake.svg";
import chef from "../svg/chef-hat.svg";
import croissant from "../svg/croissant.svg";
import cone from "../svg/ice-cream.svg";
import cookie from "../svg/cookie.svg";
import questionMark from "../svg/questionMark.svg";

export default function ActualGame() {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: cookie,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 2,
      name: cookie,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 3,
      name: cone,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 4,
      name: cone,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 5,
      name: cake,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 6,
      name: cake,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 7,
      name: croissant,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 8,
      name: croissant,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 9,
      name: chef,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 10,
      name: chef,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 11,
      name: beer,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: 12,
      name: beer,
      image: questionMark,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);

  const flipCard = (id) => {
    if (flippedCards.length === 2) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true, image: card.name } : card
    );
    setCards(newCards);
    setFlippedCards((prev) => [...prev, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard.name === secondCard.name) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setScore((prevScore) => prevScore + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false, image: questionMark }
                : card
            )
          );
        }, 1000);
      }

      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="min-h-[70vh] w-full flex justify-center items-center">
      <div
        className="w-[80vw] min-h-[60vh] p-4 flex justify-center items-center"
        id="container"
      >
        {score < 6 && (
          <div className="relative w-[80vw] min-h-[60vh] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[10px] "></div>
            <div className="relative z-10 grid lg:grid-cols-4 sm:grid-cols-3 gap-4 w-full h-full p-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() =>
                    !card.isFlipped && !card.isMatched && flipCard(card.id)
                  }
                  className="flex justify-center items-center lg:min-h-[18vh] bg-white/30 rounded-lg p-2 min-h-[10vh] cursor-pointer"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {score >= 6 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h1 className=" text-3xl text-white font-[GT] py-[2vh] px-[2vw] bg-white bg-opacity-20 backdrop-blur-[10px] rounded-2xl">
              you matched all the cards now time to match my{" "}
              <span className="font-extrabold">𝓕𝓻𝓮𝓪𝓴</span> 👅
            </h1>
          </motion.div>
        )}
      </div>
    </div>
  );
}
