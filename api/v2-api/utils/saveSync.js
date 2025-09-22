import fs from "fs"
const SaveSync = ({ path, data })=>{
    try {
        fs.writeFileSync( path, JSON.stringify(data, null, 2))
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}
export default SaveSync