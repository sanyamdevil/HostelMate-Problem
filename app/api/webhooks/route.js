import { Webhook } from 'svix'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

async function validateRequest(request) {
  const payloadString = await request.text()
  const headerPayload = request.headers

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id'),
    'svix-timestamp': headerPayload.get('svix-timestamp'),
    'svix-signature': headerPayload.get('svix-signature'),
  }

  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders)
}

export async function POST(request) {
  try {
    const payload = await validateRequest(request)
    console.log('Webhook payload:', payload)

    if (payload.type === 'user.created') {
      console.log('userId:', payload.data.id)
    }

    return Response.json({ message: 'Received' })
  } catch (err) {
    console.error('❌ Webhook verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }
}
