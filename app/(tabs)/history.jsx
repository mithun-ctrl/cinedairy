import { styles } from "@/assets/style/history.style";
import HistoryNotFound from "@/components/HistoryNotFound";
import ScreenLoader from "@/components/ScreenLoader";
import { COLORS } from "@/constant/colors";
import { useMovies } from "@/hooks/useMovie";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const History = () => {
    const { user } = useUser();
    const { movies, summary, isLoading, refreshMovies, removeMovie, updateMovie } = useMovies(user?.id);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: '',
        ticket_cost: '',
        theatre_name: '',
        watched_date: '',
        movie_format: '2D',
        theatre_format: '',
        poster_url: ''
    });

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                refreshMovies();
            }
        }, [user?.id])
    );
    const formatDateToIST = (dateString) => {
        const date = new Date(dateString);
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleString('en-IN', options);
    };

    const handleDelete = (movieId, movieTitle) => {
        Alert.alert(
            "Delete Movie",
            `Are you sure you want to delete "${movieTitle}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await removeMovie(movieId);
                    }
                }
            ]
        );
    };

    const handleUpdatePress = (movie) => {
        setSelectedMovie(movie);
        setUpdatedData({
            title: movie.title,
            ticket_cost: movie.ticket_cost.toString(),
            theatre_name: movie.theatre_name,
            watched_date: movie.watched_date,
            movie_format: movie.movie_format || '2D',
            theatre_format: movie.theatre_format || 'Standard',
            poster_url: movie.poster_url || ''
        });
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        if (!selectedMovie) return;

        const updatedFields = {
            title: updatedData.title,
            ticket_cost: parseFloat(updatedData.ticket_cost),
            theatre_name: updatedData.theatre_name,
            watched_date: updatedData.watched_date,
            movie_format: updatedData.movie_format,
            theatre_format: updatedData.theatre_format,
            poster_url: updatedData.poster_url
        };

        await updateMovie(selectedMovie.id, updatedFields);
        setModalVisible(false);
        setSelectedMovie(null);
    };

    const renderMovieItem = ({ item }) => (
        <View style={styles.movieCard}>
            <Image
                source={{ uri: item.poster_url || 'https://via.placeholder.com/100x150' }}
                style={styles.posterImage}
                resizeMode="cover"
            />

            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>
                    {item.title}
                </Text>

                <Text style={styles.theatreInfo}>
                    {item.theatre_name} | {item.theatre_format || 'Standard'}
                </Text>

                <Text style={styles.ticketCost}>
                    ₹{item.ticket_cost}
                </Text>

                <Text style={styles.watchDate}>
                    {formatDateToIST(item.watched_date)}
                </Text>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleUpdatePress(item)}
                >
                    <Ionicons name="pencil" size={20} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(item.id, item.title)}
                >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <View style={styles.container}>
            {isLoading ? (
                <ScreenLoader />
            ) : movies?.length===0 ? (<HistoryNotFound/>) : (
                <FlatList
                    data={movies}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={refreshMovies}
                        />
                    }
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Your Movie History</Text>
                            <Text style={styles.headerSubtitle}>
                                Total Movies: {summary?.totalMovies || 0}
                            </Text>
                        </View>
                    }
                />
            )}

            {/* Update Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>Update Movie</Text>

                            <Text style={styles.inputLabel}>Title</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedData.title}
                                onChangeText={(text) => setUpdatedData({...updatedData, title: text})}
                                placeholder="Title"
                                placeholderTextColor={COLORS.primary}
                            />

                            <Text style={styles.inputLabel}>Ticket Cost (₹)</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedData.ticket_cost}
                                onChangeText={(text) => setUpdatedData({...updatedData, ticket_cost: text})}
                                placeholder="Ticket Cost"
                                keyboardType="numeric"
                            />

                            <Text style={styles.inputLabel}>Theatre Name</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedData.theatre_name}
                                onChangeText={(text) => setUpdatedData({...updatedData, theatre_name: text})}
                                placeholder="Theatre Name"
                            />

                            <Text style={styles.inputLabel}>Theatre Format</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={updatedData.theatre_format}
                                    onValueChange={(itemValue) => setUpdatedData({...updatedData, theatre_format: itemValue})}
                                    style={styles.picker}>
                                    <Picker.Item style={styles.picker} label="IMAX" value="IMAX" />
                                    <Picker.Item style={styles.picker} label="4DX" value="4DX" />
                                    <Picker.Item style={styles.picker} label="PVR" value="PVR" />
                                    <Picker.Item style={styles.picker} label="EPIQ" value="EPIQ" />
                                    <Picker.Item style={styles.picker} label="DOLBY" value="DOLBY" />
                                    <Picker.Item style={styles.picker} label="SINGLE SCREEN" value="SINGLE SCREEN" />
                                    <Picker.Item style={styles.picker} label="OTHER" value="OTHER" />
                                </Picker>
                            </View>

                            <Text style={styles.inputLabel}>Experienced In</Text>
                            <View style={styles.formatButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.formatButton,
                                        updatedData.movie_format === '2D' && styles.formatButtonActive
                                    ]}
                                    onPress={() => setUpdatedData({...updatedData, movie_format: '2D'})}
                                >
                                    <Text style={[
                                        styles.formatButtonText,
                                        updatedData.movie_format === '2D' && styles.formatButtonTextActive
                                    ]}>2D</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.formatButton,
                                        updatedData.movie_format === '3D' && styles.formatButtonActive
                                    ]}
                                    onPress={() => setUpdatedData({...updatedData, movie_format: '3D'})}
                                >
                                    <Text style={[
                                        styles.formatButtonText,
                                        updatedData.movie_format === '3D' && styles.formatButtonTextActive
                                    ]}>3D</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.modalButton, styles.updateButton]}
                                    onPress={handleUpdate}
                                >
                                    <Text style={styles.updateButtonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default History;