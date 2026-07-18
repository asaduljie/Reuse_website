export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    icon?: string;
    status: "active" | "inactive";
    createdAt?: string;
    updatedAt?: string;
    totalProducts: number;
}

const categories: Category[] = [
    {
        id: 1,
        name: "Fashion",
        slug: "fashion",
        description: "Pakaian dan fashion item preloved",
        image: "/images/categories/fashion.jpg",
        status: "active",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        totalProducts: 18,
    },
    {
        id: 2,
        name: "Elektronik",
        slug: "elektronik",
        description: "Elektronik bekas berkualitas",
        image: "/images/categories/electronic.jpg",
        status: "active",
        createdAt: "2026-01-02T00:00:00.000Z",
        updatedAt: "2026-01-02T00:00:00.000Z",
        totalProducts: 25,
    },
    {
        id: 3,
        name: "Furnitur",
        slug: "furnitur",
        description: "Furnitur dan perlengkapan rumah",
        image: "/images/categories/furniture.jpg",
        status: "active",
        createdAt: "2026-01-03T00:00:00.000Z",
        updatedAt: "2026-01-03T00:00:00.000Z",
        totalProducts: 10,
    },
    {
        id: 4,
        name: "Aksesoris",
        slug: "aksesoris",
        description: "Aksesoris dan perhiasan preloved",
        image: "/images/categories/accessories.jpg",
        status: "active",
        createdAt: "2026-01-04T00:00:00.000Z",
        updatedAt: "2026-01-04T00:00:00.000Z",
        totalProducts: 5,
    },
    {
        id: 5,
        name: "Buku",
        slug: "buku",
        description: "Buku, novel, dan literatur bekas layak baca",
        image: "/images/categories/book.jpg",
        status: "active",
        createdAt: "2026-01-05T00:00:00.000Z",
        updatedAt: "2026-01-05T00:00:00.000Z",
        totalProducts: 12,
    },
    {
        id: 6,
        name: "Olahraga",
        slug: "olahraga",
        description: "Peralatan olahraga bekas berkualitas",
        image: "/images/categories/sport.jpg",
        status: "active",
        createdAt: "2026-01-06T00:00:00.000Z",
        updatedAt: "2026-01-06T00:00:00.000Z",
        totalProducts: 8,
    }
];

export function getCategories() {
    return categories;
}

export function getCategory(id: number) {
    return categories.find(category => category.id === id);
}

export function addCategory(category: Category) {
    categories.push(category);
}

export function updateCategory(id: number, data: Partial<Category>) {
    const index = categories.findIndex(category => category.id === id);
    if (index !== -1) {
        categories[index] = {
            ...categories[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };
    }
}

export function deleteCategory(id: number) {
    const index = categories.findIndex(category => category.id === id);
    if (index !== -1) {
        categories.splice(index, 1);
    }
}

export function getActiveCategories() {
    return categories.filter(category => category.status === "active");
}