import { useEffect, useRef } from "react";
import Wavel from "../../logo.svg";
import gsap from "gsap";

const navigation = [
  {
    name: "Features",
  },
];

export default function Navbar() {
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
    <div className="my-8">
      <nav className=" flex  items-center justify-between ">
        <div className="flex gap-2 items-center">
          <img src={Wavel} width={50} />
        </div>
        <div className="flex gap-5 items-center justify-center">
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
      </nav>
    </div>
  );
}
