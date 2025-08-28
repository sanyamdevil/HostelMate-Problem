import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Complaint from "@/models/Complaint";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const newComplaint = new Complaint(data);
    await newComplaint.save();

    return NextResponse.json(
      { message: "✅ Complaint submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error saving complaint:", error);
    return NextResponse.json(
      { message: "❌ Failed to submit complaint", error: error.message },
      { status: 500 }
    );
  }
}
