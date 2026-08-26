
import axios from "axios";


const api = axios.create({

    baseURL:
        "https://securescan-ai-1.onrender.com",

    headers: {
        "Content-Type": "application/json"
    }

});


export default api;