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
        /*
         * IMPORTANT:
         * Get the persisted Supabase session directly.
         * Supabase restores the session from AsyncStorage internally.
         */
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!mounted) return;

        // --------------------------------------------------
        // NO SESSION
        // --------------------------------------------------
        if (!session) {
          setSession(null);
          setProfile(null);

          if (mounted) {
            router.replace("/(auth)");
          }

          return;
        }

        // --------------------------------------------------
        // SESSION EXISTS
        // --------------------------------------------------
        setSession(session);

        // Get user's profile
        const profile = await getProfile(session.user.id);

        if (!mounted) return;

        // --------------------------------------------------
        // SESSION EXISTS BUT PROFILE DOES NOT
        // --------------------------------------------------
        if (!profile) {
          console.log(
            "PROFILE NOT FOUND:",
            session.user.id
          );

          await supabase.auth.signOut();

          if (!mounted) return;

          setSession(null);
          setProfile(null);

          router.replace("/(auth)");
          return;
        }

        // --------------------------------------------------
        // PROFILE EXISTS
        // --------------------------------------------------
        setProfile(profile);

        // Navigate according to role
        if (profile.role === "admin") {
          router.replace("/(admin)");
        } else {
          router.replace("/(customer)");
        }

      } catch (error) {
        console.log("AUTH INITIALIZATION ERROR:", error);

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
     * Listen for future auth changes.
     *
     * IMPORTANT:
     * We DO NOT perform the initial routing here.
     * initializeAuth() already handles the initial session.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        // User explicitly logged out
        if (event === "SIGNED_OUT") {
          setSession(null);
          setProfile(null);

          router.replace("/(auth)");
          return;
        }

        // Session was refreshed
        if (
          event === "TOKEN_REFRESHED" &&
          session
        ) {
          setSession(session);
        }

        // New login
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