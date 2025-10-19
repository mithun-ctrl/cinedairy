import { styles } from "@/assets/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function NoMovieFound() {
    const router = useRouter();

    const handleAddMovie = () => {
        router.push('/add');
    };
    return (
        <View style={styles.notFoundContainer}>
            <Image
                source={require("../assets/images/home-popcorn.png")}
                resizeMode='contain'
                style={styles.notFoundLogo}
            />
            <Text style={styles.notFoundTitle}>No Movies Yet!</Text>
            <Text style={styles.notFoundDescription}>
                Start tracking your movie journey by adding your first movie ticket.
            </Text>
            <TouchableOpacity style={styles.notFoundAddButton} onPress={handleAddMovie}>
                <Text style={styles.notFoundAddButtonText}>
                <Ionicons name="add-circle" size={16}/> Add Movie
                </Text>
            </TouchableOpacity>
        </View>
    );
}
