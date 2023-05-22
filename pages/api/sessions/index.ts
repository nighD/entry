import { NextResponse } from "next/server";
import { SessionResponse, QueryParams } from "@/app/types";

const handler = async (req: any,res: any) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }
  const {short_title, status} = req.query as QueryParams;
  // Declare url variable
  let url = "https://api.entrylevel.net/test/sessions";
  // If short_title is not empty, add it to url
  if (short_title && status) {
    url += `?short_title=${short_title}&status=${status}`;
  } else if (short_title) {
    url += `?short_title=${short_title}`;
  } else if (status) {
    url += `?status=${status}`;
  }

  const sessionsData: SessionResponse[] = await fetch(
    url
  ).then((res) => res.json());

  // Return maximum of 50 sessions
  if (sessionsData.length > 50) {
    return res.status(200).json(sessionsData.slice(0, 50));
  }

  return res.status(200).json(sessionsData);
};

export default handler;