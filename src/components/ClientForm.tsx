import React, { useState, useEffect } from 'react';
import { Client } from '../models/Client';
import { createClient, updateClient } from '../services/clientService';

interface ClientFormProps {
    client: Client | null;
    onCancel: () => void;
    onSubmit: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onCancel, onSubmit }) => {
    const [formData, setFormData] = useState<Omit<Client, 'id' | 'createdAt'>>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (client) {
            setFormData({
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone,
                address: client.address
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: ''
            });
        }
    }, [client]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (client) {
            await updateClient(client.id, formData);
        } else {
            await createClient(formData);
        }
        
        onSubmit();
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{client ? 'Modifier Client' : 'Ajouter un Client'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Prénom</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <textarea
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button 
                            type="button" 
                            className="btn btn-secondary me-2"
                            onClick={onCancel}
                        >
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {client ? 'Mettre à jour' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;