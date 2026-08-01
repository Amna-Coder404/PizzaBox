import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { default as Loading, default as SafeScreen } from "../../components/Loading";
import { supabase } from "../../lib/supabase";
import { checkSession } from "../../services/auth";
import { getProfile } from "../../services/profile";


const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      subscription.unsubscribe();
    }
  }, []);


  const checkAuth = async () => {
    try {
      const session = await checkSession();

      const currentGroup = segments[0];

      if (!session) {
        if (currentGroup !== "(auth)") {
          router.replace("/(auth)");
        }
        return;
      }

      const profile = await getProfile(session.user.id);

      if (profile?.role === "admin") {
        if (currentGroup !== "(admin)") {
          router.replace("/(admin)");
        }
      } else {
        if (currentGroup !== "(customer)") {
          router.replace("/(customer)");
        }
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
    <SafeAreaProvider>
      <SafeScreen>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(customer)" />
          <Stack.Screen name="(admin)" />
          {/* <Stack.Screen name="pizza" /> */}
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>
  );
};


export default RootLayout;