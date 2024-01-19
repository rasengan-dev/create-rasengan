import "./styles/index.css";
import "@rasenganjs/image/lib/styles/index.css";
import React from "react";
import AppRouter from "./pages/app.router";

export default function App({ Component }) {
  return <Component router={AppRouter} />;
}
