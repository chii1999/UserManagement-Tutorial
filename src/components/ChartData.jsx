import React from "react"
import Chart from "chart.js/auto"
import { Bar } from "react-chartjs-2"

const ChartData = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "ຊຸດຂໍ້ມູນປະຈຳປີ 2023",
        backgroundColor: "rgb(34 197 94)",
        borderColor: "rgb(2 132 199)",
        data: [0, 5, 9, 4, 15, 38, 32, 27, 21, 40, 52, 64],
      },
    ],
  };
  return (
    <div className="w-full h-full">
      <Bar data={data} />
    </div>
  );
};

export default ChartData;