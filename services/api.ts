
const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const api = {
    auth: {
        register: async (data: any) => {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        login: async (data: any) => {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        me: async () => {
            const res = await fetch(`${API_URL}/auth/me`, { headers: getHeaders() });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        getUsers: async () => {
            const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        updateUser: async (id: number, data: any) => {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        deleteUser: async (id: number) => {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        }
    },
    health: {
        list: async () => {
            const res = await fetch(`${API_URL}/health-reports`);
            if (!res.ok) throw await res.json();
            return res.json();
        },
        get: async (id: number) => {
            const res = await fetch(`${API_URL}/health-reports/${id}`);
            if (!res.ok) throw await res.json();
            return res.json();
        },
        create: async (data: any) => {
            const res = await fetch(`${API_URL}/health-reports`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        update: async (id: number, data: any) => {
            const res = await fetch(`${API_URL}/health-reports/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_URL}/health-reports/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
    },
    qna: {
        list: async () => {
            const res = await fetch(`${API_URL}/questions`, { headers: getHeaders() });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        create: async (data: any) => {
            const res = await fetch(`${API_URL}/questions`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        update: async (id: number, data: any) => {
            const res = await fetch(`${API_URL}/questions/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        answer: async (id: number, answer: string) => {
            const res = await fetch(`${API_URL}/questions/${id}/answer`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ answer }),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_URL}/questions/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        }
    },
    notices: {
        list: async () => {
            const res = await fetch(`${API_URL}/notices`);
            if (!res.ok) throw await res.json();
            return res.json();
        },
        create: async (data: any) => {
            const res = await fetch(`${API_URL}/notices`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_URL}/notices/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        }
    }
};
