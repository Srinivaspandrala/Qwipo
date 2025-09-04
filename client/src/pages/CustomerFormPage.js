import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';
import { FaArrowLeft } from 'react-icons/fa6';

        function CustomerFormPage() {
            const { id } = useParams();
            const navigate = useNavigate();
            const isEdit = !!id;
            const [customer, setCustomer] = useState(null);
            const [loading, setLoading] = useState(isEdit); // Only load if editing

            useEffect(() => {
                if (isEdit) {
                    setLoading(true);
                    axios.get(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers/${id}`)
                        .then(response => {
                            setCustomer(response.data);
                            setLoading(false);
                        })
                        .catch(error => {
                            setLoading(false);
                            console.error('Error fetching customer:', error);
                        });
                }
            }, [id, isEdit]);

            if (loading) return <div className="main-content">Loading...</div>;

            return (
                <div className="main-content">
                    <div className="page-header">
                        <h1 className="page-title">{isEdit ? 'Edit Customer' : 'Add New Customer'}</h1>
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                            <FaArrowLeft/> Back to List
                        </button>
                    </div>

                    <div className="card fade-in">
                        <CustomerForm 
                            customer={customer}
                            isEdit={isEdit}
                            onSave={async (formData) => {
                                    try {
                                        if (isEdit) {
                                            await axios.put(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers/${id}`, formData);
                                            alert('Customer updated successfully');
                                            setTimeout(() => navigate(`/customers/${id}`), 900);
                                        } else {
                                            await axios.post('http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers', formData);
                                            alert('Customer created successfully');
                                            setTimeout(() => navigate('/customers'), 900);
                                        }
                                    } catch (error) {
                                        console.error('Save error:', error);
                                        alert('Failed to save customer');
        
                                    }
                                }}
                            onCancel={() => navigate(isEdit ? `/customers/${id}` : '/customers')}
                        />

                        
                    </div>
                </div>
            );
        }

export default CustomerFormPage;
