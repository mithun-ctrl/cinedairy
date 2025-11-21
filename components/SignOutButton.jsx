import { COLORS } from '@/constant/colors'
import { useClerk } from '@clerk/clerk-expo'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    Alert.alert("Logout", "Are you sure want to logout", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut }
    ]);
  }

  return (
    <TouchableOpacity 
      onPress={handleSignOut}
      style={styles.button}
    >
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.highlight,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12, // Changed from 50 to 12 for a rounded rectangle look
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow styles
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600', // Semi-bold for better readability
    textAlign: 'center',
  }
})