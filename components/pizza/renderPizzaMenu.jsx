import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../constants/color';
import styles from "../../styles/menu.style";

const renderPizzaMenu = ({ item, onDelete, onEdit }) => {
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
                    ${item.small_price}
                </Text>

            </View>

            {/* RIGHT */}
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item.id)}>
                    <Ionicons name='trash' size={23} color={COLORS.error} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item)}>
                    <Ionicons name='pencil-outline' size={23} color={COLORS.white} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default renderPizzaMenu