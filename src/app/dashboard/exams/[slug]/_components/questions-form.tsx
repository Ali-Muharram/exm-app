"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AnswerRequest, AnswersStudents, QuestionsResponse } from "@/lib/types/questions";
import { ChevronLeft, ChevronRight, Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Duration from "./duration";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import { ExamResultResponse } from "@/lib/types/exam-result-response";
import { TypeErrorForm } from "@/lib/types/error-form-";
import ErrorForm from "@/components/shared/error-form";

type FormValues = {
  question: string;
};

export default function QuestionsForm({
  Questions,
  setIndexQuestion,
  setExamResult,
  setSections,
}: {
  Questions: QuestionsResponse;
  setIndexQuestion: React.Dispatch<React.SetStateAction<number>>;
  setExamResult: React.Dispatch<React.SetStateAction<ExamResultResponse | undefined>>;
  setSections: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<TypeErrorForm>({ status: false, message: "" });
  const [answers, setAnswers] = useState<AnswersStudents[]>(
    Questions.questions.map((item) => ({
      questionId: item._id,
      correct: "empty",
    })),
  );

  const form = useForm<FormValues>({
    mode: "onChange",
  });
  const { control, handleSubmit } = form;

  const currentQuestion = Questions.questions[currentIndex];

  /* ------------------------------- send anwers ------------------------------ */
  const mutation = useGlobalMutations<AnswerRequest, ExamResultResponse>({
    url: "/api/questions/check",
    nativeUrl: true,
    setError,
  });

  const onSubmit = async () => {
    const res = await mutation.mutateAsync({ answers });
    setExamResult(res);
    setSections(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/*  -------------------------------------------------------------------------- */
        /*                                  questions                                 */
        /* -------------------------------------------------------------------------- */}
        <FormField
          control={control}
          name={currentQuestion.question as keyof FormValues}
          render={() => (
            <FormItem>
              {/* ----------------------------- questions title ----------------------------  */}
              <FormLabel className="pt-6 text-2xl font-semibold text-primary">{currentQuestion.question}</FormLabel>

              {/*  ------------------------------ chose anwers ------------------------------  */}
              <FormControl className="mt-4">
                <RadioGroup
                  className="flex flex-col gap-2.5"
                  onValueChange={(value) => {
                    console.log(value);
                    setAnswers((prev) => {
                      const updated = [...prev];
                      updated[currentIndex] = {
                        ...updated[currentIndex],
                        correct: value,
                      };
                      return updated;
                    });
                  }}
                  value={answers[currentIndex].correct}
                >
                  {currentQuestion.answers.map((item) => (
                    <Label
                      key={item.key}
                      htmlFor={item.answer}
                      className="flex cursor-pointer items-center space-x-2 bg-background p-4 hover:bg-gray-100"
                    >
                      <RadioGroupItem value={item.key} id={item.answer} />
                      <Label className="text-base font-normal" htmlFor={item.answer}>
                        {item.answer}
                      </Label>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/*  ------------------------------- error form response -------------------------------  */}
        {error.status && <ErrorForm setError={setError} messages={error.message} />}

        {/*  ------------------------------------------------------------------------ */
        /*                                 navigations                               */
        /* ------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between gap-4 pt-4">
          {/*  -------------------------------- Previous --------------------------------  */}
          <Button
            className="flex h-11 flex-1 items-center justify-center gap-2.5 text-sm"
            type="button"
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((i) => i - 1);
              setIndexQuestion((prev) => prev - 1);
            }}
          >
            <ChevronLeft />
            Previous
          </Button>

          {/*  -------------------------------- Duration --------------------------------  */}
          <Duration durationn={Questions.questions[currentIndex].exam.duration * 60} />

          {/*  -------------------------------- Next --------------------------------  */}
          {currentIndex < Questions?.questions.length - 1 ? (
            <Button
              className="flex h-11 flex-1 items-center justify-center gap-2.5 text-sm"
              type="button"
              onClick={() => {
                setCurrentIndex((i) => i + 1);
                setIndexQuestion((prev) => prev + 1);
              }}
            >
              Next
              <ChevronRight />
            </Button>
          ) : (
            //  ------------------------------ send answers ------------------------------
            <Button
              className="flex h-11 flex-1 items-center justify-center gap-2.5 text-sm"
              type="button"
              onClick={onSubmit}
            >
              send
              <Loader2Icon className={mutation.isPending ? "animate-spin" : "hidden"} />
            </Button>
          )}
        </div>

      </form>
    </Form>
  );
}
