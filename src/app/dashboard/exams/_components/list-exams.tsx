"use client";
import ErrorForm from "@/components/shared/error-form";
import { infintyQuiry } from "@/lib/service/globa-infinty-query-function";
import { ExamsResponse } from "@/lib/types/exams";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon, Timer } from "lucide-react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ListExams() {
  const { data, fetchNextPage, hasNextPage, isPending, error } = useInfiniteQuery<ExamsResponse>({
    queryKey: ["exams"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      infintyQuiry<ExamsResponse>({
        url: `/api/exams`,
        pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const { currentPage, numberOfPages } = lastPage.metadata;
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
  });

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2Icon className={`animate-spin text-center`} />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorForm messages={error.message} />
      </div>
    );
  }

  const diplomas = data.pages.flatMap((page) => page.exams);

  if (!isPending && diplomas.length == 0) {
    return <div className="flex h-full w-full items-center justify-center">404</div>;
  }
  return (
    <>
      <InfiniteScroll
        dataLength={diplomas.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loader2Icon className={`animate-spin text-center`} />}
        className="grid h-full w-full gap-4 bg-card p-6"
      >
        {diplomas.map((item) => (
          <Link
            onClick={() => sessionStorage.setItem("exi", item._id)}
            href={`/dashboard/exams/${item.title.replace(" ", "-")}`}
            className="flex w-full items-center justify-between bg-outline p-4"
            key={item._id}
          >
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold text-primary">{item.title}</p>
              <p className="text-sm font-normal text-muted-forground">{item.numberOfQuestions} Questions</p>
            </div>

            <div className="flex items-center gap-1.5">
              <Timer className="h-6 w-6 text-muted-forground" />
              <p className="text-sm font-medium"> Duration: {item.duration} minutes</p>
            </div>
          </Link>
        ))}
      </InfiniteScroll>
      <p className="mt-6 flex w-full flex-col items-center justify-center p-2.5">
        <b className="text-base font-normal text-gray-600">End of list</b>
      </p>
    </>
  );
}
