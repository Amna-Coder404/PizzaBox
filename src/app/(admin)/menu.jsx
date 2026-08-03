import {
    FlatList,
    Image,
    View
} from "react-native";

import { router } from "expo-router";
import { useEffect } from "react";

import styles from "../../../styles/menu.style";

import AppButton from "../../../components/AppButton";
import renderPizzaMenu from "../../../components/pizza/renderPizzaMenu";

import NotFound from "../../../components/NotFound";
import { usePizzaStore } from "../../../store/admin/pizzaStore";


const Menu = () => {
    const { pizzas, fetchPizzas } = usePizzaStore();



    useEffect(() => {
        fetchPizzas();
    }, []);

    const handleAddPizza = () => {
        router.push("/(admin)/addPizza");
    };


    return (
        <View style={styles.container}>
            <View style={styles.content}>

                {/* HEADER */}

                <View style={styles.header}>

                    <Image
                        source={require("../../../assets/images/app-images/logo.png")}
                        style={styles.logo}
                    />


                    <AppButton
                        title="Add Pizza"
                        icon="pizza"
                        onPress={handleAddPizza}
                    />

                </View>



                {/* PIZZA LIST */}

                <FlatList
                    data={pizzas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderPizzaMenu}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <NotFound
                            icon="pizza"
                            title="No Pizzas Found"
                            description="Your pizza menu is empty. Start adding pizzas from the admin panel."
                        />
                    }
                />
            </View>


        </View>

    );

};


export default Menu;