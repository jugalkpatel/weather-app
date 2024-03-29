import { selectForecast } from "../../slices/weather/weather.slice";
import { useAppSelector } from "../../store";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export function WhetherTimeline() {
  const forecast = useAppSelector(selectForecast);

  const series: ApexAxisChartSeries = [
    {
      name: "Temperature",
      data: Object.keys(forecast).map((i) => {
        const value = forecast[i];

        return {
          x: Number(value.time) * 1000,
          y: value.temperature_2m_max,
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
      horizontalAlign: "left",
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
