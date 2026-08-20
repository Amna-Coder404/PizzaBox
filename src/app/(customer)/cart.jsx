import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import CartPager from "../../../components/cart/CartPager";
import NoInternetModal from "../../../components/NetInfo/NoInternetModal";
import useCheckout from "../../../hooks/useCheckout";
import useCartStore from "../../../store/cartStore";

const Cart = () => {
    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const { cart } = useCartStore();
    const { page = "cart" } = useLocalSearchParams();

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const deliveryFee = cart.length > 0 ? 200 : 0;
    const total = subtotal + deliveryFee;

    const { handleCheckout, showOfflineModal, setShowOfflineModal } = useCheckout({ total, deliveryFee, paymentMethod, });

    return (
        <>
            <CartPager
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onCheckout={handleCheckout}
                initialPage={page === "orders" ? "orders" : "cart"}
            />
            <NoInternetModal
                visible={showOfflineModal}
                onClose={() => setShowOfflineModal(false)}
            />
        </>
    );
};

export default Cart;