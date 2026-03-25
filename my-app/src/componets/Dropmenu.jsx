import '../App.css'
import { VectorDelete } from "./icons"; 
import { VectorExit } from "./icons";


export function DropMenu({ isMenuOpen, setIsMenuOpen }) {
    
    // 🚨 REMOVED the "if(!isMenuOpen) return null" so the animation can actually happen!

    return ( 
        /* 
           This dynamic class adds "open" to the string when isMenuOpen is true.
           Resulting in: className="menuContainer open"
        */
        <div className={`menuContainer ${isMenuOpen ? 'open' : ''}`}>
            
          
                <nav>
                    {/* Wrapped the Exit icon in a div to properly push it to the right */}
                    <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                        <VectorExit 
                            onClick={() => setIsMenuOpen(false)} 
                            style={{ height: "30px", width: "30px", cursor: "pointer", color: "white" }} 
                        />
                    </div>

                    <ul style={{ listStyle: "none", padding: "0 20px", color: "white" }}>
                        
                        {/* Cleaned up the broken style={{style: ""}} tags */}
                        <li style={{ margin: "15px 0", cursor: "pointer" }}>My Task</li> 
                        <li style={{ margin: "15px 0", cursor: "pointer" }}>Calendar</li>
                        <li style={{ margin: "15px 0", cursor: "pointer" }}>Ride History</li>
                        
                        <li style={{ display: "flex", alignItems: "center", gap: "10px", margin: "15px 0", cursor: "pointer" }}>
                            Trash
                            <VectorDelete style={{ height: "20px", width: "20px" }} />
                        </li>
                    </ul>
                </nav>
       
            
        </div>
    );
}