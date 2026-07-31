import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { checkSession } from "../../services/auth";
import { getProfile } from "../../services/profile";

const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, [segments]);

  const checkAuth = async () => {
    try {
      const session = await checkSession();

      // User not logged in
      if (!session) {
        if (segments[0] !== "(auth)") {
          router.replace("/(auth)/login");
        }
        return;
      }

      // Logged in
      const profile = await getProfile(session.user.id);

      if (profile.role === "admin") {
        if (segments[0] !== "(admin)") {
          router.replace("/(admin)");
        }
      } else {
        if (segments[0] !== "(customer)") {
          router.replace("/(customer)");
        }
      }
    } catch (error) {
      console.log(error);
      router.replace("/(auth)/login");
    }
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="(admin)" />
    </Stack>
  );
};

export default RootLayout;