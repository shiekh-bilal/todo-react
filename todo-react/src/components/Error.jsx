export const Error = ({ error }) => {
  return <p>Error: {error?.message || "Something went wrong!"}</p>;
};
