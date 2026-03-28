import { useState, useEffect } from "react";
import { VectorOptions } from "./icons";
import { Option } from "./Option";

const initialRide = {
    FirstName: '',
    LastName: '',
    From: '',
    To: '',
    durationTime: '',
    isIncluded: false,
};

export function InputField() {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    
    
    const [rides, setRides] = useState([initialRide]);

  
    const [users, setUsers] = useState([]); 
    
   
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            const API_URL = 'https://api-assesment-nine.vercel.app/passenger'; 
            
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    if (response.status === 404) {
                        setUsers([]); 
                        return;
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const apiData = await response.json(); 
                
                const transformedData = apiData.map(apiItem => ({
                    FirstName: apiItem.FirstName || '',
                    LastName: apiItem.LastName || '',
                    pickOff: apiItem.From || '', 
                    dropOff: apiItem.To || '',   
                    durationTime: apiItem.durationTime || '', 
                    isIncluded: apiItem.isIncluded || false, 
                    apiId: apiItem.PassengerId 
                }));
                
                setUsers(transformedData); 
                
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []); 

    // ... (handleAddRide, handleInputChange, deleteCheckedRides remain the same) ...

    const handleAddRide = () => {
        setRides(prevRides => [...prevRides, { ...initialRide }]);
        setIsOptionOpen(false); 
    };

    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setRides(prevRides => 
            prevRides.map((ride, i) => 
                i === index 
                ? { ...ride, [name]: newValue } 
                : ride
            )
        );
    };

   const deleteCheckedRides = () => {
    setRides(prevRides => 
        prevRides.filter(ride => ride.isIncluded === false)
    );
};


    return (
        <>
            <div style={{ /* ... */ }}>
                <h1 style={{ /* ... */ }}>
                    Your Upcoming Rides
                </h1>
                <VectorOptions 
                    onClick={() => setIsOptionOpen(true)} 
                    style={{ height: '50px', width: '30px', cursor: 'pointer' }} 
                />
            </div>
            
            <Option 
                isOptionOpen={isOptionOpen} 
                setIsOptionOpen={setIsOptionOpen}
                onAddRide={handleAddRide} 
                onDelete={deleteCheckedRides}
            />

            {/* --- API DATA RENDER (Users) --- */}
            <div style={{ margin: '20px 50px', border: '1px solid blue', padding: '15px' }}>
                <h2>Data Loaded From API ({isLoading ? 'Loading...' : users.length + ' Records'})</h2>
                {error && <p style={{ color: 'red' }}>API Fetch Error: {error}</p>}
                
                {!isLoading && users.length > 0 && (
                    <ul>
                        {users.map((user) => (
                            // Using apiId (PassengerId) as the key for stability
                            <li key={user.apiId} style={{ marginBottom: '10px', color: 'navy' }}>
                                <strong>{user.firstName} {user.lastName}</strong>: 
                                {user.From}  {user.To} (ID: {user.apiId.substring(0, 10)}...)
                            </li>
                        ))}
                    </ul>
                )}
                {!isLoading && users.length === 0 && !error && <p>No records found in API.</p>}
            </div>

            {/* --- LOCAL FORM DATA RENDER (Rides) --- */}
            <h2 style={{ marginLeft: '50px', marginTop: '30px' }}>Local Form Entries (New/Editable)</h2>
            {rides.map((ride, index) => (
                <div key={index} // Using index as key because this array is managed locally for adding/deleting rows
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginTop: '2rem', 
                        boxSizing: "border-box", 
                        marginLeft: '60px', 
                        marginRight: '90px', 
                        gap: '7rem',
                        borderBottom: index < rides.length - 1 ? '1px solid #ccc' : 'none',
                        paddingBottom: '20px',
                        marginBottom: '20px'
                    }}>
                    
                    {/* IMPORTANT: Input 'name' must match the key in handleInputChange update */}
                    <div>
                        <h2>First Name</h2>
                        <input 
                            type="text" 
                            name="FirstName"
                            value={ride.firstName}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>Last Name</h2>
                        <input 
                            type="text" 
                            name="LastName"
                            value={ride.lastName}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>From</h2>
                        <input 
                            type="text" 
                            name="From" // Matches API field name for submission later
                            value={ride.pickOff}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>To</h2>
                        <input 
                            type="text" 
                            name="To" // Matches API field name for submission later
                            value={ride.dropOff}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>Duration Time</h2>
                        <input 
                            type="text" 
                            name="durationTime"
                            value={ride.durationTime}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>
                    
                    <div style={{ marginTop: '30px' }}>
                        <input 
                            type="checkbox" 
                            name="isIncluded"
                            checked={ride.isIncluded}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}