
const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const api = {
    translate: async (text: string, targetLang: string) => {
        const res = await fetch(`${API_URL}/translate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, targetLang }),
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },
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
            const res = await fetch(`${API_URL}/admin/users`, { headers: getHeaders() });
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
        async deleteUser(id: number) {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        async changePassword(data: any) {
            const res = await fetch(`${API_URL}/auth/change-password`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        async resetRequest(data: any) {
            const res = await fetch(`${API_URL}/auth/reset-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        async getResetRequests() {
            const res = await fetch(`${API_URL}/admin/resets`, { headers: getHeaders() });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        async approveResetRequest(id: number) {
            const res = await fetch(`${API_URL}/admin/resets/${id}/approve`, {
                method: 'POST',
                headers: getHeaders(),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        async forgotPasswordEmail(email: string) {
            const res = await fetch(`${API_URL}/auth/forgot-password-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw await res.json();
            return res.json();
        },
        async resetPasswordEmail(token: string, newPassword: string) {
            const res = await fetch(`${API_URL}/auth/reset-password-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
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
        update: async (id: number, data: any) => {
            const res = await fetch(`${API_URL}/notices/${id}`, {
                method: 'PUT',
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
