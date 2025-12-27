import { ExamResultResponse } from "@/lib/types/exam-result-response";
import React from "react";
import { ChartrResult } from "./_components/chart-result";
import Answers from "./_components/answers";
import { QuestionsResponse } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function ExapResult({
  examResult,
  Questions,
}: {
  examResult: ExamResultResponse | undefined;
  Questions: QuestionsResponse;
}) {
  return (
    <section className="flex h-full flex-col gap-4">
      {/*  -------------------------------------------------------------------------- */
      /*                                   header                                   */
      /* --------------------------------------------------------------------------  */}
      <h1 className="w-full pt-6 text-2xl font-semibold text-primary">Results:</h1>

      {/*  -------------------------------------------------------------------------- */
      /*                              sections results                              */
      /* --------------------------------------------------------------------------  */}
      <section className="grid h-full grid-cols-4">
        {/*  ------------------------------ ChartrResult ------------------------------  */}
        <div className="col-span-1 h-full">
          <ChartrResult examResult={examResult} />
        </div>
        <div className="col-span-3 h-full border p-1.5">
          <Answers Questions={Questions} examResult={examResult} />
        </div>
      </section>
      <div className="flex items-center justify-between gap-4 pt-6">
        {/*  -------------------------------- Previous --------------------------------  */}
        <Button
          className="flex h-11 flex-1 items-center justify-center gap-2.5 text-sm"
          type="button"
          variant="secondary"
          onClick={() => {
            location.reload();
          }}
        >
          <RotateCcw />
          Restart
        </Button>

        {/*  -------------------------------- Next --------------------------------  */}

        <Button className="flex h-11 flex-1 items-center justify-center gap-2.5 text-sm" type="button">
          Explore
          <FolderSearch />
        </Button>
      </div>
    </section>
  );
}
