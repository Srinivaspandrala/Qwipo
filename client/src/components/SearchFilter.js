import React from 'react';

 function SearchFilter({ searchParams, onSearchChange }) {
            const handleInputChange = (field, value) => {
                onSearchChange({ [field]: value, page: 1 }); // Reset to page 1 on filter change
            };

            return (
                <div className="search-filter">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchParams.search}
                            onChange={(e) => handleInputChange('search', e.target.value)}
                            className="form-control"
                        />
                    </div>
                    
                    <div className="filter-box">
                        <select
                            value={searchParams.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="form-control"
                        >
                            <option value="">All Cities</option>
                            <optgroup label="United States">
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="Chicago">Chicago</option>
                                <option value="Miami">Miami</option>
                                <option value="Seattle">Seattle</option>
                            </optgroup>
                            <optgroup label="Telangana">
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Adilabad">Adilabad</option>
                                <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                                <option value="Jagtial">Jagtial</option>
                                <option value="Jangaon">Jangaon</option>
                                <option value="Jayashankar Bhupalpally">Jayashankar Bhupalpally</option>
                                <option value="Jogulamba Gadwal">Jogulamba Gadwal</option>
                                <option value="Kamareddy">Kamareddy</option>
                                <option value="Karimnagar">Karimnagar</option>
                                <option value="Khammam">Khammam</option>
                                <option value="Komaram Bheem Asifabad">Komaram Bheem Asifabad</option>
                                <option value="Mahabubabad">Mahabubabad</option>
                                <option value="Mahabubnagar">Mahabubnagar</option>
                                <option value="Mancherial">Mancherial</option>
                                <option value="Medak">Medak</option>
                                <option value="Medchal Malkajgiri">Medchal Malkajgiri</option>
                                <option value="Mulugu">Mulugu</option>
                                <option value="Narayanpet">Narayanpet</option>
                                <option value="Nirmal">Nirmal</option>
                                <option value="Nizamabad">Nizamabad</option>
                                <option value="Peddapalli">Peddapalli</option>
                                <option value="Rajanna Sircilla">Rajanna Sircilla</option>
                                <option value="Rangareddy">Rangareddy</option>
                                <option value="Sangareddy">Sangareddy</option>
                                <option value="Siddipet">Siddipet</option>
                                <option value="Suryapet">Suryapet</option>
                                <option value="Vikarabad">Vikarabad</option>
                                <option value="Wanaparthy">Wanaparthy</option>
                                <option value="Warangal Rural">Warangal Rural</option>
                                <option value="Warangal Urban">Warangal Urban</option>
                                <option value="Yadadri Bhuvanagiri">Yadadri Bhuvanagiri</option>
                            </optgroup>
                            <optgroup label="Andhra Pradesh">
                                <option value="Visakhapatnam">Visakhapatnam</option>
                                <option value="Vijayawada">Vijayawada</option>
                                <option value="Guntur">Guntur</option>
                                <option value="Nellore">Nellore</option>
                                <option value="Kurnool">Kurnool</option>
                                <option value="Anantapur">Anantapur</option>
                                <option value="Tirupati">Tirupati</option>
                                <option value="Kadapa">Kadapa</option>
                                <option value="Kakinada">Kakinada</option>
                                <option value="Rajamahendravaram">Rajamahendravaram</option>
                                <option value="Eluru">Eluru</option>
                                <option value="Ongole">Ongole</option>
                                <option value="Machilipatnam">Machilipatnam</option>
                                <option value="Srikakulam">Srikakulam</option>
                                <option value="Vizianagaram">Vizianagaram</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            );
        }

export default SearchFilter;