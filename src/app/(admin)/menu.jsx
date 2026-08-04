
import { router } from "expo-router";
import { useEffect } from "react";
import {
    FlatList,
    Image,
    View
} from "react-native";

import AppButton from "../../../components/AppButton";
import Loader from "../../../components/Loading";
import renderPizzaMenu from "../../../components/pizza/renderPizzaMenu";
import styles from "../../../styles/menu.style";

import NotFound from "../../../components/NotFound";
import { usePizzaStore } from "../../../store/admin/pizzaStore";


const Menu = () => {
    const { pizzas, fetchPizzas, removePizza, loading } = usePizzaStore();


    useEffect(() => {
        fetchPizzas();
    }, []);


    const handleDelete = async (id) => {
        await removePizza(id);
    }

    const handleEdit = (pizza) => {
        console.log("EDIT PIZZA:", pizza);
        // later navigate to edit screen
    };

    if (loading) {
        return <Loader />;
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                {/* HEADER */}

                <View style={styles.header}>

                    <Image
                        source={require("../../../assets/images/app-images/logo-header.png")}
                        style={styles.logo}
                    />


                    <AppButton
                        title="Add Pizza"
                        icon="pizza"
                        onPress={() => router.push("/(admin)/addPizza")}
                    />

                </View>



                {/* PIZZA LIST */}

                <FlatList
                    data={pizzas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        renderPizzaMenu({
                            item,
                            onDelete: handleDelete,
                            onEdit: handleEdit
                        })
                    }
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