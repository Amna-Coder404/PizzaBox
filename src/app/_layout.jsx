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
import { getProfile } from "../../services/profile";
import useAuthStore from "../../store/authStore";

const RootLayout = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const {
    setSession,
    setProfile,
  } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        /*
         * IMPORTANT:
         * If getSession fails because there is no internet,
         * do NOT treat it as logout.
         */
        if (error) {
          console.log(
            "Could not check Supabase session:",
            error.message
          );

          /*
           * Supabase may already have restored the session
           * locally. Do not destroy our auth state just
           * because the network is unavailable.
           */
          setLoading(false);
          return;
        }

        // --------------------------------------------------
        // NO SESSION
        // --------------------------------------------------
        if (!session) {
          setSession(null);
          setProfile(null);

          router.replace("/(auth)");

          return;
        }

        // --------------------------------------------------
        // SESSION EXISTS
        // --------------------------------------------------
        setSession(session);

        /*
         * Try to load profile.
         *
         * If this fails because we're offline, don't log out.
         */
        try {
          const profile = await getProfile(session.user.id);

          if (!mounted) return;

          // --------------------------------------------------
          // PROFILE DOES NOT EXIST
          // --------------------------------------------------
          if (!profile) {
            console.log(
              "PROFILE NOT FOUND:",
              session.user.id
            );

            /*
             * IMPORTANT:
             * Don't immediately sign out here.
             *
             * A failed profile request can happen because
             * of network problems.
             */
            setLoading(false);
            return;
          }

          // --------------------------------------------------
          // PROFILE EXISTS
          // --------------------------------------------------
          setProfile(profile);

          if (profile.role === "admin") {
            router.replace("/(admin)");
          } else {
            router.replace("/(customer)");
          }
        } catch (profileError) {
          console.log(
            "PROFILE FETCH ERROR:",
            profileError?.message || profileError
          );

          /*
           * Keep the existing session.
           * Do NOT redirect to login.
           * Do NOT sign out.
           */
        }
      } catch (error) {
        console.log(
          "AUTH INITIALIZATION ERROR:",
          error?.message || error
        );

        /*
         * IMPORTANT:
         * Network/auth initialization failure is NOT the
         * same thing as SIGNED_OUT.
         *
         * Therefore:
         * - don't clear session
         * - don't clear profile
         * - don't navigate to login
         */
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // --------------------------------------------------
    // AUTH STATE LISTENER
    // --------------------------------------------------
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        // --------------------------------------------------
        // REAL LOGOUT
        // --------------------------------------------------
        if (event === "SIGNED_OUT") {
          setSession(null);
          setProfile(null);

          router.replace("/(auth)");
          return;
        }

        // --------------------------------------------------
        // TOKEN REFRESH
        // --------------------------------------------------
        if (
          event === "TOKEN_REFRESHED" &&
          session
        ) {
          setSession(session);
          return;
        }

        // --------------------------------------------------
        // LOGIN
        // --------------------------------------------------
        if (
          event === "SIGNED_IN" &&
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

  if (loading) {
    return <Loading />;
  }

  return (
    <StripeProvider
      publishableKey={
        process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
      }
    >
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(customer)" />
              <Stack.Screen name="(admin)" />
              <Stack.Screen name="pizza/[id]" />
            </Stack>

            <InternetBanner />
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </StripeProvider>
  );
};

export default RootLayout;