import { useEffect, useState } from "react";
import { PageComponent, defineRoutePage } from "rasengan";

class Home extends PageComponent {
  render() {
    // Local state
    const [chrono, setChrono] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    // Effects
    useEffect(() => {
      if (isRunning) {
        const interval = setInterval(() => {
          setChrono((chrono) => chrono - 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    }, [isRunning]);

    useEffect(() => {
      if (chrono < 0) {
        handleReset();
      }
    }, [chrono]);

    // Handlers
    const handleReset = () => {
      setChrono(60);
      setIsRunning(false);
    };

    const handleStart = () => {
      setIsRunning(true);
    };

    const handleStop = () => {
      setIsRunning(false);
    };

    return (
      <section className="app">
        <div>
          <h1>
            Welcome to <span>Rasengan.js</span>
          </h1>
        </div>

        <section className="counter_container">
          <h2>Chrono</h2>

          <div className="counter_value">
            <span>{chrono}</span>
          </div>

          <div className="counter_buttons">
            <button onClick={handleReset}>Reset</button>

            {isRunning ? (
              <button onClick={handleStop}>Stop</button>
            ) : (
              <button onClick={handleStart}>Start</button>
            )}
          </div>
        </section>

        <div className="instruction">
          <p>
            Update the <code>src/pages/home.page.jsx</code> file and save to
            reload.
          </p>
        </div>

        <hr />

        <h2>Learn more</h2>

        <section className="links">
          <div className="block">
            <div className="link">
              <span>Documentation</span>

              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                tempore.
              </span>
            </div>

            <div className="link">
              <span>Examples</span>

              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                tempore.
              </span>
            </div>
          </div>

          <div className="block">
            <div className="link">
              <span>Github</span>

              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                tempore.
              </span>
            </div>
          </div>
        </section>

        <div className="powered">
          <p>
            Powered by{" "}
            <a href="https://rasengan.com" target="_blanc">
              Rasengan
            </a>
          </p>
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
