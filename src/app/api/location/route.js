export const runtime = "edge";

export async function GET(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("host");

  console.log({ip});
  

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const locationData = await response.json();

  console.log({locationData});
  

  return Response.json({ ip, location: locationData });
}
