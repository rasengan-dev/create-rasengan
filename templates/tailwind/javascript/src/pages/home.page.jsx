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
      <section className="w-full h-full flex flex-col items-center mt-20">
        <div>
          <h1 className="text-[2rem] md:text-[3rem] text-white font-poppins font-bold text-center">
            Welcome to <span className="text-primary">Rasengan.js</span>
          </h1>
        </div>

        <section className="w-[18.75rem] bg-[#fff] rounded-md flex flex-col items-center p-4 mt-8">
          <h2 className="text-2xl font-semibold font-roboto">Chrono</h2>

          <div className="">
            <span className="text-[3rem] font-bold text-primary">{chrono}</span>
          </div>

          <div className="w-full gap-4 flex flex-row justify-between">
            <button
              onClick={handleReset}
              className="w-[50%] rounded-md bg-transparent border-2 border-primary py-2 text-primary font-bold font-roboto transition-all"
            >
              Reset
            </button>

            {isRunning ? (
              <button
                onClick={handleStop}
                className="w-[50%] rounded-md bg-primary py-2 text-[#fff] font-bold font-roboto transition-all"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="w-[50%] rounded-md bg-primary py-2 text-[#fff] font-bold font-roboto transition-all"
              >
                Start
              </button>
            )}
          </div>
        </section>

        <div className="mt-8 text-white font-roboto px-2">
          <p className="text-center">
            Update the{" "}
            <code className="text-primary mx-2">src/pages/home.page.tsx</code>{" "}
            file and save to reload.
          </p>
        </div>

        <hr className="w-full md:w-[800px] mt-10" />

        <h2 className="text-white mt-8 text-[1.8rem] font-poppins font-bold mb-8">
          Learn more
        </h2>

        <section className="w-full md:w-[800px] flex flex-col md:flex-row gap-4 md:gap-8 px-4">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="border-2 border-white rounded-md p-4 flex flex-col">
              <span className="text-primary text-xl font-semibold mb-2 font-poppins">
                Documentation
              </span>

              <span className="text-white font-roboto">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                tempore.
              </span>
            </div>

            <div className="border-2 border-white rounded-md p-4 flex flex-col">
              <span className="text-primary text-xl font-semibold mb-2 font-poppins">
                Examples
              </span>

              <span className="text-white font-roboto">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                tempore.
              </span>
            </div>
          </div>

          <div className="block">
            <div className="border-2 border-white rounded-md p-4 flex flex-col">
              <span className="text-primary text-xl font-semibold mb-2 font-poppins">
                Github
              </span>

              <span className="text-white font-roboto">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                tempore.
              </span>
            </div>
          </div>
        </section>

        <div className="w-full px-4 mt-8 mb-20 flex justify-end md:fixed md:bottom-8 md:right-8">
          <p className="text-white font-roboto">
            Powered by{" "}
            <a
              href="https://rasengan.com"
              target="_blanc"
              className="font-poppins font-bold text-primary"
            >
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
