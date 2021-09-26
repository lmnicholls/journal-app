import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function FeelingsPieChart({ feelings }: any) {
  const sortedFeelings = feelings?.reduce((obj: any, item: any) => {
    obj[item.text] = (obj[item.text] || 0) + 1;
    return obj;
  }, {});

  if (!sortedFeelings) {
    return <div></div>;
  }

  let seriesData = Object.entries(sortedFeelings).map((feeling) => {
    let feelings = ["angry", "sad", "nervous", "meh", "happy", "amazing"];
    let colors = [
      "#ed8787",
      "#edb458",
      "#f5f06c",
      "#78f08c",
      "#7aa7eb",
      "#ba82ed",
    ];
    return {
      name: feeling[0],
      color: colors[feelings.indexOf(feeling[0])],
      y: feeling[1],
    };
  });

  const chartOptions = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      style: {
        fontFamily: "Patrick Hand SC",
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
      text: "This Year's Feelings Breakdown",
      style: {
        fontSize: 28,
        color: "white",
      },
    },
    tooltip: {
      pointFormat: "{point.name}: <b>{point.percentage:.0f}%</b>",
      style: {
        fontSize: 16,
      },
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
        showInLegend: false,
      },
    },
    series: [
      {
        name: "Feelings",
        colorByPoint: true,
        dataLabels: {
          format: "{point.name}: <br/>{point.percentage:.0f}%",
          style: {
            fontSize: 24,
            color: "gray",
          },
        },
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
