import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkList from './components/ArtworkList';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            {loading ? <LoadingSpinner /> : <ArtworkList artworks={artworks} />}
        </div>
    );
};

export default App;
