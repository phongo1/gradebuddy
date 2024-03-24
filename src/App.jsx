import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { motion } from "framer-motion"

import Input from "./components/Input.jsx"
import Output from "./components/Output.jsx"
import logo from './assets/logo.png';


import './App.css'


function App() {
  const [questions, setQuestions] = useState([{
    id: 1,
    question: "",
    answer: "",
    rubric: "",
    score: -1,
    maxScore: 3,
    graded: false
  }]);

  const [totalMax, setTotalMax] = useState(0);

  const handleNewQuestion = () => {
    const maxId = questions.length > 0 ? Math.max(...questions.map(question => question.id)) : 0;
    const newQuestionId = maxId + 1;

    const newQuestion = {
        id: newQuestionId,
        question: "",
        answer: "",
        rubric: "",
        score: -1,
        maxScore: 3,
        graded: false
    }
    setQuestions([...questions, newQuestion]);
  };

  useEffect(() => {
    const newTotalMax = questions.reduce((acc, curr) => acc + Number(curr.maxScore), 0);
    setTotalMax(newTotalMax);
  }, [questions]);
  
  

  const removeQuestion = (idToRemove) => {
    setQuestions(questions.filter(question => question.id !== idToRemove));
  };

  const getIndex = (id) => {
    return questions.findIndex(q => q.id === id) +1;
  };

  return (
    <BrowserRouter >
      <div className='flex flex-col gap-2'>
        <img src={logo} alt="GradeBuddy Logo" className='w-20 mx-auto'></img>
        <h1 className='text-blue2 tracking-widest text-3xl font-semibold'>GradeBuddy</h1>
      </div>
      <div className='flex gap-1 w-fit mx-auto'>
        <p className='font-medium text-sm text-slate-400'>Input questions to be graded on the left. Each question will have a max points value, the question prompt, the student answer, and the question rubric. Once ready, hit "Grade" to auto-grade free response answers.</p>
      </div>
      <div className='flex gap-6'>
        <Input questions={questions} setQuestions={setQuestions} handleNewQuestion={handleNewQuestion} removeQuestion={removeQuestion} getIndex={getIndex}></Input>
        <Output questions={questions} setQuestions={setQuestions} handleNewQuestion={handleNewQuestion} removeQuestion={removeQuestion} getIndex={getIndex} totalMax={totalMax}></Output>
      </div>
    </BrowserRouter>
  )
}

export default App;
