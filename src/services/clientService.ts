import api from './api';
import { Client } from '../models/Client';

export const getClients = async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('/Clients');
    return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
    const response = await api.get<Client>(`/Clients/${id}`);
    return response.data;
};

export const createClient = async (client: Omit<Client, 'id' | 'createdAt'>): Promise<Client> => {
    const response = await api.post<Client>('/Clients', client);
    return response.data;
};

export const updateClient = async (id: number, client: Partial<Client>): Promise<void> => {
    await api.put(`/Clients/${id}`, client);
};

export const deleteClient = async (id: number): Promise<void> => {
    await api.delete(`/Clients/${id}`);
};