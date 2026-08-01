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

    function handleImageFile(file: File) {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setImageError("Hanya JPG, PNG, atau WEBP yang diperbolehkan.");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setImageError("Ukuran gambar maksimal 2MB.");
            return;
        }

        setImageError("");

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {
                handleChange("image", result);
                setImagePreview(result);
            }
        };
        reader.readAsDataURL(file);
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

    function submit(

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

        if (!form.image) {
            alert("Silakan unggah gambar produk!");
            return;
        }

        onSubmit(form);

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

                className="

                bg-[#145A3B]

                text-white

                px-8

                py-4

                rounded-2xl

                hover:bg-[#0F472E]

                transition

                "

            >

                {submitLabel}

            </button>

        </form>

    );

}