import { styles } from "@/assets/style/history.style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function HistoryNotFound() {
    const router = useRouter();

    const handleAddMovie = () => {
        router.push('/add');
    };
    return (
        <View style={styles.historyNotFoundContainer}>
            <Ionicons
                name="sad"
                size={24}
                style={styles.historyNotFoundLogo}
            />
            <Text style={styles.historyNotFoundText}>History not found</Text>
        </View>
    );
}
