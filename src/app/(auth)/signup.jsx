import { useState } from "react";
import {
    Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import AppButton from "../../../components/AppButton";
import COLORS from "../../../constants/color";
import styles from "../../../styles/auth.style";


import Loader from "../../../components/Loading";
import useAuthStore from "../../../store/authStore";


const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSignup = async () => {
        if (!email || !password || !name) {
            Alert.alert("Missing Field", "Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            await signup(name, email.trim(), password
            );
            Alert.alert("Success", "Account created successfully");
            router.replace("/(customer)");

        } catch (error) {
            Alert.alert("Signup Failed", error.message);
        } finally {
            setLoading(true);
        }

    };

    if (loading) {
        return <Loader />
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"
        }>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.heading}>
                            Create Account 🍕
                        </Text>


                        <Text style={styles.description}>
                            Join PizzaBox and order fresh pizza
                        </Text>

                        <View style={styles.inputBox}>

                            <Ionicons name="person-outline" size={22} color={COLORS.primary} />
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={COLORS.placeholderTextColor
                                }
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputBox}>

                            <Ionicons
                                name="mail-outline"
                                size={22}
                                color={COLORS.primary}
                            />


                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor={
                                    COLORS.placeholderTextColor
                                }
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={styles.input}
                            />

                        </View>

                        <View style={styles.inputBox}>

                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color={COLORS.primary}
                            />


                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={
                                    COLORS.placeholderTextColor
                                }
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons name={
                                    showPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                    size={22}
                                    color={COLORS.textSecondary}
                                />

                            </TouchableOpacity>

                        </View>

                        <AppButton
                            title="Create Account"
                            icon="account-plus"
                            onPress={handleSignup}
                            style={styles.loginButton}
                        />
                    </View>


                    <View style={styles.bottomRow}>
                        <Text style={styles.normalText}>
                            Already have account?
                        </Text>

                        <Link href="/" asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );

};


export default Signup;