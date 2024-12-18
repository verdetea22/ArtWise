import React from 'react';

const ArtworkCard = ({ art, onLike, liked }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img
                    src={art.image_url}
                    alt={art.title}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{art.title}</h5>
                    <p className="card-text">
                        <strong>Artist:</strong> {art.artist || 'Unknown'} <br />
                        <strong>Medium:</strong> {art.medium} <br />
                        <strong>Year:</strong> {art.year}
                    </p>
                    <button
                        className={`btn ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => onLike(art)}
                    >
                        {liked ? 'Unlike ❤️' : 'Like 🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
