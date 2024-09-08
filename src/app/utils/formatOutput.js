export function formatOutput(type, value) {
  switch (type) {
    case 'image':
      return <img src={`data:image/png;base64,${value}`} alt="output" />;
    case 'audio':
      return <audio controls src={`data:audio/wav;base64,${value}`} />;
    default:
      return JSON.stringify(value, null, 2);
  }
}
