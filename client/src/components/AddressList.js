import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';
import { FaPlus, FaTrash, FaEdit, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function AddressList({ customerId }) {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const fetchAddresses = () => {
        if (customerId) {
            axios.get(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers/${customerId}/addresses`)
                .then(response => {
                    setAddresses(response.data || []);
                })
                .catch(error => {
                    console.error('Error fetching addresses:', error);
                });
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [customerId]);

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleAddAddress = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingAddress(null);
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await axios.delete(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/addresses/${addressId}`);
            fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <div className="address-list">
            <div className="address-header">
                <h3>Addresses</h3>
                <button className="btn btn-sm btn-primary" onClick={handleAddAddress}>
                    <FaPlus/> Address
                </button>
            </div>

            {showForm && (
                <AddressForm
                    address={editingAddress || { customerId }}
                    onClose={handleFormClose}
                    onSave={() => {
                        handleFormClose();
                        fetchAddresses();
                    }}
                />
            )}

            <div className="addresses">
                {addresses.map(address => (
                    <div key={address.id} className="address-card">
                        <div className="address-header">
                            <div>
                                <p className="address-title"><strong>{address.address_details}</strong></p>
                                <p className="address-location"><FaMapMarkerAlt style={{ marginRight: 6 }} /> {address.city}, {address.state} - {address.pin_code}</p>
                            </div>
                            <div className="address-actions">
                            
                                
                                <button className="button-edit-delete  button-edit" onClick={() => handleEditAddress(address)}>
                                    <FaEdit />
                                </button>
                                <button className="button-edit-delete button-delete " onClick={() => handleDeleteAddress(address.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                
                    </div>
                ))}
                {addresses.length === 0 && (
                    <p>No addresses found for this customer.</p>
                )}
            </div>
        </div>
    );
}

export default AddressList;