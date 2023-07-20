  // Error Component
  const ErrorComponent = ({ message, reset }: { message: string; reset: () => void; }) => {
    return (
      <div className="flex flex-col items-center justify-center bg-red-50 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">{message}</h2>
        <button onClick={reset} className="px-4 py-2 text-sm font-medium text-red-900 bg-red-100 rounded hover:bg-red-200">
          Try Again
        </button>
      </div>
    );
  };
  
  export default ErrorComponent;