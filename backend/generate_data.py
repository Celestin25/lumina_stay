
import pandas as pd
import numpy as np
import random

# Seed for reproducibility
np.random.seed(42)
random.seed(42)

# Configuration for Synthetic Data
NUM_SAMPLES = 5000

CITIES = {
    "Casablanca": {
        "base_price_m2": 12000, 
        "rent_price_m2": 80,
        "neighborhoods": ["Maârif", "Anfa", "Sidi Maârouf", "Hay Mockh", "Bourgogne"],
        "premium_factor": 1.4
    },
    "Marrakech": {
        "base_price_m2": 10000,
        "rent_price_m2": 70,
        "neighborhoods": ["Guéliz", "Hivernage", "Medina", "Palmeraie", "Sidi Ghanem"],
        "premium_factor": 1.5  
    },
    "Rabat": {
        "base_price_m2": 11000,
        "rent_price_m2": 75,
        "neighborhoods": ["Agdal", "Hay Riad", "Souissi", "Hassan", "Océan"],
        "premium_factor": 1.3
    },
    "Tangier": {
        "base_price_m2": 9000,
        "rent_price_m2": 60,
        "neighborhoods": ["Malabata", "Centre Ville", "Marshane", "Moujahidine"],
        "premium_factor": 1.2
    }
}

DATA_PATH = "morocco_housing.csv"

def generate_listing():
    city_name = random.choice(list(CITIES.keys()))
    city_data = CITIES[city_name]
    neighborhood = random.choice(city_data["neighborhoods"])
    
    # 1. Listing Type
    listing_type = np.random.choice(["Rent", "Buy"], p=[0.4, 0.6])

    # 2. Property Type
    # If Buy, can be Land. If Rent, usually not Land (rare).
    if listing_type == "Buy":
        property_type = np.random.choice(["Apartment", "Villa", "Riad", "Studio", "Land"], p=[0.5, 0.15, 0.1, 0.1, 0.15])
    else:
        property_type = np.random.choice(["Apartment", "Villa", "Riad", "Studio"], p=[0.6, 0.1, 0.1, 0.2])
    
    # Defaults
    bedrooms = 0
    bathrooms = 0
    size_m2 = 0
    has_pool = 0
    has_garden = 0
    is_furnished = 0

    if property_type == "Land":
        bedrooms = 0
        bathrooms = 0
        size_m2 = random.randint(100, 2000) # Land size
        is_furnished = 0
        has_pool = 0 # Empty land
        has_garden = 0 # Empty land
    else:
        # Housing Features
        if property_type == "Studio":
            bedrooms = 1
            bathrooms = 1
            size_m2 = random.randint(30, 60)
        elif property_type == "Apartment":
            bedrooms = random.randint(2, 4)
            bathrooms = random.randint(1, 3)
            size_m2 = random.randint(60, 180)
        elif property_type in ["Villa", "Riad"]:
            bedrooms = random.randint(3, 8)
            bathrooms = random.randint(2, 6)
            size_m2 = random.randint(200, 800)
    
        # Features
        has_pool = 1 if (property_type in ["Villa", "Riad"] and random.random() > 0.4) else 0
        has_garden = 1 if (property_type == "Villa" or (property_type == "Riad" and random.random() > 0.3)) else 0
        is_furnished = 1 if random.random() > 0.5 else 0

    # Coordinates
    coords = {
        "Casablanca": (33.5731, -7.5898),
        "Marrakech": (31.6295, -7.9811),
        "Rabat": (34.0209, -6.8416),
        "Tangier": (35.7595, -5.8340)
    }
    lat_base, lon_base = coords[city_name]
    latitude = lat_base + np.random.normal(0, 0.02)
    longitude = lon_base + np.random.normal(0, 0.02)
    
    # Price Calculation
    price = 0
    
    if listing_type == "Rent":
        # Monthly Rent
        base_rent = size_m2 * city_data["rent_price_m2"]
        if property_type == "Villa": base_rent *= 1.5
        if property_type == "Riad": base_rent *= 1.8
        if has_pool: base_rent += 2000
        if has_garden: base_rent += 1000
        if is_furnished: base_rent *= 1.3
        
        # Neighborhood premium
        if neighborhood in ["Anfa", "Hay Riad", "Hivernage", "Palmeraie", "Malabata"]:
            base_rent *= 1.4

        price = int(base_rent * np.random.uniform(0.9, 1.1))
        
        # Cap rent to realistic limits (e.g. min 1500)
        if price < 1500: price = 1500

    else: # Buy
        if property_type == "Land":
             # Land Price per m2 (e.g. 5000 to 20000)
             land_price_m2 = city_data["base_price_m2"] * 0.8 # Land is cheaper per m2 than built
             base_price = size_m2 * land_price_m2
        else:
            base_price = size_m2 * city_data["base_price_m2"]
            if property_type == "Villa": base_price *= 1.5
            if property_type == "Riad": base_price *= 1.6
            if has_pool: base_price += 200000
            if has_garden: base_price += 100000
            
            # Neighborhood premium
        if neighborhood in ["Anfa", "Hay Riad", "Hivernage", "Palmeraie", "Malabata"]:
            base_price *= 1.4
            
        if is_furnished and property_type != "Land":
            base_price += 50000 # Furniture value
            
        price = int(base_price * np.random.uniform(0.9, 1.1))

    return {
        "City": city_name,
        "Neighborhood": neighborhood,
        "Listing_Type": listing_type,
        "Property_Type": property_type,
        "Bedrooms": bedrooms,
        "Bathrooms": bathrooms,
        "Size_m2": size_m2,
        "Has_Pool": has_pool,
        "Has_Garden": has_garden,
        "Is_Furnished": is_furnished,
        "Latitude": round(latitude, 5),
        "Longitude": round(longitude, 5),
        "Price_MAD": price
    }

def main():
    print("Generating synthetic data (Rent, Buy, Land)...")
    data = [generate_listing() for _ in range(NUM_SAMPLES)]
    df = pd.DataFrame(data)
    
    # Save to CSV
    df.to_csv(DATA_PATH, index=False)
    print(f"Dataset generated with {NUM_SAMPLES} samples at: {DATA_PATH}")
    print(df.head())

if __name__ == "__main__":
    main()
