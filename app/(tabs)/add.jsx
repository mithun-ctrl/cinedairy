import { styles } from "@/assets/style/add.style";
import { COLORS } from "@/constant/colors";
import { TMDB_API_KEY } from "@/hooks/key";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const AddMovie = ({ navigation }) => {
    const { user } = useUser();
    const userId = user?.id;
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [ticketCost, setTicketCost] = useState('');
    const [theatreName, setTheatreName] = useState('');
    const [watchedDate, setWatchedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [movieFormat, setMovieFormat] = useState('2D');
    const [theatreFormat, setTheatreFormat] = useState('PVR');
    const [posterUrl, setPosterUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [results, setResults] = useState([]);
    const [isMovieSelected, setIsMovieSelected] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const theatreFormats = ['PVR', '4DX', 'EPIQ', 'IMAX', 'DOLBY', 'SINGLE SCREEN', 'OTHER'];
    const movieFormats = ['2D', '3D'];

    const posterBaseUrl = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        if (title.length < 2 || isMovieSelected) {
            setResults([]);
            if (isMovieSelected) {
                setIsMovieSelected(false);
            }
            return;
        }

        const timer = setTimeout(() => {
            fetchMovies(title);
        }, 400);

        return () => clearTimeout(timer);
    }, [title]);

    const fetchMovies = async (searchTerm) => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`
            );
            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            console.error("Error fetching TMDB:", err);
        }
    };

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
            theatre_format: theatreFormat,
            poster_url: posterUrl
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
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Add New Movie</Text>
                <TouchableOpacity
                    style={[styles.addButtonContainer, isLoading && styles.addButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isLoading}>
                    <Text style={styles.addButton}>{isLoading ? "Adding..." : "Add"}</Text>
                    {!isLoading && <Ionicons name='checkmark' size={20} color={COLORS.primary} />}
                </TouchableOpacity>
            </View>

            {/* Movie Title with Enhanced Suggestions */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Movie Name *</Text>
                <View style={[
                    styles.inputContainer,
                    focusedInput === 'title' && styles.inputContainerFocused
                ]}>
                    <Ionicons 
                        name="film-outline" 
                        size={20} 
                        color={focusedInput === 'title' ? COLORS.primary : COLORS.textMuted} 
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.inputWithIcon}
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            setIsMovieSelected(false);
                        }}
                        onFocus={() => setFocusedInput('title')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Search for a movie..."
                        placeholderTextColor={COLORS.textMuted}
                    />
                    {title.length > 0 && (
                        <TouchableOpacity onPress={() => {
                            setTitle('');
                            setIsMovieSelected(false);
                            setResults([]);
                        }}>
                            <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>
                
                {results.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        <ScrollView
                            style={styles.suggestions}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"
                        >
                            {results.map((item) => (
                                <TouchableOpacity
                                    key={item.id.toString()}
                                    style={styles.suggestionItem}
                                    onPress={() => {
                                        setTitle(item.title);
                                        setPosterUrl(`${posterBaseUrl}${item.poster_path}`);
                                        setIsMovieSelected(true);
                                        setResults([]);
                                    }}
                                >
                                    <View style={styles.posterContainer}>
                                        {item.poster_path ? (
                                            <Image
                                                source={{ uri: `https://image.tmdb.org/t/p/w92${item.poster_path}` }}
                                                style={styles.poster}
                                            />
                                        ) : (
                                            <View style={styles.posterPlaceholder}>
                                                <Ionicons name="image-outline" size={20} color={COLORS.textMuted} />
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.suggestionTextContainer}>
                                        <Text style={styles.suggestionTitle} numberOfLines={1}>
                                            {item.title}<Text style={styles.suggestionYear}> ({item.release_date?.split("-")[0] || "N/A"})</Text>                                            
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Ticket Cost */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Ticket Cost *</Text>
                <View style={[
                    styles.inputContainer,
                    focusedInput === 'cost' && styles.inputContainerFocused
                ]}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                        style={styles.inputWithIcon}
                        value={ticketCost}
                        onChangeText={setTicketCost}
                        onFocus={() => setFocusedInput('cost')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter ticket cost"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="decimal-pad"
                    />
                </View>
            </View>

            {/* Theatre Name */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Theatre Name *</Text>
                <View style={[
                    styles.inputContainer,
                    focusedInput === 'theatre' && styles.inputContainerFocused
                ]}>
                    <Ionicons 
                        name="location-outline" 
                        size={20} 
                        color={focusedInput === 'theatre' ? COLORS.primary : COLORS.textMuted}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.inputWithIcon}
                        value={theatreName}
                        onChangeText={setTheatreName}
                        onFocus={() => setFocusedInput('theatre')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter theatre name"
                        placeholderTextColor={COLORS.textMuted}
                    />
                </View>
            </View>

            {/* Watched Date */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Watched Date *</Text>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}>
                    <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
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

            {/* Movie Format */}
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

            {/* Theatre Format - Wrapped Grid */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Theatre Format</Text>
                <View style={styles.formatGrid}>
                    {theatreFormats.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.formatChip,
                                theatreFormat === item && styles.formatChipSelected
                            ]}
                            onPress={() => setTheatreFormat(item)}
                        >
                            <Text
                                style={[
                                    styles.formatChipText,
                                    theatreFormat === item && styles.formatChipTextSelected
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default AddMovie;