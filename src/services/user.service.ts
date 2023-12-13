import mongoose from "mongoose";
import UserModel, { User, encryptPassword } from "../models/entities/user.entities";

export const getAllUsers = async () => {
    try {
       return await UserModel.find();      
    } catch (error: any) {
       throw error;
    }
}

export const updateUser = async (_id: string, user: User) => {
    try {
      const objectId = new mongoose.Types.ObjectId(_id);
      const validateIfUserExist = await UserModel.findById(objectId);
  
      if (!validateIfUserExist) {
        throw new Error('Este usuario no existe');
      }

      const comapreEmails = user.email !== validateIfUserExist.email;
      if(comapreEmails) {
        const isExistingEmail = await UserModel.exists({ email: user.email });
        if (isExistingEmail) {
            throw new Error('Este usuario ya existe');
        }
      }
      await UserModel.updateOne({ _id: objectId }, user);
  
      return user; 
    } catch (error) {
      throw error;
    }
};

export const addUser = async (userData: User) => {
    try {
        const newUser = new UserModel(userData);
        const validateEmail = await UserModel.findOne({ email: userData.email });

        if (!validateEmail) 
        {
          await newUser.save();
          return {
            success: true,
            message: 'Usuario agregado correctamente',
            data: newUser,
          };
        }

        return {
        success: false,
        message: 'Este usuario ya está registrado',
        data: null,
        };
    } catch (error) {
        throw error;
    }
};

export const deleteUserById = async (userId: string) => {
    try {
      const result = await UserModel.deleteOne({ _id: userId });
  
      if (result.deletedCount && result.deletedCount > 0) {
        return {
          success: true,
          message: 'Usuario eliminado correctamente',
          data: null,
        };
      } else {
        return {
          success: false,
          message: 'Usuario no encontrado',
          data: null,
        };
      }
    } catch (error) {
      throw error;
    }
};