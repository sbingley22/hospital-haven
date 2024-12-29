import { useGameStore } from "../../useGameStore"
import { diseaseInfo } from "../../assets/Diagnostics";
import { useState } from "react";

const BookHud = () => {
  const { setPaused, bookHud, setBookHud } = useGameStore()
  const [currentBook, setCurrentBook] = useState(null)

  const closeMenu = () => {
    setBookHud(false)
    setPaused(false)
  }

  return bookHud ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5 max-w-5xl h-4/5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Text Books</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => closeMenu()}
        >
          &times;
        </button>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-2">{currentBook && currentBook}</h3>
            <p className="mb-2">
              {currentBook && diseaseInfo[currentBook]}
            </p>
          </div>

          {/* Columns for Text Books */}
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {Object.keys(diseaseInfo).map((d, index) => (
              (
                <button
                  key={d + index}
                  className="text-left mb-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => setCurrentBook(d)}
                >
                  {d}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default BookHud
