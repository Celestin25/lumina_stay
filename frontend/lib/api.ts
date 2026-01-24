
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function predictPrice(features: any) {
    const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
    });
    
    if (!response.ok) {
        throw new Error("Prediction failed");
    }
    
    return response.json();
}

export async function loginUser(username: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: "password123" }) // Mock password
    });
    
    return response.json();
}
