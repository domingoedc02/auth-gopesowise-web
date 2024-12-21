
import "./design/Password.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {ClipLoader} from "react-spinners";

export default function Password(){
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [responseError, setResponseError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (password !== "" && confirmPassword !== ""){
            if (password !== confirmPassword){
                setErrMessage("The passwords you entered do not match.")
            } else if (password.length < 8){
                setErrMessage("The password must be at least 8 characters long.")
            } else {
                setIsDisabled(false)
                setErrMessage("")
            }
        }
    }, [password, confirmPassword]);

    const buttonHandler = () => {
        setLoading(true)
        setIsDisabled(true)
        fetchData()
    }
    const fetchData = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/user/password`,
                {
                    // Body of the request
                    password: password
                },
                {
                    // Headers of the request
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ); // Make GET request
            if (response.status !== 200){

                throw new Error(response.statusText)
            }
            // navigate(`/password?token=${response.data.accessToken}`)
        } catch (error) {
            setResponseError(error.message);  // Set error message if request fails
        } finally {
            setIsDisabled(false)
            setLoading(false);  // Set loading to false when request is complete
        }
    };

    return(
        <div className="password-container">
            <form>
                <h3>New Password</h3>
                {(errMessage !== "")? <p>{errMessage}</p>: ""}
                <div>
                    <label htmlFor="password">New Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <button disabled={isDisabled} onClick={buttonHandler}>
                    {(loading)? <ClipLoader color="#36d7b7" loading={loading} size={25} />: "SUBMIT"}
                </button>
            </form>
        </div>
    )
}