// app/components/FloatingButton.tsx
import { PRIMARY, WHITE } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

const FloatingButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("AddProductScreen");
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { backgroundColor: PRIMARY.DARK },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY.DEFAULT,
  },
});

export default FloatingButton;
