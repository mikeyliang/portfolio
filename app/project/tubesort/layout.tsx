"use client";

import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import InfiniteScroll from "react-swr-infinite-scroll";
import { useState, useRef, useEffect } from "react";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

import useSWRInfinite from "swr/infinite";

import { Tube, TubeLevel, TubeColor, TubeMove } from "../../../types/tubes";
import TubeLevelCard from "./TubeLevelCard";

const PAGE_SIZE = 50;

export default function Layout({ children }: { children: React.ReactNode }) {
  //hooks
  const searchParams = useSearchParams();
  const params = useParams();

  //states
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("search") || ""
  );

  // data fetching
  const fetcher = async (url: string) => {
    try {
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) throw new Error("An error occurred while fetching data.");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const swr = useSWRInfinite(
    (pageIndex: number, previousPageData: { data: TubeLevel[] } | null) => {
      if (previousPageData && !previousPageData.data.length) return null;

      if (pageIndex === 0 && !previousPageData) {
        return `/api/project/tubes?take=${PAGE_SIZE}`;
      } else {
        const cursor = previousPageData?.data[previousPageData.data.length - 1]
          .level as number;
        return `/api/project/tubes?take=${PAGE_SIZE}${
          cursor ? `&skip=1&cursor=${cursor}` : ""
        }`;
      }
    },
    fetcher,
    { revalidateFirstPage: false }
  );

  return (
    <>
      <div
        className={`flex flex-row items-start justify-center w-auto h-full gap-4 px-2 sm:px-4 ${
          params.id ? "bg-white md:bg-zinc-100" : "bg-zinc-100"
        }`}>
        <div
          className={`relative gap-6 xl:flex-row xl:items-start w-full md:w-auto h-full ${
            params.id
              ? "md:flex md:flex-col hidden"
              : "flex flex-col justify-start items-center"
          }`}>
          <div className="flex flex-col items-center justify-start w-full gap-6 md:w-auto">
            <div className="relative top-0 left-0 right-0 bottom-0 flex flex-col items-center md:w-auto justify-start h-full w-full min-h-[600px] max-h-[calc(100vh-210px)] xl:max-h-[calc(100vh-132px)] pb-6 overflow-y-auto overflow-x-hidden scrollBackgroundTransparent">
              <InfiniteScroll
                swr={swr}
                isReachingEnd={(swr) => {
                  console.log(swr.data);
                  return (
                    swr.data?.[0]?.length === 0 || swr.data?.length < PAGE_SIZE
                  );
                }}
                loadingIndicator={
                  <div className={`${isPageLoading ? "" : "mt-1"}`}>
                    {/* <TubeLoading /> */}
                  </div>
                }>
                {(response: { data: TubeLevel[] }) => (
                  <div
                    className={`flex flex-col items-stretch justify-center w-full px-2`}>
                    {response.data &&
                      response.data.map((tubeLevel) => (
                        <div key={tubeLevel.level} className="mb-4">
                          <TubeLevelCard
                            tubeLevel={tubeLevel}
                          />
                        </div>
                      ))}
                    {response.data &&
                      response.data.length === 0 &&
                      !isLoading && (
                        <div className="flex flex-col items-center justify-center gap-2 p-3 md:max-w-[385px] lg:max-w-[400px] min-w-[280px] 2xs:min-w-[290px] sm:min-w-[385px]">
                          <span className="font-semibold text-zinc-600">
                            No Results
                          </span>
                        </div>
                      )}
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>

        <div
          className={`h-full min-x-[320px] w-full sm:items-stretch ${
            params.id ? "md:block" : "hidden md:block"
          }`}>
          {children}
        </div>
      </div>
    </>
  );
}
