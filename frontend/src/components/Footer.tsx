import Wavel from "../logo.svg";
export default function Footer() {
  return (
    <div>
      <div className="bg-white/5  rounded-4xl  h-[3] w-fll"></div>
      <div className="py-5 flex  justify-between items-center">
        <img src={Wavel} />
        <p className="text-white/70 text-sm">
          {" "}
          © Wavel 2026 All rights reserved
        </p>
      </div>
    </div>
  );
}
