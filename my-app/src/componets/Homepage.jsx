import { useState } from 'react';
import { VectorToggle } from './icons';
import { VectorOpen } from './icons'; 
import { DropMenu } from './Dropmenu';  
import '../App.css'
import { InputField } from './InputField';


export  function Homepage({}) {

const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (

        <>
        <header style= {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',boxSizing: 'border-box'}}>
        
        <VectorOpen onClick={() => setIsMenuOpen(true)} style= {{width: '20px', hight: '20px', cursor: 'pointer'}} />

        <VectorToggle style= {{width: '45px', hight: '45px', cursor: 'pointer'}} />

        <DropMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        </header>

    <section>
    <InputField/>
    </section>


    </>
    





        
    )
};
