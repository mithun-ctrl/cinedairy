import { COLORS } from '@/constant/colors'
import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Alert, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    Alert.alert("Logout", "Are you sure want to logout", [
      {text: "Cancel", style: "cancel"},
      {text: "Logout", style: "destructive", onPress: signOut}
    ]);
  }

  return (
    <TouchableOpacity onPress={handleSignOut}
      style={{
        backgroundColor: COLORS.highlight,
        padding: 10,
        borderRadius: 50,
        opacity: 1,
        shadowColor: COLORS.text,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Ionicons 
        name='log-out-outline' 
        size={24}
        color={COLORS.primary}
      />
    </TouchableOpacity>
  )
}