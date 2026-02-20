import { z } from 'zod';
const updateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().positive().optional(),
  max_guests: z.coerce.number().int().positive().optional(),
  amenities: z.array(z.string()).optional(),
  min_stay: z.coerce.number().int().min(1).optional(),
  same_day_cutoff: z.coerce.number().int().min(0).max(23).optional().nullable(),
  is_active: z.boolean().optional(),
  images: z.array(z.string().url()).optional(),
});
const payload = {
  id: "6c2e9430-013c-4505-8704-98c614e6068e",
  name: "Deluxe Family Room (AC)",
  description: "Our air-conditioned Deluxe Family Room offers a spacious, modern retreat perfectly tailored for a comfortable stay for 2 adults and 1 child.",
  price: 2000,
  max_guests: 3,
  amenities: [],
  min_stay: 1,
  same_day_cutoff: null,
  is_active: true,
  created_at: "2026-02-20T04:54:56.279Z",
  updated_at: "2026-02-20T04:54:56.279Z",
  images: ["https://dzjwslmkvzlrkafaskkb.supabase.co/storage/v1/object/public/room-images/1700000000-Doraemon.jpg"]
};
const result = updateSchema.safeParse(payload);
if (!result.success) console.log("ERROR:", JSON.stringify(result.error.errors, null, 2));
else console.log("Success!");
