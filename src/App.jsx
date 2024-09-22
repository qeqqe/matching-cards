import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { createPortal } from "react-dom";
import ActualGame from "./ActualGame";
import github from "../svg/github.svg";
export default function CookieMatcher() {
  const [start, setStart] = useState(false);
  const [fallingCookies, setFallingCookies] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    setFallingCookies(
      Array(5)
        .fill(null)
        .map(() => ({
          x: Math.random() * (windowSize.width - 230),
          visible: true,
        }))
    );

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCookieClick = (index) => {
    setFallingCookies((prev) =>
      prev.map((cookie, i) =>
        i === index ? { ...cookie, visible: false } : cookie
      )
    );
  };

  return (
    <div
      className="flex items-center min-h-screen flex-col bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF6347] overflow-hidden relative"
      id="body"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

      <motion.div
        className="flex justify-center items-center min-h-[20vh] w-full relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="top-bar"
      >
        <h1 className="font-[Cookie] text-[80px] bg-gradient-to-r from-[#4B0082] via-[#8A2BE2] to-[#9370DB] font-extrabold bg-clip-text text-transparent mt-[5vh] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          Kookie Matcher
        </h1>
      </motion.div>

      <div
        className="min-h-[70vh] flex justify-center items-center w-full relative z-10"
        id="start-screen-gamebar"
      >
        {!start && (
          <motion.div
            className="w-[90vw] max-w-[600px] min-h-[30vh] flex justify-center items-center flex-col gap-12 bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="start-game-container"
          >
            <h1 className="font-[GT] text-indigo-900 text-3xl font-bold text-center">
              Find all matching cards as fast as you can!
            </h1>
            <motion.button
              className="text-white py-[max(3vh,5px)] bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 px-[4vw] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-indigo-700 hover:via-indigo-600 hover:to-indigo-500 font-bold text-xl flex items-center gap-2 group"
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
              onClick={() => setStart(true)}
            >
              Play Now
              <Sparkles className="w-6 h-6 transition-all duration-300 group-hover:rotate-12" />
            </motion.button>
          </motion.div>
        )}
        {start && <Game />}
        <div className="absolute right-[5%] top-[100%] bg-white bg-opacity-25 rounded-full p-2 ">
          <a href="https://github.com/qeqqe" target="_blank">
            <img src={github} alt="" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {fallingCookies.map(
          (cookie, index) =>
            cookie.visible && (
              <motion.div
                key={index}
                // silly ass feature that turned out to be actual ass but for fun change the z index to 20 and click on the cookies :)
                className="absolute text-6xl cursor-pointer z-5"
                initial={{ x: cookie.x, y: -100, rotate: 0 }}
                animate={{ y: windowSize.height + 100, rotate: 360 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  y: {
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  rotate: {
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  exit: { duration: 0.3, ease: "easeInOut" },
                }}
                onClick={() => handleCookieClick(index)}
              >
                🍪
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}

const Game = () => {
  return createPortal(
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ActualGame />
    </motion.div>,
    document.querySelector("#start-screen-gamebar")
  );
};
