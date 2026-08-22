import { create } from "zustand";

import {
    createCategory, deleteCategory, getCategories, updateCategory
} from "../../services/category";

export const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    hasFetched: false,

    // FETCH CATEGORIES
    fetchCategories: async () => {
        set({ loading: true });

        try {
            const data = await getCategories();

            set({
                categories: data,
                loading: false,
                hasFetched: true,
            });

            return data;

        } catch (error) {
            console.log(
                "FETCH CATEGORIES ERROR:",
                error?.message || error
            );


            set({
                loading: false,
            });

            return null;
        }
    },

    // ADD CATEGORY
    addCategory: async (category) => {
        const data = await createCategory(category);

        set((state) => ({
            categories: [
                ...state.categories,
                data,
            ],
        }));

        return data;
    },

    // UPDATE CATEGORY
    editCategory: async (id, category) => {
        const data = await updateCategory(id, category);

        set((state) => ({
            categories: state.categories.map((item) =>
                item.id === id ? data : item
            ),
        }));

        return data;
    },

    // REMOVE CATEGORY
    removeCategory: async (category) => {
        const categoryId =
            typeof category === "object"
                ? category?.id
                : category;

        if (!categoryId) {
            throw new Error(
                "Category ID is required."
            );
        }

        await deleteCategory(categoryId);

        set((state) => ({
            categories: state.categories.filter(
                (item) => item.id !== categoryId
            ),
        }));
    },
}));