import DarkVeil from "./ui/DarkVell";
import { AnimatedShinyText } from "./ui/ShinyText";
import { cn } from "../lib/utils";
import { ArrowRight } from "lucide-react";
import { Highlighter } from "./ui/Highlighter";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Ripple } from "./ui/Ripple";
import Wavel from "../logo.svg";

const navigation = [
  {
    name: "Features",
  },
];

export default function Hero() {
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
    <div className="w-full m-0  mt-30">
      <div className="w-full flex flex-col gap-10  xl:flex-row justify-between items-center">
        <div className="w-full flex flex-col gap-7">
          <div
            className={cn(
              "group rounded-full w-fit border border-black/5 bg-white/99 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <AnimatedShinyText className="inline-flex items-center text-sm lg:text-md justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>⚡ NEW : AI-Powered Mood Mapping</span>
              <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
          <h1 className="text-3xl  lg:text-5xl font-semibold leading-10 lg:leading-14 max-w-[800]">
            We analyze the DNA of your{" "}
            <Highlighter action="highlight" color="#2131AE">
              favorite tracks
            </Highlighter>{" "}
            . No more skipping, just
            {"  "}
            <Highlighter action="underline" color="#ffff">
              {" "}
              perfect vibes.
            </Highlighter>{" "}
          </h1>
          <div className="flex gap-5 items-center ">
            <ul className="flex gap-2 items-centers justify-center">
              {navigation.map((item, index) => (
                <li
                  key={index}
                  className="text- cursor-pointer font-medium text-gray-100 text-md   hover:text-white hover:underline transition-all duration-200 "
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div>
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
            </div>
          </div>
        </div>
        <div className="relative max-w-[500]  flex h-[450]   w-full flex-col items-center justify-center overflow-hidden rounded-lg  ">
          <img src={Wavel} width={100} draggable={"false"} />
          <Ripple numCircles={4} />
        </div>
      </div>
      <div className=" -top-8 -z-10 left-0 m-0 absolute  w-full h-screen">
        <DarkVeil hueShift={21} speed={1} scanlineFrequency={0.2} />
      </div>
    </div>
  );
}
