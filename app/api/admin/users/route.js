import { auth } from "@clerk/nextjs/server"; 
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  const { userId } = auth(); // Clerk user ID
  if (!userId) return new Response("Unauthorized", { status: 401 });

  await connectDB();

  const currentUser = await User.findOne({ clerkId: userId });
  if (!currentUser || currentUser.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const users = await User.find();
  return new Response(JSON.stringify(users), { status: 200 });
}
