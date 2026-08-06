import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Switch, TextInput } from "react-native-paper";
import AppButton from "../../../components/AppButton";
import COLORS from "../../../constants/color";
import { uploadPizzaImage } from "../../../services/admin/storage";
import { useCategoryStore } from "../../../store/admin/categoryStore";
import { usePizzaStore } from "../../../store/admin/pizzaStore";
import styles from "../../../styles/addPizza.style";


const AddPizza = () => {
    const { addPizza } = usePizzaStore();
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

    const handleAddPizza = async () => {
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
            let imageUrl = "";
            if (image) {
                imageUrl = await uploadPizzaImage(image);
            }
            await addPizza({
                name: pizzaName,
                description,
                category,
                image_url: imageUrl,
                small_price: Number(smallPrice),
                medium_price: Number(mediumPrice),
                large_price: Number(largePrice),
                available
            });

            Alert.alert(
                "Success",
                "Pizza added successfully."
            );

            setPizzaName("");
            setImage(null);
            setDescription("");
            setCategory(null);

            setSmallPrice("");
            setMediumPrice("");
            setLargePrice("");

        } catch (error) {
            Alert.alert("Error", error.message);
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
            <Text style={styles.title}>
                Add New Pizza 🍕
            </Text>

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
                title="Add Pizza"
                icon="pizza"
                onPress={handleAddPizza}
            />

        </ScrollView>
    );
};

export default AddPizza;