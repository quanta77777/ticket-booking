"use client"
import Image from "next/image";
import Link from 'next/link';
import HomeSlider from "./components/slider/HomeSlider";
import TabsMovie from "./components/tabs/TabsMovie";
export default function Home() {
  return (
    <>
    <div className="mb-[100px]"></div>
    <div className="w-full max-w-screen-xl mx-auto  bg-white dark:bg-slate-900">
      <HomeSlider/>
      <TabsMovie/>
    </div>
   
    </>

  );
}
