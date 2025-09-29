import fs from "fs"
function ReadSync({ path }) {
  try {
    const data = fs.readFileSync( path, "utf8");
    console.log(data);
    
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return false;
  }
}
export default ReadSync;