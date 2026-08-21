import { useState } from "react";
import {
    Alert, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/auth.style";

import { Link, useRouter } from "expo-router";
import AppButton from "../../../components/AppButton";
import Loader from "../../../components/Loading";
import COLORS from "../../../constants/color";
import useAuthStore from "../../../store/authStore";


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuthStore();
    const handleLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert(
                "Missing Field",
                "Please enter your email and password."
            );
            return;
        }

        try {
            setLoading(true);

            const { profile } = await login(
                email.trim(),
                password
            );

            if (profile?.role === "admin") {
                router.replace("/(admin)");
            } else {
                router.replace("/(customer)");
            }

        } catch (error) {
            Alert.alert("Login Failed", error.message);
            console.log("ERROR", error);
        } finally {
            setLoading(false);
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
                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoWrapper}>
                            <Image
                                source={require("../../../assets/images/app-images/logo.png")}
                                style={styles.logo}
                            />
                        </View>
                        <Text style={styles.title}>
                            PizzaBox
                        </Text>
                        <Text style={styles.subtitle}>
                            Fresh Pizza, Fast Delivery 🍕
                        </Text>
                    </View>


                    {/* Login Card */}
                    <View style={styles.card}>
                        <Text style={styles.heading}>
                            Welcome Back 👋
                        </Text>
                        <Text style={styles.description}>
                            Login to order your favorite pizza
                        </Text>


                        {/* Email */}
                        <View style={styles.inputBox}>
                            <Ionicons
                                name="mail-outline"
                                size={22}
                                color={COLORS.primary}
                            />

                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor={COLORS.placeholderTextColor}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                            />

                        </View>

                        {/* Password */}
                        <View style={styles.inputBox}>

                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color={COLORS.primary}
                            />

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={COLORS.placeholderTextColor}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                style={styles.input}
                            />

                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
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
                            title="Login"
                            icon="login"
                            onPress={handleLogin}

                        />
                    </View>

                    {/* Signup */}
                    <View style={styles.bottomRow}>
                        <Text style={styles.normalText}>
                            Don't have an account?
                        </Text>

                        <Link href="/signup" asChild>
                            <Text style={styles.link}>SignUp</Text>
                        </Link>
                    </View>
                </View>

            </View>

        </KeyboardAvoidingView>
    );
};


export default Login;