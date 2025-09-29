import ConnApi from "../services/axios"

const GetMensagens = async ({get})=>{
    try {
        const res = await ConnApi.get(`/mensagens/${get}`)
        if(res.data.confirma)
            return { 
                data: res.data.data, 
                success: true
            }
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
export default GetMensagens