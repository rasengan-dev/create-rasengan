// @ts-ignore
import React from "react";
import { LayoutComponent, Outlet, defineRouteLayout } from "rasengan";

class AppLayout extends LayoutComponent {
  render() {
    return (
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    );
  }
}

export default defineRouteLayout({
  path: "/",
})(AppLayout);
