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

    /*
       CREATE */

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


    /*
       UPDATE
   = */

    const update = async (id, category) => {
        try {
            setActionLoading(true);

            await editCategory(id, category);

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


    /*  DELETE*/

    const remove = async (id) => {
        try {
            setActionLoading(true);

            await removeCategory(id);

            return true;
        } catch (error) {
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