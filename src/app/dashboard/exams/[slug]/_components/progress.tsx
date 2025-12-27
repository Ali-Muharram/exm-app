import React from "react";
import { Progress } from "@/components/ui/progress";
import { QuestionsResponse } from "@/lib/types/questions";
export default function ProgressComp({ Questions, indexQuestion }: { Questions: QuestionsResponse; indexQuestion: number }) {
  return (
    <section className="h-fit space-y-1.5">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-normal text-muted-forground">
          Frontend Development - {Questions?.questions[0]?.exam?.title}
        </p>
        <p className="text-sm font-normal text-muted-forground">
          Question <b className="text-primary">{indexQuestion}</b> of {Questions?.questions.length}
        </p>
      </div>
      <Progress value={Questions?.questions?.length ? (indexQuestion * 100) / Questions.questions.length : 0} />
    </section>
  );
}
