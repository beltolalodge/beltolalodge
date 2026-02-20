import { z } from 'zod';

export const bookingSchema = z.object({
    name: z.string().min(2, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^[\+\d\s]+$/, 'Invalid phone characters').min(10, 'Valid phone number required').max(20),
    check_in: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid check-in date',
    }),
    check_out: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid check-out date',
    }),
    guests: z.number().int().min(1).max(10),
    room_id: z.string().uuid(),
    special_request: z.string().max(500).optional(),
    honeypot: z.string().max(0).optional(), // Should be empty
    consent: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms' }),
    }),
});

export const roomSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10),
    price: z.number().positive(),
    max_guests: z.number().int().positive(),
    amenities: z.array(z.string()),
    min_stay: z.number().int().min(1).default(1),
    same_day_cutoff: z.number().int().min(0).max(23).optional(),
    is_active: z.boolean().default(true),
});

export const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10).max(1000),
});
