
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/customerHome.stlye";

const PizzaCard = ({ pizza, onAddToCart }) => {
    const router = useRouter();

    return (
        <View style={styles.pizzaCard}>

            {/* IMAGE */}
            <Image
                source={{ uri: pizza.image_url }}
                style={styles.pizzaImage}
            />


            {/* DETAILS */}
            <View style={styles.pizzaInfo}>

                <Text
                    style={styles.pizzaName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {pizza.name}
                </Text>


                <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {pizza.description}
                </Text>


                <View style={styles.rightContent}>
                    <Text style={styles.price}>
                        ${pizza.small_price}
                    </Text>
                    {/* ORDER */}
                    <TouchableOpacity onPress={() => router.push(`/pizza/${pizza.id}`)} style={styles.orderBtn}>
                        <Text style={styles.btnText}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};


export default PizzaCard;