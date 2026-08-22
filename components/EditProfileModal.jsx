import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import COLORS from "../constants/color";
import useEditProfile from "../hooks/useEditProfile";
import styles from "../styles/editProfileModal.style";

import useNetWorkStatus from "../hooks/useNetworkStatus";
import NoInternetModal from "./NetInfo/NoInternetModal";

const EditProfileModal = ({
    visible,
    onClose,
    profile,
}) => {
    const { isOnline } = useNetWorkStatus();

    const [showNoInternetModal, setShowNoInternetModal] =
        useState(false);

    const {
        name,
        setName,
        selectedImage,
        pickImage,
        handleSave,
        reset,
        loading,
        error,
    } = useEditProfile(profile, () => {
        onClose();
    });

    const imageSource = selectedImage
        ? { uri: selectedImage.uri }
        : profile?.avatar_url
            ? { uri: profile.avatar_url }
            : require("../assets/images/app-images/owner-image.png");

    // CLOSE MODAL
    const handleClose = () => {
        if (loading) return;

        reset();
        onClose();
    };

    // SAVE PROFILE
    const handleSaveProfile = async () => {
        if (!isOnline) {
            setShowNoInternetModal(true);
            return;
        }

        await handleSave();
    };

    return (
        <>
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={handleClose} >
                <View style={styles.overlay}>
                    <KeyboardAvoidingView
                        behavior={
                            Platform.OS === "ios"
                                ? "padding"
                                : "height"
                        }
                        style={styles.keyboardContainer} >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false} >
                            <View style={styles.modalContainer}>

                                {/* HEADER */}
                                <View style={styles.header}>
                                    <View>
                                        <Text style={styles.title}>
                                            Edit Profile
                                        </Text>

                                        <Text style={styles.subtitle}>
                                            Update your profile
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={handleClose}
                                        activeOpacity={0.8}
                                        disabled={loading} >
                                        <Ionicons name="close" size={22} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>

                                {/* PROFILE IMAGE */}
                                <View style={styles.imageSection}>
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        style={styles.imageWrapper}
                                        disabled={loading} >
                                        <Image source={imageSource} style={styles.profileImage} />

                                        <View style={styles.cameraButton}  >
                                            <Ionicons name="camera" size={16} color={COLORS.white} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={pickImage}
                                        activeOpacity={0.8}
                                        disabled={loading} >

                                        <Text style={styles.changeImageText} >
                                            Change Image
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* NAME */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>
                                        Name
                                    </Text>

                                    <View style={styles.inputContainer} >
                                        <Ionicons name="person-outline" size={19} color={COLORS.muted} />

                                        <TextInput
                                            value={name}
                                            onChangeText={setName}
                                            placeholder="Enter your name"
                                            placeholderTextColor={COLORS.muted}
                                            style={styles.input}
                                            autoCapitalize="words"
                                            editable={!loading}
                                            returnKeyType="done"
                                        />
                                    </View>
                                </View>

                                {/* ERROR */}
                                {error && (
                                    <Text style={styles.errorText} >
                                        {error}
                                    </Text>
                                )}

                                {/* ACTION BUTTONS */}
                                <View style={styles.actions}>

                                    {/* CANCEL */}
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={handleClose}
                                        activeOpacity={0.8}
                                        disabled={loading}  >
                                        <Text style={styles.cancelText} >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>

                                    {/* SAVE */}
                                    <TouchableOpacity
                                        style={[
                                            styles.saveButton,
                                            loading &&
                                            styles.disabledButton,
                                        ]}
                                        onPress={handleSaveProfile}
                                        activeOpacity={0.8}
                                        disabled={loading} >
                                        {loading ? (
                                            <ActivityIndicator size="small" color={COLORS.white} />
                                        ) : (
                                            <>
                                                <Ionicons name="checkmark" size={18} color={COLORS.white} />

                                                <Text style={styles.saveText} >
                                                    Save
                                                </Text>
                                            </>
                                        )}
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* NO INTERNET MODAL */}
            <NoInternetModal
                visible={showNoInternetModal}
                onClose={() => setShowNoInternetModal(false)}
            />
        </>
    );
};

export default EditProfileModal;