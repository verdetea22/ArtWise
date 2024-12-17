import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        console.log("Fetching artworks from backend...");
        axios.get('http://localhost:3001/api/met-art') // Correct backend endpoint
            .then(response => {
                console.log("Data received:", response.data);
                setArtworks(response.data);
            })
            .catch(error => {
                console.error("Error fetching artworks:", error.message);
            });
    }, []);

    return (
        <div>
            <h1>MET Museum Art</h1>
            {artworks.length === 0 ? (
                <p>Loading artworks...</p>
            ) : (
                <ul>
                    {artworks.map((art) => (
                        <li key={art.objectID}>
                            <h2>{art.title}</h2>
                            <p><strong>Artist:</strong> {art.artist}</p>
                            <p><strong>Medium:</strong> {art.medium}</p>
                            <p><strong>Year:</strong> {art.year}</p>
                            <img src={art.image_url} alt={art.title} width="200" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
