import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

interface FeelingsState {
  _id: string;
  date: any;
  text: string;
}
interface Props {
  feelings: FeelingsState[];
}

export default function MonthlyFeelings({ feelings }: Props) {
  const feelingsPast30Days = feelings
    ?.slice(0, 29)
    .sort((a, b) => a.date - b.date);
  const datesPast30Days = feelingsPast30Days?.map((day) =>
    moment(day.date).format("MMM DD")
  );

  if (!feelingsPast30Days) {
    return <div></div>;
  }
  const feelingsArray = feelingsPast30Days.map((day) => {
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
      name: day.text,
      color: colors[feelings.indexOf(day.text)],
      y: feelings.indexOf(day.text),
    };
  });

  const chartOptions = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      style: {
        fontFamily: "Patrick Hand SC",
        fontWeight: "bold",
      },
    },
    title: {
      text: "Feelings Log (Past 30 Days)",
      style: {
        color: "white",
        fontSize: 28,
      },
    },
    yAxis: {
      title: {
        text: "Feelings",
        style: {
          color: "white",
          fontSize: 24,
        },
      },
      labels: {
        style: {
          color: "gray",
          fontSize: 18,
          textOutline: "1 white",
        },
      },
      categories: ["angry", "sad", "nervous", "meh", "happy", "amazing"],
    },

    xAxis: {
      title: {
        text: "Date",
        style: {
          color: "white",
          fontSize: 24,
        },
      },
      labels: {
        style: {
          color: "gray",
          fontSize: 18,
          textOutline: "1 white",
        },
        rotation: 270,
      },
      categories: datesPast30Days,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        color: "white",
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        showInLegend: false,
        data: feelingsArray,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
        },
      ],
    },
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
