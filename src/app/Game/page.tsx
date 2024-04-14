"use client";
import React, { useState, useEffect } from "react";
import MultipleChoiceQuestion from "./Real";
import { CorrectAnswer } from "./Real";
import vercelImage from "#/public/vercel.svg";
import * as NextUI from "@nextui-org/react"
import dynamic from "next/dynamic";

const questions = [
  {
    id: 1,
    question: vercelImage,
    answer: "test",
  },
  {
    id: 2,
    question: vercelImage,
    answer: "test2",
  },
  {
    id: 3,
    question: vercelImage,
    answer: "test3",
  },
  {
    id: 4,
    question: vercelImage,
    answer: "test4",
  },
  {
    id: 5,
    question: vercelImage,
    answer: "test5",
  },
  {
    id: 6,
    question: vercelImage,
    answer: "test6",
  },
];



const answers = [
  {
    id: 1,
    name: "test",
  },
  {
    id: 2,
    name: "test2",
  },
  {
    id: 3,
    name: "test3",
  },
  {
    id: 4,
    name: "test4",
  },
  {
    id: 5,
    name: "test5",
  },
  {
    id: 6,
    name: "test6",
  },
];
let ShuffledQuestion = questions.sort(() => Math.random() - 0.5);
console.log(ShuffledQuestion);

const IndexPage = () => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    setCurrentQuestionIndex(0)
  }, [])
  const handleNextQuestion = () => {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    CorrectAnswer.reset();
    ShuffledQuestion = questions.sort(() => Math.random() - 0.5);
    console.log(ShuffledQuestion)
  }

  return (
    <div className="mt-12">
      {currentQuestionIndex < questions.length && (
        <MultipleChoiceQuestion
          key={ShuffledQuestion[currentQuestionIndex].id}
          question={ShuffledQuestion[currentQuestionIndex]}
          answers={answers}
          onNextQuestion={handleNextQuestion}
        />
      )}
      <div className="grid grid-cols-1 place-items-center">
        {currentQuestionIndex === questions.length ? (
          <>
            <p>All questions answered!</p>
            <p>Your Score: {CorrectAnswer.call(CorrectAnswer)}</p>
            <NextUI.Button onClick={handlePlayAgain}>Play Again</NextUI.Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default dynamic (() => Promise.resolve(IndexPage), {ssr: false})
