import React from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkList = ({ artworks }) => {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">MET Museum Art</h1>
            <div className="row">
                {artworks.map((art) => (
                    <ArtworkCard key={art.objectID} art={art} />
                ))}
            </div>
        </div>
    );
};

export default ArtworkList;
