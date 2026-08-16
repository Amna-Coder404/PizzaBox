import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

import Loader from "../../../components/Loading";
import NotFound from "../../../components/NotFound";
import PizzaCard from "../../../components/pizza/PizzaCard";
import AppSearchBar from "../../../components/SearchBar";
import COLORS from "../../../constants/color";
import useSearch from "../../../hooks/useSearch";
import { useCustomerPizzaStore } from "../../../store/customer/pizzaStore";
import styles from "../../../styles/customerHome.stlye";

const Home = () => {
    const { pizzas, loading, fetchPizzas } = useCustomerPizzaStore();

    const [showSearch, setShowSearch] = useState(false);

    const { searchQuery, setSearchQuery, filteredData, } = useSearch(pizzas, ["name", "category"]);

    useEffect(() => {
        fetchPizzas();
    }, []);

    const toggleSearch = () => {
        setShowSearch((prev) => {
            const nextValue = !prev;

            if (!nextValue) {
                setSearchQuery("");
            }

            return nextValue;
        });
    };


    const isSearching = searchQuery.trim().length > 0;
    if (loading && pizzas.length === 0) {
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
                    <Ionicons
                        name={showSearch ? "close" : "search"}
                        size={24}
                        color={COLORS.text}
                        onPress={toggleSearch}
                    />


                </View>
            </View>

            {/* SEARCH */}
            <AppSearchBar
                visible={showSearch}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search pizzas..."
            />

            {/* CONTENT */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PizzaCard pizza={item} />
                )}
                ListHeaderComponent={
                    !isSearching ? (<View style={styles.bannerContainer}>
                        <Image
                            source={require(
                                "../../../assets/images/banners/banner1.png"
                            )}
                            style={styles.bannerImage}
                        />
                    </View>) : null

                } ListEmptyComponent={
                    isSearching ? (
                        <NotFound
                            icon="magnify"
                            title="No Pizzas Found"
                            description={`No pizzas match "${searchQuery}".`}
                        />
                    ) : (
                        <NotFound
                            icon="pizza"
                            title="No Pizzas Available"
                            description="There are no pizzas available right now."
                        />
                    )
                }
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

export default Home;