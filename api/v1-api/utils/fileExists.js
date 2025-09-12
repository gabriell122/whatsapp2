import  fsPromises from "fs/promises";
export const FileExists = async ({fileName})=>{
    try {
        await fsPromises.access(fileName, fs.constants.F_OK)
        return true
    } catch (error) {
        return false
    }
}