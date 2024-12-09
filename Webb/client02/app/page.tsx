"use client"

import React, { FC, useState, useEffect } from 'react';
import { useLoadUserQuery } from "@/redux/features/api/apiSilce"; // API lấy thông tin user
import Heading from './Utils/Heading';
import Header from "./components/Header";
import Hero from './Route/Hero';
import Courses from "./components/Route/Courses";
import Revies from "./components/Route/Revies";
import FQA from "./components/FQA/FQA";
import Footer from "./components/Footer";
import TestModal from "./components/TestModal"; // Import TestModal

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const [openTestModal, setOpenTestModal] = useState(false); // Quản lý trạng thái TestModal
  const [count, setCount] = useState(0); // Đếm số lần nộp bài kiểm tra
  const [route, setRoute] = useState("Login")

  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Kiểm tra điều kiện để hiển thị modal
  useEffect(() => {
    if (userData && userData.user) { // Kiểm tra userData.user tồn tại
      if (userData.user.role === "user" && userData.user.isTest === false && count === 0) {
        setOpenTestModal(true);
      }
    }
  }, [userData, count]);

  if (isLoading) return <p>Loading...</p>; // Hiển thị khi đang tải

  return (
    <div>
      <Heading
        title="Học Trực Tuyến"
        description="nền tảng để học sinh học tập và nhận sự trợ giúp từ giáo viên"
        keyword="Lập trình, MERN, Redux, Học máy"
      />

      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <Hero />
      <Courses />
      <br />
      <br />
      <Revies />
      <FQA />
      <Footer />

      {/* TestModal */}
      {openTestModal && (
        <TestModal
          open={openTestModal}
          setOpen={setOpenTestModal}
          onTestCompleted={() => setCount(1)} // Đánh dấu đã hoàn thành bài kiểm tra
          count={count}
          setCount={setCount}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Page;
