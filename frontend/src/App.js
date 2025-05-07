import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import DatasetList from "./components/DatasetList";
import DatasetDetail from "./components/DatasetDetail";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [datasetsPerPage] = useState(6);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async (params = {}) => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/datasets/search", {
        params,
      });
      setDatasets(response.data);
      setError(null);
    } catch (err) {
      setError(`Error: ${err.message}. Please check your connection or try again later.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    setCurrentPage(1);
    fetchDatasets(filters);
  };

  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = datasets.slice(indexOfFirstDataset, indexOfLastDataset);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="App">
        {/* Project Header */}
        <header className="header">
          <img src= "CLIMM222-1536x864.png" alt="Project Logo" className="logo" />
          <h1>Data Catalog For CLIMB Project</h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm onSearch={handleSearch} />
                {loading && <div className="spinner"></div>}
                {error && <p className="error">{error}</p>}
                <DatasetList datasets={currentDatasets} />
                <Pagination
                  datasetsPerPage={datasetsPerPage}
                  totalDatasets={datasets.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </>
            }
          />
          <Route path="/datasets/:id" element={<DatasetDetail />} />
        </Routes>
        {/* Footer with Copyright */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} CLIMB. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;