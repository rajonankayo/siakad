export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-lg
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          p-6 rounded-xl shadow-xl
          border border-gray-200 dark:border-gray-700
          max-h-[90vh] overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-gray-500 hover:text-red-500
            dark:text-gray-300 dark:hover:text-red-400
            text-xl font-bold
          "
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="overflow-y-auto max-h-[85vh] pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}