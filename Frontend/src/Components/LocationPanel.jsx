import React from 'react';
import { MapPin } from 'lucide-react';

const LocationPanel = ({ inputType = 'pickup', onSelect, suggestions = [] }) => {
  // Convert backend suggestions to expected format
  const suggestionLocations = suggestions.map((item, index) => ({
    name: item.description,
    description: item.description,
    id: index,
  }));

  return (
    <div className="mt-4 space-y-2">
      {suggestionLocations.map((loc) => (
        <div
          key={loc.id}
          onClick={() => onSelect(loc.description)}
          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer shadow-sm transition"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{loc.name}</p>
            <p className="text-xs text-gray-400">{loc.description}</p>
          </div>
        </div>
      ))}

      {suggestionLocations.length === 0 && (
        <p className="text-sm text-gray-500 text-center">No suggestions yet.</p>
      )}
    </div>
  );
};

export default LocationPanel;





