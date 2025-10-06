import fs from "fs"
function ReadSync({ path }) {
  try {
    console.log(path);
    
    const data = fs.readFileSync( path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return false;
  }
}
export default ReadSync;