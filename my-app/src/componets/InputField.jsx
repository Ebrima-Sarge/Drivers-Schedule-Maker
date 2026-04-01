import { useState, useEffect } from "react";
import { VectorOptions } from "./icons";
import { Option } from "./Option";
import { History } from "./History";

const initialRideTemplate = {
    firstName: '', 
    lastName: '',
    pickOff: '',  
    dropOff: '',  
    durationTime: '', 
    isIncluded: false,
    apiId: null,
};

export function InputField() {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    
    // State to hold all ride data (fetched and new entries)
    const [rides, setRides] = useState([{ ...initialRideTemplate, apiId: null }]); 
    
    // State to track if any ride is currently "done" (modified)
    const [isDone, setIsDone] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [history, setHistory] = useState([]);


    
    const API_URL = 'https://api-assesment-nine.vercel.app/passenger'; 

    // --- FETCH EFFECT ---
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError(null); 
                        return;
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const apiData = await response.json(); 
                
                const transformedData = apiData.map(apiItem => ({
                    firstName: apiItem.FirstName || '',
                    lastName: apiItem.LastName || '',
                    pickOff: apiItem.From || '', 
                    dropOff: apiItem.To || '',   
                    durationTime: apiItem.durationTime || '', 
                    isIncluded: apiItem.isIncluded || false, 
                    apiId: apiItem.PassengerId 
                }));
                
                if (transformedData.length > 0) {
                    setRides(transformedData);
                } else {
                    setRides([{ ...initialRideTemplate, apiId: null }]);
                }
                
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
                setRides([{ ...initialRideTemplate, apiId: null }]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []); 

    // --- CHANGE HANDLER ---
    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setRides(prevRides => {
            const updatedRides = prevRides.map((ride, i) => 
                i === index 
                ? { ...ride, [name]: newValue } 
                : ride
            );
            // Mark as Done/changed whenever an input changes
            setIsDone(true); 
            return updatedRides;
        });
    };

    // --- API UPDATE (New Handler) ---
    const handleDone = async () => {
        setIsLoading(true); // Use loading state temporarily for submission feedback
        setError(null);

        let successCount = 0;
        let failedUpdates = [];

        // Iterate over all rides to find which ones need updating
        for (const ride of rides) {
            // 1. Only process rides that came from the API (have an apiId) 
            // AND have been marked as dirty (which happens on any change)
            if (ride.apiId && isDone) { // Note: isDirty check here is simplified; a better way is tracking per-row changes
                
                
               /* const updatePayload = {
                    From: ride.pickOff,
                    To: ride.dropOff,
                    FirstName: ride.firstName, 
                    LastName: ride.lastName,
                };*/

                try {
                    const response = await fetch(`${API_URL}/update/${ride.apiId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                
                        body: JSON.stringify({ 
                            From: ride.pickOff, 
                            To: ride.dropOff 
                        }),
                       
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Update failed for ID ${ride.apiId}: ${errorData.message || response.statusText}`);
                    }
                    successCount++;
                } catch (err) {
                    console.error("Update Error:", err);
                    failedUpdates.push({ id: ride.apiId, message: err.message });
                }
            }

        
           
        }

        setIsLoading(false);
        setIsDone(false); 

        if (failedUpdates.length > 0) {
            setError(`Successfully updated ${successCount} records. Failed updates: ${failedUpdates.length}`);
        } else if (successCount > 0) {
            setError(`Successfully updated ${successCount} records.`);
        } else {
            setError("No changes detected or submitted.");
        }
      
        if(successCount > 0) {
             
            // setHistory((prevHistory) => [...prevHistory, ...rides]); (To add submited rides to my history page)
        }

    
    };

     
    

       const handleAddRide = () => {
    setRides(prevRides => [
        ...prevRides, 
        { ...initialRideTemplate, apiId: null } // New ride, no apiId, no selection
    ]);
    setIsDone(true); // Adding counts as a modification
    setIsOptionOpen(false); // Close options menu after action
};

