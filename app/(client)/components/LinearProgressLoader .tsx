"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
type Props = {};

const LinearProgressLoader = (props: Props) => {
  const router: any = useRouter;
  const [loading, setLoading] = useState(false);
  const handleStart = () => {
    console.log("bắt đầu chạy");

    setLoading(true);
  };
  const handleComplete = () => setLoading(false);
  useEffect(() => {
    console.log(router);
    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
};

export default LinearProgressLoader;
