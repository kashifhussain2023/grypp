// Centralized package data for all components - used in MeetingPage, AgentCatalog, and Customer components
export const samplePackageData = [
  {
    "id": "pkg_world_001",
    "name": "World Tour Package 1",
    "title": "Exclusive Journey 1 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "2N City B",
      "3N City C"
    ],
    "duration": "6D/5N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1050,
      "discounted": 950,
      "currency": "USD",
      "per": "Adult",
      "emi": "$316/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -105,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -52,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 1",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_003",
    "name": "World Tour Package 3",
    "title": "Exclusive Journey 3 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "4N City B",
      "3N City C"
    ],
    "duration": "8D/7N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1150,
      "discounted": 1050,
      "currency": "USD",
      "per": "Adult",
      "emi": "$350/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -115,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -57,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 3",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_004",
    "name": "World Tour Package 4",
    "title": "Exclusive Journey 4 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "9D/8N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1200,
      "discounted": 1100,
      "currency": "USD",
      "per": "Adult",
      "emi": "$366/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -120,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -60,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 4",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1533106418989-88406c7cc8e2?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_008",
    "name": "World Tour Package 8",
    "title": "Exclusive Journey 8 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "3N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "13D/12N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1400,
      "discounted": 1300,
      "currency": "USD",
      "per": "Adult",
      "emi": "$433/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -140,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -70,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 8",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug",
        "012 Aug",
        "013 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_009",
    "name": "World Tour Package 9",
    "title": "Exclusive Journey 9 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "2N City B",
      "3N City C"
    ],
    "duration": "14D/4N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1450,
      "discounted": 1350,
      "currency": "USD",
      "per": "Adult",
      "emi": "$450/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -145,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -72,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 9",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug",
        "012 Aug",
        "013 Aug",
        "014 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_011",
    "name": "World Tour Package 11",
    "title": "Exclusive Journey 11 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "3N City A",
      "4N City B",
      "3N City C"
    ],
    "duration": "6D/6N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1550,
      "discounted": 1450,
      "currency": "USD",
      "per": "Adult",
      "emi": "$483/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -155,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -77,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 11",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_012",
    "name": "World Tour Package 12",
    "title": "Exclusive Journey 12 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "7D/7N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1600,
      "discounted": 1500,
      "currency": "USD",
      "per": "Adult",
      "emi": "$500/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -160,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -80,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 12",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1533106418989-88406c7cc8e2?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_016",
    "name": "World Tour Package 16",
    "title": "Exclusive Journey 16 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "11D/11N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1800,
      "discounted": 1700,
      "currency": "USD",
      "per": "Adult",
      "emi": "$566/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -180,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -90,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 16",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_017",
    "name": "World Tour Package 17",
    "title": "Exclusive Journey 17 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "3N City A",
      "2N City B",
      "3N City C"
    ],
    "duration": "12D/12N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1850,
      "discounted": 1750,
      "currency": "USD",
      "per": "Adult",
      "emi": "$583/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -185,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -92,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 17",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug",
        "012 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_019",
    "name": "World Tour Package 19",
    "title": "Exclusive Journey 19 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "4N City B",
      "3N City C"
    ],
    "duration": "14D/5N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 1950,
      "discounted": 1850,
      "currency": "USD",
      "per": "Adult",
      "emi": "$616/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -195,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -97,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 19",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug",
        "012 Aug",
        "013 Aug",
        "014 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_020",
    "name": "World Tour Package 20",
    "title": "Exclusive Journey 20 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "3N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "5D/6N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2000,
      "discounted": 1900,
      "currency": "USD",
      "per": "Adult",
      "emi": "$633/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -200,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -100,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 20",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1533106418989-88406c7cc8e2?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_024",
    "name": "World Tour Package 24",
    "title": "Exclusive Journey 24 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "9D/10N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2200,
      "discounted": 2100,
      "currency": "USD",
      "per": "Adult",
      "emi": "$700/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -220,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -110,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 24",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_025",
    "name": "World Tour Package 25",
    "title": "Exclusive Journey 25 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "2N City B",
      "3N City C"
    ],
    "duration": "10D/11N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2250,
      "discounted": 2150,
      "currency": "USD",
      "per": "Adult",
      "emi": "$716/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -225,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -112,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 25",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_027",
    "name": "World Tour Package 27",
    "title": "Exclusive Journey 27 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "4N City B",
      "3N City C"
    ],
    "duration": "12D/4N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2350,
      "discounted": 2250,
      "currency": "USD",
      "per": "Adult",
      "emi": "$750/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -235,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -117,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 27",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug",
        "012 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_028",
    "name": "World Tour Package 28",
    "title": "Exclusive Journey 28 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "13D/5N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2400,
      "discounted": 2300,
      "currency": "USD",
      "per": "Adult",
      "emi": "$766/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -240,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -120,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 28",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1533106418989-88406c7cc8e2?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug",
        "012 Aug",
        "013 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },

  {
    "id": "pkg_world_032",
    "name": "World Tour Package 32",
    "title": "Exclusive Journey 32 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "3N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "7D/9N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2600,
      "discounted": 2500,
      "currency": "USD",
      "per": "Adult",
      "emi": "$833/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -260,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -130,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 32",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_033",
    "name": "World Tour Package 33",
    "title": "Exclusive Journey 33 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "2N City B",
      "3N City C"
    ],
    "duration": "8D/10N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2650,
      "discounted": 2550,
      "currency": "USD",
      "per": "Adult",
      "emi": "$850/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -265,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -132,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 33",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },

  {
    "id": "pkg_world_035",
    "name": "World Tour Package 35",
    "title": "Exclusive Journey 35 2023 Discover Wonders",
    "type": "Leisure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "3N City A",
      "4N City B",
      "3N City C"
    ],
    "duration": "10D/12N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2750,
      "discounted": 2650,
      "currency": "USD",
      "per": "Adult",
      "emi": "$883/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -275,
        "applied": false
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -137,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 35",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_036",
    "name": "World Tour Package 36",
    "title": "Exclusive Journey 36 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "1N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "11D/4N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 2800,
      "discounted": 2700,
      "currency": "USD",
      "per": "Adult",
      "emi": "$900/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -280,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -140,
        "applied": true
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 36",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1533106418989-88406c7cc8e2?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug",
        "06 Aug",
        "07 Aug",
        "08 Aug",
        "09 Aug",
        "010 Aug",
        "011 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  },
  {
    "id": "pkg_world_040",
    "name": "World Tour Package 40",
    "title": "Exclusive Journey 40 2023 Discover Wonders",
    "type": "Adventure",
    "currency": "USD",
    "description": "Experience the most breathtaking destinations around the world.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=4500&q=90",
    "route": [
      "2N City A",
      "1N City B",
      "2N City C"
    ],
    "duration": "5D/8N",
    "highlights": [
      "Local cultural experience",
      "Scenic viewpoints",
      "Gastronomic delights",
      "Historical landmarks"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1508182313328-cb63c0f12f85?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
    ],
    "tabs": [
      "Itinerary",
      "Policies",
      "Summary"
    ],
    "price": {
      "original": 3000,
      "discounted": 2900,
      "currency": "USD",
      "per": "Adult",
      "emi": "$966/mo",
      "notes": "Includes local transfers and accommodation"
    },
    "coupons": [
      {
        "code": "WORLDTRIP10",
        "desc": "10% off for early birds",
        "value": -300,
        "applied": true
      },
      {
        "code": "EXPLORE5",
        "desc": "5% off for groups",
        "value": -150,
        "applied": false
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "date": "01 Aug, Mon",
        "city": "City A",
        "transfers": [
          {
            "type": "Airport Transfer",
            "details": "Private AC Vehicle"
          }
        ],
        "flightNote": "Arrival and city tour",
        "activities": [
          "Hotel check-in",
          "Evening city walk"
        ],
        "hotel": {
          "name": "Hotel Deluxe 40",
          "stars": 4,
          "location": "Downtown",
          "stay": "2 Nights - 01 Aug to 03 Aug",
          "type": "Deluxe Room",
          "inclusions": [
            "Breakfast",
            "City tour"
          ],
          "rating": 4.5,
          "image": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&h=150&fit=crop"
        }
      }
    ],
    "sidebar": {
      "days": [
        "01 Aug",
        "02 Aug",
        "03 Aug",
        "04 Aug",
        "05 Aug"
      ],
      "bestDeals": {
        "message": "Special Seasonal Discount",
        "actions": [
          "Early bird pricing",
          "Group discounts",
          "Travel insurance included",
          "Free local sim"
        ]
      }
    }
  }
];

export default samplePackageData; 