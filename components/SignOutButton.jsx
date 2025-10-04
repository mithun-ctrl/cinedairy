import { COLORS } from '@/constant/colors'
import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Alert, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    Alert.alert("SignOut", "Are you sure want to sign out", [
      {text: "Cancel", style: "cancel"},
      {text: "Logout", style: "destructive", onPress: signOut}
    ]);
  }

  return (
    <TouchableOpacity onPress={handleSignOut}
      style={{
        backgroundColor: COLORS.background,
        padding: 10,
        borderRadius: 50,
        opacity: 1,
        shadowColor: COLORS.activeTabColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Ionicons 
        name='log-out-outline' 
        size={24}
        color={COLORS.activeTabColor}
      />
    </TouchableOpacity>
  )
}