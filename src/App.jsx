import { useEffect, useState } from 'react'
import './App.css'
import Register from './component/register'
import Login from './component/login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './component/Main'


function App() {
  

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/main' element={<Main/>}/>
        </Routes>
      </Router>
  );
}

export default App


  // const [registerclicked, setRegisterClicked] = useState(false)

  // function GotoRegister(){
  //   setRegisterClicked(prevData => !prevData)
  // }

  // <div className="h-screen justify-center items-center p-5">
  //       {registerclicked ? 
  //       <Register 
  //         GotoRegister = {GotoRegister}
  //       />
  //       :
  //       <Login 
  //         GotoRegister = {GotoRegister}
  //       />}
  //     </div>



  // Add this Only when add new features for Admin account
  // useEffect(()=>{
  //   axios.get('http://localhost:5000/api/data')
  //     .then((response) => {
  //       setloginData(response.data);
  //     })
  //     .catch((error) =>{
  //       console.error('Error fetching data: ', error )
  //     })
  // }, [])
