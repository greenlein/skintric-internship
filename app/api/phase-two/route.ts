import axios from "axios";

const API_URL =
  process.env.SKINSTRIC_PHASE_TWO_API_URL ??
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return Response.json({ error: "An image is required." }, { status: 400 });
  }

  try {
    const imageBase64 = Buffer.from(await image.arrayBuffer()).toString("base64");
    const response = await axios.post(API_URL, { image: imageBase64 });
    console.log("Phase two response:", response.data);

    return Response.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Phase two request failed:", error);
    return Response.json({ error: "Something went wrong." }, { status: 502 });
  }
}
