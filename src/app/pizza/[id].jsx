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
import PizzaOrderPayment from '../../../components/payment/PizzaOrderPayment';
import { createOrder } from '../../../services/order';
import useAuthStore from '../../../store/authStore';
import useCartStore from "../../../store/cartStore";


const PizzaDetail = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCartStore();
    const { fetchPizzaById, selectedPizza, loading } = useCustomerPizzaStore();

    const { profile } = useAuthStore();
    const [selectedSize, setSelectedSize] = useState("small");
    const [quantity, setQuantity] = useState(1);


    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("stripe");

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
            delivery_address: profile.address,
            quantity,
        });

        router.push("/(customer)/cart");
    }


    const totalPrice = getPrice() * quantity;
    const sizes = ["small", "medium", "large"];

    const handleDirectOrder = async () => {
        try {
            if (!profile?.address?.trim()) {
                Alert.alert(
                    "Delivery Address Required",
                    "Please add your delivery address before placing an order.",
                    [
                        {
                            text: "Add Address",
                            onPress: () => {
                                router.push("/(customer)/profile");
                            },
                        },
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ]
                );

                return;
            }

            const deliveryFee = 200;
            const total = totalPrice + deliveryFee;

            // STRIPE PAYMENT
            if (paymentMethod === "stripe") {
                const clientSecret = await createPaymentIntent(total);

                const { error: initError } = await initPaymentSheet({
                    merchantDisplayName: "PizzaBox",
                    paymentIntentClientSecret: clientSecret,
                    allowsDelayedPaymentMethods: false,
                });

                if (initError) {
                    console.log("PAYMENT SHEET ERROR:", initError);

                    Alert.alert(
                        "Payment Error",
                        initError.message
                    );

                    return;
                }

                const { error: paymentError } =
                    await presentPaymentSheet();

                if (paymentError) {
                    console.log("PAYMENT ERROR:", paymentError);

                    return;
                }
            }

            // ORDER DATA
            const orderData = {
                total_price: total,
                delivery_fee: deliveryFee,
                order_status: "pending",

                // Stripe = already paid
                // COD = paid when delivered
                payment_status:
                    paymentMethod === "stripe"
                        ? "paid"
                        : "unpaid",

                payment_method: paymentMethod,

                delivery_address: profile.address,
            };

            const orderItem = {
                id: selectedPizza.id,
                name: selectedPizza.name,
                size: selectedSize,
                quantity: quantity,
                price: getPrice(),
            };



            await createOrder(orderData, [orderItem]
            );

            Alert.alert(
                "Order Confirmed 🎉",
                `Your order has been placed successfully!\n\nTotal: $${total}`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.replace("/(customer)");
                        },
                    },
                ]
            );

            setShowPayment(false);

        } catch (error) {
            Alert.alert("Order Failed", error?.message || "Something went wrong. Please try again.");
        }
    };
    if (showPayment) {
        return (
            <PizzaOrderPayment
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onOrder={handleDirectOrder}
                onBack={() => setShowPayment(false)}
            />
        );
    }

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
                                ]} >
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
                    <Text style={styles.priceLabel}>Price  </Text>
                    <Text style={styles.price}>  ${getPrice()} </Text>
                </View>


                <View style={styles.quantityBox}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} >
                        <Ionicons name="remove-circle" size={38} color={COLORS.primary} />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>
                        {quantity}
                    </Text>

                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Ionicons name="add-circle" size={38} color={COLORS.primary} />
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
                        <AppButton
                            title="Order"
                            icon="card"
                            onPress={() => setShowPayment(true)}
                        />
                    </View>
                </View>

            </View>

        </ScrollView>
    )
}


export default PizzaDetail