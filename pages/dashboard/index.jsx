import React from "react";

import Head from "next/head";
import styled from "styled-components";

import AdminLayout from "components/layouts/AdminLayout";
import StockReport from "components/admin-dashboard/home/StockReport";
import RecentOrders from "components/admin-dashboard/home/RecentOrders";
import IncomeChart from "components/admin-dashboard/home/IncomeChart";

const StyledWraper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const Dashboard = (props) => {
  return (
    <StyledWraper className="row mt-5 mt-sm-0">
      <Head>
        <title>داشبورد | خانه</title>
      </Head>
      <StyledSection className="col-12 col-lg-6 h-100">
        <RecentOrders />
      </StyledSection>
      <StyledSection className="col-12 col-lg-6 h-100">
        <IncomeChart className="mt-4 mt-lg-0" />
        <StockReport className="mt-4 h-100" />
      </StyledSection>
    </StyledWraper>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
