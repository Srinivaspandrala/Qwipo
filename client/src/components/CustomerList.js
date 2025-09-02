import { Link } from 'react-router-dom';
import { FaEye, FaEdit} from 'react-icons/fa';
import { FaCircleUser,FaAngleLeft,FaAngleRight } from "react-icons/fa6";


function CustomerList({ customers = [], pagination = { current: 1, total: 1 }, onPageChange = () => {} }) {
    const current = pagination.current || 1;
    const total = pagination.total || 1;
    return (
        <div>
            <div className="table-wrapper">
                <table className="customer-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>No customers found.</td>
                        </tr>
                    )}
                    {customers.map((customer, index) => (
                        <tr key={customer.id} className="slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                            <td>{customer.first_name} {customer.last_name}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.city}</td>
                            <td>
                                <Link to={`/customers/${customer.id}`} className="btn btn-sm ">
                                    <FaEye />
                                </Link>
                                <Link to={`/customers/${customer.id}/edit`} className="btn btn-sm ">
                                    <FaEdit />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>

            <div className="pagination">
                <button disabled={current <= 1} onClick={() => onPageChange(Math.max(1, current - 1))}> <FaAngleLeft/> Prev</button>
                <span><strong>Page {current} of {total}</strong></span>
                <button disabled={current >= total} onClick={() => onPageChange(Math.min(total, current + 1))}>Next <FaAngleRight/></button>
            </div>
        </div>
    );
}

export default CustomerList;