import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView, } from "react-native-safe-area-context";

import Loading from "../../components/Loading";
import { supabase } from "../../lib/supabase";
import { checkSession } from "../../services/auth";
import { getProfile } from "../../services/profile";

import InternetBanner from "../../components/NetInfo/NetworkBanner";
import useAuthStore from "../../store/authStore";


const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();

  const [loading, setLoading] = useState(true);

  const { setSession, setProfile, } = useAuthStore();

  useEffect(() => {
    checkAuth();

    const { data: { subscription }, } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        // User logged out
        if (event === "SIGNED_OUT") {
          setSession(null);
          setProfile(null);

          router.replace("/(auth)");
          return;
        }

        // Ignore signup event here.
        // Signup itself creates the profile and updates Zustand.
        if (event === "SIGNED_IN") {
          return;
        }

        // Handle token refresh
        if (event === "TOKEN_REFRESHED" && session) {
          setSession(session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await checkSession();

      const currentGroup = segments[0];

      // No logged-in user
      if (!session) {
        if (currentGroup !== "(auth)") {
          router.replace("/(auth)");
        }

        return;
      }

      // Store session
      setSession(session);

      // Fetch profile
      const profile = await getProfile(session.user.id);

      if (!profile) {
        console.log("PROFILE NOT FOUND:", session.user.id);
        return;
      }

      setProfile(profile);

      // Admin
      if (profile.role === "admin") {
        if (currentGroup !== "(admin)") {
          router.replace("/(admin)");
        }

        return;
      }

      // Customer
      const allowedCustomerRoutes = [
        "(customer)",
        "pizza",
      ];

      if (!allowedCustomerRoutes.includes(currentGroup)) {
        router.replace("/(customer)");
      }

    } catch (error) {
      console.log("AUTH ERROR:", error);

      router.replace("/(auth)");

    } finally {
      setLoading(false);
    }
  };

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