import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Trailer from "../Trailer";
type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  data : any
};

const Movie = (props: Props) => {
  const {open, setOpen, data} = props
 
const handleTrailer = () => {
  setOpen(true)
}

  return (
    <>
      <div className="w-[290px] ">
        <div className="relative group">
          <div className="w-[290px] h-[435px]">
          <Image
            className="rounded-lg w-full h-full object-cover"
            src={data.image_url}
            width={290}
            height={435}
            alt="phim1"
          />
          </div>
          

          {/* Overlay */}
          <div className=" overlay absolute inset-0 bg-black bg-opacity-20 rounded-lg opacity-0 group-hover:opacity-100 ">
            <div className="absolute inset-0 flex flex-col justify-center">
              <Link className="text-white  font-bold p-3" href={`/movie/${data.movie_id}`}>
              {data.title}
              </Link>
              <div className="flex text-white p-2">
                <SellOutlinedIcon className="text-yellow-400" />
                <p className="ml-3">{data.genre}</p>
              </div>
              <div className="flex text-white p-2">
                <AlarmOutlinedIcon className="text-yellow-400" />
                <p className="ml-3">{data.duration} Minute</p>
              </div>
              <div className="flex text-white p-2">
                <PublicIcon className="text-yellow-400" />
                <p className="ml-3">Việt Nam</p>
              </div>
              <div className="flex text-white p-2">
                <StarIcon className="text-yellow-400" />
                <p className="ml-3">5</p>
              </div>
              <div className="p-2 ml-2 text-white">
              <Stack direction="row" spacing={2}>
      <Button onClick={handleTrailer} className="text-white" variant="contained" startIcon={<PlayCircleIcon />}>
        Trailer
      </Button>
      <Button  className="text-white" variant="contained" endIcon={<CreditCardIcon />}>
        Mua Vé
      </Button>
    </Stack>
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-semibold mt-2">
        {data.title}
        </h1>
      </div>
    </>
  );
};

export default Movie;
