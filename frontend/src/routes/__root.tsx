import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="container px-5 mx-auto w-full ">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
