interface SkeletonWrapperProps {
  isLoading: boolean;
  children?: React.ReactNode;
  placeholder?: React.ReactNode;
  items?: number;
}

export const SkeletonWrapper = ({
  children,
  isLoading,
  placeholder = null,
  items = 1,
}: SkeletonWrapperProps) => {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: items }).map((_, index) => (
          <div key={index}>{placeholder || "Loading..."}</div>
        ))}
      </>
    );
  }
  return children;
};
