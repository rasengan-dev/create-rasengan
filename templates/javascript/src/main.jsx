import "./pages/index.css";
import AppRouter from "./pages/app.router";

export default function App({ Component }) {
  return <Component router={AppRouter} />;
}
