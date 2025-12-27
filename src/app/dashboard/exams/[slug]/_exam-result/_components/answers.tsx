import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExamResultResponse } from "@/lib/types/exam-result-response";
import { QuestionsResponse } from "@/lib/types/questions";
import React from "react";

export default function Answers({
  examResult,
  Questions,
}: {
  examResult: ExamResultResponse | undefined;
  Questions: QuestionsResponse;
}) {
  const answers = examResult?.WrongQuestions;
  return (
    <section className="h-[32.13rem] overflow-auto">
      {answers?.map((item) => (
        <div className="flex flex-col gap-2.5 p-2.5" key={item.QID}>
          <p className="text-xl font-semibold text-primary">{item.Question}</p>

          <RadioGroup className="pointer-events-none" defaultValue="option-one">
            {/*  ----------------------------- inCorrectAnswer ----------------------------  */}
            <div className="flex items-center gap-2.5 bg-red-50 p-4">
              <RadioGroupItem
                className="border-destructive fill-destructive text-destructive"
                value="option-one"
                id="option-one"
              />
              <Label className="text-sm font-normal">
                {Questions.questions.flatMap((q) => q.answers).find((a) => a.key === item.inCorrectAnswer)?.answer || "Empty Answer"}
              </Label>
            </div>

            {/*  ----------------------------- correctAnswer ----------------------------  */}
            <div className="flex items-center gap-2.5 bg-emerald-50 p-4">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label className="text-sm font-normal" htmlFor="option-two">
                {Questions.questions.flatMap((q) => q.answers).find((a) => a.key === item.correctAnswer)?.answer}
              </Label>
            </div>
          </RadioGroup>
        </div>
      ))}
    </section>
  );
}
