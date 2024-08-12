export  const getEncodedCategoryNumber = (categoryName) => {
    
    const categoryEncoding = {
        'ART_AND_DESIGN': 0,
        'AUTO_AND_VEHICLES': 1,
        'BEAUTY': 2,
        'BOOKS_AND_REFERENCE': 3,
        'BUSINESS': 4,
        'COMICS': 5,
        'COMMUNICATION': 6,
        'DATING': 7,
        'EDUCATION': 8,
        'ENTERTAINMENT': 9,
        'EVENTS': 10,
        'FAMILY': 11,
        'FINANCE': 12,
        'FOOD_AND_DRINK': 13,
        'GAME': 14,
        'HEALTH_AND_FITNESS': 15,
        'HOUSE_AND_HOME': 16,
        'LIBRARIES_AND_DEMO': 17,
        'LIFESTYLE': 18,
        'MAPS_AND_NAVIGATION': 19,
        'MEDICAL': 20,
        'NEWS_AND_MAGAZINES': 21,
        'PARENTING': 22,
        'PERSONALIZATION': 23,
        'PHOTOGRAPHY': 24,
        'PRODUCTIVITY': 25,
        'SHOPPING': 26,
        'SOCIAL': 27,
        'SPORTS': 28,
        'TOOLS': 29,
        'TRAVEL_AND_LOCAL': 30,
        'VIDEO_PLAYERS': 31,
        'WEATHER': 32
      };
      
    const encodedNumber = categoryEncoding[categoryName];
    
  
    
    return encodedNumber;
  };