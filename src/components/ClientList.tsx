import React, { useState, useEffect } from 'react';
import { Client } from '../models/Client';
import { getClients, deleteClient } from '../services/clientService';
import ClientForm from './ClientForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    const handleEdit = (client: Client) => {
        setSelectedClient(client);
        setIsEditing(true);
    };

    const handleDeleteClick = (id: number) => {
        setClientToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (clientToDelete) {
            await deleteClient(clientToDelete);
            fetchClients();
            setIsDeleteModalOpen(false);
            setClientToDelete(null);
        }
    };

    const handleFormSubmit = () => {
        setIsEditing(false);
        setSelectedClient(null);
        fetchClients();
    };

    return (
        <div className="container mt-5">
            <h2>Gestion des Clients</h2>
            <button 
                className="btn btn-primary mb-3"
                onClick={() => {
                    setSelectedClient(null);
                    setIsEditing(true);
                }}
            >
                Ajouter un Client
            </button>

            {isEditing && (
                <ClientForm 
                    client={selectedClient} 
                    onCancel={() => setIsEditing(false)}
                    onSubmit={handleFormSubmit}
                />
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.firstName} {client.lastName}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-info me-2"
                                    onClick={() => handleEdit(client)}
                                >
                                    Modifier
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteClick(client.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default ClientList;