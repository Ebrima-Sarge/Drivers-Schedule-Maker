import { Route, Router } from 'react-router-dom';
import './App.css';
import { Homepage } from './componets/Homepage';
import {Calender} from './componets/Calender'
import {Trash} from './componets/Trash';
import {History} from './componets/History';



function App() {
  return (
<>
    <Homepage/>

  </>
  );



}

export default App;

 <Router>

    <Route path='/my-calender' element = {<Calender/>} />
    <Route path='/my-Trash' element = {<Trash/>} />
    <Route path='/my-History' element = {<History/>} />




    </Router>