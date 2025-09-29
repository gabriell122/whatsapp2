import ConnApi from "../services/axios"

const GetConversas = async ()=>{
    try {
        const res = await ConnApi.get("/conversas");
        if(res.data.confirma)
            return {
                data: res.data.data,
                success: true
            }
        else
            return {
                success: false
            }
    } catch (error) {
        return { 
            data: error, 
            success: false
        }
    }

}
export default GetConversas