import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppButton from "../../../components/AppButton";
import Loader from "../../../components/Loading";
import COLORS from '../../../constants/color';
import { createPaymentIntent } from "../../../services/payment";
import { useCustomerPizzaStore } from '../../../store/customer/pizzaStore';
import styles from "../../../styles/pizzaDetail.style";

import { useStripe } from '@stripe/stripe-react-native';
import { createOrder } from '../../../services/order';
import useCartStore from "../../../store/cartStore";

const PizzaDetail = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCartStore();
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

    const handleAddToCart = () => {
        addToCart({
            cartId: `${selectedPizza.id}-${selectedSize}`,
            id: selectedPizza.id,
            name: selectedPizza.name,
            image_url: selectedPizza.image_url,
            size: selectedSize,
            price: getPrice(),
            quantity,
        });

        router.push("/(customer)/cart");
    }


    const totalPrice = getPrice() * quantity;
    const sizes = ["small", "medium", "large"];

    const handleDirectOrder = async () => {
        try {
            const deliveryFee = 200;
            const total = totalPrice + deliveryFee;

            // 1. Create Stripe PaymentIntent
            const clientSecret = await createPaymentIntent(total);

            // 2. Initialize PaymentSheet
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: "PizzaBox",
                paymentIntentClientSecret: clientSecret,
                allowsDelayedPaymentMethods: false,
            });

            if (initError) {
                console.log("PAYMENT SHEET ERROR:", initError);
                return;
            }

            // 3. Open Stripe PaymentSheet
            const { error: paymentError } = await presentPaymentSheet();

            if (paymentError) {
                console.log("PAYMENT ERROR:", paymentError);
                return;
            }



            // 4. Order data
            const orderData = {
                total_price: total,
                delivery_fee: deliveryFee,
                order_status: "pending",
                payment_status: "paid",
            };

            console.log("ORDER DATA:", orderData);

            // 5. Selected pizza becomes the order item
            const orderItem = {
                id: selectedPizza.id,
                name: selectedPizza.name,
                size: selectedSize,
                quantity: quantity,
                price: getPrice(),
            };


            // 6. Create order
            const order = await createOrder(
                orderData,
                [orderItem]
            );


            // Success alert
            Alert.alert(
                "Order Confirmed 🎉",
                `Your order has been placed successfully!\n\nTotal: $${total}`,
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/(customer)"),
                    },
                ]
            );
        } catch (error) {
            Alert.alert("Order Failed",
                error?.message || "Something went wrong. Please try again."
            );
        }
    };
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
                        <AppButton title="Add To Cart" icon="cart" onPress={handleAddToCart} />
                    </View>
                    {/* TODO LATER : add payment methond using Strip */}
                    <View style={styles.button}>
                        <AppButton title="Order" icon="card" onPress={handleDirectOrder} />
                    </View>
                </View>

            </View>

        </ScrollView>
    )
}

export default PizzaDetail