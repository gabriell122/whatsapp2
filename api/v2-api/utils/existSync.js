import fs from "fs"
const ExistsSync = ({path})=>{
    if(fs.existsSync(path)){
        return true
    }else{
        return false
    }
}
export default ExistsSync