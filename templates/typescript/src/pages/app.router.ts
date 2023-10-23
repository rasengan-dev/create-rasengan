// @ts-ignore
import { Router } from "rasengan/core";
import AppLayout from './app.layout';

@Router({
  imports: [], // import others routers
  layout: AppLayout
})
export default class AppRouter {}