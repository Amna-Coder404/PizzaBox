import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import COLORS from '../../constants/color';
import styles from "../../styles/menu.style";
import AppButton from '../AppButton';

const renderPizzaMenu = ({ item }) => {
    return (
        <View style={styles.pizzaCard}>
            <Image
                source={{ uri: item.image_url }}
                style={styles.pizzaImage}
            />



            <View style={styles.pizzaInfo}>

                <View>

                    <Text style={styles.pizzaName}>
                        {item.name}
                    </Text>
                    <View style={styles.statusRow}>
                        <View style={[styles.statusDot, { backgroundColor: item.available ? COLORS.success : COLORS.error }]} />

                        <Text style={
                            item.available
                                ? styles.availableText
                                : styles.unavailableText
                        }> {item.available ? "Available" : "Unavailable"}</Text>
                    </View>
                    <Text
                        numberOfLines={2}
                        style={styles.description}
                    >
                        {item.description}
                    </Text>
                </View>
                <Text style={styles.price}>
                    Rs. {item.small_price}
                </Text>

            </View>

            {/* RIGHT */}
            <AppButton
                title={"SEE"}
                onPress={() => console.log("Button are press")} style={styles.addIconButton} />


        </View>
    )
}

export default renderPizzaMenu