import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '919101311322';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10).max(1000),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate Input
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error }, { status: 400 });
        }

        const { name, email, message } = result.data;

        // Construct Message
        const whatsappMessage = `*New Contact Inquiry*
        
Name: ${name}
Email: ${email}

Message: 
${message}`;

        // Encode and construct URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error('Contact WhatsApp Gen Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}
