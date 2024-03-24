import React, { useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";

function InputCard({ question, removeQuestion, updateQuestion, index }) {
  const handleChange = (field, e) => {
    updateQuestion(question.id, field, e.target.value);
  };
  // console.log(question)
  return (
    <div className="relative flex flex-col gap-4 bg-white px-3 pt-2 pb-5 rounded-lg border-solid border-2 border-blue2">
      <div className="absolute left-3">
        <span className='text-xs lg:text-base mr-1'>Max Points:</span>
        <input className='w-9 text-xs lg:text-base bg-white text-center border border-blue2 rounded-md' onChange={(e) => handleChange("maxScore", e)} type="number" min="1" max="100" defaultValue = {3}/>
      </div>
      <h2 className="text-blue2 font-medium">Question {index}</h2>
      <IoMdRemoveCircleOutline
        className="cursor-pointer absolute right-3 top-[10px] text-[1.65rem] text-red-600 hover:scale-110 transition duration-200"
        onClick={() => removeQuestion(question.id)}
      
      />
      <div className="flex flex-col justify-items-start">
        <p className="text-left text-sm">Question Prompt</p>
        <textarea
          className="bg-light-bg border-solid border-1 py-[1px] px-[5px] border-blue2 text-xs"
          rows={2}
          value={question.question}
          onChange={(e) => handleChange("question", e)}
        ></textarea>
      </div>
      <div className="flex flex-col justify-items-start">
        <p className="text-left text-sm">Student Answer</p>
        <textarea
          className="bg-light-bg border-solid border-1 py-[1px] px-[5px] border-blue2 text-xs"
          rows={3}
          value={question.answer}
          onChange={(e) => handleChange("answer", e)}
        ></textarea>
      </div>
      <div className="flex flex-col justify-items-start">
        <p className="text-left text-sm">Question Rubric</p>
        <textarea
          className="bg-light-bg border-solid border-1 py-[1px] px-[5px] border-blue2 text-xs"
          rows={3}
          value={question.rubric}
          onChange={(e) => handleChange("rubric", e)}
        ></textarea>
      </div>
    </div>
  );
}

export default InputCard;
