import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate();

  const [signUpData, setsignUpData] = useState(
    {
      email: "",
      password: "",
      confirmpass: "",
      admin: false,
      createdAt: ""
      
    }
  )
  const [admin, setadmin] = useState(false)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prevState => !prevState);
  };


  const currentData = new Date().toISOString();
  const updatedSignUpData = {
    ...signUpData,
    createdAt: currentData,
  }

  console.log(updatedSignUpData)
  

  function handleadmin(){
    setadmin(prevAdmin => {
      const newAdminValue = !prevAdmin;

      setsignUpData(prevData => ({
        ...prevData,
        admin: newAdminValue
      }));
      
      return newAdminValue;
    })
  }

  async function handleRegister(event){
    event.preventDefault()
    if (signUpData.password === signUpData.confirmpass){  
      try {
        const response = await axios.post('http://localhost:5000/api/register', updatedSignUpData);
        console.log(response.data);
        navigate('/')
      } catch (err) {
        console.error('Error registering User: ', err);
        alert('Registration failed. Please try again.');
      }
    }
    else{
      console.log("Password do not Match")
    }
  }

  function handleChange(event){
    const {name, value, type, checked} = event.target 
    setsignUpData(prevsignUpData => ({
        ...prevsignUpData,
        [name]: type === "checkbox" ? checked : value 
    }))
  }

  function GotoLogin(){
    navigate('/')
  }

  return ( 
    <div className='container mx-auto p-5 my-5'>
      <div className='flex flex-wrap'>
        <form className='w-full md:w-1/2' onSubmit={handleRegister}>
          <h1 className="text-center text-2xl font-bold">SIGN UP!</h1>
          <a className="text-blue-600 text-sm" onClick={handleadmin}>admin</a>
          <div className='mb-4'>
            <label htmlFor="email" className="block text-lg font-medium">Email address</label>
            <input
              type="email"
              id='email'
              name="email"
              value={signUpData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className="block text-lg font-medium">Password: </label>
            <div className='relative'>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id='password'
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor="confirmpass" className="block text-lg font-medium">Confirm Password: </label>
            <div className='relative'>
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id='confirmpass'
                name="confirmpass"
                value={signUpData.confirmpass}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                {isConfirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700" type='submit'>
            REGISTER
          </button>

          <div className='flex justify-center'>
            <span className='text-sm'>Have An Account? </span>
            <a className="text-blue-600 text-sm" onClick={GotoLogin}>Sign In</a>
          </div>
        </form>
        <div className='w-full md:w-1/2 flex justify-center'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </div>
      </div>
    </div>
  );
}

export default Register