import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const AutocompleteSearch = ({ 
  doctors, 
  searchQuery, 
  onSearchChange, 
  onSelectDoctor 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const getSuggestions = (query) => {
      if (!query) return [];
      const lowerQuery = query.toLowerCase();
      // Sort matches by how closely they match the query
      return doctors
        .filter(doctor => doctor.name.toLowerCase().includes(lowerQuery))
        .sort((a, b) => {
          const aIndex = a.name.toLowerCase().indexOf(lowerQuery);
          const bIndex = b.name.toLowerCase().indexOf(lowerQuery);
          if (aIndex === bIndex) {
            return a.name.length - b.name.length; // Shorter names first if match position is same
          }
          return aIndex - bIndex; // Earlier matches first
        })
        .slice(0, 3);
    };

    const matches = getSuggestions(searchQuery);
    setSuggestions(matches);
    setShowSuggestions(searchQuery.length > 0 && matches.length > 0);
  }, [searchQuery, doctors]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleSuggestionClick = (doctor) => {
    onSelectDoctor(doctor);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          data-testid="autocomplete-input"
          type="text"
          placeholder="Search for doctors"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(searchQuery.length > 0 && suggestions.length > 0)}
          className="w-full p-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 divide-y divide-gray-100">
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                data-testid="suggestion-item"
                onClick={() => handleSuggestionClick(doctor)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="text-gray-900 font-medium">{doctor.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {doctor.specialities?.[0]?.name || 'General Physician'}
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