// @ts-ignore
import { type AppProps } from 'rasengan/core';
import AppRouter from "./pages/app.router.ts";

export default function App({ Component }: AppProps) {
  // @ts-ignore 
  return <Component router={AppRouter} />
}