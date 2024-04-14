"use client"
import React, { useState, useEffect } from "react";
import * as NextUI from "@nextui-org/react";
import "../globals.css";
import Image from "next/image";

type Question = {
  id: number;
  question: string;
  answer: string;
};

type Answer = {
  id: number;
  name: string;
};

type Props = {
  question: Question;
  answers: Answer[];
  onNextQuestion: () => void;
};
let Correct: number = 0;
export const CorrectAnswer = () => {
  return Correct;
};
CorrectAnswer.reset = () => {
  Correct = 0;
};

const MultipleChoiceQuestion = ({
  question,
  answers,
  onNextQuestion,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [allAnswers, setAllAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Find the correct answer based on the question ID
    const correctAnswer = answers.find((a) => a.name === question.answer);

    if (correctAnswer) {
      const shuffledAnswers = answers
        .filter((a) => a.name !== question.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const shuffledAllAnswers = [correctAnswer, ...shuffledAnswers].sort(
        () => Math.random() - 0.5
      ) as Answer[];
      setAllAnswers(shuffledAllAnswers);
    } else {
      console.error("Correct answer not found for question:", question);
    }
  }, [question, answers]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null) {
      return;
    }
    if (answer === question.answer) {
      Correct = Correct + 1;
      console.log("Correct!");
    } else {
      console.log("False!");
    }
    setSelectedAnswer(answer);
    setTimeout(() => {
      // Reset selected answer
      setSelectedAnswer(null);
      // Move to the next question
      onNextQuestion();
    }, 750); // 1 second delay
  };
  return (
    <>
      <div className="flex flex-col items-center mb-40">
        <h1 className="text-3xl font-bold uppercase">{question.answer}</h1>
        <br />
        <Image
          src={question.question}
          className="dark:invert h-52 w-9/12"
          alt={question.answer}
        />
      </div>
      <div className="centered">
        <div className="lg:w-9/12 max-sm:w-10/12 sm:w-10/12">
          <ul className="grid lg:grid-cols-2 sm:grid-cols-1">
            {allAnswers.map((answer) => {
              let buttonClass: string = "mb-4 h-20 uppercase";
              if (selectedAnswer !== null) {
                if (answer?.name === question.answer) {
                  buttonClass += " bg-green-500";
                } else if (selectedAnswer === answer?.name) {
                  buttonClass += " bg-red-500";
                }
              }
              return (
                <li key={answer?.id} className="flex flex-col m-4">
                  <NextUI.Button
                    onClick={() => handleAnswerClick(answer?.name ?? "")}
                    disabled={selectedAnswer !== null}
                    className={buttonClass}
                    name={answer?.name}
                  >
                    {answer?.name ?? ""}
                  </NextUI.Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MultipleChoiceQuestion;
