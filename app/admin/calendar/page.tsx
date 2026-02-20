"use client";
import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar';

export default function CalendarPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold font-serif text-[#1B1B1B] mb-8">Availability Calendar</h1>
            <AvailabilityCalendar />
        </div>
    );
}
