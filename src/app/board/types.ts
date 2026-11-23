export type Departure = {
  id: string;
  destination: string;
  time: string;
};

export type BoardScreen =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "ready"; departures: Departure[]; selectedId: string | null };

export function screenLabel(screen: BoardScreen): string {
  switch (screen.status) {
    case "loading":
      return "Loading departures";
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

type ReadyScreen = Extract<BoardScreen, { status: "ready" }>;
