import { formatOutput } from '../utils/formatOutput';

export default function ModelOutput({ outputs, data, time }) {
  return (
    <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Model Outputs</h2>
      <p className="mb-2 text-gray-700">API Response Time: {time} ms</p>
      <div className="space-y-4">
        {outputs.map((output) => {
          const value = data[output.name];
          return (
            <div key={output.name}>
              <h3 className="text-lg font-semibold">{output.description}</h3>
              {output.type === 'image' && value ? (
                <img
                  src={value} // Direct URL to the image
                  alt={output.description}
                  className="w-full h-auto"
                />
              ) : (
                <p>{formatOutput(output.type, value)}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
