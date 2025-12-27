"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ExamResultResponse } from "@/lib/types/exam-result-response";

export const description = "A donut chart with text";

export function ChartrResult({ examResult }: { examResult: ExamResultResponse | undefined }) {
  const chartData = [
    { browser: "correctQuestions", visitors: examResult?.correct, fill: "var(--chart-sucsess)" },
    { browser: "WrongQuestions", visitors: examResult?.wrong, fill: "var(--chart-error)" },
  ];

  const chartConfig = {
    visitors: {
      label: "visitors",
    },

    correctQuestions: {
      label: "correctQuestions",
      color: "var(--chart-sucsess)",
    },

    WrongQuestions: {
      label: "WrongQuestions",
      color: "var(--chart-error)",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}></Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col gap-2.5 p-2.5">
        <span className="flex gap-2.5">
          <p className="h-4 w-4 bg-[var(--chart-sucsess)]"></p>
          <p className="text-sm font-medium">Correct: {examResult?.correct}</p>
        </span>
        <span className="flex gap-2.5">
          <p className="h-4 w-4 bg-[var(--chart-error)]"></p>
          <p className="text-sm font-medium">Incorrect: {examResult?.wrong}</p>
        </span>
      </div>
    </div>
  );
}
