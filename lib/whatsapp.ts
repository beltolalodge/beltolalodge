import { db } from './db';

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '919707751944'; // Default placeholder

interface WhatsAppLinkParams {
    roomId: string;
    checkIn: string; // YYYY-MM-DD
    checkOut: string; // YYYY-MM-DD
    guests: number;
    name: string;
    phone: string;
}

export async function generateWhatsAppLink({
    roomId,
    checkIn,
    checkOut,
    guests,
    name,
    phone,
}: WhatsAppLinkParams) {
    // 1. Fetch Room & Price from DB (Secure)
    const room = await db.room.findUnique({
        where: { id: roomId },
        select: { name: true, price: true, min_stay: true, same_day_cutoff: true },
    });

    if (!room) throw new Error('Room not found');

    // 2. Validate/Normalize Dates
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const now = new Date();

    if (start >= end) throw new Error('Check-out must be after check-in');
    if (start < new Date(now.setHours(0, 0, 0, 0))) throw new Error('Check-in cannot be in the past');

    // Min stay check
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < room.min_stay) throw new Error(`Minimum stay is ${room.min_stay} nights`);

    // Same day cutoff check (simple version)
    if (room.same_day_cutoff !== null) {
        const isToday = start.toDateString() === new Date().toDateString();
        if (isToday && new Date().getHours() >= room.same_day_cutoff) {
            throw new Error('Same-day booking cutoff time passed');
        }
    }

    // 3. Construct Message
    // Explicitly not calculating total price here to avoid complexity/confusion if dynamic.
    // Just showing room rate.

    const message = `Hello, I would like to request a booking.

Room: ${room.name}
Rate: ${room.price} per night
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}
Name: ${name}
Phone: ${phone}

Please confirm availability.`;

    // 4. Encode
    const encodedMessage = encodeURIComponent(message);

    // 5. Return URL
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
