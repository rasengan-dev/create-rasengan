import { RouterComponent, defineRouter } from "rasengan";
import Home from "@pages/home.page";
import AppLayout from "@pages/app.layout";

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: AppLayout,
  pages: [Home]
})(AppRouter);
