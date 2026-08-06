import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import AppButton from "../../../components/AppButton";
import Loader from "../../../components/Loading";
import COLORS from '../../../constants/color';
import { useCustomerPizzaStore } from '../../../store/customer/pizzaStore';
import styles from "../../../styles/pizzaDetail.style";


const PizzaDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { fetchPizzaById, selectedPizza, loading } = useCustomerPizzaStore();


    const [selectedSize, setSelectedSize] = useState("small");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            fetchPizzaById(id);
        }
    }, [id]);

    if (loading || !selectedPizza) return <Loader />;

    const getPrice = () => {
        if (selectedSize === "medium") {
            return selectedPizza.medium_price;
        }
        if (selectedSize === "large") {
            return selectedPizza.large_price;
        }

        return selectedPizza.small_price;
    }

    const totalPrice = getPrice() * quantity;
    const sizes = ["small", "medium", "large"];

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color={COLORS.primary} />
                </TouchableOpacity>


            </View>
            {/* IMAGE */}
            <Image
                source={{
                    uri: selectedPizza.image_url
                }}
                style={styles.image}
            />
            {/* CONTENT */}
            <View style={styles.content}>
                <Text style={styles.name}>
                    {selectedPizza.name}
                </Text>


                <View style={styles.categoryBox}>
                    <Text style={styles.category}>
                        {selectedPizza.categories?.name}
                    </Text>
                </View>

                <Text style={styles.description}>
                    {selectedPizza.description}
                </Text>

                {/* SIZE */}
                <Text style={styles.sectionTitle}>
                    Select Size
                </Text>

                <View style={styles.sizeRow}>
                    {
                        sizes.map(size => (
                            <TouchableOpacity
                                key={size}
                                onPress={() => setSelectedSize(size)}
                                style={[
                                    styles.sizeButton,
                                    selectedSize === size &&
                                    styles.activeSize
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.sizeText,
                                        selectedSize === size &&
                                        styles.activeSizeText
                                    ]}
                                >
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                {/* PRICE */}
                <View style={styles.priceBox}>

                    <Text style={styles.priceLabel}>
                        Price
                    </Text>

                    <Text style={styles.price}>
                        ${getPrice()}
                    </Text>

                </View>

                <View style={styles.quantityBox}>


                    <TouchableOpacity
                        onPress={() =>
                            setQuantity(
                                Math.max(1, quantity - 1)
                            )
                        }
                    >
                        <Ionicons
                            name="remove-circle"
                            size={38}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>



                    <Text style={styles.quantity}>
                        {quantity}
                    </Text>



                    <TouchableOpacity
                        onPress={() =>
                            setQuantity(quantity + 1)
                        }
                    >
                        <Ionicons
                            name="add-circle"
                            size={38}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>


                </View>
                {/* TOTAL */}
                <View style={styles.totalBox}>

                    <Text style={styles.totalText}>
                        Total
                    </Text>

                    <Text style={styles.totalPrice}>
                        ${totalPrice}
                    </Text>
                </View>

                {/* CART BUTTON */}
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <AppButton title="Add To Cart" icon="cart" />
                    </View>
                    <View style={styles.button}>
                        <AppButton title="Add To Cart" icon="cart" />
                    </View>
                </View>

            </View>

        </ScrollView>
    )
}

export default PizzaDetail