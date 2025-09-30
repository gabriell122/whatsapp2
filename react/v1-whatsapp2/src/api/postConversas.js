import ConnApi from "../services/axios"

const PostMensagens =  async ({ post })=>{
    try {
        const res = await ConnApi.post("/conversas",{conversas: post})
        if(res.data.confirma)
            return{
                data:res.data.data,
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
export default PostMensagens