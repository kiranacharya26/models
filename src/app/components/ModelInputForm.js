import { useState } from 'react';

export default function ModelInputForm({ inputs, onPredict }) {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(',')[1]); // Remove base64 prefix
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, Image: image };
    onPredict(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {inputs.map((input) => (
        <div key={input.name}>
          <label className="block text-sm font-medium">{input.description}</label>
          {input.type === 'image' ? (
            <input
              type="file"
              name={input.name}
              onChange={handleImageChange}
              accept="image/*"
              required={input.required}
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              type={input.type}
              name={input.name}
              onChange={handleChange}
              required={input.required}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Predict
      </button>
    </form>
  );
}
