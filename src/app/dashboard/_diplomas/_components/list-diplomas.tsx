"use client";

import ErrorForm from "@/components/shared/error-form";
import { infintyQuiry } from "@/lib/service/globa-infinty-query-function";
import { DiplomasResponse } from "@/lib/types/diplomas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDown, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ListDiplomas() {
  const { data, fetchNextPage, hasNextPage, isPending, error } = useInfiniteQuery<DiplomasResponse>({
    queryKey: ["Diplomas"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      infintyQuiry<DiplomasResponse>({
        url: "/api/diplomas",
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

  const diplomas = data.pages.flatMap((page) => page.subjects);
  return (
    <>
      <InfiniteScroll
        dataLength={diplomas.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loader2Icon className={`animate-spin text-center`} />}
        className="grid h-full w-full gap-2.5 md:grid-cols-2 lg:grid-cols-3"
      >
        {diplomas.map((item) => (
          <Link href={`dashboard/exams`} className="relative h-[28rem] w-full" key={item._id}>
            <Image className="h-full w-full" src={item.icon} width={448} height={336} alt={item.name} />
            <div className="absolute bottom-0 w-full p-2.5">
              <p className="backdrop-blur-6 flex h-[4.2rem] w-full items-center rounded-none bg-blue-600/50 px-4 text-xl font-semibold text-white">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </InfiniteScroll>
      <p className="mt-6 flex w-full flex-col items-center justify-center p-2.5">
        <b className="text-base font-normal text-gray-600">Scroll to view more</b>
        <ChevronDown className="h-4 w-4" />
      </p>
    </>
  );
}
