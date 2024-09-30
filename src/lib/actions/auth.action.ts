"use server";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import { handleError } from "../utils";
import dbConnect from "../db";
import { IUser, IUserLoginCredentials } from "@/types";

// CREATE USER
export const createUser = async (user: IUser) => {
  try {
    await dbConnect();
    const newUser = await UserModel.create(user);
    await newUser.save();
    return {
      statusCode: 200,
      user: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    handleError(error);
  }
};

// LOGIN USER
export const loginUser = async (user: IUserLoginCredentials) => {
  try {
    await dbConnect();

    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      return { statusCode: 401, message: "User not found" };
    }

    // const isPasswordMatch = await bcrypt.compare(user.password, foundUser.password);
    const isPasswordMatch = user.password === foundUser.password;
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return { statusCode: 401, message: "Invalid credentials" };
    }
    return {
      statusCode: 200,
      user: JSON.parse(JSON.stringify(foundUser)),
    };
  } catch (error) {
    handleError(error);
  }
};

// logout user

export const logoutUser = async ()=>{
  try{
    await dbConnect();
    return {statusCode:200,message:"User logged out successfully"};
  }
  catch(error){
    handleError(error);
  }
}


