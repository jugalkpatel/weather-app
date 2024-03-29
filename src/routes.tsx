import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { PastSevenDays } from "./components/PastSevenDays/PastSevenDays";
import { Layout } from "./components/Layout/Layout";
import { Forecast } from "./components/Forecast/Forecast";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Forecast />,
      },
      {
        path: "/past-7-days",
        element: <PastSevenDays />,
      },
    ],
  },
]);
