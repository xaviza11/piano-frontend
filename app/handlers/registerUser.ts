const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
import { isValidEmail, isValidPassword, isValidUserName } from "~/utils/validators";
import Cookies from 'universal-cookie';

export async function registerUser(username: string, email: string, password: string) {

    if (!username || !email || !password) throw new Error("Username, email, and password are required");
    if (!isValidEmail(email)) throw new Error("Invalid email format");
    if (!isValidPassword(password)) throw new Error("Password must be at least 8 characters, include an uppercase letter and a number");
    if (!isValidUserName(username)) throw new Error("Username must contain only alphanumeric characters");

    try {

        const user_data = {
            "username": username,
            "email": email,
            "password": password
        }

        const cookies = new Cookies()
        const guestToken = cookies.get('guestToken') 

        const response = await fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${guestToken}`, 
            },
            body: JSON.stringify(user_data),
        });

        const result = await response.json();
        if (response.status === 422 || response.status === 401 || response.status === 500) throw new Error('redirect')
        if (response.status !== 200) throw new Error(result.detail)

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
