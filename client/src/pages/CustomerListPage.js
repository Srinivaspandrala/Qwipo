import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerList from '../components/CustomerList';
import SearchFilter from '../components/SearchFilter';
import { FaUserPlus } from 'react-icons/fa';

        function CustomerListPage() {
            const [customers, setCustomers] = useState([]);
            const [searchParams, setSearchParams] = useState({
                city: '',
                page: 1,
                search: ''
            });

            const [pagination, setPagination] = useState({ current: 1, total: 1, limit: 10, totalRecords: 0 });

            useEffect(() => {
                const fetchCustomers = async () => {
                    try {
                        const params = {
                            page: searchParams.page || 1,
                            search: searchParams.search || '',
                            city: searchParams.city || ''
                            
                        };
                        const response = await axios.get('http://qwipo-server-env-1.eba-9mktppp9.ap-south-1.elasticbeanstalk.com/api/customers', { params });
                            
                            const respCustomers = response.data.customers || [];
                            const respPagination = response.data.pagination || { current: params.page, total: 1, limit: 10, totalRecords: 0 };
                            setCustomers(respCustomers);
                            setPagination({
                                current: respPagination.current || params.page,
                                total: respPagination.total || 1,
                                limit: respPagination.limit || 10,
                                totalRecords: respPagination.totalRecords || 0
                            });
                    } catch (error) {
                        console.error('Error fetching customers:', error);
                    }
                };
                fetchCustomers();
            }, [searchParams]);
            

            const handleSearchChange = (newParams) => {
                setSearchParams(prev => ({ ...prev, ...newParams }));
            };

            return (
                <div className="main-content">
                    <div className="page-header">
                        <h1 className="page-title">Customer Management</h1>
                        <Link to="/customers/new" className="btn btn-primary">
                            <FaUserPlus/> New Customer
                        </Link>
                    </div>

                    <div className="card fade-in">
                        <div className="card-header">
                            <h2 className="card-title">Customer List</h2>
                            <SearchFilter 
                                searchParams={searchParams}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                        
                        <CustomerList 
                            customers={customers}
                            pagination={pagination}
                            onPageChange={(page) => setSearchParams(prev => ({ ...prev, page }))}
                        />
                    </div>
                </div>
            );
        }


export default CustomerListPage;
