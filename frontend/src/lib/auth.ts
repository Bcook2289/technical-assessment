import { apiFetch } from "./api";

//register
export async function registerUser (email: string, password: string) {
    return apiFetch("/auth/register", {
        method: "POST",
        body:JSON.stringify({email, password})
    })
}

// login
export async function loginUser (email: string, password: string) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({email, password})
    });
}

// logout
export async function logoutUser () {
    return apiFetch("/auth/logout", {
        method: "POST",
    })
}

// delete
export async function deleteUser (email: string) {
    return apiFetch("/auth/delete", {
        method: "DELETE",
        body: JSON.stringify({email})
    })
}

// logged in check
export async function getCurrentUser() {
    return apiFetch("/auth/me");
}
