"use client";
import { useParams } from "next/navigation";
import { useHeader } from "../../hooks/header.hook";
import { CircleQuestionMark, Loader2Icon } from "lucide-react";
import { useState } from "react";
import ProgressComp from "./_components/progress";
import { QuestionsResponse } from "@/lib/types/questions";
import { GlobalQuery } from "@/lib/service/global-query.service";
import ErrorForm from "@/components/shared/error-form";
import EmptyData from "@/components/shared/empty";
import QuestionsForm from "./_components/questions-form";
import { ExamResultResponse } from "@/lib/types/exam-result-response";
import ExapResult from "./_exam-result/page";

export default function ExamPage() {
  const [sections, setSections] = useState<number>(1);
  const [indexQuestion, setIndexQuestion] = useState<number>(1);
  const [examResult, setExamResult] = useState<ExamResultResponse | undefined>(undefined);

  const { slug } = useParams();

  /* --------------------------------- header --------------------------------- */
  useHeader({
    title: `[${slug}] Questions`,
    Icon: CircleQuestionMark,
    undo: true,
  });

  /* ------------------------------ get questions ----------------------------- */
  const Questions = GlobalQuery<QuestionsResponse>({
    url: `/api/questions?exam=${sessionStorage.getItem("exi") || ""}`,
    key: "questions",
    gcTime: 100,
  });

  /* --------------------------------- loading -------------------------------- */
  if (Questions.isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2Icon className={`animate-spin text-center`} />
      </div>
    );
  }

  /* ---------------------------- if no  questions ---------------------------- */
  if (Questions.data?.questions.length == 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <EmptyData />
      </div>
    );
  }

  /* -------------------------------- if error -------------------------------- */
  if (Questions.error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorForm messages={Questions.error.message} />
      </div>
    );
  }
  return (
    <section className="flex h-full w-full flex-col gap-4 bg-card p-6">
      <ProgressComp indexQuestion={indexQuestion} Questions={Questions.data} />
      {sections == 1 && (
        <QuestionsForm
          setExamResult={setExamResult}
          setSections={setSections}
          Questions={Questions.data}
          setIndexQuestion={setIndexQuestion}
        />
      )}
      {sections == 2 && <ExapResult Questions={Questions.data} examResult={examResult} />}
    </section>
  );
}
