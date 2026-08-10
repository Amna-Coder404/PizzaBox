import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Image, View } from "react-native";

import PizzaCard from "../../../components/pizza/PizzaCard";
import AppSearchBar from "../../../components/SearchBar";
import COLORS from "../../../constants/color";
import { useCustomerPizzaStore } from "../../../store/customer/pizzaStore";
import styles from "../../../styles/customerHome.stlye";

const Home = () => {
    const { pizzas, fetchPizzas } = useCustomerPizzaStore();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        fetchPizzas();
    }, []);

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);

        if (showSearch) {
            setSearch("");
        }
    };

    // Filter pizzas based on search
    const filteredPizzas = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return pizzas;
        }

        return pizzas.filter((pizza) =>
            pizza.name?.toLowerCase().includes(query)
        );
    }, [pizzas, search]);

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/images/app-images/logo-header.png")}
                    style={styles.logo}
                />

                <View style={styles.rightIcons}>
                    <Ionicons
                        name={showSearch ? "close" : "search"}
                        size={24}
                        color={COLORS.text}
                        onPress={toggleSearch}
                    />

                    <Ionicons
                        name="notifications"
                        color={COLORS.text}
                        size={24}
                    />
                </View>
            </View>

            {/* SEARCH */}
            <AppSearchBar
                visible={showSearch}
                value={search}
                onChangeText={setSearch}
            />

            {/* CONTENT */}
            <FlatList
                data={filteredPizzas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PizzaCard pizza={item} />
                )}
                ListHeaderComponent={
                    <View style={styles.bannerContainer}>
                        <Image
                            source={require(
                                "../../../assets/images/banners/banner1.png"
                            )}
                            style={styles.bannerImage}
                        />
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

export default Home;