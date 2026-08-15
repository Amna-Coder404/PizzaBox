import { supabase } from "../lib/supabase";

export const createPaymentIntent = async (amount) => {
    const { data, error } = await supabase.functions.invoke(
        "create-payment-intent",
        {
            body: {
                // Stripe expects the smallest currency unit (like in the from of pasia)
                // Rs. 1000 → 100000
                amount: Math.round(amount * 100),
                currency: "pkr"
            }
        }
    )

    if (error) {
        console.error("PAYMENT INTENT ERROR:", error);
        throw error;
    }

    if (!data?.clientSecret || !data?.paymentIntentId) {
        throw new Error("Payment information was not returned.");
    }

    return {
        clientSecret: data.clientSecret,
        paymentIntentId: data.paymentIntentId,
    };
}


// Refund Payment
// Used when a customer cancels a paid Stripe order.

export const refundPayment = async (paymentIntentId) => {
    if (!paymentIntentId) {
        throw new Error("Payment Intent ID is required.");
    }

    const { data, error } = await supabase.functions.invoke(
        "refund-payment",
        {
            body: {
                paymentIntentId,
            },
        }
    );



    if (error) {
        let errorBody = null;

        try {
            if (error.context) {
                errorBody = await error.context.json();
            }
        } catch (parseError) {
            console.log(
                "Could not parse refund error:",
                parseError
            );
        }

        console.log(
            "REFUND EDGE FUNCTION ERROR:",
            errorBody
        );

        throw new Error(
            errorBody?.error ||
            error.message ||
            "Refund failed."
        );
    }

    if (!data?.success) {
        throw new Error(
            data?.error ||
            "Refund failed."
        );
    }

    return data;
};