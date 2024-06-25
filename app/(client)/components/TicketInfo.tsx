"use client";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Button, Modal, Tag } from "antd";
import { IoQrCodeOutline } from "react-icons/io5";
import { format } from "date-fns-tz";
import { useTheaterByID } from "@/app/api/theater";
import { useBranchByID } from "@/app/api/branch";
import { GetMoviesById } from "@/app/api/movie";
import { ReserveSeat } from "@/app/api/seat";
import {
  createTicket,
  createSeatsWithTicketId,
  createProductWithTicketId,
} from "@/app/api/ticket";
type Props = {
  setIsTicketInfoModalOpen: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  setIsProductModalOpen: (value: boolean) => void;
  isTicketInfoModalOpen: boolean;
  selectedSeats: any;
  info: any;
  selectedProducts: any;
  totalPriceSeat: any;
  setSelectedSeats: any;
  totalPriceProduct: any;
  refetch: any;
};

const TicketInfo = ({
  isTicketInfoModalOpen,
  setIsProductModalOpen,
  setIsModalOpen,
  setIsTicketInfoModalOpen,
  info,
  selectedSeats,
  setSelectedSeats,
  selectedProducts,
  totalPriceSeat,
  totalPriceProduct,
  refetch,
}: Props) => {
  // const queryClient = useQueryClient();

  const { data: theaterData } = useTheaterByID(info?.theater_id);
  const { data: branchData } = useBranchByID(info?.branch_id);
  const { data: movieData } = GetMoviesById(info?.movie_id);
  let dateStr = info?.start_time;
  // console.log("seats", selectedSeats);
  // const data = queryClient.getQueryData('date');
  // const formattedDate = format(new Date(dateStr), 'dd/MM/yyyy', { timeZone: 'Asia/Ho_Chi_Minh' });

  const total = totalPriceSeat + totalPriceProduct;
  const handleReserveSeat = async () => {
    const ticketId = await createTicket(
      info?.movie_id,
      info?.showtime_id,
      total
    );
    if (ticketId) {
      await createSeatsWithTicketId(ticketId, selectedSeats);
      await createProductWithTicketId(ticketId, selectedProducts);
      await ReserveSeat(selectedSeats, info?.showtime_id);
      alert("Đặt ghế thành công");
      await refetch().then(() => {
        console.log("Data refetched");
      });

      setIsModalOpen(false);
      setIsTicketInfoModalOpen(false);
      setIsProductModalOpen(false);
      setSelectedSeats([]);
    } else {
      console.log("ticketid invalid");
    }
  };
  const showModal = () => {
    setIsTicketInfoModalOpen(true);
  };

  const handleOk = () => {
    setIsTicketInfoModalOpen(false);
  };
  const handleCancel = () => {
    setIsTicketInfoModalOpen(false);
  };
  function formatDate(dateString: string): string {
    const dateObject = new Date(dateString);

    const day = dateObject.getUTCDate(); // Lấy ngày (1-31)
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    // console.log(dateObject)
    return `${day}/${month}/${year}`;
  }
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <Modal
      open={isTicketInfoModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="overflow-auto !w-[700px] md:w-auto  no-scrollbar rounded mt-3"
      //   closable={false}
      footer={null}
    >
      <div className="flex md:flex-row  flex-col-reverse w-full md:h-[500px] h-auto bg-white ">
        <div className=" p-4 md:w-1/2 w-full">
          <div className="flex justify-between p-3 items-center border-b-2">
            <Tag color="#108ee9" className="w-11 text-center">
              K
            </Tag>
            <h1 className="font-bold text-lg">{movieData?.title}</h1>
          </div>
          <div className="flex justify-between mt-3">
            <div>
              <p className="text-xs font-medium text-gray-500">THỜI GIAN</p>
              <p className="text-sm font-bold ">
                {formatTime(info?.start_time)} ~ {formatTime(info?.end_time)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">NGÀY CHIẾU</p>
              <p className="text-sm font-bold ">
                {formatDate(info?.start_time)}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="text-xs font-medium text-gray-500"> RẠP</p>
              <p className="text-sm font-bold ">{branchData?.name}</p>
              <p className="text-xs font-medium text-gray-500">
                {branchData?.address}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-3 border-b-2 pb-4">
            <div>
              <p className="text-xs font-medium text-gray-500">PHÒNG CHIẾU</p>
              <p className="text-sm font-bold ">{theaterData?.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">ĐỊNH DẠNG</p>
              <p className="text-sm font-bold ">2D Lồng tiếng</p>
            </div>
          </div>
          <div className=" mt-3 border-b-2 pb-4">
            <div>
              <p className="text-xs font-medium text-gray-500">GHẾ</p>
            </div>
            <div className="flex justify-between">
              <div>
                {selectedSeats?.map((item: any) => (
                  <span className="text-sm font-bold " key={item.seat_id}>
                    {item.seat_number}{" "}
                  </span>
                ))}
              </div>

              <p className="text-sm font-bold ">
                {totalPriceSeat.toLocaleString("vi-VN")}đ
              </p>
            </div>

            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500">BẮP - NƯỚC</p>
            </div>
            {selectedProducts.map((item: any) => (
              <div className="flex justify-between" key={item.product_id}>
                <p className="text-sm font-bold ">
                  {item.quantity} x {item.name}
                </p>
                <p className="text-sm font-bold ">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-7">
            <p className="text-sm font-bold ">Tạm tính</p>
            <p className="text-sm font-bold ">
              {total.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              className="bg-blue-500 text-white p-3 flex items-center ml-2"
              onClick={handleReserveSeat}
            >
              Mua vé
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-gradient-to-t from-pink-400 to-pink-500 flex items-center justify-center">
          <div className="p-5 w-full flex flex-col justify-center">
            <h1 className="text-center text-white font-semibold">
              {" "}
              Quét mã QR bằng MoMo để thanh toán
            </h1>
            <div className=" mx-auto w-[250px] h-[260px] rounded-xl bg-white mt-2"></div>
            <div className="flex items-stretch justify-center text-white mt-3">
              <IoQrCodeOutline size={29} />
              <p className="ml-2 font-semibold">
                Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketInfo;
