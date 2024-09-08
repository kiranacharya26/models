// src/app/page.js
"use client";
import { useEffect, useState } from "react";
import axios from "./lib/api";
import ModelCard from "./components/ModelCard";
import Loader from "./components/Loader";
import Error from "./components/Error";

export default function HomePage() {
  const [modelSpaces, setModelSpaces] = useState([]);
  const [filteredModelSpaces, setFilteredModelSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [uniqueTypes, setUniqueTypes] = useState(["all"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModelSpaces() {
      try {
        const response = await axios.get("/model-spaces");
        const data = response.data.data || [];
        setModelSpaces(data);
        setFilteredModelSpaces(data);

        // Extract unique types for the filter dropdown
        const types = new Set(
          data.flatMap((model) => model.inputs?.map((input) => input.type) || [])
        );
        setUniqueTypes(["all", ...Array.from(types)]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchModelSpaces();
  }, []);

  useEffect(() => {
    const filtered = modelSpaces.filter((model) => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" ||
        model.inputs?.some((input) => input.type === filterType) || false;
      return matchesSearch && matchesFilter;
    });
    setFilteredModelSpaces(filtered);
  }, [searchTerm, filterType, modelSpaces]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Available Model Spaces
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <input
          type="text"
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          placeholder="Search model spaces..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
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
