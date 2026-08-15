import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/color';
import styles from "../styles/profile.style";

const Aboutus = ({ onBack }) => {
    return (

        <View style={styles.aboutContainer}>
            <View style={styles.aboutusHeader}>
                <Text style={styles.aboutTitle}>
                    🍕 About PizzaBox
                </Text>
                <TouchableOpacity style={styles.backButton} onPress={onBack} >
                    <Ionicons name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>


            <Text style={styles.aboutText}>
                Welcome to PizzaBox! 👋
            </Text>

            <Text style={styles.aboutText}>
                PizzaBox is a simple and convenient pizza ordering
                app designed to make ordering your favorite pizzas
                quick, easy, and enjoyable.
            </Text>

            <Text style={styles.aboutText}>
                Browse our menu, choose your favorite pizza and size,
                add it to your cart, and place your order with ease.
            </Text>
            <Text style={styles.funText}>
                😂 Diet starts tomorrow.
            </Text>
            <Text style={styles.aboutText}>
                We aim to provide a smooth ordering experience while
                helping our restaurant manage orders efficiently.
            </Text>
            <Text style={styles.funText}>
                Made with code, coffee ☕, and a serious love for pizza.
            </Text>
            <Text style={styles.aboutFooter}>
                Thank you for choosing PizzaBox! ❤️
            </Text>
        </View>

    )
}

export default Aboutus