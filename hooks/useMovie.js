import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_BASE_URL = "https://cinedairy.onrender.com/api/v3";


export const useMovies = (userId) => {
  const [movies, setMovies] = useState([]);
  const [summary, setSummary] = useState({
    totalMovies: 0,
    totalTicketCost: 0,
    movie2DCount: 0,
    movie3DCount: 0,
    mostExpensiveTicket: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.log("Error fetching movies:", error);
      Alert.alert("Error", "Could not load movies.");
    }
  }, [userId]);

  const getSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/summary/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch summary");
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error fetching summary:", error);
      Alert.alert("Error", "Could not load summary data.");
    }
  }, [userId]);

  const refreshMovies = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([getMovies(), getSummary()]);
    } catch (error) {
      console.log("Error refreshing movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getMovies, getSummary, userId]);

  const removeMovie = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete movie");
        await refreshMovies();
        Alert.alert("Success", "Movie deleted successfully!");
      } catch (error) {
        console.log("Error deleting movie:", err);
        Alert.alert("Error", err.message);
      }
    },
    [refreshMovies]
  );

  const updateMovie = useCallback(
    async (id, updatedFields) => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        });
          console.log(response);
        if (!response.ok) throw new Error("Failed to update movie");
        await refreshMovies();
        Alert.alert("Success", "Movie updated successfully!");
      } catch (error) {
        console.log("Error updating movie:", err);
        Alert.alert("Error", err.message);
      }
    },
    [refreshMovies]
  );

  return { movies, summary, isLoading, refreshMovies, removeMovie, updateMovie };
};