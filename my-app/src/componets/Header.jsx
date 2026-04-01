import { useState } from 'react';
import { VectorToggle } from './icons';
import { VectorOpen } from './icons'; 
import { DropMenu } from './Dropmenu';  
import '../App.css'
import { InputField } from './InputField';


export  function Header({}) {

const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (

<>
     
        <header>
        <div className = "header">
        
        <VectorOpen onClick={() => setIsMenuOpen(true)} style= {{width: '20px', hight: '20px', cursor: 'pointer'}} />

            <h1 style ={{fontFamily: "Cursive", color: "#371C11", fontSize: "2rem"}}> RIDES LAP </h1>

        <VectorToggle style= {{width: '45px', hight: '45px', cursor: 'pointer'}} />
        </div>
        <DropMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      
        </header>

    <section>
    <InputField/>
    </section>

    </>
    
    





        
    )
};
