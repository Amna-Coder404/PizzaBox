import { ActivityIndicator, Image, View } from "react-native";
import COLORS from "../constants/color";


const Loader = () => (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#121212",
        }}>

        <Image
            source={require("../assets/images/app-images/logo.png")}
            style={{ width: 120, height: 120, marginBottom: 20 }}
        />
        <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
);

export default Loader;