import { NextRequest, NextResponse } from 'next/server';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { z } from 'zod';

// Define schema here to avoid import issues for now
const schema = z.object({
    roomId: z.string().uuid(),
    checkIn: z.string(), // Validate date format inside logic or refine here
    checkOut: z.string(),
    guests: z.number().int().min(1),
    name: z.string().min(2),
    // Allow + and spaces, strip them conceptually if needed but validation should just allow length
    phone: z.string().regex(/^[\+\d\s]+$/, 'Invalid phone characters').min(10),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Validate Input
        const result = schema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error }, { status: 400 });
        }

        // 2. Generate Link (Price fetched from DB inside logic)
        const url = await generateWhatsAppLink({
            roomId: result.data.roomId,
            checkIn: result.data.checkIn,
            checkOut: result.data.checkOut,
            guests: result.data.guests,
            name: result.data.name,
            phone: result.data.phone,
        });

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error('WhatsApp Gen Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
