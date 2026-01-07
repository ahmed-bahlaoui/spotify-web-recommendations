import Try from "../components/Demo/Try";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  component: Demo,
});

function Demo() {
  return <Try />;
}
