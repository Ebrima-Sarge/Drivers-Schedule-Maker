import { VectorExit } from "./icons";
import '../App.css';

// Accept onAddRide prop
export function Option({ isOptionOpen, setIsOptionOpen, onAddRide, onDelete, onUpdate }) {
    
    // Handle the "Add New" click
    const handleAddNew = () => {
        if (onAddRide) {
            onAddRide();
        }
    };

    const Deletesection = ()=> {
        if (onDelete) {
            onDelete();
        }
    };

    const handleInputChange = () => {
        if (onUpdate) {
            onUpdate();
        };
    }

    return (
        <div className={`optionCard ${isOptionOpen ? 'Open' : ''}`}>
            <ul style={{ listStyle: 'none', justifyContent: "space-between", marginTop: '2px' }}>
                <VectorExit onClick={() => setIsOptionOpen(false)} style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }} />
                
                {/* Attach the handler to the Add New list item */}
                <li onClick={handleAddNew} style={{ cursor: 'pointer' }}>Add New</li> 
                
                <li onClick = {Deletesection} style={{ cursor: 'pointer' }}>Delete</li>
                <li onClick = {handleInputChange} style={{ cursor: 'pointer' }}>Update</li>
            </ul>
        </div>
    );
}