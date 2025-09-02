import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerListPage from './pages/CustomerListPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import CustomerFormPage from './pages/CustomerFormPage';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import './App.css';

        function App() {
            return (
                <Router>
                    <div className="app-container">
                        <AppHeader />
                        <Routes>
                            <Route path="/" element={<CustomerListPage />} />
                            <Route path="/customers" element={<CustomerListPage />} />
                            <Route path="/customers/new" element={<CustomerFormPage />} />
                            <Route path="/customers/:id" element={<CustomerDetailPage />} />
                            <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
                        </Routes>
                        <AppFooter />
                    </div>
                </Router>
            );
        }

export default App;