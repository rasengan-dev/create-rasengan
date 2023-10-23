// @ts-ignore
import React, { useState } from "react";
// @ts-ignore
import { PageComponent, Route, createRoute } from "rasengan/core";

@Route({ path: "/", exact: true, title: "Home", description: "Home page" })
export default class Home extends PageComponent {
  render() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <h1>Home</h1>
        <p>Home page content</p>

        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }
}

// Js version
const HomeRoute = createRoute({
  path: "/",
  exact: true,
  title: "Home",
  description: "Home page"
})(Home);
