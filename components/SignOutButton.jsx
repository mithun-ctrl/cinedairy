import { COLORS } from '@/constant/colors'
import { useClerk } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    Alert.alert("Logout", "Are you sure want to logout", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        onPress: async () => {
          try {
            await signOut()
            // Redirect to sign-in page after successful logout
            router.replace('/(auth)/sign-in') // or whatever your sign-in route is
          } catch (error) {
            console.log('Error signing out:', error)
            Alert.alert('Error', 'Failed to sign out')
          }
        }
      }
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
})