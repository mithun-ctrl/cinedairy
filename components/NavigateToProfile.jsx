import { COLORS } from "@/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export const NavigateToProfile = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/profile")}
      style={{
        padding: 10,
        borderRadius: 50,
        opacity: 1,
      }}
    >
      <Ionicons 
        name="person-circle" 
        size={32}
        color={COLORS.primary}
      />
    </TouchableOpacity>
  )
}
