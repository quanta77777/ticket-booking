"use client";
import React, { Component } from "react";
import { useQueryClient as UseQueryClient } from "@tanstack/react-query";
import { useParams as UseParams } from "next/navigation";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Button from "@mui/material/Button";
import CitySelectButton from "@/app/(client)/components/CitySelectButton";
import SideMovies from "@/app/(client)/components/SideMovies";
import Booking from "@/app/(client)/components/booking/Booking";
import Comment from "@/app/(client)/components/Comment";
import { GetMoviesById } from "@/app/api/movie";
import { GetShowtimesByDayAndMoVieId } from "@/app/api/showtimes";
type Props = {};

const page = (props: Props) => {
  const params = UseParams<{
    [x: string]: any;
    tag: string;
    item: number;
  }>();
  // const queryClient = UseQueryClient();
  // const selectedDay = queryClient.getQueryData<string>(["selectedDay"]);

  const { data, isLoading, isError } = GetMoviesById(params.id);

  // const {
  //   data: showtimeData,
  //   isLoading: isLoadingShowtime,
  //   isError: isErrShowtime,
  // } = GetShowtimesByDayAndMoVieId(selectedDay as string, params.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movie</div>;
  return (
    <>
      <div className=" sm:mt-[60px] md:mt-[100px] max-w-screen-xl mx-auto p-5">
        <div
          style={{ backgroundImage: `url("${data.image_url}")` }}
          className="sm:relative flex  w-full h-[250px] mt-[50px] sm:h-[500px] bg-no-repeat  bg-contain sm:bg-cover bg-center"
        >
          <div className="hidden md:flex justify-center  items-center md:flex-row flex-col bg-black opacity-70 w-full"></div>
          <div className="flex absolute justify-center ">
            <div className="w-1/3 justify-center p-5 hidden md:flex">
              <Image
                className="border border-inherit w-[115px] h-[160px] mt-9 md:w-[255px] md:h-[365px] object-cover"
                src={`${data.image_url}`}
                width={255}
                height={365}
                alt={data.title}
              />
            </div>
            <div className="w-2/3 hidden md:flex md:flex-col mt-11">
              <div className="text-white">
                <h1 className="text-4xl font-bold p-2">{data.title}</h1>
                <p className="text-gray-300 font-medium p-2">
                  Seishun 18×2: Kimi e to Tsuzuku Michi · 2024 · {data.duration}{" "}
                  phút{" "}
                </p>
                <div className="flex p-2 items-center">
                  <StarIcon className="text-yellow-400" />
                  <p className="font-bold ml-1">8.2</p>
                  <h3 className="text-gray-300  ml-1">1.5k đánh giá</h3>
                </div>

                <p className="text-gray-300 p-2">
                  “Hãy gặp lại nhau khi cả hai đã hoàn thành được ước mơ của
                  chính mình”
                </p>
                <h3 className="font-medium px-2">Nội dung</h3>
                <div className="text-gray-300 line-clamp-4 lg:line-clamp-5 px-2 ">
                  Ký ức tình đầu ùa về khi Jimmy nhận được tấm bưu thiếp từ Ami.
                  Cậu quyết định một mình bước lên chuyến tàu đến Nhật Bản gặp
                  lại người con gái cậu đã bỏ lỡ 18 năm trước. Mối tình day dứt
                  thời thanh xuân, liệu sẽ có một kết cục nào tốt đẹp khi đoàn
                  tụ?
                </div>
                <div className="flex p-2 text-white">
                  <div>
                    <p className="text-gray-300 mr-8">Ngày chiếu</p>
                    <p>08/04/2024</p>
                  </div>
                  <div>
                    <p className="text-gray-300 ">Thể loại</p>
                    <p>{data.genre}</p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    className="text-red-600"
                    variant="text"
                    startIcon={<PlayCircleOutlineIcon />}
                  >
                    <p className="text-white hover:underline normal-case">
                      Trailer
                    </p>
                  </Button>
                  <Button
                    className="text-yellow-400 "
                    variant="text"
                    startIcon={<StarOutlineIcon />}
                  >
                    <p className="text-white hover:underline normal-case">
                      Xem review
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:hidden">
          <div className="">
            <div className=" mt-5">
              <div className="text-gray-900 dark:text-white">
                <h1 className="text-2xl font-bold p-2">{data.title}</h1>
                <p className=" font-medium p-2">
                  Seishun 18×2: Kimi e to Tsuzuku Michi · 2024 · {data.duration}{" "}
                  phút{" "}
                </p>
                <div className="flex p-2 items-center text-gray-900 dark:text-white">
                  <StarIcon className="text-yellow-400" />
                  <p className="font-bold ml-1">8.2</p>
                  <h3 className="text-xs ml-1">1.5k đánh giá</h3>
                </div>

                <p className="p-2">
                  “Hãy gặp lại nhau khi cả hai đã hoàn thành được ước mơ của
                  chính mình”
                </p>
                <h3 className="font-bold px-2">Nội dung</h3>
                <div className=" px-2 ">
                  Ký ức tình đầu ùa về khi Jimmy nhận được tấm bưu thiếp từ Ami.
                  Cậu quyết định một mình bước lên chuyến tàu đến Nhật Bản gặp
                  lại người con gái cậu đã bỏ lỡ 18 năm trước. Mối tình day dứt
                  thời thanh xuân, liệu sẽ có một kết cục nào tốt đẹp khi đoàn
                  tụ?
                </div>
                <div className="flex p-2 text-gray-900 dark:text-white">
                  <div>
                    <p className=" mr-8">Ngày chiếu</p>
                    <p className="font-bold ">08/04/2024</p>
                  </div>
                  <div>
                    <p>Thể loại</p>
                    <p className="font-bold ">{data.genre}</p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    className="text-red-600"
                    variant="text"
                    startIcon={<PlayCircleOutlineIcon />}
                  >
                    <p className="text-gray-900 dark:text-white hover:underline normal-case">
                      Trailer
                    </p>
                  </Button>
                  <Button
                    className="text-yellow-400 "
                    variant="text"
                    startIcon={<StarOutlineIcon />}
                  >
                    <p className="text-gray-900 dark:text-white hover:underline normal-case">
                      Xem review
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full  mt-5 mb-[100px] ">
          <div className=" w-full md:w-2/3">
            <div className="md:flex mb-2">
              <h3 className="w-full md:w-1/2 text-xl font-bold">
                Phim thanh xuân có em
              </h3>
              <div className="flex md:w-1/2 md:justify-end my-2 ">
                <CitySelectButton />
              </div>
            </div>

            <Booking id={params.id}/>
            <div className="my-5 border-b-2 border-gray-100 dark:border-slate-600"></div>
            <Comment />
          </div>
          <div className="w-1/3 ml-3 hidden md:flex">
            <SideMovies />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
