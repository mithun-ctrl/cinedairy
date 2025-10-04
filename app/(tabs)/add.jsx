import { styles } from "@/assets/style/add.style";
import { COLORS } from "@/constant/colors";
import { useUser } from "@clerk/clerk-expo";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const AddMovie = ({ navigation, route }) => {
    const {user} = useUser();
    const userId = user?.id;

    const [title, setTitle] = useState('');
    const [ticketCost, setTicketCost] = useState('');
    const [theatreName, setTheatreName] = useState('');
    const [watchedDate, setWatchedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [movieFormat, setMovieFormat] = useState('2D');
    const [theatreFormat, setTheatreFormat] = useState('PVR');
    const [isLoading, setIsLoading] = useState(false);

    const theatreFormats = ['PVR', '4DX', 'EPIQ', 'IMAX', 'DOLBY', 'SINGLE SCREEN', 'OTHER'];
    const movieFormats = ['2D', '3D'];

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setWatchedDate(selectedDate);
        }
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const validateForm = () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter movie title');
            return false;
        }
        if (!ticketCost || isNaN(Number(ticketCost)) || Number(ticketCost) < 0) {
            Alert.alert('Error', 'Please enter a valid ticket cost');
            return false;
        }
        if (!theatreName.trim()) {
            Alert.alert('Error', 'Please enter theatre name');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        const movieData = {
            user_id: userId,
            title: title.trim(),
            ticket_cost: parseFloat(ticketCost),
            theatre_name: theatreName.trim(),
            watched_date: formatDate(watchedDate),
            movie_format: movieFormat,
            theatre_format: theatreFormat
        };

        try {
            const response = await fetch('https://cinedairy.onrender.com/api/v3/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    'Success',
                    'Movie added successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setTitle('');
                                setTicketCost('');
                                setTheatreName('');
                                setWatchedDate(new Date());
                                setMovieFormat('2D');
                                setTheatreFormat('PVR');
                                navigation?.goBack();
                            }
                        }
                    ]
                );
            } else {
                Alert.alert('Error', data.msg || 'Failed to add movie');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
            console.error('Error adding movie:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.title}>Add New Movie</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter movie name"
                        placeholderTextColor={COLORS.inputPlaceholderColor}
                    />
                </View>

                {/* Ticket Cost */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ticket Cost (₹) *</Text>
                    <TextInput
                        style={styles.input}
                        value={ticketCost}
                        onChangeText={setTicketCost}
                        placeholder="Enter ticket cost"
                        placeholderTextColor={COLORS.inputPlaceholderColor}
                        keyboardType="decimal-pad"
                    />
                </View>

                {/* Theatre Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Theatre Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={theatreName}
                        onChangeText={setTheatreName}
                        placeholder="Enter theatre name"
                        placeholderTextColor={COLORS.inputPlaceholderColor}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Watched Date *</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.dateText}>
                            {watchedDate.toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                timeZone: 'Asia/Kolkata',
                            })}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={watchedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Watched Format</Text>
                    <View style={styles.radioGroup}>
                        {movieFormats.map((format) => (
                            <TouchableOpacity
                                key={format}
                                style={[
                                    styles.radioButton,
                                    movieFormat === format && styles.radioButtonSelected
                                ]}
                                onPress={() => setMovieFormat(format)}
                            >
                                <Text style={[
                                    styles.radioText,
                                    movieFormat === format && styles.radioTextSelected
                                ]}>
                                    {format}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Theatre Format</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.formatScroll}
                    >
                        <View style={styles.radioGroup}>
                            {theatreFormats.map((format) => (
                                <TouchableOpacity
                                    key={format}
                                    style={[
                                        styles.formatButton,
                                        theatreFormat === format && styles.formatButtonSelected
                                    ]}
                                    onPress={() => setTheatreFormat(format)}
                                >
                                    <Text style={[
                                        styles.formatText,
                                        theatreFormat === format && styles.formatTextSelected
                                    ]}>
                                        {format}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>Add</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddMovie;