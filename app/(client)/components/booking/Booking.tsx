"use client";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
const { Panel } = Collapse;
import {
  GetShowtimesByDayAndMoVieId,
  useBranchShowtime,
  useCinemaShowtime,
} from "@/app/api/showtimes";
import useCinemaChainDetails from "@/app/api/cinema";
import useBranchDetails from "@/app/api/branch";

import BookSeat from "../BookSeat";

type Props = {
  id: number;
};

function formatDate(day: number): string {
  const date = new Date();
  date.setDate(day);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayOfMonth = date.getDate().toString().padStart(2, "0"); // Thêm số 0 phía trước nếu cần
  return `${year}-${month}-${dayOfMonth}`;
}
const Booking = (props: Props) => {
  const queryClient = useQueryClient();
  let date = new Date();
  let day = date.getDate();
  const [selectedDay, setSelectedDay] = useState(day);
  const [formattedDay, setFormattedDay] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoSeat, setInfoSeat] = useState(undefined);
  const { data, isLoading, isError, error } = GetShowtimesByDayAndMoVieId(
    formattedDay,
    props.id
  );
  const cinemaChainIds = data
    ? [...new Set(data.map((showtime: any) => showtime.cinema_id))]
    : [];
  const branchChainIds = data
    ? [...new Set(data.map((showtime: any) => showtime.branch_id))]
    : [];
  console.log('ids',cinemaChainIds)
  // console.log(data)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cinemasQueries  = useCinemaChainDetails(cinemaChainIds || []);
  const branchQueries = useBranchDetails(branchChainIds);
  // console.log("brand qr",branchQueries)
  const hasData = cinemasQueries.some((query: any) => query.data);
  // console.log("cenemas id",cinemasQueries)

  const hasDataBranch = branchQueries.some((query: any) => query.data);
  cinemasQueries.map((cinemaQuery : any, index ) => {
       console.log("ceneeedata",cinemaQuery)
       if (cinemaQuery.isLoading) {
        console.log("dang load")
      }
      if (cinemaQuery.isError) {
        console.log(cinemaQuery.error.message)
       
      }
      console.log("data nè",cinemaQuery.data)

})
  // branchQueries.map((branchQuery: any, i) =>
  //   console.log(`branch query ${i}`, branchQuery.data)
  // );
  // console.log("logo", hasData)
  const { data: cinemaData } = useCinemaShowtime(selectedBranch, formattedDay);
  const branchIds = cinemaData
    ? [...new Set(cinemaData.map((showtime: any) => showtime.branch_id))]
    : [];
  const branchSingleQueries = useBranchDetails(branchIds);
  const hasDataSingleBranch = branchSingleQueries.some(
    (query: any) => query.data
  );

  useEffect(() => {
    const formattedDay = formatDate(selectedDay);
    setFormattedDay(formattedDay);
    queryClient.setQueryData(["date"], formattedDay);
  }, [queryClient, selectedDay]);
  useEffect(() => {
    if (cinemaData) {
      // console.log("cinemaData", cinemaData)
      console.log("branchSingleQueries", branchSingleQueries);
      branchSingleQueries.map((branchQuery: any, i) =>
        console.log(`branch query ${i}`, branchQuery.data)
      );
    }
  }, [branchSingleQueries, cinemaData]);

  let dates: any = [];
  let currentDate = new Date(); 

  for (let i = 0; i < 10; i++) {
    let day = currentDate.getDate(); 
    let dayOfWeek = currentDate.getDay(); 
    let daysOfWeek = [
      "CN",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    let dayName = daysOfWeek[dayOfWeek]; 

   
    dates.push({ day: day, dayName: dayName });

 
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const handleDaySelect = (day: any) => {
    setSelectedDay(day);
  };
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const CustomLable = ({ branch }: any) => (
    <div className="flex">
      <div className="w-[50px] h-[50px] mr-2">
        <Image src={branch?.data?.image_url} width={40} height={50} alt="" />
      </div>
      <div className="">
        <h3 className="text-xl font-bold dark:text-slate-200">
          {branch?.data?.name}
        </h3>
        <p className="text-xs text-gray-400">{branch?.data?.address}</p>
      </div>
    </div>
  );
  const handleBranch = (cinema: any) => {
    if (cinema === "Tất cả") {
      setSelectedBranch(cinema);
    } else {
      setSelectedBranch(cinema);
      // eslint-disable-next-line react-hooks/rules-of-hooks
    }
  };
  const handleBooking = (cinema: any) => {
    // console.log(time);
    console.log("info",cinema);
    setInfoSeat(cinema)
    setIsModalOpen(true);
  };
  const ContentPanel = ({ branchId }: any) => {
    const { data, isLoading, isError, error } = useBranchShowtime(
      branchId,
      formattedDay
    );
    // console.log("showtime data id", branchId);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Rất tiếc không có suất chiếu nào?</div>;
    // console.log("showtime data", data);
    return (
      <div className=" dark:bg-gray-900 ">
        <ul className="flex flex-wrap ">
          {data.map((time: any, i: any) => (
            <li
              className="ml-3 border border-blue-400 dark:text-white rounded p-2 cursor-pointer m-3"
              key={i}
              onClick={() => handleBooking(time)}
            >
              {formatTime(time.start_time)} - {formatTime(time.end_time)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const items: CollapseProps["items"] = [];

  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>err... {error.message}</div>;

  return (
    <>
      <div className="w-full shadow shadow-gray-300 ">
        <div className="flex px-3 py-2 overflow-auto flex-wrap w-full">
          {dates.map((date: any, index: any) => (
            <div
              key={index}
              className={` w-[70px] h-[70px] border overflow-hidden m-1  ${
                selectedDay === date.day
                  ? " border-blue-500 bg-b text-white"
                  : "border-gray-300 hover:border-gray-600"
              } cursor-pointer rounded ml-1`}
              onClick={() => handleDaySelect(date.day)}
            >
              <div
                className={`  h-1/2 w-full flex items-center justify-center  ${
                  selectedDay === date.day
                    ? " bg-blue-400 text-white"
                    : "dark:bg-slate-600 bg-gray-300"
                }`}
              >
                {date.day}
              </div>
              <div className="flex items-center w-full justify-center h-1/2 text-xs text-gray-400">
                {date.dayName}
              </div>
            </div>
          ))}
        </div>

        <div className="flex px-3 py-2 flex-wrap">
          <div className=" w-[60px] h-[85px]   justify-center cursor-pointer mt-2 ">
            <div
              className={` h-[50px] w-[50px] flex items-center justify-center overflow-hidden border ${
                selectedBranch === "Tất cả"
                  ? " border-blue-500"
                  : "border-gray-300"
              } overflow-hidden rounded`}
              onClick={() => handleBranch("Tất cả")}
            >
              <Image
                src="/movies/dexuat-icon.svg"
                width={40}
                height={50}
                alt=""
              />
            </div>
            <div className="flex items-center w-[50px]  h-1/3 text-xs text-gray-400 truncate">
              Tất cả
            </div>
          </div>

          {cinemasQueries && hasData ? (
            cinemasQueries.map((cinema: any, index: any) => (
              <div
                key={index}
                className="w-[60px] h-[85px] justify-center cursor-pointer mt-2"
                onClick={() => handleBranch(cinema?.data?.cinema_id)}
              >
                <div
                  className={`h-[50px] w-[50px] flex items-center justify-center overflow-hidden border ${
                    selectedBranch === cinema?.data?.cinema_id
                      ? "border-blue-500"
                      : "border-gray-300"
                  } overflow-hidden rounded`}
                >
                  <Image
                    src={cinema?.data?.image_url}
                    width={40}
                    height={50}
                    alt=""
                  />
                </div>
                <div className="flex items-center w-[50px] h-1/3 text-xs text-gray-400 truncate">
                  {cinema?.data?.name}
                </div>
              </div>
            ))
          ) : (
            <div className="font-medium mt-5">
              Xin lỗi vì hiện tại không có rạp chiếu nào!
            </div>
          )}
        </div>
        <div className="px-3 py-2">
          {branchQueries &&
            hasDataBranch &&
            selectedBranch === "Tất cả" &&
            branchQueries.map((branch: any, index: any) => (
              <Collapse
                className="bg-white dark:bg-gray-900"
                key={index.toString()}
              >
                <Panel
                  className=""
                  key={index.toString()}
                  header={<CustomLable branch={branch} />}
                >
                  <ContentPanel branchId={branch?.data?.branch_id} />
                </Panel>
              </Collapse>
            ))}
          {branchSingleQueries &&
            hasDataSingleBranch &&
            selectedBranch !== "Tất cả" &&
            branchSingleQueries.map((branch: any, index: any) => (
              <Collapse
                className="bg-white dark:bg-gray-900"
                key={index.toString()}
              >
                <Panel
                  className=""
                  key={index.toString()}
                  header={<CustomLable branch={branch} />}
                >
                  <ContentPanel branchId={branch?.data?.branch_id} />
                </Panel>
              </Collapse>
            ))}
        </div>
      </div>
      <BookSeat setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} info={infoSeat}/>
    </>
  );
};

export default Booking;
