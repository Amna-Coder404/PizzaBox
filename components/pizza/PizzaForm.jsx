import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Switch, TextInput } from "react-native-paper";


import { uploadPizzaImage } from "../../services/admin/storage";
import { useCategoryStore } from "../../store/admin/categoryStore";
import { usePizzaStore } from "../../store/admin/pizzaStore";
import styles from "../../styles/addPizza.style";

import COLORS from "../../constants/color";
import AppButton from "../AppButton";


const PizzaForm = ({ mode = "create", pizza = null, onClose, }) => {
    const { addPizza, editPizza } = usePizzaStore();
    const { categories, fetchCategories } = useCategoryStore();


    useEffect(() => {
        fetchCategories();
    }, []);

    const [pizzaName, setPizzaName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const categoryOptions = categories.map(item => ({ label: item.name, value: item.id.toString() }));
    const [showDropDown, setShowDropDown] = useState(false);

    // PIZZA SIZEs + PRICE
    const [smallPrice, setSmallPrice] = useState("");
    const [mediumPrice, setMediumPrice] = useState("");
    const [largePrice, setLargePrice] = useState("");
    const [image, setImage] = useState(null);
    const [available, setAvailable] = useState(true);

    // ADD THIS HERE 👇
    useEffect(() => {
        if (mode === "edit" && pizza) {

            setPizzaName(pizza.name);
            setDescription(pizza.description);

            setCategory(
                pizza.category_id.toString() || ""
            );

            setSmallPrice(
                String(pizza.small_price)
            );
            setMediumPrice(
                String(pizza.medium_price)
            );

            setLargePrice(
                String(pizza.large_price)
            );

            setAvailable(
                pizza.available
            );

            setImage(
                pizza.image_url
            );
        }

    }, [mode, pizza]);

    const handleSubmit = async () => {
        if (
            !pizzaName ||
            !description ||
            !category ||
            !smallPrice ||
            !mediumPrice ||
            !largePrice
        ) {
            Alert.alert(
                "Missing Fields",
                "Please fill all fields."
            );
            return;
        }
        try {

            let imageUrl = image;
            // upload only new selected image
            if (image && !image.startsWith("http")) {
                imageUrl = await uploadPizzaImage(image);
            }

            const pizzaData = {
                name: pizzaName,
                description,
                category,
                image_url: imageUrl,
                small_price: Number(smallPrice),
                medium_price: Number(mediumPrice),
                large_price: Number(largePrice),
                available: available,
            };


            if (mode === "create") {
                await addPizza(pizzaData);
                Alert.alert("Success", "Pizza added successfully."
                );
            } else {

                await editPizza(
                    pizza.id,
                    pizzaData
                );
                Alert.alert(
                    "Success",
                    "Pizza updated successfully."
                );
            }


            onClose?.();
        } catch (error) {

            Alert.alert(
                "Error",
                error.message
            );

        }
    };
    // IMAGE PICKER 
    const pickImage = async () => {
        const permisstion = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permisstion.granted) {
            Alert.alert("Permission Resquired", "Allow gallery access");
            return;
        }


        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }



    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {mode === "create" ? "  Add New Pizza 🍕" : "Update Pizza 🍕"}
                </Text>

                <TouchableOpacity onPress={() => onClose()} >
                    <Ionicons name="close" size={23} color={"white"} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage} >
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.previewImage}
                    />

                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="image-outline" size={45} color={COLORS.white} />
                        <Text style={styles.imageText}>
                            Tap to select pizza image
                        </Text>
                    </View>

                )}
            </TouchableOpacity>

            {image && (
                <AppButton onPress={pickImage} title={"Change Image"} />
            )}
            <TextInput
                label="Pizza Name"
                mode="outlined"
                style={[styles.input, { marginTop: 10 }]}
                value={pizzaName}
                onChangeText={setPizzaName}
                textColor={COLORS.white}
            />


            <TextInput
                label="Description"
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                textColor={COLORS.white}
            />

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={{ color: "#888" }}
                selectedTextStyle={{ color: "#fff", fontSize: 16 }}
                itemTextStyle={{ color: "#000" }}
                data={categoryOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                onChange={(item) => setCategory(item.value)}
                textColor={COLORS.white}
            />
            <View style={styles.availableRow}>
                <Text style={{ color: COLORS.white }}>
                    {available ? "Available" : "Unavailable"}
                </Text>

                <Switch
                    value={available}
                    onValueChange={() => setAvailable(!available)}
                />
            </View>
            <TextInput
                label="Small Price"
                mode="outlined"
                keyboardType="numeric"
                value={smallPrice}
                onChangeText={setSmallPrice}
                style={styles.input}
                textColor={COLORS.white}
            />

            <TextInput
                label="Medium Price"
                mode="outlined"
                keyboardType="numeric"
                value={mediumPrice}
                onChangeText={setMediumPrice}
                style={styles.input}
                textColor={COLORS.white}
            />

            <TextInput
                label="Large Price"
                mode="outlined"
                keyboardType="numeric"
                value={largePrice}
                onChangeText={setLargePrice}
                style={styles.input}
                textColor={COLORS.white}
            />



            <AppButton
                title={mode === "create" ? "Add Pizza" : "Update Pizza"}
                icon="pizza"
                onPress={handleSubmit}
            />

        </ScrollView>
    );
};

export default PizzaForm;