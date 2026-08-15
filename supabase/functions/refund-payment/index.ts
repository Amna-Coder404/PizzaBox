import Stripe from "npm:stripe@22";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
}

const stripe = new Stripe(stripeSecretKey);

Deno.serve(async (req: Request) => {
    try {
        // Only allow POST requests
        if (req.method !== "POST") {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Method not allowed",
                }),
                {
                    status: 405,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Get Payment Intent ID
        const { paymentIntentId } = await req.json();

      

        // Validate Payment Intent ID
        if (!paymentIntentId) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Payment Intent ID is required.",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // --------------------------------------------------
        // CHECK IF PAYMENT IS ALREADY REFUNDED
        // --------------------------------------------------

        const existingRefunds = await stripe.refunds.list({
            payment_intent: paymentIntentId,
            limit: 10,
        });

        console.log(
            "EXISTING REFUNDS:",
            existingRefunds.data
        );

        const successfulRefund = existingRefunds.data.find(
            (refund) => refund.status === "succeeded"
        );

        // Already refunded
        if (successfulRefund) {
            console.log(
                "PAYMENT ALREADY REFUNDED:",
                successfulRefund.id
            );

            return new Response(
                JSON.stringify({
                    success: true,
                    alreadyRefunded: true,
                    refundId: successfulRefund.id,
                    status: successfulRefund.status,
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // --------------------------------------------------
        // CREATE NEW REFUND
        // --------------------------------------------------

        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
        });

        console.log(
            "NEW REFUND CREATED:",
            refund.id
        );

        return new Response(
            JSON.stringify({
                success: true,
                alreadyRefunded: false,
                refundId: refund.id,
                status: refund.status,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {
        console.error(
            "REFUND ERROR:",
            error
        );

        const message =
            error instanceof Error
                ? error.message
                : "Refund failed.";

        return new Response(
            JSON.stringify({
                success: false,
                error: message,
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
});