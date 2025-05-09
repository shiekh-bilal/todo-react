export const Error = ({ error }) => {
  console.error("Caught by ErrorBoundary:", error);
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded">
      <h2 className="font-bold text-lg">Something went wrong</h2>
      <p>{error?.message}</p>
    </div>
  );
};