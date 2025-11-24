import { COLORS } from "@/constant/colors";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { Platform, View } from "react-native";

export default function Layout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  const statusBarStyle = COLORS.text === "#FFFFFF" ? "light" : "dark";
  const navButtonStyle = COLORS.text === "#FFFFFF" ? "light" : "dark";

  NavigationBar.setButtonStyleAsync(navButtonStyle);

  SystemUI.setBackgroundColorAsync(COLORS.background);

  return (
    <>
      <StatusBar 
        style={statusBarStyle}
        backgroundColor={COLORS.background}
        translucent={true}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopColor: COLORS.border,
            borderTopWidth: 0.5,
            elevation: 0,

            height: Platform.OS === 'ios' ? 88 : 56,
            paddingBottom: Platform.OS === 'ios' ? 28 : 12,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: "",
            tabBarIcon: () => (
              <View
                style={{
                  top: -20,
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: COLORS.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  borderWidth: 4,
                  borderColor: COLORS.background,
                }}
              >
                <Ionicons name="add" size={30} color={COLORS.backgroundLight} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
