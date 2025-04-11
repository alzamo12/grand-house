import axios from "axios"

export const imageUpload = async image => {
    const formData = new FormData();
    formData.append("image", image)
    const apiKey = import.meta.env.VITE_imagebb_key;
    try {
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData)
        return res.data.data.display_url;
    }
    catch(error){
        console.log(error)
    }
}