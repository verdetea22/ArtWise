import React from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkList = ({ artworks, onLike, isLiked }) => {
    return (
        <div className="row">
            {artworks.map((art) => (
                <ArtworkCard
                    key={art.objectID}
                    art={art}
                    onLike={onLike}     
                    liked={isLiked(art)} 
                />
            ))}
        </div>
    );
};

export default ArtworkList;
