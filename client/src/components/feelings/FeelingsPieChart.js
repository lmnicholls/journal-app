import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function FeelingsPieChart({ feelings }) {
  const sortedFeelings = feelings.reduce((obj, item) => {
    obj[item.feeling] = (obj[item.feeling] || 0) + 1;
    return obj;
  }, {});

  let seriesData = Object.entries(sortedFeelings).map((feeling) => {
    return { name: feeling[0], y: feeling[1] };
  });
  console.log(seriesData);

  const chartOptions = {
    chart: {
      type: "pie",
      style: {
        // fontFamily: "P",
        fontWeight: "bold",
      },
      events: {
        load() {
          setTimeout(this.reflow.bind(this), 0);
        },
      },
    },
    title: {
      verticalAlign: "top",
      text: "Feelings Breakdown",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Feelings",
        colorByPoint: true,
        data: seriesData,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        oneToOne={true}
      />
    </>
  );
}
