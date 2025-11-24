import { SignOutButton } from '@/components/SignOutButton';
import { COLORS } from '@/constant/colors';
import { useMovies } from '@/hooks/useMovie';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


const Profile = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const { summary } = useMovies(user?.id);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const updateAvatar = async (imageUri) => {
    setImageLoading(true);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        try {
          await user.setProfileImage({ file: reader.result });
          await user.reload();
          Alert.alert('Success', 'Lookin\' good!');
        } catch (error) {
          Alert.alert('Error', 'Failed to update profile picture');
        } finally {
          setImageLoading(false);
        }
      };
    } catch (error) {
      setImageLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Hold on', 'First name and last name are required');
      return;
    }
    setIsLoading(true);
    try {
      await user.update({ firstName: firstName.trim(), lastName: lastName.trim() });
      await user.reload();
      Alert.alert('Saved', 'Profile details updated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: COLORS.background}}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push("/")}
          >
            <Ionicons name='chevron-back' size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            disabled={isLoading}
            onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Avatar Section */}
  
            <View style={styles.avatarContainer}>
              <View style={styles.imageWrapper}>
                {imageLoading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  <Image
                    source={{ uri: user?.imageUrl || 'https://via.placeholder.com/150' }}
                    style={styles.avatar}
                  />
                )}
                <TouchableOpacity 
                  style={styles.cameraBadge} 
                  onPress={pickImage}
                  activeOpacity={0.8}
                >
                  <Ionicons name='camera' size={18} color={COLORS.backgroundLight} />
                </TouchableOpacity>
              </View>
              <Text style={styles.userName}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.userHandle}>@{user?.username || 'cinephile'}</Text>
            </View>
          

          {/* Stats Dashboard */}
      
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <View style={[styles.iconCircle, { backgroundColor: COLORS.backgroundDark }]}>
                  <Ionicons name="film-outline" size={22} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.statValue}>{summary?.totalMovies || 0}</Text>
                  <Text style={styles.statLabel}>Movies Watched</Text>
                </View>
              </View>
              
              <View style={styles.divider} />

              <View style={styles.statBox}>
                <View style={[styles.iconCircle, { backgroundColor: COLORS.backgroundDark }]}>
                  <Ionicons name="wallet-outline" size={22} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.statValue}>₹{Number(summary?.totalTicketCost || 0).toFixed(0)}</Text>
                  <Text style={styles.statLabel}>Total Spent</Text>
                </View>
              </View>
            </View>
          

          {/* Editable Fields */}
      
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Personal Details</Text>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Jane"
                  placeholderTextColor={COLORS.border}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Doe"
                  placeholderTextColor={COLORS.border}
                />
              </View>
            </View>
          

          {/* Read Only Info */}
      
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Account Info</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.emailAddresses[0]?.emailAddress}</Text>
              </View>
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Member Since</Text>
                <Text style={styles.infoValue}>{formatDate(user?.createdAt)}</Text>
              </View>
              <View style={styles.infoDivider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Last Updated</Text>
                <Text style={styles.infoValue}>{formatDate(user?.updatedAt)}</Text>
              </View>
            </View>
          

          {/* Logout */}
             <View style={styles.logoutContainer}>
                <SignOutButton />
             </View>
             <Text style={styles.versionText}>Version 1.0.1</Text>


        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
    backgroundColor: COLORS.background
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.backgroundDark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.highlight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: COLORS.backgroundLight,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.borderMuted,
    marginHorizontal: 20,
    opacity: 0.5,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 8,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.4,
    opacity: 0.6
  },
  // Forms & Sections
  sectionContainer: {
    marginBottom: 25,
    backgroundColor: COLORS.highlight,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 6,
    marginLeft: 4,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
  },
  // Info Rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  infoDivider: {
    height: 1,
    backgroundColor: COLORS.borderMuted,
    opacity: 0.2,
    marginVertical: 8,
  },
  // Footer
  logoutContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.border,
    fontSize: 12,
    marginTop: 20,
  },
});

export default Profile;