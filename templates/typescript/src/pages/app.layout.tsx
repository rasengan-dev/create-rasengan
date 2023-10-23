// @ts-ignore
import React from "react"
// @ts-ignore
import { Outlet, LayoutComponent, Route } from "rasengan/core"

@Route({
  path: "/",
  exact: true
})
export default class AppLayout extends LayoutComponent {
  render(): React.ReactNode {
    return (
      <div>
        <h1>App Layout</h1>
        <Outlet />
      </div>
    )
  }
}