import Skeleton from 'react-loading-skeleton';

export const Loading = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow space-y-3">
            <Skeleton height={192} customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)"/>
            <Skeleton height={24} width={`60%`} customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)"/>
            <Skeleton height={16} width={`40%`} customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)"/>
            <Skeleton count={3} customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)"/>
            <Skeleton height={20} width={`30%`} customHighlightBackground="linear-gradient(90deg, var(--base-color) 40%, var(--highlight-color) 50%, var(--base-color) 60%)"/>
          </div>
        ))}
      </div>
    </div>
  )
};
