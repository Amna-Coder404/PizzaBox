import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import Loading from "../../components/Loading";
import InternetBanner from "../../components/NetInfo/NetworkBanner";

import { supabase } from "../../lib/supabase";
import useAuthStore from "../../store/authStore";

const RootLayout = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const setSession = useAuthStore(
    (state) => state.setSession
  );

  const setProfile = useAuthStore(
    (state) => state.setProfile
  );

  useEffect(() => {
    let mounted = true;

    /*
     * INITIAL AUTH CHECK
     *
     * This layout only checks authentication.
     * It does NOT check GPS/location.
     */
    const initializeAuth = async () => {
      try {
        console.log("AUTH CHECK START");

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.log(
            "AUTH CHECK ERROR:",
            error.message
          );

          setSession(null);
          setProfile(null);

          router.replace("/(auth)");

          return;
        }

        /*
         * No logged-in user
         */
        if (!session) {
          console.log("NO SESSION");

          setSession(null);
          setProfile(null);

          router.replace("/(auth)");

          return;
        }

        /*
         * User is logged in
         */
        console.log(
          "SESSION FOUND:",
          session.user.id
        );

        setSession(session);

      } catch (error) {
        console.log(
          "AUTH INITIALIZATION ERROR:",
          error?.message || error
        );

        if (!mounted) return;

        setSession(null);
        setProfile(null);

        router.replace("/(auth)");

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    /*
     * SUPABASE AUTH LISTENER
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        console.log(
          "AUTH EVENT:",
          event
        );

        /*
         * SIGNED OUT
         */
        if (event === "SIGNED_OUT") {
          setSession(null);
          setProfile(null);

          router.replace("/(auth)");

          return;
        }

        /*
         * SIGNED IN
         *
         * We only save the session here.
         *
         * Login/Signup will decide where
         * the user should go.
         */
        if (
          event === "SIGNED_IN" &&
          session
        ) {
          setSession(session);
        }

        /*
         * TOKEN REFRESH
         */
        if (
          event === "TOKEN_REFRESHED" &&
          session
        ) {
          setSession(session);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /*
   * Wait until authentication is checked.
   */
  if (loading) {
    return <Loading />;
  }

  return (
    <StripeProvider
      publishableKey={
        process.env
          .EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
      }
    >
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1 }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="(auth)"
              />

              <Stack.Screen
                name="(customer)"
              />

              <Stack.Screen
                name="(admin)"
              />

              <Stack.Screen
                name="location"
              />

              <Stack.Screen
                name="pizza/[id]"
              />
            </Stack>

            <InternetBanner />
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </StripeProvider>
  );
};

export default RootLayout;