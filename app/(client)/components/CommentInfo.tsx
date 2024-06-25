"use client"

import React from 'react'
import Image from "next/image";
import { formatDistanceToNow, format   } from 'date-fns';
import { useGetUser } from '@/app/api/review'
type Props = {
    review : any
}

const CommentInfo = ({ review }: Props) => {
    const { data: user, error: userError, isLoading: userLoading } = useGetUser(review.user_id);
    const createdAt = new Date(review.CreatedAt);
    const now = new Date();
  
    const timeAgo = (now.getTime() - createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdAt, { addSuffix: true })
      : format(createdAt, 'dd/MM/yyyy HH:mm');
  return (
    <div className="flex items-center mt-3">
         {
              user?.image_url ? (
                <Image
              className=" rounded-full !h-[50px] !w-[50px] object-cover"
              src={user?.image_url}
              width={50}
              height={50}
              alt="image comment"
            />
              ) : (
        <Image
            className="rounded-full !h-[50px] !w-[50px]"
            src={"/avatar.png"}
            width={50}
            height={50}
            alt="avatar"
            />
              )
            }
    
    <div className="ml-3 ">
      <p className="text-sm text-gray-500 dark:text-slate-100">
        {user?.name}
      </p>
      <p className="text-xs text-gray-500 dark:text-slate-100">
        {timeAgo}
      </p>
    </div>
  </div>
  )
}

export default CommentInfo