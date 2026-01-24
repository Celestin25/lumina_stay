
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
        "neighborhoods": ["Maârif", "Anfa", "Sidi Maârouf", "Hay Mockh", "Bourgogne"],
        "premium_factor": 1.4
    },
    "Marrakech": {
        "base_price_m2": 10000,
        "neighborhoods": ["Guéliz", "Hivernage", "Medina", "Palmeraie", "Sidi Ghanem"],
        "premium_factor": 1.5  # Tourist premium
    },
    "Rabat": {
        "base_price_m2": 11000,
        "neighborhoods": ["Agdal", "Hay Riad", "Souissi", "Hassan", "Océan"],
        "premium_factor": 1.3
    },
    "Tangier": {
        "base_price_m2": 9000,
        "neighborhoods": ["Malabata", "Centre Ville", "Marshane", "Moujahidine"],
        "premium_factor": 1.2
    }
}

DATA_PATH = "morocco_housing.csv"

def generate_listing():
    city_name = random.choice(list(CITIES.keys()))
    city_data = CITIES[city_name]
    neighborhood = random.choice(city_data["neighborhoods"])
    
    # House Features
    property_type = np.random.choice(["Apartment", "Villa", "Riad", "Studio"], p=[0.6, 0.15, 0.1, 0.15])
    
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
    
    # Coordinates (Approximate centers)
    coords = {
        "Casablanca": (33.5731, -7.5898),
        "Marrakech": (31.6295, -7.9811),
        "Rabat": (34.0209, -6.8416),
        "Tangier": (35.7595, -5.8340)
    }
    lat_base, lon_base = coords[city_name]
    # Add small noise for map spread
    latitude = lat_base + np.random.normal(0, 0.02)
    longitude = lon_base + np.random.normal(0, 0.02)
    
    # Price Calculation (Synthetic Formula)
    base_price = size_m2 * city_data["base_price_m2"]
    
    # Adjustments
    if neighborhood in ["Anfa", "Hay Riad", "Hivernage", "Palmeraie", "Malabata"]:
        base_price *= 1.4  # Premium neighborhood
    if has_pool: base_price += 150000
    if has_garden: base_price += 50000
    if property_type == "Riad": base_price *= 1.3
    
    # Random Noise
    price = int(base_price * np.random.uniform(0.9, 1.1))
    
    return {
        "City": city_name,
        "Neighborhood": neighborhood,
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
    print("Generating synthetic data...")
    data = [generate_listing() for _ in range(NUM_SAMPLES)]
    df = pd.DataFrame(data)
    
    # Save to CSV
    df.to_csv(DATA_PATH, index=False)
    print(f"Dataset generated with {NUM_SAMPLES} samples at: {DATA_PATH}")
    print(df.head())

if __name__ == "__main__":
    main()
