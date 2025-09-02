import React, { useState } from 'react';
import axios from 'axios';

        function AddressForm({ address, onClose, onSave }) {
            const isEdit = !!(address && address.id);
            const [formData, setFormData] = useState({
                address_details: address?.address_details || '',
                city: address?.city || '',
                state: address?.state || '',
                pin_code: address?.pin_code || ''
            });
            
            const [errors, setErrors] = useState({});
            
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }));
                
                if (errors[name]) {
                    setErrors(prev => ({ ...prev, [name]: '' }));
                }
            };
            
            const validateForm = () => {
                setErrors({});
                return true;
            };
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                if (validateForm()) {
                    try {
                        if (!isEdit && address?.customerId) {
                            // POST new address
                            await axios.post(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers/${address.customerId}/addresses`, formData);
                            alert('Address created successfully');
                        } else if (isEdit && address?.id) {
                            await axios.put(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/addresses/${address.id}`, formData);
                            alert('Address updated successfully');
                        }
                        onSave();
                    } catch (error) {
                        console.error('Error saving address:', error);
                    }
                }
            };
            
            return (
                <div className="address-form-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{isEdit ? 'Edit Address' : 'New Address'}</h3>
                        </div>
                        
                        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address_details"
                                        placeholder='Address details'
                                        value={formData.address_details}
                                        onChange={handleChange}
                                        className={errors.address_details ? 'form-control error' : 'form-control'}
                                    />
                                    {errors.address_details && <span className="error-text">{errors.address_details}</span>}
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder='City'
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={errors.city ? 'form-control error' : 'form-control'}
                                    />
                                    {errors.city && <span className="error-text">{errors.city}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder='State'
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={errors.state ? 'form-control error' : 'form-control'}
                                    />
                                    {errors.state && <span className="error-text">{errors.state}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Pin Code</label>
                                    <input
                                        type="text"
                                        name="pin_code"
                                        placeholder='Pin Code'
                                        value={formData.pin_code}
                                        onChange={handleChange}
                                        className={errors.pin_code ? 'form-control error' : 'form-control'}
                                    />
                                    {errors.pin_code && <span className="error-text">{errors.pin_code}</span>}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={onClose} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {isEdit ? 'Update Address' : 'Create Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }


export default AddressForm;