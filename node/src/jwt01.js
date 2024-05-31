import jwt from "jsonwebtoken";

const key = "dkjsfklsUGLJ677sjfs";

const token = jwt.sign({name:"peter", id:17}, key);

console.log({token});