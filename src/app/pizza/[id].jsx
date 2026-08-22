import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import AppButton from "../../../components/AppButton";
import Loader from "../../../components/Loading";
import NoInternetModal from '../../../components/NetInfo/NoInternetModal';
import PizzaOrderPayment from '../../../components/payment/PizzaOrderPayment';

import COLORS from '../../../constants/color';

import useDirectOrder from "../../../hooks/useDirectOrder";
import useNetWorkStatus from '../../../hooks/useNetworkStatus';

import useAuthStore from '../../../store/authStore';
import useCartStore from "../../../store/cartStore";
import { useCustomerPizzaStore } from '../../../store/customer/pizzaStore';

import styles from "../../../styles/pizzaDetail.style";


const PizzaDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { addToCart } = useCartStore();
    const { profile } = useAuthStore();

    const { fetchPizzaById, selectedPizza, loading, clearSelectedPizza } = useCustomerPizzaStore();

    const [selectedSize, setSelectedSize] = useState("small");
    const [quantity, setQuantity] = useState(1);

    const [showOfflineModal, setShowOfflineModal] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const { isOnline } = useNetWorkStatus();

    useEffect(() => {
        if (!id) return;

        clearSelectedPizza();
        fetchPizzaById(id);
    }, [id]);


    const getPrice = () => {
        if (!selectedPizza) {
            return 0;
        }

        if (selectedSize === "medium") {
            return selectedPizza.medium_price;
        }

        if (selectedSize === "large") {
            return selectedPizza.large_price;
        }

        return selectedPizza.small_price;
    };

    const totalPrice = getPrice() * quantity;
    const deliveryFee = 200;
    const finalTotal = totalPrice + deliveryFee;


    const { handleDirectOrder, loading: directOrderLoading,
    } = useDirectOrder({
        selectedPizza, selectedSize, quantity, paymentMethod,
        deliveryFee,
        finalTotal,
        getPrice,
    });

    const handleOrderPress = () => {
        if (!isOnline) {
            setShowOfflineModal(true);
            return;
        }

        setShowPayment(true);
    };




    const handleAddToCart = () => {
        if (!selectedPizza) {
            return;
        }

        addToCart({
            cartId: `${selectedPizza.id}-${selectedSize}`,
            id: selectedPizza.id,
            name: selectedPizza.name,
            image_url: selectedPizza.image_url,
            size: selectedSize,
            price: getPrice(),
            delivery_address: profile?.address || "",
            quantity,
        });

        router.push("/(customer)/cart");
    };

    if (loading || !selectedPizza) {
        return <Loader />;
    }
    // payment screen
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
    const sizes = ["small", "medium", "large"];





    return (
        <>
            <ScrollView style={styles.container}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.primary}
                        />
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
                            {selectedPizza.categories?.name || "Uncategorized"}
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
                        {sizes.map(size => (
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
                        ))}
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

                    {/* QUANTITY */}
                    <View style={styles.quantityBox}>

                        <TouchableOpacity
                            onPress={() =>
                                setQuantity(Math.max(1, quantity - 1))
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
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <Ionicons
                                name="add-circle"
                                size={38}
                                color={COLORS.primary}
                            />
                        </TouchableOpacity>

                    </View>

                    {/* ORDER SUMMARY */}
                    <View style={styles.totalBox}>

                        <View style={styles.summaryRow}>
                            <Text style={styles.totalText}>
                                Pizza Price
                            </Text>

                            <Text style={styles.totalPrice}>
                                ${totalPrice}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.totalText}>
                                Delivery Fee
                            </Text>

                            <Text style={styles.totalPrice}>
                                ${deliveryFee}
                            </Text>
                        </View>

                        <View style={styles.summaryDivider} />

                        <View style={styles.summaryRow}>
                            <Text style={styles.finalTotalText}>
                                Total
                            </Text>

                            <Text style={styles.finalTotalPrice}>
                                ${finalTotal}
                            </Text>
                        </View>

                    </View>

                    {/* BUTTONS */}
                    <View style={styles.buttonContainer}>

                        <View style={styles.button}>
                            <AppButton
                                title="Add To Cart"
                                icon="cart"
                                onPress={handleAddToCart}
                            />
                        </View>

                        <View style={styles.button}>
                            <AppButton
                                title="Order"
                                icon="card"
                                onPress={handleOrderPress}
                            />
                        </View>

                    </View>

                </View>
            </ScrollView>

            <NoInternetModal
                visible={showOfflineModal}
                onClose={() => setShowOfflineModal(false)}
            />
        </>
    );
};

export default PizzaDetail;