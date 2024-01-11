import React from "react";
import { PageComponent, defineRoutePage, Link } from "rasengan";

class Home extends PageComponent {
  render() {
    return (
      <section className="main">
        <header className="header">
          <div>
            <span>Powered by</span>
            <Link to="https://rasengan.dev" target="_blank">
              <span className="logo-text">Rasengan</span>
            </Link>
          </div>
        </header>

        <div className="hero">
          <h1 className="title">
            Welcome to <span>Rasengan</span>
          </h1>
          <p className="subtitle">
            To get started, edit the file <code>src/pages/home.page.jsx</code>
          </p>
        </div>

        <div className="instructions">
          <div className="card">
            <h2 className="title">Documentation</h2>
            <p>Find in-depth information about Rasengan features and API.</p>
            <Link to="https://rasengan.dev/docs" target="_blank">
              Read the Docs
            </Link>
          </div>

          <div className="card">
            <h2 className="title">Learn</h2>
            <p>Learn about Rasengan in an interactive course with quizzes!</p>
            <Link to="https://rasengan.dev/learn" target="_blank">
              Take the Course
            </Link>
          </div>

          <div className="card">
            <h2 className="title">Examples</h2>
            <p>Discover and deploy boilerplate example Rasengan projects.</p>
            <Link to="https://rasengan.dev/examples" target="_blank">
              View Examples
            </Link>
          </div>

          <div className="card">
            <h2 className="title">Community</h2>
            <p>Join an active community of Rasengan users on Discord.</p>
            <Link to="https://rasengan.dev/discord" target="_blank">
              Join Discord
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default defineRoutePage({
  path: "/",
  title: "Home",
  description: "Home page",
})(Home);
