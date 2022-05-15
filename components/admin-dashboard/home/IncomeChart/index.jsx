import React, { useEffect, useState, memo } from "react";

import dynamic from "next/dynamic";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { css as Loadercss } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

import useBreakPoints from "utils/useBreakPoints";
import { numberWithCommas, compactNumber } from "utils/number-helper";
import { useTheme } from "@mui/material";
import IncomeFilter from "./IncomeFilter";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "redux/slices/analytics";

const StyledWraper = styled(Paper)(({ theme }) => ({
  "&": {
    width: "100%",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.light,
    backgroundImage: "none",
    position: "relative",
    minHeight: "315px",
  },
  ".apexcharts-tooltip": {
    boxShadow: "0px 0px 6px -4px #999",
  },
  ".apexcharts-tooltip , .apexcharts-xaxistooltip.apexcharts-theme-dark": {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  ".apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-title": {
    background: "inherit",
  },
}));

const override = Loadercss`
position: absolute;
left: 50%;
top: 50%;
z-index: 9999;
transform: translate(-50%, -50%);
`;

const IncomeChart = ({ className }) => {
  const theme = useTheme();
  const breakPoints = useBreakPoints();
  const [incomeFilter, setIncomeFilter] = useState("weekly");

  const dispatch = useDispatch();
  const { income } = useSelector((state) => state.analytics);
  const { isSm } = breakPoints;
  const series = [
    {
      name: "درآمد",
      data: income.entity,
    },
  ];

  useEffect(() => {
    dispatch(getIncome(incomeFilter));
    // eslint-disable-next-line
  }, [incomeFilter]);

  const options = {
    chart: {
      type: "bar",
      fontFamily: "BYekan",
      toolbar: {
        show: false,
      },
      foreColor: theme.palette.text.primary,
      offsetY: 20,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => {
          return val !== 0 ? numberWithCommas(val) + " تومان" : "";
        },
      },
    },
    colors: [theme.palette.primary.main],
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: isSm && true,
      formatter: (val) => {
        return compactNumber(val);
      },
      offsetY: -30,
      style: {
        fontSize: "12px",
        colors: [theme.palette.text.primary],
      },
    },

    xaxis: {
      type: "category",
      categories: income.range,
      labels: {
        offsetY: isSm ? 0 : 30,
        offsetX: isSm ? 0 : -10,
      },
      position: "bottom",
      axisBorder: {
        show: true,
        color: theme.palette.secondary.light,
        offsetX: isSm ? 10 : 0,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: theme.palette.primary.main,
            colorTo: theme.palette.primary.main,
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: 20,
      },
    },
    yaxis: {
      labels: {
        offsetX: isSm ? -30 : -40,
        formatter: (val) => {
          return compactNumber(val);
        },
      },
    },
    grid: { show: false },
    title: {
      text: `میزان درآمد ${incomeFilter === "weekly" ? "هفتگی" : ""} ${
        incomeFilter === "monthly" ? "ماهانه" : ""
      } ${incomeFilter === "yearly" ? "سالانه" : ""}`,
      floating: true,
      offsetY: -5,
      align: "center",
    },
  };

  return (
    <StyledWraper className={className}>
      <IncomeFilter
        val={incomeFilter}
        onChange={(val) => setIncomeFilter(val)}
      />
      {income.status === "loading" ? (
        <PulseLoader
          css={override}
          size={10}
          color={theme.palette.primary.main}
          loading={true}
        />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
      )}
    </StyledWraper>
  );
};

export default memo(IncomeChart);
