import React from "react";

import styled from "styled-components";
import Head from "next/head";

import AdminLayout from "../../components/layouts/AdminLayout";

const Wraper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard = (props) => {
  return (
    <Wraper>
      <Head>
        <title>داشبورد | خانه</title>
      </Head>
      Home
    </Wraper>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
