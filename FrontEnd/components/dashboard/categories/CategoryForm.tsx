"use client";

import { useState } from "react";

export interface CategoryFormData {

    name: string;

    slug: string;

    description: string;

    image: string;

    status: "active" | "inactive";

}

interface CategoryFormProps {

    initialData?: CategoryFormData;

    onSubmit: (data: CategoryFormData) => void;

    submitLabel?: string;

}

export default function CategoryForm({

    initialData,

    onSubmit,

    submitLabel = "Save Category",

}: CategoryFormProps) {

    const [form, setForm] = useState<CategoryFormData>(

        initialData ?? {

            name: "",

            slug: "",

            description: "",

            image: "",

            status: "active",

        }

    );

    function handleChange(

        key: keyof CategoryFormData,

        value: string

    ) {

        setForm({

            ...form,

            [key]: value,

        });

    }

    function handleSubmit(

        e: React.FormEvent

    ) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <form

            onSubmit={handleSubmit}

            className="bg-white rounded-3xl shadow-sm p-8 space-y-6"

        >

            <div>

                <label className="font-semibold">

                    Category Name

                </label>

                <input

                    value={form.name}

                    onChange={(e)=>

                        handleChange(

                            "name",

                            e.target.value

                        )

                    }

                    className="w-full border rounded-xl mt-2 px-4 py-3"

                />

            </div>

            <div>

                <label className="font-semibold">

                    Slug

                </label>

                <input

                    value={form.slug}

                    onChange={(e)=>

                        handleChange(

                            "slug",

                            e.target.value

                        )

                    }

                    className="w-full border rounded-xl mt-2 px-4 py-3"

                />

            </div>

            <div>

                <label className="font-semibold">

                    Image URL

                </label>

                <input

                    value={form.image}

                    onChange={(e)=>

                        handleChange(

                            "image",

                            e.target.value

                        )

                    }

                    className="w-full border rounded-xl mt-2 px-4 py-3"

                />

            </div>

            <div>

                <label className="font-semibold">

                    Status

                </label>

                <select

                    value={form.status}

                    onChange={(e)=>

                        handleChange(

                            "status",

                            e.target.value

                        )

                    }

                    className="w-full border rounded-xl mt-2 px-4 py-3"

                >

                    <option value="active">

                        Active

                    </option>

                    <option value="inactive">

                        Inactive

                    </option>

                </select>

            </div>

            <div>

                <label className="font-semibold">

                    Description

                </label>

                <textarea

                    rows={5}

                    value={form.description}

                    onChange={(e)=>

                        handleChange(

                            "description",

                            e.target.value

                        )

                    }

                    className="w-full border rounded-xl mt-2 px-4 py-3"

                />

            </div>

            <button

                className="bg-[#145A3B] hover:bg-[#0F472E] text-white px-8 py-4 rounded-2xl transition"

            >

                {submitLabel}

            </button>

        </form>

    );

}
