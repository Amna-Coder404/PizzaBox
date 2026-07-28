// This file are connent my project with supabase Db

import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

import "expo-sqlite/localStorage/install";

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
        auth: {
            storage: localStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);