import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Loader from "../../../components/Loading";
import NotFound from "../../../components/NotFound";
import PizzaCard from "../../../components/pizza/PizzaCard";
import AppSearchBar from "../../../components/SearchBar";

import COLORS from "../../../constants/color";
import useNetWorkStatus from "../../../hooks/useNetworkStatus";
import useSearch from "../../../hooks/useSearch";

import { useCategoryStore } from "../../../store/admin/categoryStore";
import { useCustomerPizzaStore } from "../../../store/customer/pizzaStore";

import styles from "../../../styles/customerHome.stlye";

const Home = () => {
    const { isOnline } = useNetWorkStatus();

    // PIZZA STORE
    const { pizzas, loading, fetchPizzas, } = useCustomerPizzaStore();

    // CATEGORY STORE
    const { categories, fetchCategories, } = useCategoryStore();

    const [showSearch, setShowSearch] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);

    // null = All Categories
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { searchQuery, setSearchQuery, filteredData, } = useSearch(pizzas, ["name"]);

    // FETCH DATA

    useEffect(() => {
        // Do NOT try to fetch while offline
        if (!isOnline) return;

        // When internet comes back,
        // fetch fresh data again.
        fetchPizzas();
        fetchCategories();
    }, [isOnline]);


    // SEARCH
    const toggleSearch = () => {
        setShowSearch((prev) => {
            const nextValue = !prev;

            if (!nextValue) {
                setSearchQuery("");
            }

            return nextValue;
        });
    };

    // CATEGORY FILTER

    const toggleCategoryFilter = () => {
        setShowCategoryFilter((prev) => !prev);
    };

    // FILTER PIZZAS

    const filteredPizzas =
        selectedCategory === null
            ? filteredData
            : filteredData.filter(
                (pizza) =>
                    pizza.category_id === selectedCategory
            );

    const isFiltering =
        searchQuery.trim().length > 0 ||
        selectedCategory !== null;

    // INITIAL LOADING

    /*
     * Only show Loader when we are actually loading
     * data and there is no previously loaded data.
     *
     * If internet is off and pizzas already exist,
     * keep showing those pizzas.
     */
    if (
        isOnline &&
        loading &&
        pizzas.length === 0
    ) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>

                <Image
                    source={require(
                        "../../../assets/images/app-images/logo-header.png"
                    )}
                    style={styles.logo}
                />

                <View style={styles.rightIcons}>

                    {/* SEARCH */}

                    <TouchableOpacity
                        onPress={toggleSearch}
                        disabled={!isOnline}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={
                                showSearch
                                    ? "close"
                                    : "search"
                            }
                            size={24}
                            color={
                                isOnline
                                    ? COLORS.text
                                    : COLORS.muted
                            }
                        />
                    </TouchableOpacity>

                    {/* CATEGORY FILTER */}

                    {
                        pizzas.length > 0 && (
                            <TouchableOpacity
                                onPress={toggleCategoryFilter}
                                disabled={!isOnline}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name={showCategoryFilter ? "close" : "options-outline"}
                                    size={24}
                                    color={isOnline ? COLORS.text : COLORS.muted}
                                />
                            </TouchableOpacity>
                        )
                    }

                </View>
            </View>

            {/* SEARCH */}

            <AppSearchBar
                visible={showSearch}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search pizzas..."
            />

            {/* CATEGORY FILTER */}

            {showCategoryFilter && isOnline && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                    contentContainerStyle={
                        styles.categoryContainer
                    }
                >

                    {/* ALL */}

                    <TouchableOpacity
                        onPress={() => setSelectedCategory(null)}
                        style={[
                            styles.categoryChip,
                            selectedCategory === null &&
                            styles.activeCategoryChip,
                        ]}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === null &&
                                styles.activeCategoryText,
                            ]}
                        >
                            All
                        </Text>
                    </TouchableOpacity>

                    {/* CATEGORIES */}

                    {categories.map((category) => {

                        const isActive = selectedCategory === category.id;

                        return (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => setSelectedCategory(category.id)}
                                style={[
                                    styles.categoryChip,
                                    isActive &&
                                    styles.activeCategoryChip,
                                ]} >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        isActive &&
                                        styles.activeCategoryText,
                                    ]}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                </ScrollView>
            )}

            {/* PIZZA LIST */}

            <FlatList
                data={filteredPizzas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PizzaCard pizza={item} />
                )}

                //   OFFLINE / EMPTY STATE
                ListEmptyComponent={
                    !isOnline ? (
                        <NotFound
                            icon="wifi-off"
                            title="No Internet Connection"
                            description="Connect to the internet to load pizzas."
                        />
                    ) : isFiltering ? (
                        <NotFound
                            icon="magnify"
                            title="No Pizzas Found"
                            description={
                                searchQuery.trim()
                                    ? `No pizzas match "${searchQuery}".`
                                    : "No pizzas found in this category."
                            }
                        />
                    ) : (
                        <NotFound
                            icon="pizza"
                            title="No Pizzas Available"
                            description="There are no pizzas available right now."
                        />
                    )
                }

                contentContainerStyle={{ paddingBottom: 20, }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

export default Home;