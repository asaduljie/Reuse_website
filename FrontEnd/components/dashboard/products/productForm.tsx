"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent, DragEvent, ClipboardEvent } from "react";

export interface ProductFormData {

    name: string;

    category: string;

    description: string;

    price: number;

    stock: number;

    image: string;

    status: "active" | "inactive";

}

interface ProductFormProps {

    initialData?: ProductFormData;

    categories: string[];

    onSubmit: (data: ProductFormData) => void;

    submitLabel?: string;

}

export default function ProductForm({

    initialData,

    categories,

    onSubmit,

    submitLabel = "Save Product",

}: ProductFormProps) {

    const [form, setForm] = useState<ProductFormData>(

        initialData ?? {

            name: "",

            category: "",

            description: "",

            price: 0,

            stock: 0,

            image: "",

            status: "active",

        }

    );

    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || (initialData as any)?.imageUrl || "");
    const [imageError, setImageError] = useState<string>("");
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
            const img = initialData.image || (initialData as any).imageUrl || "";
            setImagePreview(img);
        }
    }, [initialData]);

    const ACCEPTED_TYPES = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    function handleChange(

        key: keyof ProductFormData,

        value: any

    ) {

        setForm((prev) => ({

            ...prev,

            [key]: value,

        }));

    }

    function compressImage(file: File, callback: (base64: string) => void) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const rawResult = e.target?.result as string;
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;
                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 1200;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round((width * MAX_HEIGHT) / height);
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressed = canvas.toDataURL("image/jpeg", 0.85);
                    callback(compressed);
                } else {
                    callback(rawResult);
                }
            };
            img.onerror = () => callback(rawResult);
            img.src = rawResult;
        };
        reader.readAsDataURL(file);
    }

    function handleImageFile(file: File) {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setImageError("Hanya JPG, PNG, atau WEBP yang diperbolehkan.");
            return;
        }

        const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_UPLOAD_SIZE) {
            setImageError("Ukuran gambar terlalu besar (Maksimal 10MB).");
            return;
        }

        setImageError("");
        compressImage(file, (base64) => {
            handleChange("image", base64);
            setImagePreview(base64);
        });
    }

    function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            handleImageFile(file);
        }
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleImageFile(file);
        }
    }

    function handlePaste(e: ClipboardEvent<HTMLDivElement>) {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (file) {
                    handleImageFile(file);
                    e.preventDefault();
                    break;
                }
            }
        }
    }

    useEffect(() => {
        function handleGlobalPaste(e: globalThis.ClipboardEvent) {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    if (file) {
                        handleImageFile(file);
                        break;
                    }
                }
            }
        }

        window.addEventListener("paste", handleGlobalPaste);
        return () => {
            window.removeEventListener("paste", handleGlobalPaste);
        };
    }, []);

    function handleRemoveImage() {
        handleChange("image", "");
        setImagePreview("");
        setImageError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function openFilePicker() {
        fileInputRef.current?.click();
    }

    const [submitting, setSubmitting] = useState(false);

    async function submit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Nama produk tidak boleh kosong!");
            return;
        }

        if (!form.category) {
            alert("Silakan pilih kategori produk!");
            return;
        }

        if (form.price <= 0) {
            alert("Harga produk harus lebih besar dari 0!");
            return;
        }

        if (form.stock < 0) {
            alert("Stok produk tidak boleh kurang dari 0!");
            return;
        }

        const finalImage = form.image || imagePreview;
        if (!finalImage) {
            alert("Silakan unggah gambar produk!");
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                ...form,
                image: finalImage,
            });
        } catch (err: any) {
            console.error("Gagal memperbarui produk:", err);
            alert("Gagal memperbarui produk: " + (err?.message || "Terjadi kesalahan server"));
        } finally {
            setSubmitting(false);
        }
    }

    return (

        <form

            onSubmit={submit}

            className="

            bg-white

            rounded-[30px]

            shadow-sm

            p-8

            space-y-6

            "

        >

            <div>

                <label className="font-semibold">

                    Product Name

                </label>

                <input

                    className="

                    w-full

                    border

                    rounded-xl

                    mt-2

                    px-4

                    py-3

                    "

                    value={form.name}

                    onChange={(e)=>

                        handleChange(

                            "name",

                            e.target.value

                        )

                    }

                />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="font-semibold">

                        Category

                    </label>

                    <select

                        className="

                        w-full

                        border

                        rounded-xl

                        mt-2

                        px-4

                        py-3

                        "

                        value={form.category}

                        onChange={(e)=>

                            handleChange(

                                "category",

                                e.target.value

                            )

                        }

                    >

                        <option>

                            Select Category

                        </option>

                        {

                            categories.map(

                                category=>(

                                    <option

                                        key={category}

                                    >

                                        {category}

                                    </option>

                                )

                            )

                        }

                    </select>

                </div>

                <div>

                    <label className="font-semibold">

                        Status

                    </label>

                    <select

                        className="

                        w-full

                        border

                        rounded-xl

                        mt-2

                        px-4

                        py-3

                        "

                        value={form.status}

                        onChange={(e)=>

                            handleChange(

                                "status",

                                e.target.value

                            )

                        }

                    >

                        <option value="active">

                            Active

                        </option>

                        <option value="inactive">

                            Inactive

                        </option>

                    </select>

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="font-semibold">

                        Price

                    </label>

                    <input

                        type="number"

                        className="

                        w-full

                        border

                        rounded-xl

                        mt-2

                        px-4

                        py-3

                        "

                        value={form.price}

                        onChange={(e)=>

                            handleChange(

                                "price",

                                Number(

                                    e.target.value

                                )

                            )

                        }

                    />

                </div>

                <div>

                    <label className="font-semibold">

                        Stock

                    </label>

                    <input

                        type="number"

                        className="

                        w-full

                        border

                        rounded-xl

                        mt-2

                        px-4

                        py-3

                        "

                        value={form.stock}

                        onChange={(e)=>

                            handleChange(

                                "stock",

                                Number(

                                    e.target.value

                                )

                            )

                        }

                    />

                </div>

            </div>

            <div>
                <label className="font-semibold">
                    Product Image
                </label>
                <div
                    onDragEnter={() => setDragOver(true)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onPaste={handlePaste}
                    tabIndex={0}
                    className={`mt-2 border-dashed border-2 rounded-2xl p-6 text-center transition outline-none focus:border-[#145A3B] focus:ring-2 focus:ring-[#145A3B]/20 ${
                        dragOver
                            ? "border-[#145A3B] bg-[#eff9f2]"
                            : "border-gray-300 bg-white"
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleFileInput}
                    />
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                            Seret &amp; lepaskan gambar di sini, <strong>Paste (Ctrl+V)</strong>, atau klik untuk memilih file.
                        </p>
                        <button
                            type="button"
                            onClick={openFilePicker}
                            className="text-sm font-semibold text-[#145A3B] underline cursor-pointer"
                        >
                            Pilih Gambar
                        </button>
                        <p className="text-xs text-gray-500">
                            Format yang diperbolehkan: JPG, PNG, WEBP. Maksimal 2MB.
                        </p>
                    </div>
                </div>

                {imageError && (
                    <p className="mt-2 text-sm text-red-600">
                        {imageError}
                    </p>
                )}

                {imagePreview && (
                    <div className="mt-4 flex flex-col gap-3">
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                            <img
                                src={imagePreview}
                                alt="Preview Produk"
                                className="h-52 w-full object-contain"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="inline-flex items-center justify-center rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                        >
                            Remove Image
                        </button>
                    </div>
                )}
            </div>

            <div>

                <label className="font-semibold">

                    Description

                </label>

                <textarea

                    rows={5}

                    className="

                    w-full

                    border

                    rounded-xl

                    mt-2

                    px-4

                    py-3

                    "

                    value={form.description}

                    onChange={(e)=>

                        handleChange(

                            "description",

                            e.target.value

                        )

                    }

                />

            </div>

            <button
                type="submit"
                disabled={submitting}
                className="
                bg-[#145A3B]
                text-white
                px-8
                py-4
                rounded-2xl
                hover:bg-[#0F472E]
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
                font-bold
                "
            >
                {submitting ? "Menyimpan..." : submitLabel}
            </button>

        </form>

    );

}