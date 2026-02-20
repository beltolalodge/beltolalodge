"use client";
import { useState } from 'react';

interface Room {
    id?: string;
    name: string;
    description: string;
    price: number;
    max_guests: number;
    amenities: string[];
    min_stay: number;
    images?: { image_url: string }[];
}

interface Props {
    initialData?: Room;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function RoomForm({ initialData, onSuccess, onCancel }: Props) {
    const [formData, setFormData] = useState<Room>(initialData || {
        name: '',
        description: '',
        price: 0,
        max_guests: 2,
        amenities: [],
        min_stay: 1,
        images: [],
    });
    // Manage image URLs locally for the form
    const [imageUrls, setImageUrls] = useState<string[]>(
        initialData?.images?.map(img => img.image_url) || []
    );

    const [loading, setLoading] = useState(false);
    const [amenityInput, setAmenityInput] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData ? `/api/admin/rooms/${initialData.id}` : '/api/admin/rooms';
        const method = initialData ? 'PUT' : 'POST';

        const payload = {
            ...formData,
            images: imageUrls,
        };

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                if (errorData?.details) {
                    throw new Error(JSON.stringify(errorData.details));
                }
                throw new Error(errorData?.error || 'Failed to save room');
            }
            onSuccess();
        } catch (error: any) {
            alert(`Error saving room: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addAmenity = () => {
        if (amenityInput.trim()) {
            setFormData({ ...formData, amenities: [...formData.amenities, amenityInput.trim()] });
            setAmenityInput('');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/admin/uploads', {
                method: 'POST',
                body: data,
            });
            const json = await res.json();
            if (json.url) {
                setImageUrls([...imageUrls, json.url]);
            } else {
                alert(json.error || 'Upload failed');
            }
        } catch (err) {
            alert('Upload error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{initialData ? 'Edit Room' : 'Add New Room'}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Room Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price (₹)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border rounded p-2 h-24"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Room Images</label>
                        <div className="flex flex-wrap gap-4 mb-2">
                            {imageUrls.map((url, i) => (
                                <div key={i} className="relative w-24 h-24 border rounded overflow-hidden group">
                                    <img src={url} className="w-full h-full object-cover" alt="Room" />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
                                {uploading ? '...' : '+'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* ... Guests/Min Stay ... */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Max Guests</label>
                            <input
                                type="number"
                                value={formData.max_guests}
                                onChange={e => setFormData({ ...formData, max_guests: parseInt(e.target.value) })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Min Stay (Nights)</label>
                            <input
                                type="number"
                                value={formData.min_stay}
                                onChange={e => setFormData({ ...formData, min_stay: parseInt(e.target.value) })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Amenities</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={amenityInput}
                                onChange={e => setAmenityInput(e.target.value)}
                                className="flex-1 border rounded p-2"
                                placeholder="e.g. WiFi"
                            />
                            <button type="button" onClick={addAmenity} className="bg-gray-200 px-4 rounded hover:bg-gray-300">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.amenities.map((am, i) => (
                                <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-2">
                                    {am}
                                    <button type="button" onClick={() => setFormData({ ...formData, amenities: formData.amenities.filter((_, idx) => idx !== i) })} className="text-red-500">&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
                        <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-[#1B1B1B] text-white rounded hover:bg-black disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
