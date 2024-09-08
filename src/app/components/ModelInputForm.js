import { useState } from 'react';

export default function ModelInputForm({ inputs, onPredict }) {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (type) {
          case 'image':
            setImage(reader.result.split(',')[1]); 
            break;
          case 'video':
            setVideo(reader.result.split(',')[1]);
            break;
          case 'audio':
            setAudio(reader.result.split(',')[1]);
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, Image: image, Video: video, Audio: audio };
    onPredict(data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      {inputs.map((input) => (
        <div key={input.name} className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">{input.description}</label>
          {input.type === 'image' ? (
            <input
              type="file"
              name={input.name}
              onChange={(e) => handleFileChange(e, 'image')}
              accept="image/*"
              required={input.required}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : input.type === 'video' ? (
            <input
              type="file"
              name={input.name}
              onChange={(e) => handleFileChange(e, 'video')}
              accept="video/*"
              required={input.required}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : input.type === 'audio' ? (
            <input
              type="file"
              name={input.name}
              onChange={(e) => handleFileChange(e, 'audio')}
              accept="audio/*"
              required={input.required}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type={input.type}
              name={input.name}
              onChange={handleChange}
              required={input.required}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Predict
      </button>
    </form>
  );
}
