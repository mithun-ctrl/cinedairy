import { styles } from "@/assets/style/home.style";
import { NavigateToProfile } from "@/components/NavigateToProfile";
import NoMovieFound from "@/components/NoMovieFound";
// Removed ScreenLoader import as we are doing inline skeleton loading
import { COLORS } from "@/constant/colors";
import { useMovies } from "@/hooks/useMovie";
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from 'react-native';

// Simple reusable Skeleton Component
const Skeleton = ({ width, height, radius = 4, style }) => (
    <View style={[styles.skeleton, { width, height, borderRadius: radius }, style]} />
);

export default function Page() {
    const { user } = useUser();
    const { summary, isLoading } = useMovies(user?.id);

    // Safe access for properties to prevent crash during loading
    const ticket = summary?.mostExpensiveTicket;
    const hasMovies = summary?.totalMovies === 0;

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={require("../../assets/images/home-popcorn.png")}
                        resizeMode='contain'
                        style={styles.headerLogo}
                    />
                    <Text style={styles.welcomeText}>Welcome, <Text style={styles.usernameText}>{user?.username}</Text></Text>
                </View>
                <NavigateToProfile />
            </View>

            {/* First Card - Summary Statistics */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Your Statistics</Text>
                <View style={styles.statsGrid}>
                    {isLoading ? (
                        // SKELETON LOADING FOR STATS
                        [1, 2, 3, 4].map((key) => (
                            <View key={key} style={styles.statItem}>
                                <Skeleton width={40} height={40} radius={20} style={{ marginBottom: 8 }} />
                                <Skeleton width={30} height={24} style={{ marginBottom: 4 }} />
                                <Skeleton width={60} height={14} />
                            </View>
                        ))
                    ) : (
                        // ACTUAL DATA
                        <>
                            <View style={styles.statItem}>
                                <Ionicons name="film" size={20} style={styles.statIcons} />
                                <Text style={styles.statValue}>{summary.totalMovies}</Text>
                                <Text style={styles.statLabel}>Total Movies</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="wallet" size={20} style={styles.statIcons} />
                                <Text style={styles.statValue}>₹{summary.totalTicketCost}</Text>
                                <Text style={styles.statLabel}>Total Spent</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="eye" size={20} style={styles.statIcons} />
                                <Text style={styles.statValue}>{summary.movie2DCount}</Text>
                                <Text style={styles.statLabel}>2D Experience</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="glasses" size={20} style={styles.statIcons} />
                                <Text style={styles.statValue}>{summary.movie3DCount}</Text>
                                <Text style={styles.statLabel}>3D Experience</Text>
                            </View>
                        </>
                    )}
                </View>
            </View>

            {/* Second Card - Most Expensive Ticket */}
            {isLoading ? (
                // SKELETON LOADING FOR TICKET CARD
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        <Ionicons style={{ color: COLORS.textMuted }} name="trophy" size={20} /> Premium Experience
                    </Text>
                    <View style={styles.ticketContent}>
                        {/* Poster Skeleton */}
                        <Skeleton width={100} height={140} radius={8} />
                        
                        {/* Text Details Skeleton */}
                        <View style={styles.ticketDetails}>
                            <Skeleton width={140} height={20} style={{marginBottom: 8}} />
                            <Skeleton width={60} height={18} style={{marginBottom: 8}} />
                            <Skeleton width={100} height={14} style={{marginBottom: 4}} />
                            <Skeleton width={120} height={14} />
                        </View>
                    </View>
                </View>
            ) : (
                // ACTUAL DATA LOGIC
                hasMovies ? (
                    <NoMovieFound />
                ) : (
                    ticket && (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>
                                <Ionicons style={{ color: COLORS.textMuted }} name="trophy" size={20} /> Premium Experience
                            </Text>
                            <View style={styles.ticketContent}>
                                <Image
                                    source={{ uri: ticket.poster_url }}
                                    style={styles.poster}
                                />
                                <View style={styles.ticketDetails}>
                                    <Text style={styles.movieTitle}>{ticket.title}</Text>
                                    <Text style={styles.ticketCost}>₹{ticket.ticket_cost}</Text>
                                    <Text style={styles.ticketInfo}>
                                        {ticket.theatre_name} | {ticket.theatre_format}
                                    </Text>
                                    <Text style={styles.ticketDate}>
                                        {new Date(ticket.watched_date).toLocaleDateString("en-IN", {
                                            weekday: "short",
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            timeZone: "Asia/Kolkata"
                                        })}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                )
            )}
        </ScrollView>
    )
}