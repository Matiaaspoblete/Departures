# ADR 001: Data source

We will use DB Timetables as the primary source because it is the official Deutsche Bahn feed, free to use, and reflects real-time changes to departures and disruptions.

This choice has limits: the API is currently beta, rate-limited to 60 calls/minute, distributed under CC BY 4.0, and requires crediting "Deutsche Bahn AG" in derived outputs.

If DB Timetables becomes unavailable or unsuitable, we will fall back to Entur for timetable data.

We rejected aviation APIs because their quotas were too small for production usage, and CFR data.gov.ro because it only exposes a static timetable without live change coverage.
