import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface registerParams{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
interface Login{
    email: string,
    password: string
}
// register service for a new user
export const register = async ({firstName,lastName,email,password}: registerParams) => {
    const findUser = await userModel.findOne({ email : email});
    if(findUser) {
        return {data: "user already exist" , statusCode: 400};
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ firstName, lastName, email, password : hashedPassword});
    await newUser.save();
    return {data:  generateJwt({firstName,lastName,email})  , statusCode: 201};
}
// login service for an existing user
export const login = async ({email , password}:Login) => {
    const findUser = await userModel.findOne({ email: email });
    
    if (!findUser) {
        return {data: "invalide email or password" , statusCode: 400};
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
        return {data: generateJwt({email,firstName:findUser.firstName,lastName:findUser.lastName}), statusCode: 200};
    }
    return {data: "invalide email or password" , statusCode: 400};
}

const generateJwt = (data : any) => {
    return jwt.sign(data, process.env.JWT_SECRET || '');
}