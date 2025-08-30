import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Clerk webhook secret
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing CLERK_WEBHOOK_SECRET" }, { status: 500 });
  }

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  // Read body
  const body = await req.text();

  // Verify signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Get event type and data
  const { type, data } = evt;

  console.log("✅ Clerk Webhook Received:", type, data);

  // Example: When user created
  if (type === "user.created") {
    console.log("🎉 New User Created:", data.id, data.email_addresses[0].email_address);
    // Here you can store user in MongoDB
  }

  return NextResponse.json({ success: true, message: "Webhook received!" });
}



// import { Webhook } from 'svix'

// const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

// async function validateRequest(request) {
//   const payloadString = await request.text()
//   const headerPayload = request.headers

//   const svixHeaders = {
//     'svix-id': headerPayload.get('svix-id'),
//     'svix-timestamp': headerPayload.get('svix-timestamp'),
//     'svix-signature': headerPayload.get('svix-signature'),
//   }

//   const wh = new Webhook(webhookSecret)
//   return wh.verify(payloadString, svixHeaders)
// }

// export async function POST(request) {
//   try {
//     const payload = await validateRequest(request)
//     console.log('Webhook payload:', payload)

//     if (payload.type === 'user.created') {
//       console.log('userId:', payload.data.id)
//     }

//     return Response.json({ message: 'Received' })
//   } catch (err) {
//     console.error('❌ Webhook verification failed:', err)
//     return new Response('Invalid signature', { status: 400 })
//   }
// }
