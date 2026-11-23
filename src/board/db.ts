import "server-only";
import { io } from "next/cache";

export function berlinSlice(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${get("year")}${get("month")}${get("day")}`,
    hour: get("hour"),
  };
}

export async function fetchPlanXml(eva: string): Promise<string> {
  const clientId = process.env.DB_CLIENT_ID;
  const apiKey = process.env.DB_API_KEY;

  if (!clientId || !apiKey) {
    throw new Error("DB_CLIENT_ID and DB_API_KEY must be configured");
  }

  await io();
  const { date, hour } = berlinSlice();
  const response = await fetch(
    `https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/plan/${eva}/${date}/${hour}`,
    {
      cache: "no-store",
      headers: {
        "DB-Client-ID": clientId,
        "DB-Api-Key": apiKey,
        Accept: "application/xml",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch departure plan for ${eva}: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}
