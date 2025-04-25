
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import type { Doctor } from "../services/doctorService";

interface AutocompleteSearchProps {
  doctors: Doctor[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

const AutocompleteSearch = ({
  doctors,
  searchQuery,
  onSearchChange,
  onSelectDoctor,
}: AutocompleteSearchProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update suggestions when search query changes
    if (searchQuery) {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3);
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, doctors]);

  useEffect(() => {
    // Close suggestions on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    onSelectDoctor(doctor);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          data-testid="autocomplete-input"
          type="text"
          placeholder="Search for doctors"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          onFocus={() => setShowSuggestions(searchQuery.length > 0 && suggestions.length > 0)}
          className="w-full p-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto">
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                data-testid="suggestion-item"
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center border-b last:border-b-0"
                onClick={() => handleSuggestionClick(doctor)}
              >
                <div>
                  <div className="font-semibold">{doctor.name}</div>
                  <div className="text-sm text-gray-500">
                    {doctor.specialty.slice(0, 1).join(", ")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
