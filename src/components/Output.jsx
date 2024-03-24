import { useEffect, useState } from "react";
import OutputCard from "./OutputCard.jsx";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import OpenAI from "openai";



const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });


// function useAssignment(assignmentId, setAssignmentData, setIsProcessing) {
//   useEffect(() => {
//     if (!assignmentId) return;

//     const unsubscribe = onSnapshot(
//       doc(db, "assignments", assignmentId),
//       (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           console.log("Current data: ", docSnapshot.data());
//           setAssignmentData(docSnapshot.data()); // Update your component state with the new data
//           setIsProcessing(false); // Update is done, remove loading state
//         } else {
//           console.log("No such document!");
//         }
//       }
//     );

//     return () => unsubscribe(); // Cleanup on unmount
//   }, [assignmentId, setAssignmentData, setIsProcessing]);
// }

function Output({
  questions,
  setQuestions,
  handleNewQuestion,
  removeQuestion,
  getIndex,
  totalMax,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [assignmentData, setAssignmentData] = useState(null);

  const areAllQuestionsValid = questions.every((question) => {
    return (
      question.question.trim() !== "" &&
      question.answer.trim() !== "" &&
      question.rubric.trim() !== ""
    );
  });


  // async function handleNewAssignment(questions) {
  //   const assignmentData = {
  //     // Any other assignment data
  //     questions: questions.map((question) => ({
  //       question: question.question,
  //       answer: question.answer,
  //       rubric: question.rubric,
  //       maxScore: question.maxScore,
  //       score: -1, // Initialize score to -1
  //     })),
  //   };
  //   try {
  //     const docRef = await addDoc(assignmentsRef, assignmentData);
  //     console.log("Assignment with questions added with ID:", docRef.id);
  //     setIsProcessing(true); // Optionally set processing state
  //   } catch (error) {
  //     console.error("Error adding assignment with questions:", error);
  //   }
  // }

  async function generate_completion(question, setQuestions) {
    const answer = question.answer;
    const rubric = question.rubric;
    const maxScore = question.maxScore;
    const maxTokens = maxScore.toString().length;

    let prompt = `Given the answer below and based on the provided rubric, evaluate the answer concisely and provide a numerical score out of ${maxScore}. Your response, including this instruction, must not exceed ${maxTokens} tokens in total. Ensure your evaluation directly applies the criteria from the rubric.

                Answer: ${answer}
                
                Rubric: ${rubric}
                
                Based on the following rubric, return a numerical score as the output. Please return the evaluation result as a number, without any additional text or explanation.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4-1106-preview",
      max_tokens: maxTokens,
      temperature: 0,
    });

    const newScore = completion.choices[0].message["content"];
    console.log("CALCULATED SCORE: ", newScore);
    console.log("question before: ", question);
    const parsedScore = parseFloat(newScore);
    if (!isNaN(parsedScore)) {
      // Update the score only if it's a valid number
      setQuestions(currentQuestions =>
        currentQuestions.map(cur_question =>
          cur_question.id === question.id ? { ...cur_question, score: parsedScore } : cur_question
        )
      );
    } else {
      console.error("Received an invalid score from OpenAI:", newScore);
    }
    console.log("question after: ", question);
    return newScore;
  }

  async function handleSubmit(questions, setQuestions) {
    if (!areAllQuestionsValid) {
      alert("Please fill in all fields before grading.");
      return; // Prevent the action if not all fields are filled
    }

    // Proceed with the action if all questions are valid
    console.log("Grading questions..."); // Placeholder for your grading logic
    // handleNewAssignment(questions); // Pass the entire questions array for processing
    try {
      const promises = questions.map(question => generate_completion(question, setQuestions));
      const results = await Promise.all(promises);
      console.log('All questions processed:', results);
      // `results` is an array containing the result of the API call for each question
    } catch (error) {
      console.error('An error occurred during LLM api calls on questions:', error);
    }
  }

  function calcTotalScore(questions) {
    let total = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].score === -1) {
        return 0;
      }
      total += questions[i].score;
    }
    return total;
  }

  return (
    <div className="flex-1 flex flex-col gap-2">
      <span className="font-semibold text-xl">Output</span>
      <div className=" max-h-96 overflow-y-auto border-t-2 border-b-2 border-blue2 rounded-2xl">
        <div className="flex flex-col gap-7 bg-blue2 p-3 py-5 min-h-72 rounded-lg ">
          {questions.map((question) => (
            <OutputCard
              key={question.id}
              question={question}
              removeQuestion={removeQuestion}
              index={getIndex(question.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex px-4">
        <div className="px-2 flex items-center gap-2">
          <p className="border-2 border-[#9BA4B5] rounded-lg px-2">
            Total Score:{" "}
          </p>
          <p>
            {calcTotalScore(questions)} / {totalMax}
          </p>
        </div>
        <button
          className="px-6 border-2 w-fit ml-auto rounded-xl border-blue2 bg-blue1 hover:scale-110 transition duration-400 ease-in-out"
          onClick={() => handleSubmit(questions, setQuestions)}
        >
          <span className="text-white tracking-widest text-xl">Grade</span>
        </button>
      </div>
    </div>
  );
}

export default Output;
