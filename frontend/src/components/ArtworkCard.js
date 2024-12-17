import React from 'react';

const ArtworkCard = ({ art }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-200 shadow-sm">
                <img
                    src={art.image_url}
                    alt={art.title}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '400px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{art.title}</h5>
                    <p className="card-text">
                        <strong>Artist:</strong> {art.artist || 'Unknown'} <br />
                        <strong>Medium:</strong> {art.medium} <br />
                        <strong>Year:</strong> {art.year}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
