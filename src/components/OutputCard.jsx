import React from "react";
import { motion } from "framer-motion";
import UngradedTag from "./UngradedTag";
import GradedTag from "./GradedTag";

function OutputCard({ question, index }) {
  // Animation variants for sliding from left to right
  const variants = {
    initial: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col gap-4 bg-light-bg rounded-md p-2">
      <div className="flex justify-between px-3">
        <h2 className="text-blue2 font-medium text-left">
          Question {index}
        </h2>
        <div className="ml-auto flex items-center gap-3">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            key={question.score === -1 ? "ungraded" : "graded"} // Key change triggers animation
          >
            {question.score === -1 ? <UngradedTag /> : <GradedTag />}
          </motion.div>

          <span className="text-sm">
            {question.score === -1 ? 0 : question.score} / {question.maxScore}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OutputCard;
