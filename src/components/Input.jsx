import React, { useState } from "react";
import InputCard from "./InputCard.jsx";
import { CiCirclePlus } from "react-icons/ci";

function Input({
  questions,
  setQuestions,
  handleNewQuestion,
  removeQuestion,
  getIndex,
}) {
  const updateQuestion = (id, field, value) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  function calcMaxScore(questions) {
    let max_total = 0
    for(let i = 0; i < questions.length; i++) {
      max_total += questions[i].maxScore
    }
    return max_total;
  }

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex relative flex-wrap">
          <span className="font-semibold text-xl mx-auto">Input</span>
          <button className="absolute right-0 flex items-center gap-2 border-2 border-blue2 w-fit px-2 py-[1px] rounded-xl hover:scale-105 transition duration-200">
            <CiCirclePlus className="text-xs lg:text-xl" />
            <p className="font-semibold text-xs lg:text-sm text-blue2" onClick={handleNewQuestion}>
              Add Question{" "}
            </p>
          </button>
      </div>
      <div className="overflow-y-auto max-h-[35rem] flex flex-col gap-7 p-1 pt-2 border-t-[2px] border-b-2 border-blue2">
          {questions.map((question) => (
            <InputCard
              key={question.id}
              question={question}
              removeQuestion={removeQuestion}
              index={getIndex(question.id)}
              updateQuestion={updateQuestion}
            />
          ))}
      </div>
    </div>
  );
}

export default Input;
