import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Today } from "./components/Today/Today";
import { PastSevenDays } from "./components/PastSevenDays/PastSevenDays";
import { Layout } from "./components/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Today />,
      },
      {
        path: "/past-7-days",
        element: <PastSevenDays />,
      },
    ],
  },
]);
