import { SignOutButton } from '@/components/SignOutButton';
import { COLORS } from '@/constant/colors';
import { Config } from '@/hooks/key';
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
  const { summary, movies } = useMovies(user?.id);


  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);


  const fetchSummary = async () => {
    if (!user?.id) return;

    setSummaryLoading(true);
    try {
      const response = await fetch(`${Config.API_BASE_URL}/movie/summary/${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch summary");
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error fetching summary:", error);
    } finally {
      setSummaryLoading(false);
    }
  };

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
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const updateAvatar = async (imageUri) => {
    setImageLoading(true);
    try {
      // Convert image to base64
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result;

        try {
          await user.setProfileImage({ file: base64data });
          await user.reload();
          Alert.alert('Success', 'Profile picture updated successfully!');
        } catch (error) {
          console.log('Error updating avatar:', error);
          Alert.alert('Error', 'Failed to update profile picture');
        } finally {
          setImageLoading(false);
        }
      };
    } catch (error) {
      console.log('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image');
      setImageLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Validation Error', 'First name and last name are required');
      return;
    }

    setIsLoading(true);
    try {
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      await user.reload();
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `₹${numAmount.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name='arrow-back' size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={[styles.addButtonContainer, isLoading && styles.addButtonDisabled]}
          disabled={isLoading}
          onPress={handleSubmit}>
          <Text style={styles.addButton}>{isLoading ? "Updating..." : "Submit"}</Text>
          {!isLoading && <Ionicons name='checkmark' size={20} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {imageLoading ? (
              <View style={styles.avatar}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <Image
                source={{ uri: user?.imageUrl || 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />
            )}
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={pickImage}
              disabled={imageLoading}>
              <Ionicons name='camera' size={20} color={COLORS.background} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{summary?.totalMovies || 0}</Text>
              <Text style={styles.statLabel}>Total Movies</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                ₹{Number(summary?.totalTicketCost || 0).toFixed(2)}
              </Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
          </View>
        </View>


        {/* Editable User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
        </View>

        {/* Non-Editable User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>
              {user?.emailAddresses[0]?.emailAddress || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>
              {user?.username || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>User Since</Text>
            <Text style={styles.infoValue}>
              {formatDate(user?.createdAt)}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>
              {formatDate(user?.updatedAt)}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <SignOutButton />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButtonContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.highlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  statsSection: {
    marginBottom: 32,
  },
  statsLoadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.highlight,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  section: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.highlight,
  },
  infoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.highlight,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  logoutSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
});

export default Profile;