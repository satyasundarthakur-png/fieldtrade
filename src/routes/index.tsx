import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error JSX module without type declarations
import App from "@/jobboard/App.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Job Board — Trade Ops" },
      {
        name: "description",
        content:
          "Daily job board for trade businesses — electricians, plumbers, mechanics, carpenters, welders, HVAC techs and painters. Track jobs from quote to invoice.",
      },
      { property: "og:title", content: "Job Board — Trade Ops" },
      {
        property: "og:description",
        content:
          "Daily job board for trade businesses. Track jobs from quote to invoice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <App />;
}
