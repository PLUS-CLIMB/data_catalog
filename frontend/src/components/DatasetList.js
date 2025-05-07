import React from "react";
import { useNavigate } from "react-router-dom";

function DatasetList({ datasets }) {
  const navigate = useNavigate();

  if (datasets.length === 0) {
    return <p>No datasets found.</p>;
  }

  const handleDatasetClick = (id) => {
    navigate(`/datasets/${id}`);
  };

  return (
    <div className="dataset-list">
      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          className="dataset"
          onClick={() => handleDatasetClick(dataset.id)}
          style={{ cursor: "pointer" }} // Add pointer cursor on hover
        >
          <h3>{dataset.title}</h3>
          <p><strong>Source:</strong> {dataset.source}</p>
          <p><strong>Spatial Resolution:</strong> {dataset.spatial_resolution}</p>
          <p><strong>Temporal Resolution:</strong> {dataset.temporal_resolution}</p>
          {/* <p><strong>Methodology:</strong> {dataset.methodology}</p>
          <p><strong>Limitations:</strong> {dataset.limitations}</p>
          <p><strong>Advantages:</strong> {dataset.advantages}</p>
          <p><strong>Disadvantages:</strong> {dataset.disadvantages}</p> */}
          <p><strong>URL:</strong> <a href={dataset.url} target="_blank" rel="noopener noreferrer">{dataset.url}</a></p>
        </div>
      ))}
    </div>
  );
}

export default DatasetList;
