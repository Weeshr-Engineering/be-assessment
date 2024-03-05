import { Request, Response } from 'express'
import { User, validateUser } from '../Models/user'


//Handle Errors
const handleErrors = (err: any) => {
    let errors: { [key: string]: string } = { email: '', password: '' };

    // Incorrect email and password during login
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // Duplicate email error
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }: any) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

//JWT function 
const maxAge = 1 * 24 * 60 * 60


export const signup_post = async (req: Request, res: Response) => {
     //Joi validation
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    const { name, email, phone, password} = req.body;
    
    try{
        const user = await User.create({ name, email, phone, password })
        const token = user.generateAuthToken()
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            signed: true
        })
        res.send({user: user._id, name }) 
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

export const login_post = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        if (!user) {
            throw new Error('user validation failed');
        }
        const token = user.generateAuthToken()
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            signed: true
        })
        res.status(200).json({ token, user: user.name });
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}