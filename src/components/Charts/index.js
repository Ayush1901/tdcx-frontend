import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

// interface DatasetType {
//   data: number[];
//   backgroundColor: string[];
// }

function TaskListCompletion({
  labels = ["2010", "2012", "2014", "2016", "2018"],
  datasets = [
    {
      data: [25, 75],
      backgroundColor: ["#5285EC", "#E8ECEC"]
    }
  ]
}) {
  return (
    <Pie
      options={{
        width: "240px",
        height: "130px",
      }}
      data={{
        labels: labels,
        datasets: datasets
      }}
    />
  );
}

export default TaskListCompletion;
