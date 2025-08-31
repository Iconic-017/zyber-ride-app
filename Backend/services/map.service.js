const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
        const response = await axios.get(url);

        if (
            response.data.status === 'OK' &&
            response.data.results &&
            response.data.results.length > 0
        ) {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to find coordinates for the given address.');
        }
    } catch (error) {
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
      throw new Error('Origin and destination are required');
    }
  
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
  
      const response = await axios.get(url);
  
      if (response.data.status === 'OK') {
        // ✅ Accessing "routes" (not rows/element — that's from Distance Matrix API)
        const route = response.data.routes[0];
        const leg = route.legs[0];
  
        return {
          distance: leg.distance.value,
          duration: leg.duration.value,
        };
      } else if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('No routes found');
      } else {
        throw new Error(`API returned status: ${response.data.status}`);
      }
  
    } catch (error) {
      throw new Error(`Error fetching distance and time: ${error.message}`);
    }
};

module.exports.getAutoCompleteSuggestion = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            // Return the suggestions (predictions)
            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                place_id: prediction.place_id
            }));
        } else if (response.data.status === 'ZERO_RESULTS') {
            return [];
        } else {
            throw new Error(`API returned status: ${response.data.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching autocomplete suggestions: ${error.message}`);
    }
};