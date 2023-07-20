// Success Component
const SuccessComponent = ({ message, reset }: { message: string; reset: () => void; }) => {
    return (
      <div className="flex flex-col items-center justify-center bg-green-50 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">{message}</h2>
        <button onClick={reset} className="px-4 py-2 text-sm font-medium text-green-900 bg-green-100 rounded hover:bg-green-200">
          Create Another Collection
        </button>
      </div>
    );
  };
  
export default SuccessComponent;