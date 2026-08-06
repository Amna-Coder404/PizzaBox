import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import AppSearchBar from '../../../components/SearchBar'
import COLORS from '../../../constants/color'
import { useCustomerPizzaStore } from '../../../store/customer/pizzaStore'
import styles from "../../../styles/customerHome.stlye"
import PizzaCard from "../../../components/pizza/PizzaCard";


const Home = () => {
    const { pizzas, fetchPizzas } = useCustomerPizzaStore()
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
    };

    useEffect(() => {
        fetchPizzas();
    }, []);


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
                    <Ionicons name='notifications' color={COLORS.text} size={24} />
                </View>

            </View>

            {/* SEARCH BAR */}
            <AppSearchBar
                visible={showSearch}
                value={search}
                onChangeText={setSearch}
            />

            {/* POSTER OF PIZZA S */}
            <View style={styles.bannerContainer}>
                <Image source={require("../../../assets/images/banners/banner1.png")} style={styles.bannerImage} />
            </View>

            {/* ORDER PIZZA CARDs */}
            <FlatList
                data={pizzas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PizzaCard pizza={item} />
                )}
            />
        </View>
    )
}

export default Home