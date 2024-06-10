"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Tag } from "antd";
import { MdCancel } from "react-icons/md";
import { useGetSeatWithTheaterIdAndShowtimeId } from "@/app/api/seat";

import ProductModal from "./ProductModal";
import { GetMoviesById } from "../../api/movie";
import { useTheaterByID } from "../../api/theater";

type Props = {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  info: any;
};

const BookSeat = ({ setIsModalOpen, isModalOpen, info }: Props) => {

  const [selectedSeats, setSelectedSeats] = useState<any>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  // console.log("selectedSeats",selectedSeats)
  const theaterID = info?.theater_id;
  const showtimeId = info?.showtime_id;
  const branchId = info?.branch_id;
  const {data : movieData} = GetMoviesById(info?.movie_id)
  const {data : theaterData} = useTheaterByID(info?.theater_id)
  const { data, refetch } = useGetSeatWithTheaterIdAndShowtimeId(theaterID, showtimeId);
  const totalPrice = selectedSeats.reduce((total: any, seat: any) => {
    return total + data?.prices[seat.seat_type];
  }, 0);
  useEffect(() => {
    if (isModalOpen) {
      refetch()
    }
  }, [isModalOpen]);

  const doubleChair = data?.seats?.filter(
    (seat: any) => seat.seat_type === "couple"
  );
  // console.log(doubleChair);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleClick = (seat: any) => {
    // console.log(item)
    const isSeatSelected = selectedSeats.some(
      (selectedSeat: any) => selectedSeat.seat_id === seat.seat_id
    );
    if (isSeatSelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (selectedSeat: any) => selectedSeat.seat_id !== seat.seat_id
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    setIsProductModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedSeats([]);
    setIsModalOpen(false);
  };
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
   
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  function formatDate(dateString: string): string {
    const dateObject = new Date(dateString);
    const date1 = new Date()
    const day = dateObject.getUTCDate(); // Lấy ngày (1-31)
    let dayName
    if(date1.getUTCDate() == day) {
      dayName = "Hôm nay"
    }else {
      let dayOfWeek = dateObject.getDay();
      let daysOfWeek = [
        "CN",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
      ];
      console.log("day of wek",day)
      dayName = daysOfWeek[dayOfWeek];
    }
   
const month = dateObject.getMonth() + 1; 

// console.log(dateObject)
    return `${dayName} ${day}/${month}`;
  }

  return (
    <>
      <div className="">
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="overflow-auto !min-w-[500px] md:!w-[800px] no-scrollbar rounded"
          //   closable={false}
          footer={null}
        >
          <div className="min-w-[500px] md:w-full h-[400px] relative  overflow-auto bg-gray-900  p-5 no-scrollbar">
            <h1 className="text-center text-xl font-semibold text-white">
              Mua vé xem phim
            </h1>
            <div className="mt-3 w-full">
              <div className="w-2/3 mx-auto">
                <div className="h-1  flex justify-center bg-white "></div>
                <div className="text-xs font-semibold flex justify-center text-white">
                  MÀN HÌNH
                </div>
              </div>
              <div className="mt-3 flex flex-col justify-center">
                <div className="grid grid-cols-12 relative gap-y-3 left-1 md:left-3">
                  {data?.seats?.map((item: any) => (
                    <button
                      className={`flex justify-center items-center  w-8 h-8 rounded ${
                        item.seat_type === "regular"
                          ? "bg-purple-700 hover:bg-purple-800"
                          : ""
                      } ${
                        item.seat_type === "vip"
                          ? "bg-orange-600 hover:bg-orange-800"
                          : ""
                      } ${
                        item.seat_type === "couple" ? "hidden" : ""
                      } text-slate-200
                      ${
                        item.is_reserved === true
                          ? "!bg-gray-700 cursor-default"
                          : ""
                      }
                      ${
                        selectedSeats.some(
                          (selectedSeat: any) =>
                            selectedSeat.seat_id === item.seat_id
                        )
                          ? "!bg-blue-500"
                          : ""
                      }
                      `}
                      disabled={item.is_reserved}
                      onClick={() => handleClick(item)}
                      key={item.seat_id}
                    >
                      {item.seat_number}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 ">
                  {doubleChair &&
                    doubleChair.map((item: any, i: any) => (
                      <div
                        key={i}
                        className={`flex bg-pink-600 hover:bg-pink-800 justify-center py-1  mt-2 cursor-pointer rounded-xl ${
                          selectedSeats.some(
                            (selectedSeat: any) =>
                              selectedSeat.seat_id === item.seat_id
                          )
                            ? "!bg-blue-500"
                            : ""
                        }`}
                        onClick={() => handleClick(item)}
                      >
                        <div
                          className={`flex justify-center items-center mx-2  text-slate-200`}
                          key={item.seat_id}
                        >
                          {item.seat_number}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 min-h-[80px]  w-full p-3">
            <div className="grid grid-cols-3  px-4 mx-auto gap-x-2 gap-y-2 ">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-gray-700 shrink-0"></div>
                <span className="text-white ml-2">Đã đặt</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-blue-500 shrink-0 border border-white"></div>
                <span className="text-white ml-2">Ghế bạn chọn</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-purple-600 shrink-0"></div>
                <span className="text-white ml-2">Ghế thường</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-orange-500 shrink-0"></div>
                <span className="text-white ml-2">Ghế VIP</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-pink-600 shrink-0"></div>
                <span className="text-white ml-2">Ghế Đôi</span>
              </div>
            </div>
            <div className="my-2 h-[50px]">
              <h1 className="text-white font-semibold cursor-pointer text-center">
                Xem chi tiết hình ảnh và thông tin ghế
              </h1>
            </div>
          </div>
          <div className="min-h-[150px] w-full bg-white p-3">
            <div className="border-b-2 border-b-gray-200 py-2">
              <div className="flex">
                <div>
                  <Tag color="#108ee9">K</Tag>
                </div>
                <h1 className="font-bold text-lg"> {movieData?.title}</h1>
              </div>
              <h2 className="text-blue-400">
              {formatTime(info?.start_time)} ~ {formatTime(info?.end_time)} {formatDate(info?.start_time)} - Phòng chiếu {theaterData?.name} - 2D Phụ đề
              </h2>
            </div>
            <div className="flex items-center justify-between border-b-2 border-b-gray-200 py-2">
              <h3 className=" text-sm">Chỗ ngồi</h3>

              <div>
                {selectedSeats && selectedSeats.length > 0 ? (
                  <Tag className="p-2 flex items-center">
                    {selectedSeats.map((item: any) => item.seat_number + " ")}
                    <MdCancel className="ml-2 size-5 cursor-pointer text-blue-500 hover:text-blue-700" />
                  </Tag>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="flex justify-between py-2 items-end">
              <div>
                <h3>Tạm tính</h3>
                <h2 className="text-lg font-bold">
                  {totalPrice.toLocaleString("vi-VN")}đ
                </h2>
              </div>
              <div className="flex">
                <Button
                  className="bg-blue-500 text-white p-3 flex items-center"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  className="bg-blue-500 text-white p-3 flex items-center ml-2"
                  onClick={handleBooking}
                >
                  Mua vé
                </Button>
              </div>
            </div>
          </div>
        </Modal>
        <ProductModal
          isProductModalOpen={isProductModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
          setIsModalOpen={setIsModalOpen}
          info={info}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          totalPriceSeat={totalPrice}
          refetch={refetch}
        />
      </div>
    </>
  );
};

export default BookSeat;
