"use client";
import { useEffect, useState } from "react";
import axios from "./lib/api";
import ModelCard from "./components/ModelCard";
import Loader from "./components/Loader";
import Error from "./components/Error";

export default function HomePage() {
  const [modelSpaces, setModelSpaces] = useState([]);
  const [filteredModelSpaces, setFilteredModelSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchModelSpaces() {
      try {
        const response = await axios.get("/model-spaces");
        const data = response.data.data || [];
        setModelSpaces(data);
        setFilteredModelSpaces(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchModelSpaces();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = modelSpaces;

      if (searchTerm) {
        filtered = filtered.filter((model) =>
          model.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredModelSpaces(filtered);
    };

    applyFilters();
  }, [searchTerm, modelSpaces]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Available Model Spaces
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModelSpaces.length > 0 ? (
          filteredModelSpaces.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))
        ) : (
          <div className="col-span-3 text-center text-lg text-gray-500">
            No model spaces found.
          </div>
        )}
      </div>
    </div>
  );
}
