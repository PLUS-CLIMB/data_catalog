import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DatasetDetail() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/datasets/${id}`);
        setDataset(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch dataset details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataset();
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!dataset) {
    return <p>Dataset not found.</p>;
  }

  return (
    <div className="dataset-detail">
      <img
        src="\logo192.png" // Replace with actual image URL
        alt="Cover"
        className="cover-image"
      />
      <h2>{dataset.title}</h2>
      <p><strong>Source:</strong> {dataset.source}</p>
      <p><strong>Spatial Resolution:</strong> {dataset.spatial_resolution}</p>
      <p><strong>Temporal Resolution:</strong> {dataset.temporal_resolution}</p>
      <p><strong>Methodology:</strong> {dataset.methodology}</p>
      <p><strong>Limitations:</strong> {dataset.limitations}</p>
      <p><strong>Advantages:</strong> {dataset.advantages}</p>
      <p><strong>Disadvantages:</strong> {dataset.disadvantages}</p>
      <p><strong>URL:</strong> <a href={dataset.url} target="_blank" rel="noopener noreferrer">{dataset.url}</a></p>
      <a href="/">Back to Home</a>
    </div>
  );
}

export default DatasetDetail;