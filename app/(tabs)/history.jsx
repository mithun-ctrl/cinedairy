import { styles } from "@/assets/style/history.style";
import HistoryNotFound from "@/components/HistoryNotFound";
import { COLORS } from "@/constant/colors";
import { useMovies } from "@/hooks/useMovie";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// --- SKELETON COMPONENT ---
const HistorySkeleton = () => {
    // Create an array of 5 dummy items for the skeleton list
    const dummyData = [1, 2, 3, 4, 5];

    return (
        <View style={styles.container}>
            {/* Skeleton Header */}
            <View style={styles.header}>
                <View style={[styles.skeletonBox, { width: 150, height: 30, marginBottom: 10 }]} />
                <View style={[styles.skeletonBox, { width: 250, height: 15 }]} />
            </View>

            {/* Skeleton Filter Tabs */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15, gap: 10 }}>
                <View style={[styles.skeletonBox, { width: 60, height: 30, borderRadius: 15 }]} />
                <View style={[styles.skeletonBox, { width: 60, height: 30, borderRadius: 15 }]} />
                <View style={[styles.skeletonBox, { width: 60, height: 30, borderRadius: 15 }]} />
            </View>

            {/* Skeleton List */}
            {dummyData.map((item) => (
                <View key={item} style={[styles.movieCard, { opacity: 0.7 }]}>
                    {/* Poster Placeholder */}
                    <View style={[styles.skeletonBox, { width: 64, height: 92, borderRadius: 10 }]} />
                    
                    <View style={styles.movieInfo}>
                        <View>
                            {/* Title Placeholder */}
                            <View style={[styles.skeletonBox, { width: '70%', height: 16, marginBottom: 8 }]} />
                            {/* Tags Placeholder */}
                            <View style={{ flexDirection: 'row', gap: 5, marginBottom: 8 }}>
                                <View style={[styles.skeletonBox, { width: 30, height: 15 }]} />
                                <View style={[styles.skeletonBox, { width: 40, height: 15 }]} />
                            </View>
                            {/* Theatre Placeholder */}
                            <View style={[styles.skeletonBox, { width: '50%', height: 12 }]} />
                        </View>
                        {/* Bottom Row Placeholder */}
                        <View style={styles.detailsRow}>
                            <View style={[styles.skeletonBox, { width: 40, height: 15 }]} />
                            <View style={[styles.skeletonBox, { width: 80, height: 12 }]} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const History = () => {
    const { user } = useUser();
    // destructure 'history' instead of using movies directly
    const { movies, history, summary, isLoading, removeMovie, updateMovie, getHistoryByDuration } = useMovies(user?.id);
    
    // Filter State
    const [filterDuration, setFilterDuration] = useState('all'); // all, week, month

    // State for Update Modal
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

    // State for Custom Delete Modal
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);

    // State for Toast Notification
    const [isDeleting, setIsDeleting] = useState(false);
    const slideAnim = useRef(new Animated.Value(-100)).current;

    // Handle Filter Change
    const handleFilterChange = (duration) => {
        setFilterDuration(duration);
        getHistoryByDuration(duration);
    };

    // Toast Animation Effect
    useEffect(() => {
        if (isDeleting) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isDeleting]);

    const formatDateToIST = (dateString) => {
        if(!dateString) return "";
        const date = new Date(dateString);
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleString('en-IN', options);
    };

    // --- Delete Handlers ---
    const promptDelete = (movie) => {
        setMovieToDelete(movie);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        if (!movieToDelete) return;

        setDeleteModalVisible(false); 
        setIsDeleting(true); 

        setTimeout(async () => {
            await removeMovie(movieToDelete.id);
            setIsDeleting(false); 
            setMovieToDelete(null);
        }, 1000);
    };

    // --- Update Handlers ---
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
                <View style={styles.movieHeader}>
                    <Text style={styles.movieTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    
                    <View style={styles.tagContainer}>
                        <View style={styles.formatTag}>
                            <Text style={styles.formatTagText}>{item.movie_format}</Text>
                        </View>
                        <View style={styles.formatTag}>
                            <Text style={styles.formatTagText}>{item.theatre_format || 'Standard'}</Text>
                        </View>
                    </View>
                    
                    <Text style={styles.theatreInfo} numberOfLines={1}>
                        {item.theatre_name}
                    </Text>
                </View>

                <View style={styles.detailsRow}>
                    <Text style={styles.ticketCost}>
                        ₹{item.ticket_cost}
                    </Text>
                    <Text style={styles.watchDate}>
                        {formatDateToIST(item.watched_date)}
                    </Text>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleUpdatePress(item)}
                >
                    <Ionicons name="pencil" size={18} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}
                    onPress={() => promptDelete(item)}
                >
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger || '#EF4444'} />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Return Skeleton if loading
    if (isLoading) {
        return <HistorySkeleton />;
    }

    return (
        <View style={styles.container}>
            {/* --- TOAST NOTIFICATION --- */}
            <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.toast}>
                    <ActivityIndicator size="small" color={COLORS.backgroundDark} />
                    <Text style={styles.toastText}>Deleting Movie...</Text>
                </View>
            </Animated.View>

            {movies?.length === 0 ? (<HistoryNotFound/>) : (
                <FlatList
                    data={history} // Changed from movies to history
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListHeaderComponent={
                        <View>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Watch History</Text>
                                <Text style={styles.headerSubtitle}>
                                    You've watched {summary?.totalMovies || 0} movies so far.
                                </Text>
                            </View>
                            
                            {/* --- FILTER TABS --- */}
                            <View style={styles.filterContainer}>
                                <TouchableOpacity 
                                    style={[styles.filterTab, filterDuration === 'all' && styles.filterTabActive]}
                                    onPress={() => handleFilterChange('all')}
                                >
                                    <Text style={[styles.filterText, filterDuration === 'all' && styles.filterTextActive]}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.filterTab, filterDuration === 'week' && styles.filterTabActive]}
                                    onPress={() => handleFilterChange('week')}
                                >
                                    <Text style={[styles.filterText, filterDuration === 'week' && styles.filterTextActive]}>This Week</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.filterTab, filterDuration === 'month' && styles.filterTabActive]}
                                    onPress={() => handleFilterChange('month')}
                                >
                                    <Text style={[styles.filterText, filterDuration === 'month' && styles.filterTextActive]}>This Month</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            )}

            {/* --- DELETE CONFIRMATION MODAL --- */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { width: '85%', padding: 30 }]}>
                        <Ionicons 
                            name="alert-circle-outline" 
                            size={50} 
                            color={COLORS.danger || '#EF4444'} 
                            style={{ alignSelf: 'center', marginBottom: 15 }} 
                        />
                        <Text style={styles.modalTitle}>Delete Movie?</Text>
                        <Text style={styles.modalSubtitle}>
                            Are you sure you want to remove "{movieToDelete?.title}" from your history?
                        </Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButton]}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.deleteButtonText}>Yes, Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* --- UPDATE MODAL --- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Details</Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.inputLabel}>Movie Title</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedData.title}
                                onChangeText={(text) => setUpdatedData({...updatedData, title: text})}
                                placeholder="Enter title"
                                placeholderTextColor={COLORS.textMuted}
                            />

                            <Text style={styles.inputLabel}>Ticket Cost (₹)</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedData.ticket_cost}
                                onChangeText={(text) => setUpdatedData({...updatedData, ticket_cost: text})}
                                placeholder="0"
                                placeholderTextColor={COLORS.textMuted}
                                keyboardType="numeric"
                            />

                            <Text style={styles.inputLabel}>Theatre Name</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedData.theatre_name}
                                onChangeText={(text) => setUpdatedData({...updatedData, theatre_name: text})}
                                placeholder="Enter theatre name"
                                placeholderTextColor={COLORS.textMuted}
                            />

                            <Text style={styles.inputLabel}>Theatre Format</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={updatedData.theatre_format}
                                    onValueChange={(itemValue) => setUpdatedData({...updatedData, theatre_format: itemValue})}
                                    style={styles.picker}
                                    dropdownIconColor={COLORS.primary}
                                    >
                                    <Picker.Item label="IMAX" value="IMAX" />
                                    <Picker.Item label="4DX" value="4DX" />
                                    <Picker.Item label="PVR" value="PVR" />
                                    <Picker.Item label="EPIQ" value="EPIQ" />
                                    <Picker.Item label="DOLBY" value="DOLBY" />
                                    <Picker.Item label="SINGLE SCREEN" value="SINGLE SCREEN" />
                                    <Picker.Item label="OTHER" value="OTHER" />
                                </Picker>
                            </View>

                            <Text style={styles.inputLabel}>Experience Type</Text>
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
                                    <Text style={styles.cancelButtonText}>Discard</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.modalButton, styles.updateButton]}
                                    onPress={handleUpdate}
                                >
                                    <Text style={styles.updateButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height: 20}} /> 
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default History;