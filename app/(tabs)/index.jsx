import { styles } from "@/assets/style/home.style";
import NoMovieFound from "@/components/NoMovieFound";
import ScreenLoader from '@/components/ScreenLoader';
import { SignOutButton } from '@/components/SignOutButton';
import { COLORS } from "@/constant/colors";
import { useMovies } from "@/hooks/useMovie";
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function Page() {
    const { user } = useUser();

    const { movies, summary, isLoading, refreshMovies, removeMovie, updateMovie } = useMovies(user?.id);

    const ticket = summary?.mostExpensiveTicket;
    const hasMovies = !ticket;

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                refreshMovies();
            }
        }, [user?.id])
    );
    if (isLoading) return <ScreenLoader />
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
                <SignOutButton />
            </View>

            {/* First Card - Summary Statistics */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Your Statistics</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Ionicons name="film" size={20} style={styles.statIcons}/>
                        <Text style={styles.statValue}>{summary.totalMovies}</Text>
                        <Text style={styles.statLabel}>Total Movies</Text>
                    </View>
                    <View style={styles.statItem}>
                         <Ionicons name="wallet" size={20} style={styles.statIcons}/>
                        <Text style={styles.statValue}>₹{summary.totalTicketCost}</Text>
                        <Text style={styles.statLabel}>Total Spent</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="eye" size={20} style={styles.statIcons}/>
                        <Text style={styles.statValue}>{summary.movie2DCount}</Text>
                        <Text style={styles.statLabel}>2D Experience</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="glasses" size={20} style={styles.statIcons}/>
                        <Text style={styles.statValue}>{summary.movie3DCount}</Text>
                        <Text style={styles.statLabel}>3D Experience</Text>
                    </View>
                </View>
            </View>

            {/* Second Card - Most Expensive Ticket */}
            {hasMovies ? (
                <NoMovieFound />
            ) : (
                ticket && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                        <Ionicons style={{color: COLORS.textMuted}} name="trophy" size={20}/> Premium Experience
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
            )}
        </ScrollView>
    )
}
