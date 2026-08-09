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

    if (!data?.clientSecret) {
        throw new Error("Payment client secret was not returned.");
    }

    return data.clientSecret;
}