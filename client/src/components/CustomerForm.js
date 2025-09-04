import React, { useState, useEffect } from 'react';
import { FaPenSquare, FaPlus, FaTimes } from 'react-icons/fa';

        function CustomerForm({ customer, isEdit, onSave, onCancel }) {
            const [formData, setFormData] = useState({
                first_name: customer?.first_name || '',
                last_name: customer?.last_name || '',
                phone_number: customer?.phone_number || '',
                city: customer?.city || ''
            });

            useEffect(() => {
                setFormData({
                    first_name: customer?.first_name || '',
                    last_name: customer?.last_name || '',
                    phone_number: customer?.phone_number || '',
                    city: customer?.city || ''
                });
            }, [customer]);
            
        
            
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }));
            };
            
            
            const handleSubmit = (e) => {
                e.preventDefault();
                const payload = {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone_number: formData.phone_number,
                    city: formData.city
                };
                console.log('Form payload:', payload);
                onSave(payload);
            };
            
            return (
                <form onSubmit={handleSubmit} className="customer-form">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder='First Name'
                                value={formData.first_name}
                                onChange={handleChange}
                                className={'form-control'}
                            />
                        </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder='Last Name'
                            value={formData.last_name}
                            onChange={handleChange}
                            className={'form-control'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_number">Phone</label>
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            placeholder='Phone Number'
                            value={formData.phone_number}
                            onChange={handleChange}
                            className={'form-control'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder='City'
                            value={formData.city}
                            onChange={handleChange}
                            className={'form-control'}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            <FaTimes/> Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? "Update" :"Create"}
                        </button>
                    </div>
                </form>
            );
        }


export default CustomerForm;
