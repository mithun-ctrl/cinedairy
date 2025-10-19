import { COLORS } from "@/constant/colors";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function Layout() {

  const {isSignedIn} = useUser()

  if(!isSignedIn) return <Redirect href={"/(auth)/sign-in"}/>


  return (
      <>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarShowLabel: true,
        animation: "shift",
          tabBarStyle: {
            backgroundColor: COLORS.highlight,
            borderTopColor: COLORS.borderMuted,
            height: 54,
          },
          tabBarLabelStyle: {
            fontSize: 11,
          }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({focused, color, size}) =>(
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size * 0.8}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
            tabBarLabel: () => null,
          tabBarIcon: ({focused, color, size}) =>(
            <Ionicons 
              name={focused ? "add-circle" : "add-circle"}
              size={size * 2.0}
              color={color}
              style={{
                  marginTop: 16,
                  width: 56,
                  height: 56,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({focused, color, size}) =>(
            <Ionicons 
              name={focused ? "time" : "time-outline"} 
              size={size * 0.8}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
      </>
  )
}

