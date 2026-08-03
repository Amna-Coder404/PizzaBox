import { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-paper";
import AppButton from "../../../components/AppButton";
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

            await addPizza({
                name: pizzaName,
                description,
                category,
                image_url:
                    "https://xaccpurglkrikrymzikk.supabase.co/storage/v1/object/public/pizzas/default-pizza.png",
                small_price: Number(smallPrice),
                medium_price: Number(mediumPrice),
                large_price: Number(largePrice),

            });

            Alert.alert(
                "Success",
                "Pizza added successfully."
            );

            setPizzaName("");
            setDescription("");
            setCategory(null);

            setSmallPrice("");
            setMediumPrice("");
            setLargePrice("");

        } catch (error) {

            console.log(error);

            Alert.alert(
                "Error",
                error.message
            );
        }
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >

            <Text style={styles.title}>
                Add New Pizza 🍕
            </Text>


            <TextInput
                label="Pizza Name"
                mode="outlined"
                style={styles.input}
                value={pizzaName}
                onChangeText={setPizzaName}

            />


            <TextInput
                label="Description"
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.input}
                value={description}
                onChangeText={setDescription}
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
            />

            <TextInput
                label="Small Price"
                mode="outlined"
                keyboardType="numeric"
                value={smallPrice}
                onChangeText={setSmallPrice}
                style={styles.input}
            />

            <TextInput
                label="Medium Price"
                mode="outlined"
                keyboardType="numeric"
                value={mediumPrice}
                onChangeText={setMediumPrice}
                style={styles.input}
            />

            <TextInput
                label="Large Price"
                mode="outlined"
                keyboardType="numeric"
                value={largePrice}
                onChangeText={setLargePrice}
                style={styles.input}
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