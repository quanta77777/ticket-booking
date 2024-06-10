import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import Image from "next/image";
import { Button, Modal, Tag } from "antd";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ModalComment from "./ModalComment";
type Props = {};

const Comment = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleComment = () => {
      
        setIsModalOpen(true);
      };


  return (
    <div>
        <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Bình luận từ người xem</h1>
      <Button  className="bg-blue-500 text-white p-3 flex items-center "
        onClick={handleComment}
      >
       
          Bình Luận ngay
        </Button>
        </div>
      <div className="flex items-baseline mt-2">
        <FaStar className="text-yellow-400 mr-2" size={28} />
        <p className="text-3xl font-medium ">8.5</p>
        <p className="text-gray-500 text-sm dark:text-slate-100">
          /10 - 356 đánh giá
        </p>
      </div>
      <div>
        <div className="border-b-2 border-gray-100 dark:border-slate-600">
          <div className="flex items-center mt-3">
            <Image
              className="rounded-full"
              src={"/avatar.png"}
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="ml-3 ">
              <p className="text-sm text-gray-500 dark:text-slate-100">
                Triệu Anh Quân
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-100">
                hôm qua
              </p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 mr-2" />
            <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">
              7/10 Đáng xem
            </p>
          </div>
          <p className="pr-4 text-sm text-gray-600 mt-2 dark:text-slate-200">
            Phim kinh dị mà k có mấy cảnh sợ, chủ yếu làm quá tình tiết máu me.
            Mấy người chỉ sợ ma k sợ máu là xem k có cảm giác gì luôn. Thấy nhìu
            cmt bảo phim hay nên mới xem. Thất vọng nha.
          </p>
          <Image
            className="my-3 rounded-md"
            src={"/commentimg.webp"}
            width={150}
            height={140}
            alt="avatar"
          />
        </div>
        <div className="border-b-2 border-gray-100 dark:border-slate-600">
          <div className="flex items-center mt-3">
            <Image
              className="rounded-full"
              src={"/avatar.png"}
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="ml-3 ">
              <p className="text-sm text-gray-500 dark:text-slate-100">
                Triệu Anh Quân
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-100">
                hôm qua
              </p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 mr-2" />
            <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">
              7/10 Đáng xem
            </p>
          </div>
          <p className="pr-4 text-sm text-gray-600 mt-2 dark:text-slate-200">
            Phim kinh dị mà k có mấy cảnh sợ, chủ yếu làm quá tình tiết máu me.
            Mấy người chỉ sợ ma k sợ máu là xem k có cảm giác gì luôn. Thấy nhìu
            cmt bảo phim hay nên mới xem. Thất vọng nha.
          </p>
          <Image
            className="my-3 rounded-md"
            src={"/commentimg.webp"}
            width={150}
            height={140}
            alt="avatar"
          />
        </div>
        <div className="">
          <div className="flex items-center mt-3">
            <Image
              className="rounded-full"
              src={"/avatar.png"}
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="ml-3 ">
              <p className="text-sm text-gray-500 dark:text-slate-100">
                Triệu Anh Quân
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-100">
                hôm qua
              </p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 mr-2" />
            <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">
              7/10 Đáng xem
            </p>
          </div>
          <p className="pr-4 text-sm text-gray-600 mt-2 dark:text-slate-200">
            Phim kinh dị mà k có mấy cảnh sợ, chủ yếu làm quá tình tiết máu me.
            Mấy người chỉ sợ ma k sợ máu là xem k có cảm giác gì luôn. Thấy nhìu
            cmt bảo phim hay nên mới xem. Thất vọng nha.
          </p>
          <Image
            className="my-3 rounded-md"
            src={"/commentimg.webp"}
            width={150}
            height={140}
            alt="avatar"
          />
        </div>
        <div className="flex justify-center mt-4">
        <Button  className="bg-blue-500 text-white p-3 flex items-center ml-2 ">
        <IoIosArrowRoundDown size={20}/>
          Xem tiếp nhé
        </Button>
        </div>
    
      </div>
      <ModalComment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};

export default Comment;
