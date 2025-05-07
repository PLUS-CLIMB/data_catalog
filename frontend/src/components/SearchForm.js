import React, { useState } from "react";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState("");
  const [spatialResolution, setSpatialResolution] = useState("");
  const [temporalResolution, setTemporalResolution] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, source, spatial_resolution: spatialResolution, temporal_resolution: temporalResolution });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">Filter by source</option>
        <option value="ECWMF">ECWMF</option>
        <option value="FAO">FAO</option>
        <option value="NASA">NASA</option>
        <option value="WHO">WHO</option>
      </select>
      <select value={spatialResolution} onChange={(e) => setSpatialResolution(e.target.value)}>
        <option value="">Filter by spatial resolution</option>
        <option value="1 km">1 km</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select value={temporalResolution} onChange={(e) => setTemporalResolution(e.target.value)}>
        <option value="">Filter by temporal resolution</option>
        <option value="Daily">Daily</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;