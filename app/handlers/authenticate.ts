const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
import Cookies from 'universal-cookie';
import { isValidEmail, isValidPassword } from "~/utils/validators";

export async function authenticateUser(email: string, password: string) {

    if (!isValidEmail(email)) throw new Error("Invalid email format");
    if (!isValidPassword(password)) throw new Error("Password must be at least 8 characters, include an uppercase letter and a number");

    try {
        const login_data = {
            "email": email,
            "password": password
        };

        const cookies = new Cookies();
        const guestToken = cookies.get('guestToken');

        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${guestToken}`, 
            },
            body: JSON.stringify(login_data),
        });

        const result = await response.json();
        
        if (response.status === 422 || response.status === 401 || response.status === 500) throw new Error('redirect');
        if (response.status !== 200) throw new Error(result.detail);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
