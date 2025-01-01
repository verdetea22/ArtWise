import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkList from './components/ArtworkList';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [medium, setMedium] = useState('');
    const [likedArtworks, setLikedArtworks] = useState([]); // Array for liked artworks

    // Fetch data with filters and pagination
    const fetchArtworks = () => {
        setLoading(true);
        axios.get('http://localhost:3001/api/met-art', {
            params: { limit, page, startYear, endYear, medium }
        })
            .then(response => {
                console.log("Data received:", response.data);
                setArtworks(response.data.artworks);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching artworks:", error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchArtworks();
    }, [page, limit]);

    // Handle like/unlike functionality
    const handleLike = (art) => {
        setLikedArtworks((prev) => {
            if (prev.some((a) => a.objectID === art.objectID)) {
                // Remove from liked artworks
                return prev.filter((a) => a.objectID !== art.objectID);
            } else {
                // Add to liked artworks
                return [...prev, art];
            }
        });
    };

    // Determine if an artwork is liked
    const isLiked = (art) => likedArtworks.some((a) => a.objectID === art.objectID);

    // Handlers
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setPage(1); // Reset to first page
        fetchArtworks();
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">MET Museum Art</h1>

            {/* Filters */}
            <form onSubmit={handleFilterSubmit} className="mb-4">
                <div className="row">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Start Year"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="End Year"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Medium (e.g., oil, watercolor)"
                            value={medium}
                            onChange={(e) => setMedium(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary w-100" type="submit">Apply Filters</button>
                    </div>
                </div>
            </form>

            {/* Page Size Dropdown */}
            <div className="mb-3">
                <label>Artworks Per Page:</label>
                <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="100">120</option>
                </select>
            </div>

            {/* Artwork List */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ArtworkList
                    artworks={artworks}
                    onLike={handleLike}   // Pass like handler
                    isLiked={isLiked}     // Pass liked status function
                />
            )}

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;
