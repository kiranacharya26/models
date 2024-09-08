// src/components/ModelCard.js
import Link from "next/link";

const ModelCard = ({ model }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={model.avatar}
        alt={model.name}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{model.name}</h2>
        <p className="text-gray-600 mb-4">{model.description}</p>
        <Link
          href={`/model-spaces/${model.id}`}
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;
