import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkList from './components/ArtworkList';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likedArtworks, setLikedArtworks] = useState([]); 
    const [showLiked, setShowLiked] = useState(false); 

    useEffect(() => {
        axios.get('http://localhost:3001/api/met-art')
            .then(response => {
                console.log("Data received:", response.data);
                setArtworks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching artworks:", error.message);
                setLoading(false);
            });
    }, []);

    // Toggle like functionality
    const handleLike = (art) => {
        setLikedArtworks((prev) => {
            if (prev.some(a => a.objectID === art.objectID)) {
                // Remove from liked collection
                return prev.filter(a => a.objectID !== art.objectID);
            } else {
                // Add to liked collection
                return [...prev, art];
            }
        });
    };

    
    const isLiked = (art) => likedArtworks.some(a => a.objectID === art.objectID);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">MET Museum Art</h1>

            <div className="text-center mb-4">
                <button className="btn btn-primary" onClick={() => setShowLiked(!showLiked)}>
                    {showLiked ? "Show All Artworks" : "View Liked Collection"}
                </button>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : showLiked ? (
                // Show liked collection
                <ArtworkList artworks={likedArtworks} onLike={handleLike} isLiked={isLiked} />
            ) : (
                // Show all artworks
                <ArtworkList artworks={artworks} onLike={handleLike} isLiked={isLiked} />
            )}
        </div>
    );
};

export default App;
