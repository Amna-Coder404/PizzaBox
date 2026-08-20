import { create } from "zustand";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory
} from "../../services/category";

export const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,

    // FETCH CATEGORIES
    fetchCategories: async () => {
        set({ loading: true });

        try {
            const data = await getCategories();
            set({
                categories: data,
                loading: false,
            });
        } catch (error) {
            set({ loading: false });
        }
    },


    // ADD CATEGORY
    addCategory: async (category) => {

        const data = await createCategory(category);
        set((state) => ({
            categories: [...state.categories, data],
        }));

    },

    // update CATEGORY
    editCategory: async (id, category) => {

        const data = await updateCategory(id, category);
        set((state) => ({
            categories: state.categories.map((item) =>
                item.id === id ? data : item
            ),
        }));


    },

    removeCategory: async (category) => {
        const categoryId =
            typeof category === "object"
                ? category?.id
                : category;

        if (!categoryId) {
            throw new Error("Category ID is required.");
        }

        await deleteCategory(categoryId);

        set((state) => ({
            categories: state.categories.filter(
                (item) => item.id !== categoryId
            ),
        }));
    },
}))