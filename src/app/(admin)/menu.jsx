import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import CategoryList from "../../../components/category/CategoryList";
import CategoryModal from "../../../components/category/CategoryModal";
import Loader from "../../../components/Loading";
import NotFound from "../../../components/NotFound";
import PizzaModal from "../../../components/pizza/PizzaModal";
import renderPizzaMenu from "../../../components/pizza/renderPizzaMenu";

import useCategoryCrud from "../../../hooks/useCategoryCrud";

import { useCategoryStore } from "../../../store/admin/categoryStore";
import { usePizzaStore } from "../../../store/admin/pizzaStore";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/color";
import styles from "../../../styles/menu.style";

const Menu = () => {
    //    PIZZA STORE
    const { pizzas, fetchPizzas, removePizza, loading: pizzaLoading, } = usePizzaStore();

    //  CATEGORY STORE
    const { categories, fetchCategories, loading: categoryLoading,
    } = useCategoryStore();


    // CATEGORY CRUD
    const { remove: deleteCategory, actionLoading: categoryActionLoading, } = useCategoryCrud();

    // MODALS
    const [showPizzaModal, setShowPizzaModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // MODES
    const [pizzaMode, setPizzaMode] = useState("create");
    const [categoryMode, setCategoryMode] = useState("create");


    //    SELECTED ITEMS
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);


    //    FETCH DATA
    useEffect(() => {
        fetchPizzas();
        fetchCategories();
    }, []);


    //    PIZZA ACTIONS


    const handleDeletePizza = (id) => {
        Alert.alert(
            "Delete Pizza",
            "Are you sure you want to delete this pizza?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            await removePizza(id);
                        } catch (error) {
                            Alert.alert(
                                "Error",
                                error?.message ||
                                "Failed to delete pizza."
                            );
                        }
                    },
                },
            ]
        );
    };


    const handleEditPizza = (pizza) => {
        setSelectedPizza(pizza);
        setPizzaMode("edit");
        setShowPizzaModal(true);
    };

    // CATEGORY ACTIONS
    const handleAddCategory = () => {
        setSelectedCategory(null);
        setCategoryMode("create");
        setShowCategoryModal(true);
    };


    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setCategoryMode("edit");
        setShowCategoryModal(true);
    };


    const handleDeleteCategory = (id) => {
        Alert.alert(
            "Delete Category",
            "Are you sure you want to delete this category?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            await deleteCategory(id);
                        } catch (error) {
                            Alert.alert(
                                "Error",
                                error?.message ||
                                "Failed to delete category."
                            );
                        }
                    },
                },
            ]
        );
    };


    if (
        (pizzaLoading && pizzas.length === 0) ||
        (categoryLoading && categories.length === 0)
    ) {
        return <Loader />;
    }


    return (
        <View style={styles.container}>

            <View style={styles.content}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Image
                        source={require(
                            "../../../assets/images/app-images/logo-header.png"
                        )}
                        style={styles.logo}
                    />



                    <TouchableOpacity style={styles.addCategoryCard} onPress={() => {
                        setPizzaMode("create");
                        setSelectedPizza(null);
                        setShowPizzaModal(true);
                    }}>
                        <Ionicons
                            name="add"
                            size={20}
                            color={COLORS.primary}
                        />

                        <Text style={styles.addCategoryText}>
                            Add Pizza
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* CATEGORIES */}


                <CategoryList
                    categories={categories}
                    onAdd={handleAddCategory}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                    loading={categoryActionLoading}
                />



                {/* PIZZA LIST */}

                <FlatList
                    data={pizzas.filter(Boolean)}
                    keyExtractor={(item) =>
                        item.id.toString()
                    }
                    renderItem={({ item }) =>
                        renderPizzaMenu({
                            item,
                            onDelete: handleDeletePizza,
                            onEdit: handleEditPizza,
                        })
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        styles.listContent
                    }
                    ListEmptyComponent={
                        <NotFound
                            icon="pizza"
                            title="No Pizzas Found"
                            description="Your pizza menu is empty. Start adding pizzas from the admin panel."
                        />
                    }
                />

            </View>


            {/* PIZZA MODAL */}

            <PizzaModal
                visible={showPizzaModal}
                onClose={() => setShowPizzaModal(false)}
                mode={pizzaMode}
                pizza={selectedPizza}
            />

            {/* CATEGORY MODAL */}
            <CategoryModal
                visible={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                mode={categoryMode}
                category={selectedCategory}
            />

        </View>
    );
};

export default Menu;