import { Ionicons } from "@expo/vector-icons";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import COLORS from "../../constants/color";
import styles from "../../styles/addressModal.style";

const AddressModal = ({
    visible,
    address,
    onChangeAddress,
    onClose,
    onSave,
    saving,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Delivery Address
                        </Text>

                        <TouchableOpacity onPress={onClose}>
                            <Ionicons
                                name="close"
                                size={26}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* ADDRESS INPUT */}
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={onChangeAddress}
                        placeholder="Enter your delivery address"
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                    {/* SAVE BUTTON */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={onSave}
                        disabled={saving}
                    >
                        <Text style={styles.saveText}>
                            {saving ? "Saving..." : "Save Address"}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default AddressModal;