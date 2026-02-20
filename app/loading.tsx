export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F5F1EA]">
            <div className="flex flex-col items-center space-y-6">
                {/* Glowing Text */}
                <h1 className="text-3xl md:text-5xl font-cinzel font-bold tracking-[0.2em] text-[#C8A45D] animate-pulse">
                    BELTOLA LODGE
                </h1>

                {/* Minimalist Spinner */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-2 border-[#C8A45D]/20 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-[#C8A45D] rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        </div>
    );
}
