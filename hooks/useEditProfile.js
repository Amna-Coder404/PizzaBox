import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import useAuthStore from "../store/authStore";

const BUCKET_NAME = "avatars";

export default function useEditProfile(profile, onSuccess) {
    const setProfile = useAuthStore((state) => state.setProfile);

    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (profile) {
            setName(profile.name || "");
            setSelectedImage(null);
            setError(null);
        }
    }, [profile]);

    // Pick image
    const pickImage = async () => {
        try {
            setError(null);

            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                setError("Permission to access photos is required.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: true,
            });

            if (result.canceled || !result.assets?.length) {
                return;
            }

            setSelectedImage(result.assets[0]);

        } catch (error) {
            console.error("IMAGE PICK ERROR:", error);
            setError("Unable to select image.");
        }
    };

    // Upload image to Supabase Storage
    const uploadImage = async () => {
        if (!selectedImage) {
            return profile?.avatar_url || null;
        }

        if (!selectedImage.base64) {
            throw new Error("Unable to read selected image.");
        }

        const mimeType = selectedImage.mimeType || "image/jpeg";

        const extension = mimeType.split("/")[1] || "jpeg";

        const filePath = `${profile.id}/${Date.now()}.${extension}`;

        // Convert base64 image data into binary ArrayBuffer.
        // This is the recommended approach for React Native uploads.
        const arrayBuffer = decode(selectedImage.base64);



        const { error: uploadError } =
            await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, arrayBuffer, {
                    contentType: mimeType,
                    cacheControl: "3600",
                    upsert: false,
                });

        if (uploadError) {
            throw uploadError;
        }



        const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        if (!data?.publicUrl) {
            throw new Error("Unable to get image URL.");
        }


        return data.publicUrl;
    };

    // Save profile
    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!profile?.id) {
                throw new Error("Profile not found.");
            }

            const trimmedName = name.trim();

            if (!trimmedName) {
                throw new Error("Name is required.");
            }

            // Upload selected image first.
            const avatarUrl = await uploadImage();

            // Update profile record.
            const {
                data: updatedProfile,
                error: updateError,
            } = await supabase
                .from("profiles")
                .update({
                    name: trimmedName,
                    avatar_url: avatarUrl,
                })
                .eq("id", profile.id)
                .select()
                .single();

            if (updateError) {
                throw updateError;
            }



            // Add cache-busting query parameter.
            const profileForStore = {
                ...updatedProfile,
                avatar_url: updatedProfile.avatar_url
                    ? `${updatedProfile.avatar_url}?t=${Date.now()}`
                    : null,
            };


            // Update global profile.
            setProfile(profileForStore);

            // Clear selected image.
            setSelectedImage(null);

            // Close modal through callback.
            if (onSuccess) {
                onSuccess(profileForStore);
            }

            return profileForStore;

        } catch (error) {

            setError(
                error?.message ||
                "Failed to update profile."
            );

            return null;

        } finally {
            setLoading(false);
        }
    };

    // Reset modal state.
    const reset = () => {
        setName(profile?.name || "");
        setSelectedImage(null);
        setError(null);
    };

    return {
        name,
        setName,
        selectedImage,
        pickImage,
        handleSave,
        reset,
        loading,
        error,
    };
}