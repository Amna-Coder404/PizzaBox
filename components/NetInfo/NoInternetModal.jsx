import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View, } from "react-native";
import COLORS from "../../constants/color";
import styles from "../../styles/netInfo.stlye";


const NoInternetModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.content} >
                    <Ionicons name="cloud-offline-outline" size={48} color={COLORS.error} />

                    <Text style={styles.cardText}>
                        No Internet Connection
                    </Text>

                    <Text style={styles.cardDec}>
                        Please connect to the internet and try again.
                    </Text>

                    <TouchableOpacity onPress={onClose} style={styles.cardButton}>
                        <Text style={styles.btnText} >
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default NoInternetModal;