import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      // Next's internal URL may use a different host behind a reverse proxy.
      // Compare the browser's origin to the actual incoming Host instead.
      const source = new URL(origin);
      if (!['http:', 'https:'].includes(source.protocol) || source.host !== request.headers.get('host')) {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: "Expected JSON." }, { status: 415 });
  let value: unknown;
  try {
    const body = await request.text();
    if (body.length > 12000)
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 413 },
      );
    value = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  if (!value || typeof value !== "object")
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  const { name, attending, guests, message, website } = value as Record<
    string,
    unknown
  >;
  if (website)
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 120 ||
    !["yes", "no"].includes(String(attending)) ||
    !Number.isInteger(guests) ||
    (attending === "yes" && ![1, 2, 3].includes(guests as number)) ||
    (attending === "no" && guests !== 0) ||
    typeof message !== "string" ||
    message.length > 2000
  )
    return NextResponse.json(
      { error: "Please check your name, attendance and guest count." },
      { status: 400 },
    );
  const endpoint = process.env.RSVP_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ mode: "demo" }, { status: 200 });
  try {
    if (new URL(endpoint).protocol !== "https:")
      throw new Error("Invalid endpoint");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.RSVP_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.RSVP_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        name: name.trim(),
        attending: attending === "yes",
        guests,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({ mode: "sent" });
  } catch {
    return NextResponse.json(
      {
        error:
          "Your response could not be delivered. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
