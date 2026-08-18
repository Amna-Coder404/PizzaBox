import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, } from "react-native";

import COLORS from "../../constants/color";
import { useCategoryStore } from "../../store/admin/categoryStore";
import styles from "../../styles/categoryModal.style";

const CategoryModal = ({ visible, onClose, mode = "create", category = null,
}) => {
    const { addCategory, editCategory } = useCategoryStore();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setName(mode === "edit" && category ? category.name : "");
        }
    }, [visible, mode, category]);

    const handleSubmit = async () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            Alert.alert("Required", "Please enter a category name.");
            return;
        }

        setLoading(true);

        try {
            if (mode === "edit") {
                await editCategory(category.id, {
                    name: trimmedName,
                });
            } else {
                await addCategory({
                    name: trimmedName,
                });
            }

            setName("");
            onClose();
        } catch (error) {
            Alert.alert(
                "Error",
                error?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {mode === "edit" ? "Edit Category" : "Add Category"}
                        </Text>

                        <TouchableOpacity onPress={onClose} style={styles.closeButton}  >
                            <Ionicons name="close" size={22} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>

                    {/* INPUT */}
                    <Text style={styles.label}>
                        Category Name
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. Chicken"
                        placeholderTextColor={COLORS.muted}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    {/* BUTTON */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        style={[styles.submitButton,
                        loading && styles.disabledButton,
                        ]}>
                        <Text style={styles.submitText}>
                            {loading
                                ? "Saving..."
                                : mode === "edit"
                                    ? "Update Category"
                                    : "Add Category"}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default CategoryModal;