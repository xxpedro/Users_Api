import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { addUser, deleteUserById, getAllUsers, updateUser } from './../services/user.service';
import { User } from './../models/entities/user.entities';
import { UserSchema } from "../routes/apiRouterSchema/userSchema";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userList = await getAllUsers();
        
        return res.status(200).json({
            success: true,
            message: 'Usuarios cargados con exito',
            data: userList,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const createUsers = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user: User = req.body;
        const result = await addUser(user);
  
        return res.status(result.success ? 200 : 409).json(result);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { _id } = req.params;
        const user: User = req.body;
  
        try {
            const updatedUser = await updateUser(_id, user);
  
            return res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'Usuario Actualizado con éxito',
            });
        } catch (error: any) {
            if (error.message === 'Este usuario no existe') {
                return res.status(404).json({
                    success: false,
                    data: null,
                    message: 'Este usuario no existe',
                });
            }

            if (error.message === 'Este usuario ya existe') {
                return res.status(409).json({
                    success: false,
                    data: null,
                    message: 'Este usuario ya existe',
                });
            }
  
            throw error; 
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
  
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { _id } = req.params;
        const result = await deleteUserById(_id);

        return res.status(result.success ? 200 : 404).json(result);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
