import { db } from "@/hooks/firebase";
import { onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react"; // Added useCallback
import { Alert } from "react-native";
import { Config } from "./key";

export const useMovies = (userId) => {
  const [movies, setMovies] = useState([]);
  const [history, setHistory] = useState([]); // This will hold the filtered list
  const [summary, setSummary] = useState({
    totalMovies: 0,
    totalTicketCost: 0,
    movie2DCount: 0,
    movie3DCount: 0,
    mostExpensiveTicket: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const moviesRef = ref(db, `users/${userId}/movies`);

    const unsubscribe = onValue(
      moviesRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const movieList = Object.entries(data).map(([id, movie]) => ({
          id,
          ...movie,
        }));

        const reversedList = movieList.reverse();
        setMovies(reversedList);
        
        // Initialize history with all movies by default to prevent empty screen
        setHistory(reversedList); 
        setIsLoading(false);
      },
      (error) => {
        console.error("Firebase error:", error);
        setIsLoading(false);
        Alert.alert("Error", "Failed to load movies");
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // 2. Calculate Summary
  useEffect(() => {
    if (!movies.length) {
      setSummary({
        totalMovies: 0,
        totalTicketCost: 0,
        movie2DCount: 0,
        movie3DCount: 0,
        mostExpensiveTicket: null,
      });
      return;
    }

    const totalMovies = movies.length;
    const totalTicketCost = Number(
      movies.reduce((sum, m) => sum + Number(m.ticket_cost || 0), 0).toFixed(2)
    );

    const movie2DCount = movies.filter((m) => m.movie_format === "2D").length;
    const movie3DCount = movies.filter((m) => m.movie_format === "3D").length;

    const mostExpensiveTicket = movies.reduce((max, m) => {
      return Number(m.ticket_cost) > Number(max.ticket_cost) ? m : max;
    }, movies[0]);

    setSummary({
      totalMovies,
      totalTicketCost,
      movie2DCount,
      movie3DCount,
      mostExpensiveTicket,
    });
  }, [movies]);

  // 3. Filtering Logic
  const getHistoryByDuration = useCallback((duration = "all") => {
    if (!movies.length) return;

    if (duration === "all") {
      setHistory(movies);
      return;
    }

    const now = new Date();
    const filtered = movies.filter((movie) => {
      const watched = new Date(movie.watched_date);
      
      if (duration === "week") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return watched >= oneWeekAgo;
      }

      if (duration === "month") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return watched >= oneMonthAgo;
      }
      
      return true;
    });

    setHistory(filtered);
  }, [movies]);

  const removeMovie = async (movieId) => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/movie/${userId}/${movieId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete movie");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const updateMovie = async (movieId, updatedFields) => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/movie/${userId}/${movieId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        }
      );
      if (!response.ok) throw new Error("Failed to update movie");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return {
    movies,
    summary,
    history, // Expose the filtered list
    isLoading,
    updateMovie,
    removeMovie,
    getHistoryByDuration,
  };
};