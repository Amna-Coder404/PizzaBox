import { useRouter } from "expo-router";

import { getProfile } from "../services/profile";
import useAuthStore from "../store/authStore";

const useRouting = () => {
    const router = useRouter();

    const setProfile = useAuthStore(
        (state) => state.setProfile
    );

    const routeUser = async (userId) => {
        if (!userId) {
            router.replace("/(auth)");
            return;
        }

        try {

            const profile = await getProfile(userId);

            if (!profile) {
                router.replace("/(auth)");
                return;
            }

            setProfile(profile);
            //  "ADMIN → ADMIN APP"

            if (profile.role === "admin") {
                router.replace("/(admin)");
                return;
            }


            //  * CUSTOMER

            if (profile.role === "customer") {

                const hasLocation = profile.latitude != null && profile.longitude != null;


                if (hasLocation) {
                    //  "CUSTOMER → CUSTOMER APP"
                    router.replace("/(customer)");
                    return;
                }
                // "CUSTOMER HAS NO LOCATION → LOCATION"
                router.replace("/location");
                return;
            }


            //   Unknown role



            router.replace("/(auth)");

        } catch (error) {
            console.log(
                "ROUTING ERROR:",
                error?.message || error
            );

            router.replace("/(auth)");
        }
    };

    return {
        routeUser,
    };
};

export default useRouting;