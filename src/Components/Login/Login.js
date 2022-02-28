import React,{useState,useEffect} from 'react';
import './Login.css';
// import PropTypes from 'prop-types';
import Home from '../Home/Home';

async function loginUser(username,
      password) {
 if(username =="foo" && password==="bar")
   return true;
  else
   return false;
}

export default function Login({setToken}) {

const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let [error,setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      username,
      password
    );

    setError(!token);
  
    setToken(token);
    // this.props.history.push('/Home')
    window.history.replaceState(null, "Shaddi.com", "/home")
  }


  return(<>
<div className='row loginForm'>
<div className='col-lg-4 col-md-2'></div>
    <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12' id="loginFormield">
    <form  onSubmit={handleSubmit}>
      <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <label htmlFor="username" className="col-sm-2 col-form-label">Email</label>
        <div>
          <input type="text" className="form-control" id="username" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
        </div>
      </div>
      <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <label htmlFor="pwd" className="col-sm-2 col-form-label">Password</label>
        <div >
          <input type="password" className="form-control" id="pwd" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </div>
      </div>
  
      <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">
        {error && 
        <label>Please try again</label> }
        <div>
        <button type="submit" id="loginBtn" className="btn btn-primary">Login</button>
       </div>
      </div>  
    </form>
    </div>
    <div className='col-lg-4 col-md-2 '></div>
</div>
  </>)
}
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }