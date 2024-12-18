
import Home from '../pages/Home'
import Login from '../pages/Login' 
import Signup from '../pages/Signup'
import AddVechele  from '../pages/AddVechele.jsx'
import Vecheles from '../pages/Vechele/Vechele'
import VecheleDetails from '../pages/Vechele/VecheleDetails'  
import { Routes, Route } from 'react-router-dom' 
import ProtectedRoute from "./ProtectedRoute"
import GoogleTranslate from '../components/translator/GoogleTranslate';  

import ChartDisplay1 from '../pages/Chart_desplay1';
import ChartDisplay2 from '../pages/Chart_desplay2'; 
import Track from '../pages/Track.jsx';

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Home />} />{/* Default route */}
    <Route path='/home' element={<Home />} />
    <Route path='/vecheles' element={<Vecheles />} />
    <Route path='/vecheles/:id' element={<VecheleDetails />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Signup />} />
    <Route path='/AddVechele' element={<AddVechele />} />
    <Route path='/GoogleTranslate' element={<GoogleTranslate />} />
    <Route path='/ChartDisplay1' element={<ChartDisplay1/>} />
    <Route path='/ChartDisplay2' element={<ChartDisplay2/>} />
    <Route path='/Track' element={<Track/>}/>
     
     
    {/*<Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard/>
        </ProtectedRoute>

      }
    /> */}
  </Routes>
};

export default Routers;
