"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function CitySelectButton() {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hồ Chí Minh");
  const cities = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCitySelect = (city: any) => {
    setSelectedCity(city);
    setOpen(false);
  };

  return (
    <div className="">
      <Button onClick={handleOpen} variant="outlined">
        {selectedCity ? selectedCity : "Chọn thành phố"}
      </Button>
      <Button className="ml-2" variant="outlined">
        Gần bạn
      </Button>
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="flex justify-center items-center "
      >
        
        <div className=" w-[765px] h-[500px] mt-5 bg-white dark:bg-gray-900 text-black dark:text-white rounded overflow-auto  p-5">
          <div className="flex justify-between mb-5 text-black dark:text-white">
            <h1>Chọn địa điểm</h1>
            <div>Search</div>
          </div>
          <div className="flex flex-wrap justify-center ">
            {cities.map((city) => (
              <div
                key={city}
                className={`cursor-pointer w-[160px] h-[40px]  flex items-center pl-2 m-2 rounded ${selectedCity === city ? "border border-sky-500 font-medium text-sky-500" : "dark:hover:bg-slate-800 hover:bg-slate-200"}`}
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </div>
            ))}
          </div>
          <div className="text-right ">
            <Button className=" " variant="outlined" onClick={handleClose}>
              <p className="text-gray-900 dark:text-white  normal-case">Đóng</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CitySelectButton;
