import jwt from "jsonwebtoken";

const key = "dkjsfklsUGLJ677sjfs";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGV0ZXIiLCJpZCI6MTcsImlhdCI6MTcxMDc0MjAzOX0.l0Yyebvesz9cOQuIg1JlP93gfNyxDdsBv8K2urAWSQ0";

  // JWT 解密
const payload = jwt.verify(token, key);

console.log(payload);
