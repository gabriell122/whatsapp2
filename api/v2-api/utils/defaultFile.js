import SaveSync from "./saveSync.js";
const DefaultFile = ({ post, data, path})=>{
    try {
        SaveSync({path: path, data:{
            nome: post,
            status: "online",
            ...(
                data
                ?
                {
                    mensagens: [
                        {
                            de: post,
                            texto: data,
                            hora: new Date().toISOString()
                        }
                    ]
                }
                :
                {
                    mensagens:[]
                }
            )
        }})
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}
export default DefaultFile
