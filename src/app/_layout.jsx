import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack, useRouter, useSegments } from "expo-router";
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
  const segments = useSegments();

  const [loading, setLoading] = useState(true);

  const initializeSession = useAuthStore(
    (state) => state.initializeSession
  );

  const setSession = useAuthStore(
    (state) => state.setSession
  );

  const setProfile = useAuthStore(
    (state) => state.setProfile
  );


  //  REDIRECT USER AFTER AUTH INITIALIZATION

  const navigateUser = (profile) => {
    if (!profile) {
      console.log("NO PROFILE");

      router.replace("/(auth)");

      return;
    }


    //  * ADMIN
    if (profile.role === "admin") {
      router.replace("/(admin)");
      return;
    }


    //  * CUSTOMER

    if (profile.role === "customer") {
      router.replace("/(customer)");
      return;
    }

    router.replace("/(auth)");
  };

  useEffect(() => {
    let mounted = true;

    //   INITIAL AUTH CHECK
    const initializeAuth = async () => {
      try {
        const { data: { session }, error, } = await supabase.auth.getSession();
        if (!mounted) return;


        //  * SUPABASE ERROR

        if (error) {
          setSession(null);
          setProfile(null);
          setLoading(false);
          router.replace("/(auth)");
          return;
        }


        //  * NO SESSION

        if (!session) {
          setSession(null);
          setProfile(null);
          setLoading(false);
          router.replace("/(auth)");

          return;
        }


        const result = await initializeSession(session);
        if (!mounted) return;

        //  * Authentication initialization finished.

        setLoading(false);

        //   REDIRECT AUTHENTICATED USER

        if (result?.profile) {
          navigateUser(result.profile);
        }

      } catch (error) {
        if (!mounted) return;
        setLoading(false);

      }
    };

    initializeAuth();

    /*

     * SUPABASE AUTH LISTENER

     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;



        /*
    
         * INITIAL SESSION
    
         */
        if (event === "INITIAL_SESSION") {

          return;
        }



        //  * SIGNED IN

        if (event === "SIGNED_IN" && session) {

          setSession(session);

          return;
        }

        //  TOKEN REFRESH

        if (event === "TOKEN_REFRESHED" && session) {
          setSession(session);
          return;
        }

        // USER UPDATED

        if (event === "USER_UPDATED" && session
        ) {

          setSession(session);

          return;
        }


        //  * SIGNED OUT

        if (event === "SIGNED_OUT") {

          setSession(null);
          setProfile(null);
          router.replace("/(auth)");

          return;
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
        process.env
          .EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
      }
    >
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
            }}
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