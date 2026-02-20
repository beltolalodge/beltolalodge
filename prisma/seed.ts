import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@beltolalodge.com';
    const password = 'ChangeMe123!'; // Default password

    const existingAdmin = await prisma.adminUser.findUnique({
        where: { email },
    });

    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.adminUser.create({
            data: {
                email,
                password_hash: passwordHash,
                role: 'super_admin',
            },
        });
        console.log(`Created super_admin: ${email}`);
    } else {
        console.log('Admin already exists.');
    }

    // Create example rooms if none exist
    const roomCount = await prisma.room.count();
    if (roomCount === 0) {
        await prisma.room.createMany({
            data: [
                {
                    name: 'Classic King Room',
                    description: 'A cozy room with a king-sized bed and city view.',
                    price: 150.00,
                    max_guests: 2,
                    amenities: JSON.stringify(['WiFi', 'AC', 'TV', 'Ensuite Bathroom']),
                    min_stay: 1,
                    is_active: true,
                },
                {
                    name: 'Executive Suite',
                    description: 'Spacious suite with separate living area and premium amenities.',
                    price: 250.00,
                    max_guests: 3,
                    amenities: JSON.stringify(['WiFi', 'AC', 'Mini Bar', 'Bathtub', 'Work Desk']),
                    min_stay: 2,
                    is_active: true,
                },
            ],
        });
        console.log('Created example rooms.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
