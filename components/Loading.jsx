import LottieView from "lottie-react-native";
import { View } from "react-native";

import COLORS from "../constants/color";

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require("../assets/animations/loading.json")}
                autoPlay
                loop
                style={styles.loader}
            />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
    },

    loader: {
        width: 120,
        height: 120,
    },
};

export default Loading;