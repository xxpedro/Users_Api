import { param, body, query } from 'express-validator';

const customValidatorName = (value: string) => {
  if (!value) {
    throw new Error('El nombre es obligatorio');
  }
  return true;
};




function UserSchema() {
  const schema = {
    postUser: [
        body('email').notEmpty().isEmail().withMessage('Ingrese una dirección de correo electrónico válida para el campo "email"'),
        body('firstName').isString().notEmpty().withMessage('El campo "firstName" debe ser una cadena no vacía'),
        body('lastName').isString().notEmpty().withMessage('El campo "lastName" debe ser una cadena no vacía'),
        body('password').isString().notEmpty().withMessage('El campo "password" no puede estar vacío'),
        body('role').optional().isString().withMessage('El campo "role" debe ser una cadena'),
    ],
    updateUser: [
        body('email').isEmail().notEmpty().withMessage('Ingrese una dirección de correo electrónico válida para el campo "email"'),
        body('firstName').isString().notEmpty().withMessage('El campo "firstName" debe ser una cadena no vacía'),
        body('lastName').isString().notEmpty().withMessage('El campo "lastName" debe ser una cadena no vacía'),
        body('password').isString().notEmpty().withMessage('El campo "password" no puede estar vacío'),
        body('role').optional().notEmpty().isString().withMessage('El campo "role" no puede estar vacío'),
    ]
  };

  return { schema };
}




export { UserSchema };
