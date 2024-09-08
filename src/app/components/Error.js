const Error = ({ message }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
      <strong>Error:</strong> {message}
    </div>
  </div>
);

export default Error;
