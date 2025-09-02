import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressList from '../components/AddressList';
import { FaEdit, FaPenSquare, FaPhone, FaUserCircle } from 'react-icons/fa';
import { FaArrowLeft, FaLocationDot, FaLocationPin, FaPen, FaTrash } from 'react-icons/fa6';

        function CustomerDetailPage() {
            const [showActions, setShowActions] = useState(false);
            const handleDeleteCustomer = async () => {
                if (window.confirm('Are you sure you want to delete this customer?')) {
                    try {
                        await axios.delete(`http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers/${customer.id}`);
                        navigate('/customers');
                    } catch (error) {
                        console.error('Error deleting customer:', error);
                    }
                }
                setShowActions(false);
            };
            const { id } = useParams();
            const navigate = useNavigate();
            const [customer, setCustomer] = useState(null);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
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
            }, [id]);

            if (loading) return <div className="main-content">Loading...</div>;
            if (!customer) return <div className="main-content">Customer not found</div>;

            return (
                <div className="main-content">
                    <div className="page-header">
                        <h1 className="page-title">Customer Details</h1>
                        <button className="btn btn-secondary" onClick={() => navigate('/customers')}>
                            <FaArrowLeft style={{ marginRight: 8 }} /> Back to List
                        </button>
                    </div>

                    <div className="card fade-in customer-details-card">
                        <div className="card-header customer-details-header">
                            <div className="customer-details-header-left">
                                <div>
                                    <h2 className="card-title customer-details-title">{customer.first_name} {customer.last_name}</h2>
                                </div>
                            </div>
                            <div className="customer-details-actions-dropdown">
                                <button className="customer-details-actions-toggle" onClick={() => setShowActions(prev => !prev)}>
                                    Actions ▾
                                </button>
                                {showActions && (
                                    <div className="customer-details-actions-menu">
                                        <Link to={`/customers/${customer.id}/edit`} className="dropdown-item customer-details-edit" onClick={() => setShowActions(false)}>
                                            Edit 
                                        </Link>
                                        <button className="dropdown-item customer-details-delete" onClick={handleDeleteCustomer}>
                                            Delete 
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="customer-info customer-details-grid">
                            <div className="customer-details-col">
                                <div className="customer-details-row">
                                    <FaUserCircle className="customer-details-icon" />
                                    <span><strong>First Name:</strong> {customer.first_name}</span>
                                </div>
                                <div className="customer-details-row">
                                    <FaPhone className="customer-details-icon" />
                                    <span><strong>Phone:</strong> {customer.phone_number}</span>
                                </div>
                            </div>
                            <div className="customer-details-col">
                                <div className="customer-details-row">
                                    <FaUserCircle className="customer-details-icon" />
                                    <span><strong>Last Name:</strong> {customer.last_name}</span>
                                </div>
                                <div className="customer-details-row">
                                    <FaLocationDot className="customer-details-icon" />
                                    <span><strong>City:</strong> {customer.city}</span>
                                </div>
                            </div>
                        </div>

                        <AddressList customerId={customer.id} />
                    </div>
                </div>
            );
        }

export default CustomerDetailPage;