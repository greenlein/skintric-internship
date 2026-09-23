import axios from "axios";

const API_URL =
  process.env.SKINSTRIC_PHASE_ONE_API_URL ??
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";

type AnalysisRequest = {
  name: string;
  location: string;
};

export async function POST(request: Request) {
  let body: AnalysisRequest = await request.json();

  try {
    const response = await axios.post(API_URL, {
      name: body.name.trim(),
      location: body.location.trim(),
    });

    return Response.json(response.data, { status: response.status });
  } catch (error) {
    return Response.json({ error: "Something went wrong." }, { status: 502 });
  }
}
