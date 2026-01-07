import { useEffect, useRef } from "react";
import DemoImage from "../assets/demo.svg";
import gsap from "gsap";
import { Link } from "@tanstack/react-router";

export default function Demo() {
  const ButtonRef = useRef<HTMLDivElement>(null);
  let tl = gsap.timeline({ paused: true });
  useEffect(() => {
    tl.to(ButtonRef.current, {
      duration: 0.2,
      yPercent: -120,
      ease: "power2.in",
    });
    tl.set(ButtonRef.current, { yPercent: 120 });
    tl.to(ButtonRef.current, { duration: 0.3, yPercent: 0 });
  }, [ButtonRef]);

  return (
    <div className="my-10 w-full">
      <div className="w-full">
        <div>
          <div className="relative w-full group   border border-white/6 px-5 md:px-14 gap-5 xl:gap-20  [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-4xl overflow-hidden bg-black/50 py-5  md:py-10 xl:flex ">
            <div className="mx-auto max-w-md  flex flex-col  gap-5 lg:mx-0 lg:flex-auto py-7 lg:py-32 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Boost your music workflow. Start using Wavel today.
              </h2>
              <p className=" text-lg/5 text-pretty text-white/50">
                Wavel analyzes your library across Spotify, Deezer, and Apple
                Music to provide personalized recommendations and instant
                technical data like BPM and key detection.
              </p>
              <div className="flex pl-2 gap-5 items-center ">
                <div>
                  <Link to="/demo">
                    <button
                      onMouseEnter={() => tl.play(0)}
                      onMouseLeave={() => tl.play(1)}
                      className="bg-white overflow-hidden  shadow-lg transition-all duration-200 hover:shadow-gray-100/20 text-foreground cursor-pointer px-5 py-2 rounded-2xl bord text-md font-medium outline-0 flex "
                    >
                      <span className="flex gap-2 items-center justify-center">
                        Try now !{" "}
                        <div ref={ButtonRef}>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
                          >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        </div>
                      </span>{" "}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.02]" />

            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                alt="App screenshot"
                src={DemoImage}
                draggable="false"
                width={1824}
                height={1080}
                className="absolute top-0 left-5 xl:left-20  w-250  max-w-none rounded-md  ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
