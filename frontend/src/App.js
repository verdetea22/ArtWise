import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/artworks')
            .then(response => setArtworks(response.data))
            .catch(error => console.error('Error fetching artworks:', error));
    }, []);

    return (
        <div>
            <h1>Artworks</h1>
            <ul>
                {artworks.map((art) => (
                    <li key={art.id}>
                        <h2>{art.title}</h2>
                        <p>Artist: {art.artist}</p>
                        <p>Medium: {art.medium}</p>
                        <p>Year: {art.year}</p>
                        <img src={art.image_url} alt={art.title} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
