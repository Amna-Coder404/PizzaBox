import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import CategoryList from "../../../components/category/CategoryList";
import CategoryModal from "../../../components/category/CategoryModal";
import Loader from "../../../components/Loading";
import NoInternetModal from "../../../components/NetInfo/NoInternetModal";
import NotFound from "../../../components/NotFound";
import PizzaModal from "../../../components/pizza/PizzaModal";
import renderPizzaMenu from "../../../components/pizza/renderPizzaMenu";

import useCategoryCrud from "../../../hooks/useCategoryCrud";
import useNetWorkStatus from "../../../hooks/useNetworkStatus";

import COLORS from "../../../constants/color";

import { useCategoryStore } from "../../../store/admin/categoryStore";
import { usePizzaStore } from "../../../store/admin/pizzaStore";

import styles from "../../../styles/menu.style";

const Menu = () => {
    const { isOnline } = useNetWorkStatus();

    // PIZZA STORE
    const { pizzas, fetchPizzas, removePizza, } = usePizzaStore();

    // CATEGORY STORE

    const { categories, fetchCategories, } = useCategoryStore();

    // CATEGORY CRUD
    const { remove: deleteCategory, actionLoading: categoryActionLoading, } = useCategoryCrud();


    // MODALS
    const [showPizzaModal, setShowPizzaModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showNoInternetModal, setShowNoInternetModal] = useState(false);

    // MODES
    const [pizzaMode, setPizzaMode] = useState("create");
    const [categoryMode, setCategoryMode] = useState("create");

    // SELECTED ITEMS
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // INITIAL LOADING
    const [initialLoading, setInitialLoading] = useState(true);

    // FETCH DATA
    useEffect(() => {
        let mounted = true;
        const loadInitialData = async () => {
            // If offline, don't try to fetch
            if (!isOnline) {
                if (mounted) {
                    setInitialLoading(false);
                }

                return;
            }

            try {
                await Promise.all([
                    fetchPizzas(),
                    fetchCategories(),
                ]);
            } catch (error) {
                console.log(
                    "MENU INITIAL LOAD ERROR:",
                    error
                );
            } finally {
                if (mounted) {
                    setInitialLoading(false);
                }
            }
        };

        loadInitialData();

        return () => {
            mounted = false;
        };
    }, [isOnline]);

    // ADD PIZZA

    const handleAddPizza = () => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }

        setPizzaMode("create");
        setSelectedPizza(null);
        setShowPizzaModal(true);
    };

    // ADD CATEGORY
    const handleAddCategory = () => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }
        setSelectedCategory(null);
        setCategoryMode("create");
        setShowCategoryModal(true);
    };

    // DELETE PIZZA

    const handleDeletePizza = (id) => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }

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

    // EDIT PIZZA

    const handleEditPizza = (pizza) => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }

        setSelectedPizza(pizza);
        setPizzaMode("edit");
        setShowPizzaModal(true);
    };

    // EDIT CATEGORY
    const handleEditCategory = (category) => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }

        setSelectedCategory(category);
        setCategoryMode("edit");
        setShowCategoryModal(true);
    };

    // DELETE CATEGORY
    const handleDeleteCategory = (id) => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }

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

    // INITIAL LOADER ONLY
    if (initialLoading) {
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

                    <TouchableOpacity
                        style={styles.addCategoryCard}
                        onPress={handleAddPizza} >
                        <Ionicons name="add" size={20} color={COLORS.primary} />

                        <Text style={styles.addCategoryText} >
                            Add Pizza
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* CATEGORIES */}

                <View style={styles.cateContainer}>

                    {categories.length === 0 && (
                        <View style={styles.noCategoryMessage}  >
                            <Text style={styles.noCategoryText}  >
                                {isOnline
                                    ? "No categories yet."
                                    : "No Internet Connection"}
                            </Text>

                            <Text style={styles.noCategoryText} >
                                {isOnline
                                    ? "Please add a category first."
                                    : null}
                            </Text>
                        </View>
                    )}

                    <CategoryList
                        categories={categories}
                        onAdd={handleAddCategory}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        loading={categoryActionLoading}
                    />

                </View>

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
                    contentContainerStyle={styles.listContent}

                    ListEmptyComponent={
                        <NotFound
                            icon={isOnline ? "pizza" : "wifi-off"}
                            title={isOnline ? "No Pizzas Found" : "No Internet Connection"}

                            description={
                                isOnline ? "Your pizza menu is empty. Start adding pizzas from the admin panel."
                                    : "Connect to the internet to load your menu."
                            }
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

            {/* NO INTERNET MODAL */}

            <NoInternetModal
                visible={showNoInternetModal}
                onClose={() => setShowNoInternetModal(false)}
            />

        </View>
    );
};

export default Menu;