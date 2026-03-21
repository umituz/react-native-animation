/**
 * Question Renderer Component
 * Single Responsibility: Render appropriate question component based on type
 */

import React from "react";
import type { OnboardingQuestion, OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";
import { SingleChoiceQuestion } from "./questions/SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "./questions/MultipleChoiceQuestion";
import { TextInputQuestion } from "./questions/TextInputQuestion";
import { RatingQuestion } from "./questions/RatingQuestion";
import { DateQuestion } from "./questions/DateQuestion";

export interface QuestionRendererProps {
  question: OnboardingQuestion;
  value: OnboardingAnswerValue;
  onChange: (value: OnboardingAnswerValue) => void;
}

export const QuestionRenderer = ({
  question,
  value,
  onChange,
}: QuestionRendererProps) => {
  switch (question.type) {
    case "single_choice":
      return (
        <SingleChoiceQuestion
          question={question}
          value={value as string | undefined}
          onChange={onChange as (value: string) => void}
        />
      );
    case "multiple_choice":
      return (
        <MultipleChoiceQuestion
          question={question}
          value={value as string[] | undefined}
          onChange={onChange as (value: string[]) => void}
        />
      );
    case "text_input":
      return (
        <TextInputQuestion
          question={question}
          value={value as string | undefined}
          onChange={onChange as (value: string) => void}
        />
      );
    case "rating":
      return (
        <RatingQuestion
          question={question}
          value={value as number | undefined}
          onChange={onChange as (value: number) => void}
        />
      );
    case "date":
      return (
        <DateQuestion
          question={question}
          value={value as string | undefined}
          onChange={onChange as (value: string) => void}
        />
      );
    default:
      return null;
  }
};
