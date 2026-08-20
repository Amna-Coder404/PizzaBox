import { useState } from "react";
import { Alert } from "react-native";

import { useCategoryStore } from "../store/admin/categoryStore";

const useCategoryCrud = () => {
    const {
        addCategory,
        editCategory,
        removeCategory,
    } = useCategoryStore();

    const [actionLoading, setActionLoading] = useState(false);

    // CREATE
    const create = async (category) => {
        try {
            setActionLoading(true);

            await addCategory(category);

            return true;
        } catch (error) {
            Alert.alert(
                "Error",
                error?.message || "Failed to create category."
            );

            return false;
        } finally {
            setActionLoading(false);
        }
    };

    // UPDATE
    const update = async (id, category) => {
        try {
            setActionLoading(true);

            const categoryId =
                typeof id === "object"
                    ? id?.id
                    : id;

            if (!categoryId) {
                throw new Error("Category ID is required.");
            }

            await editCategory(categoryId, category);

            return true;
        } catch (error) {
            Alert.alert(
                "Error",
                error?.message || "Failed to update category."
            );

            return false;
        } finally {
            setActionLoading(false);
        }
    };

    // DELETE
    const remove = async (category) => {
        try {
            setActionLoading(true);

            const categoryId =
                typeof category === "object"
                    ? category?.id
                    : category;

            if (!categoryId) {
                throw new Error("Category ID is required.");
            }

            console.log("DELETE CATEGORY ID:", categoryId);

            await removeCategory(categoryId);

            return true;
        } catch (error) {
            console.error("DELETE CATEGORY ERROR:", error);

            Alert.alert(
                "Error",
                error?.message || "Failed to delete category."
            );

            return false;
        } finally {
            setActionLoading(false);
        }
    };

    return {
        create,
        update,
        remove,
        actionLoading,
    };
};

export default useCategoryCrud;