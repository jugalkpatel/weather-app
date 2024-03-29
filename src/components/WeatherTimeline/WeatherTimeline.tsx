import { selectForecast } from "../../slices/weather/weather.slice";
import { useAppSelector } from "../../store";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export function WhetherTimeline() {
  const forecast = useAppSelector(selectForecast);

  const series: ApexAxisChartSeries = [
    {
      name: "Max Temperature",
      data: Object.keys(forecast).map((i) => {
        const value = forecast[i];

        return {
          x: Number(value.time) * 1000,
          y: value.temperature_2m_max,
        };
      }),
    },
    {
      name: "Min Temperature",
      data: Object.keys(forecast).map((i) => {
        const value = forecast[i];

        return {
          x: Number(value.time) * 1000,
          y: value.temperature_2m_min,
        };
      }),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false, // Set to false to hide the toolbar
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      tickPlacement: "between",
      axisBorder: {
        show: true,
      },
      labels: {
        datetimeUTC: false,
        datetimeFormatter: {
          month: "dd MMM",
        },
      },
    },
    legend: {
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 10,
        vertical: 10,
      },
    },
  };

  return (
    <ReactApexChart
      type="area"
      series={series}
      height={350}
      options={options}
    />
  );
}
