import { Image, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import COLORS from "../../constants/color";
import styles from "../../styles/customerHome.stlye";

const PizzaCard = ({ pizza, onAddToCart }) => {

    return (
        <View style={styles.pizzaCard}>

            {/* IMAGE */}
            <Image
                source={{ uri: pizza.image_url }}
                style={styles.pizzaImage}
            />


            {/* DETAILS */}
            <View style={styles.pizzaInfo}>

                <Text style={styles.pizzaName}>
                    {pizza.name}
                </Text>


                <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {pizza.description}
                </Text>


                <Text style={styles.price}>
                    Rs ${pizza.small_price}
                </Text>

            </View>

            {/* ADD BUTTON */}
            <View style={styles.buttonContainer}>
                <IconButton
                    icon="cart-plus"
                    size={24}
                    iconColor={COLORS.primary}

                // onPress={() => onAddToCart?.(pizza)}
                />
            </View>


        </View>
    );
};


export default PizzaCard;