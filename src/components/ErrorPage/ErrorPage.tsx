import { useRouteError } from "react-router";

// TODO: make error page aesthetic
export function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <h1>this is error page</h1>
    </>
  );
}
