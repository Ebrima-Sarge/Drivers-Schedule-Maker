import { useState } from "react";
import { VectorOptions } from "./icons";
import { Option } from "./Option";

// Define a structure for a single ride entry
const initialRide = {
    firstName: '',
    lastName: '',
    pickOff: '',
    dropOff: '',
    durationTime: '',
    isIncluded: false,
};

export function InputField() {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    // State to hold all the ride entries (starts with one empty entry)
    const [rides, setRides] = useState([initialRide]);

    // Function to handle adding a new ride set (called from Option component)
    const handleAddRide = () => {
        setRides(prevRides => [...prevRides, { ...initialRide }]);
        setIsOptionOpen(false); // Close the options menu after selection
    };

    // Function to handle updates to individual fields (optional but good practice)
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


    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                color: '#352102',
                marginTop: '10rem',
                marginBlock: '100px',
                marginLeft: '50px',
                marginRight: '50px'
            }}>
                <h1 style={{ fontSize: 48, fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word' }}>
                    Your Upcoming Rides
                </h1>
                {/* Pass the handler for opening the menu */}
                <VectorOptions 
                    onClick={() => setIsOptionOpen(true)} 
                    style={{ height: '50px', width: '30px', cursor: 'pointer' }} 
                />
            </div>
            
            {/* Pass the ADD HANDLER to the Option component */}
            <Option 
                isOptionOpen={isOptionOpen} 
                setIsOptionOpen={setIsOptionOpen}
                onAddRide={handleAddRide} // <-- New prop
            />

            {/* --- Dynamic Rendering of Input Fields --- */}
            {rides.map((ride, index) => (
                <div 
                    key={index} // Crucial for dynamic lists
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginTop: '2rem', 
                        boxSizing: "border-box", 
                        marginLeft: '60px', 
                        marginRight: '90px', 
                        gap: '7rem',
                        // Add some visual separation for clarity if multiple sets exist
                        borderBottom: index < rides.length - 1 ? '1px solid #ccc' : 'none',
                        paddingBottom: '20px',
                        marginBottom: '20px'
                    }}>
                    
                    <div>
                        <h2>First Name</h2>
                        <input 
                            type="text" 
                            name="firstName"
                            value={ride.firstName}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>Last Name</h2>
                        <input 
                            type="text" 
                            name="lastName"
                            value={ride.lastName}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>Pick off</h2>
                        <input 
                            type="text" 
                            name="pickOff"
                            value={ride.pickOff}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </div>

                    <div>
                        <h2>Drop off</h2>
                        <input 
                            type="text" 
                            name="dropOff"
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