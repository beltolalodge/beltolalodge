import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { uploadImage } from '@/lib/storage';
import { fileTypeFromBuffer } from 'file-type';

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'File too large (>5MB)' }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());

        // Validate Magic Bytes
        const type = await fileTypeFromBuffer(buffer);
        if (!type || !['image/jpeg', 'image/png', 'image/webp'].includes(type.mime)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Sanitize filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

        // Upload using lib/storage
        const url = await uploadImage(buffer, filename, type.mime);

        return NextResponse.json({ url });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
    }
}
