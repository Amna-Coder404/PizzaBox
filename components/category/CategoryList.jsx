import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import COLORS from "../../constants/color";
import styles from "../../styles/menu.style";

const CategoryList = ({ categories = [], onAdd, onEdit, onDelete, loading = false,
}) => {
    const [activeId, setActiveId] = useState(null);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleCategory = (id) => {
        const open = activeId !== id;

        setActiveId(open ? id : null);

        Animated.spring(animation, {
            toValue: open ? 1 : 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start();
    };

    return (
        <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => {
                const active = activeId === item.id;

                return (
                    <View style={[styles.categoryCard, active && styles.activeBorderColor]}>

                        {/* CATEGORY */}

                        <TouchableOpacity
                            activeOpacity={0.7}
                            disabled={loading}
                            onPress={() => toggleCategory(item.id)}
                            style={styles.categoryMain}
                        >
                            <Ionicons
                                name="pricetag-outline"
                                size={17}
                                color={
                                    active
                                        ? COLORS.primary
                                        : COLORS.muted
                                }
                            />

                            <Text
                                style={[
                                    styles.categoryName,
                                    active &&
                                    styles.activeCategoryName,
                                ]}
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                        {/* ACTIONS */}

                        {active && (
                            <Animated.View
                                style={[
                                    styles.categoryActions,
                                    {
                                        opacity: animation,
                                        transform: [{
                                            translateX:
                                                animation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [10, 0],
                                                }),
                                        }],
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => onEdit(item)}
                                    disabled={loading}
                                    style={styles.categoryAction}
                                >
                                    <Ionicons
                                        name="create-outline"
                                        size={17}
                                        color={COLORS.primary}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => onDelete(item)}
                                    disabled={loading}
                                    style={styles.categoryAction}
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={17}
                                        color={COLORS.error}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </View>
                );
            }}

            /* ADD CATEGORY */

            ListFooterComponent={
                <TouchableOpacity
                    onPress={onAdd}
                    disabled={loading}
                    activeOpacity={0.7}
                    style={styles.addCategoryCard}
                >
                    <Ionicons
                        name="add"
                        size={20}
                        color={COLORS.primary}
                    />

                    <Text style={styles.addCategoryText}>
                        Add
                    </Text>
                </TouchableOpacity>
            }
        />
    );
};

export default CategoryList;