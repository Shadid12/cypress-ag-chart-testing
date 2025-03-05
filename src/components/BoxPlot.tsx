import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import { getBoxData } from "../utils/data";
import "ag-charts-enterprise";

const BoxPlot = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "HR Analytics",
    },
    subtitle: {
      text: "Salary Distribution by Department",
    },
    data: getBoxData(),
      series: [
        {
          type: "box-plot",
          yName: "Employee Salaries",
          xKey: "department",
          minKey: "min",
          q1Key: "q1",
          medianKey: "median",
          q3Key: "q3",
          maxKey: "max",
        },
      ],
  });

  return <AgCharts options={options as any} />;
};

export default BoxPlot;