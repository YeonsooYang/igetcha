import { UserProvider } from "@/contexts/UserContext";
import { LogBox, Text, View } from "react-native";

LogBox.ignoreAllLogs();

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>

  );
}

