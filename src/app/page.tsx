import { Suspense } from "react";
import { fetchPlanXml } from "../board/db";
import Board from "./components/Board";

async function PlanXmlLength() {
  const xml = await fetchPlanXml("8000105");

  return <p>DB plan response: {xml.length} characters</p>;
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Suspense fallback={<p>Loading DB plan...</p>}>
        <PlanXmlLength />
      </Suspense>
      <Board
        screen={{
          status: "ready",
          departures: [{ id: "1", destination: "Rome", time: "11:26" }],
          selectedId: "1",
        }}
      />
      <Board
        screen={{
          status: "loading",
        }}
      />
      <Board
        screen={{
          status: "error",
          message: "Failed to load departures",
        }}
      />
      <Board
        screen={{
          status: "empty",
        }}
      />
    </div>
  );
}
