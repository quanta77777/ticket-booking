"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import Image from "next/image";
import { Button, Modal, Tag } from "antd";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import {
  useGetAverageRating,
  useGetReview,
  fetchReview,
} from "@/app/api/review";
import ModalComment from "./ModalComment";
import CommentInfo from "./CommentInfo";
type Props = {
  movieId: any;
};

const Comment = ({ movieId }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status,  error } =
    useInfiniteQuery({
      queryKey: ["reviews", movieId],
      queryFn: fetchReview,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }) as {
      data: {
        pages: {
          reviews: { review_id: string; comment: string }[];
        }[];
      } | undefined;
      fetchNextPage: () => void;
      hasNextPage: boolean | undefined;
      isFetchingNextPage: boolean | undefined;
      status: 'loading' | 'success' | 'error' | 'pending';
      error : any
    };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: averageData } = useGetAverageRating(movieId);
  const { data: reviewData, isLoading, refetch } = useGetReview(movieId);
  const handleComment = () => {
    setIsModalOpen(true);
  };
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error')  return <p>Error loading comments: {error?.message}</p>;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bình luận từ người xem</h1>
        <Button
          className="bg-blue-500 text-white p-3 flex items-center "
          onClick={handleComment}
        >
          Bình Luận ngay
        </Button>
      </div>
      {averageData?.average_rating != 0 ? (
        <div className="flex items-baseline mt-2">
          <FaStar className="text-yellow-400 mr-2" size={28} />
          <p className="text-3xl font-medium ">{averageData?.average_rating}</p>
          <p className="text-gray-500 text-sm dark:text-slate-100">
            /10 - {averageData?.review_count} đánh giá
          </p>
        </div>
      ) : (
        <div>
          <div>Chưa có đánh giá</div>
          <div className="flex items-baseline mt-2">
            <FaStar className="text-yellow-400 mr-2" size={28} />
            <p className="text-3xl font-medium ">
              {averageData?.average_rating}
            </p>
            <p className="text-gray-500 text-sm dark:text-slate-100">
              /10 - {averageData?.review_count} đánh giá
            </p>
          </div>
        </div>
      )}

   
      <div>
        {isLoading && <div>Loading</div>}
        {data &&
          data?.pages?.map((page: any) =>
            page?.reviews?.map((review: any) => (
              <div
                key={review?.review_id}
                className="border-b-2 pb-2 border-gray-100 dark:border-slate-600"
              >
                <CommentInfo review={review} />

                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-400 mr-2" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                    {review?.rating}/10 Đáng xem
                  </p>
                </div>
                <p className="pr-4 text-sm text-gray-600 mt-2 dark:text-slate-200">
                  {review?.comment}
                </p>
                {review?.image_url && (
                  <Image
                    className="my-3 rounded-md "
                    src={review?.image_url}
                    width={150}
                    height={140}
                    alt="image comment"
                  />
                )}
              </div>
            ))
          )}
        
          {averageData?.average_rating != 0 && (
            <div className="flex justify-center mt-4">
            <Button
                className="bg-blue-500 text-white p-3 flex items-center ml-2"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                <IoIosArrowRoundDown size={20} />
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "No more comments"}
              </Button>
            </div>
          )
        }
      
      </div>
      <ModalComment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} movieId={movieId} refetch={refetch}/>
    </div>
  );
};

export default Comment;