// --- DELETE SELECTED RIDES HANDLER (Implemented) ---
const deleteCheckedRides = () => {
    const itemsToDeleteCount = rides.filter(ride => ride.isIncluded).length;
    
    if (itemsToDeleteCount === 0) {
        setError("Please select at least one ride using the checkbox next to it to mark for deletion.");
        setIsOptionOpen(false);
        return;
    }
    
    // UI step: Filter out all items where isSelected is true (both API and new items)
    const updatedRides = rides.filter(ride => !ride.isIncluded);

    if (updatedRides.length === 0) {
        
        setRides([{ ...initialRideTemplate, apiId: null }]);
    } else {
        setRides(updatedRides);
    }
    
    setIsDone(true); // Deleting from UI counts as a modification that needs sending via SEND
    setError(`${itemsToDeleteCount} ride(s) marked for deletion (click SEND to confirm DELETE on server).`);
    setIsOptionOpen(false); // Close options menu after action
};


    const showDoneButton = isDone; 


    return (
        <>
         <History history={history} />
            <div style={{ display: 'flex', justifyContent: "space-between", gap: '10px', marginTop: '15rem', marginLeft: '3rem' }}>
                <h1 style={{ fontSize: '24px', margin: 0 }}>
                    Upcoming Rides
                </h1>
                <VectorOptions 
                    onClick={() => setIsOptionOpen(true)} 
                    style={{ height: '30px', width: '20px', cursor: 'pointer', marginRight: '10rem'}} 
                />
                </div>
               

                {/* Show Loading indicator during submission */}
                {isLoading && <p style={{ color: 'blue' }}>Submitting changes...</p>}
            
            
            <Option 
                isOptionOpen={isOptionOpen} 
                setIsOptionOpen={setIsOptionOpen}
                onAddRide={handleAddRide} 
                onDelete={deleteCheckedRides}
            />
            
            {error && <p style={{ color: 'red', marginLeft: '50px' }}>{error}</p>}
            
            {!isLoading && rides.length === 0 && !error && (
                 <p style={{ marginLeft: '50px' }}>No rides found.</p>
            )}

            <h2 style={{ marginLeft: '50px', marginTop: '30px' }}>Set duration for your up coming rides </h2>
            {rides.map((ride, index) => (
                <div key={ride.apiId || index}
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginTop: '2rem', 
                        boxSizing: "border-box", 
                        marginLeft: '60px', 
                        marginRight: '90px', 
                        gap: '4rem',
                        borderBottom: index < rides.length - 1 ? '1px solid #ccc' : 'none',
                        paddingBottom: '20px',
                        marginBottom: '20px'
                    }}>
                    

  

      
                    <div style={{flexBasis: '15%'}}>
                        <h4>First Name</h4>
                        <input style={{fontSize: '20px', width: '100%', height: '100%', mixBlendMode: 'color-burn', background: '#7e763254', borderRadius: 15}}
                            type="text" 
                            name="firstName"
                            value={ride.firstName}
                            onChange={(e) => handleInputChange(index, e)}
                            
                        />
                    </div>

                    <div style={{flexBasis: '15%'}}>
                        <h4>Last Name</h4>
                        <input style={{fontSize: '20px', width: '100%', height: '100%', mixBlendMode: 'color-burn', background: '#7e763254', borderRadius: 15}}
                            type="text" 
                            name="lastName"
                            value={ride.lastName}
                            onChange={(e) => handleInputChange(index, e)}
                           
                        />
                    </div>

                    <div style={{flexBasis: '15%'}}>
                        <h4>From</h4>
                        <input style={{fontSize: '20px', width: '100%', height: '100%', mixBlendMode: 'color-burn', background: '#7e763254', borderRadius: 15}}
                            type="text" 
                            name="pickOff" 
                            value={ride.pickOff}
                            onChange={(e) => handleInputChange(index, e)}
                            
                        />
                    </div>

                    <div style={{flexBasis: '15%'}}>
                        <h4>To</h4>
                        <input style={{fontSize: '20px', width: '100%', height: '100%', mixBlendMode: 'color-burn', background: '#7e763254', borderRadius: 15}}
                            type="text" 
                            name="dropOff" 
                            value={ride.dropOff}
                            onChange={(e) => handleInputChange(index, e)}
                            
                        />
                    </div>

                    <div style={{flexBasis: '15%'}}>
                        <h4>Duration/Mins</h4>
                        <input style={{ fontSize: '20px', color: "white",width: '100%', height: '100%', mixBlendMode: 'difference', background: '#491302', borderRadius: 5}}
                            type="text" 
                            name="durationTime"
                            value={ride.durationTime}
                            onChange={(e) => handleInputChange(index, e)}
                            
                        />
                    </div>
                    
                    <div style={{ flexBasis: '10%', marginTop: '30px' }}>
                        <input style={{width: '100%', height: '100%', mixBlendMode: 'difference',}}
                            type="checkbox" 
                            name="isIncluded"
                            checked={ride.isIncluded}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                        <span style={{marginLeft: '5px'}}>Select</span>
                    </div>
                </div>
            ))}

            <div style= {{display: "flex",
                            justifyContent: "center",}}>
             {showDoneButton && !isLoading && (
                    
                    <button 
                        onClick={handleDone} 
                        style={{ 
                            padding: '8px 15px', 
                            backgroundColor: 'green', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}
                    >
                     SEND 
                    </button>
                   
                )}
                 </div>

                
        </>
    );


}

