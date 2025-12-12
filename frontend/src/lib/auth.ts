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
    console.log("loginUser triggered...")
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
export async function deleteUser () {
    return apiFetch("/auth/delete", {
        method: "DELETE",
    })
}

// logged in check
export async function getCurrentUser() {
    return apiFetch("/auth/me");
}
