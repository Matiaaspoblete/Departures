import type { BoardScreen } from "../board/types";

interface BoardComponentProps {
  screen: BoardScreen;
}

function screenLabel(screen: BoardScreen): string {
  switch (screen.status) {
    case "loading":
      return "Loading departures...";

    case "error":
      return screen.message;

    case "empty":
      return "No departures";

    case "ready":
      return `${screen.departures.length} departures`;

    default: {
      const leftover: never = screen;
      return leftover;
    }
  }
}

export default function BoardComponent({ screen }: BoardComponentProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>{screenLabel(screen)}</h1>
      {screen.status === "ready" && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {screen.status === "ready" &&
              screen.departures.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.destination}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
