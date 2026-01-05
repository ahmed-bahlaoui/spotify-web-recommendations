import {
  CompassIcon,
  Crown,
  DollarSign,
  FileText,
  FolderInput,
  Glasses,
  Search,
} from "lucide-react";
import { BentoCard, BentoGrid } from "./ui/BentoGrid";
import LogosCompy from "../assets/dezzer-music_apple-spotify.svg";
import Dollars from "../assets/dollar-banknote-noto.svg";
import WavesFrams from "../assets/Vector.svg";

const features = [
  {
    Icon: DollarSign,
    name: "Free access",
    description: "We provide a great service without any dollars",
    href: "#",
    cta: "Learn more",
    background: (
      <img
        className="absolute -top-5 -right-10 "
        src={Dollars}
        alt="dollar-banknote-emoji"
        width={230}
        draggable="false"
      />
    ),
    className: "min-h-[300]",
  },
  {
    Icon: CompassIcon,
    name: "Track recommendation",
    description: "Track recommendation based on your music taste",
    href: "#",
    cta: "Learn more",
    background: (
      <img
        className="absolute left-[20%] top-3 "
        src={LogosCompy}
        draggable="false"
      />
    ),
    className: "min-h-[300]",
  },
  {
    Icon: Search,
    name: "Analysis",
    description: "Povides track analysis, bpm, most frequent key, waveform",
    href: "#",
    cta: "Learn more",

    background: (
      <img
        className="absolute left-[15%] opacity-90"
        draggable="false"
        src={WavesFrams}
      />
    ),
    className: "min-h-[300]",
  },
];

export default function Features() {
  return (
    <div className="w-full my-10 flex flex-col  gap-10 items-center justify-center ">
      <div className="flex items-center  gap-2 flex-col">
        <h1 className="text-4xl font-bold">Features</h1>
        <p className="text-white/50  text-sm flex  gap-2 items-center">
          <span>Our features to use Wavel services</span>{" "}
          <Crown size={15} className="rotate-10" />
        </p>
      </div>
      <BentoGrid className="flex w-full items-center flex-col lg:flex-row  justify-center">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
