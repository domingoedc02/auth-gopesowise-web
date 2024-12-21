import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./design/Verification.scss"
import {ClipLoader} from "react-spinners";
import axios from "axios";


export default function Verification(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const codeId = queryParams.get('codeId');
    const token = queryParams.get('token');
    const [successMessage, setSuccessMessage] = useState("")


    useEffect(() => {
        if ( token === undefined || codeId === undefined ){
            navigate("https://gopesowise.com")
        }
        fetchData()
    }, [token, codeId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://dev.server.gopesowise.com/api/auth/verify/email/link?id=${codeId}&token=${token}`);  // Make GET request
            if (response.status !== 200){
                throw new Error(response.statusText)
            }
            setSuccessMessage(response.data.statusText)
            setTimeout(() => {
                navigate("https://gopesowise.com")
            }, 50000);
        } catch (error) {
            setError(error.response.data.statusText);  // Set error message if request fails
        } finally {
            setLoading(false);  // Set loading to false when request is complete
        }
    };

    return(
        <div className="verify-container">
            <h3>Verifying</h3>
            <div className="spinner">
                {loading? <ClipLoader color="#36d7b7" loading={loading} size={25} />: ""}
                {(error === null)? "": <p>{error}</p>}
                {(successMessage !== "")? <p>{successMessage}</p>: <p></p>}
            </div>
        </div>
    )
}