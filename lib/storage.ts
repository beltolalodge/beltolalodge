import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Only initialize if env vars are present to avoid crash in build
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const BUCKET_NAME = 'room-images';

export async function uploadImage(file: Buffer, filename: string, mimeType: string) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, file, {
            contentType: mimeType,
            upsert: false,
        });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filename);

    return publicUrl;
}

export async function deleteImage(filename: string) {
    if (!supabase) throw new Error('Supabase not configured');

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filename]);

    if (error) throw error;
}
