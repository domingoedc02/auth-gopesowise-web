import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./design/Verification.scss"
import {ClipLoader} from "react-spinners";
import axios from "axios";


export default function Verification(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const codeId = queryParams.get('codeId');
    const token = queryParams.get('token');


    useEffect(() => {
        // if ( (token === undefined || token === null)  || (codeId === undefined || codeId === null) ){
        //     window.location.href = "https://gopesowise.com";
        // }
        fetchData()
    }, [token, codeId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://dev.server.gopesowise.com/api/auth/verify/email/link?id=${codeId}&token=${token}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": `Bearer ${token}`
                }
            });  // Make GET request
            console.log(response)
            if (response.status !== 200){
                throw new Error(response.statusText)
            }
            console.log(response)
            setMessage(response.data.statusText)
            window.location.href = "https://gopesowise.com";
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.statusText);  // Set error message if request fails
        } finally {
            setLoading(false);  // Set loading to false when request is complete
        }
    };

    return(
        <div className="verify-container">
            <h3>Verifying</h3>
            <div className="spinner">
                {loading? <ClipLoader color="#36d7b7" loading={loading} size={25} />: ""}
                {(message === null)? "": <p>{message}</p>}
            </div>
        </div>
    )
}