import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    TouchableOpacity,
    View,
} from "react-native";

const DEFAULT_AVATAR =
    "https://xaccpurglkrikrymzikk.supabase.co/storage/v1/object/public/avatars/person.png";

const ProfileImagePreview = ({
    uri,
    style,
}) => {
    const [visible, setVisible] = useState(false);

    const imageUri = uri || DEFAULT_AVATAR;

    return (
        <>
            {/* PROFILE IMAGE */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setVisible(true)}
            >
                <Image
                    source={{ uri: imageUri }}
                    style={style}
                />
            </TouchableOpacity>

            {/* PREVIEW MODAL */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Ionicons
                            name="close"
                            size={28}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>

                    <Pressable
                        style={styles.imageContainer}
                        onPress={() => setVisible(false)}
                    >
                        <Image
                            source={{ uri: imageUri }}
                            resizeMode="contain"
                            style={styles.largeImage}
                        />
                    </Pressable>

                </View>
            </Modal>
        </>
    );
};

const styles = {
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.92)",
        alignItems: "center",
        justifyContent: "center",
    },

    imageContainer: {
        width: "100%",
        height: "75%",
        alignItems: "center",
        justifyContent: "center",
    },

    largeImage: {
        width: "90%",
        height: "90%",
        borderRadius: 16,
    },

    closeButton: {
        position: "absolute",
        top: 55,
        right: 20,
        zIndex: 10,
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.12)",
    },
};

export default ProfileImagePreview;