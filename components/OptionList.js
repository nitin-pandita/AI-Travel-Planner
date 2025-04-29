export const OptionList = [
  {
    title: "Just Me",
    description: "Traveling solo? This option is perfect for you.",
    icon: "person-sharp", // Ionicons icon for a single person
    person: 1,
  },
  {
    title: "With Friends",
    description: "Traveling with friends? This option is perfect for you.",
    icon: "people-sharp", // Ionicons icon for a group of people
    person: 2,
  },
  {
    title: "With Family",
    description: "Traveling with family? This option is perfect for you.",
    icon: "person-add", // Ionicons icon for adding people (family context)
    person: 3,
  },
  {
    title: "With Partner",
    description: "Traveling with partner? This option is perfect for you.",
    icon: "heart-sharp", // Ionicons icon for a heart (relationship context)
    person: 2,
  },
  {
    title: "Group Tour",
    description: "Traveling in a group? This option is perfect for you.",
    icon: "people-outline", // Ionicons icon for a group of people
    person: 5,
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay concise for costs",
    icon: "cash-outline", // Ionicons icon for cash (budget-related)
  },
  {
    id: 2,
    title: "Normal",
    desc: "Moderate expenses, balanced for comfort and experience",
    icon: "wallet-outline", // Ionicons icon for wallet (normal budget)
  },
  {
    id: 3,
    title: "Expensive",
    desc: "High-end travel experience with luxury accommodations",
    icon: "diamond-outline", // Ionicons icon for diamond (luxury)
  },
];

export const AI_Prompt = `
You are a travel planning assistant.

Generate a travel plan for:
- Location: {location}
- Duration: {totalDay} days and {totalNight} nights
- Travellers: {traveller}
- Budget: {budget}

Include:
1. Flight details: airline, price, bookingUrl
2. Hotel options: hotelName, address, price, imageUrl, geoCoordinates, rating, description
3. Places to visit: placeName, details, imageUrl, geoCoordinates, ticketPricing, travelTime
4. Daily itinerary: day, activities[], bestTimeToVisit

🟢 Respond ONLY in pure JSON.
Do NOT include any explanation, markdown, or text before/after the JSON.

Example response:
{
  "flight": {
    "airline": "IndiGo",
    "price": "₹4,500",
    "bookingUrl": "https://example.com"
  },
  "hotels": [
    {
      "hotelName": "Hotel Sunshine",
      "address": "North Goa",
      "price": "₹1,200/night",
      "imageUrl": "https://example.com/hotel.jpg",
      "geoCoordinates": "15.2993, 74.1240",
      "rating": 4.3,
      "description": "Cozy beach hotel"
    }
  ],
  "places": [
    {
      "placeName": "Baga Beach",
      "details": "Famous for water sports",
      "imageUrl": "https://example.com/baga.jpg",
      "geoCoordinates": "15.5523, 73.7517",
      "ticketPricing": "Free",
      "travelTime": "15 min"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": ["Arrive", "Check-in", "Visit Baga Beach"],
      "bestTimeToVisit": "4 PM - Sunset"
    }
  ]
}
`;
