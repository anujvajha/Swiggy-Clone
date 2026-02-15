import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) =>
    {   
        e.preventDefault();
        try 
        {
            const user = {name, email, phone, password};
            const res = await axios.post("http://localhost:5001/signup", user, {withCredentials: true});
            if(res.status===201) navigate("/");
        }
        catch (err)
        {
            console.log("signup failed", err);
        }
    }
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label><b>Name</b></label>
                <input type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)}></input>

                <label><b>Email</b></label>
                <input type="text" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}></input>

                <label><b>Phone</b></label>
                <input type="text" value={phone} placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)}></input>

                <label><b>Password</b></label>
                <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}></input>

                <button>Sign Up</button>
            </form>
        </div>
     );
}
 
export default SignUp;