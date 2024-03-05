import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import user from '../model/user'; 
// import { userData } from '../utilities/user';
// import { string } from 'zod';
import jwt from 'jsonwebtoken';

const secret: any = process.env.secret

export const registerUser = async (req: Request, res: Response) => {
  

    try {
      const { id, authorName, email, phoneNumber} = req.body

    const password = req.body.password;
    
    const existingUser = await user.findOne({ where: { email } });

    console.log(existingUser)
    
    if (existingUser) {
      res.status(400).json({ message: 'Email is already registered' });
      return;
    }
// password
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log(hashedPassword)
  

    const newUser = await user.create({
        id, 
        authorName,
        email,
        password: hashedPassword,
        phoneNumber
    })
    console.log(newUser);
    
    console.log(password);

    if (!newUser) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }  
  
    // res.status(201).json({ message: 'User registered successfully', user: newUser });
    res.redirect('/index');
  } catch (error) {
    res.status(500).json({ error: 'not working' });
    return;
  }
};


interface AuthRequest extends Request {
  user?: {id:string}; // Add the userId property to the Request type
}

export const loginUser = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    const User: any = await user.findOne({ email });
console.log(User);

    // Check if user exists
    if (!User) {
      res.status(404).json({ status: 'failed', message: 'User not found' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = bcrypt.compareSync(password, User.password);

    if (passwordMatch) {
      // Passwords match, generate JWT token
      const secret: any = process.env.secret;
      const token = jwt.sign(
        {
          loginkey: User.id,
        },
        secret,
        { expiresIn: '1h' }
      );

      res.status(200).json({ status: 'successful', message: 'Login successful', token: token });
    } else {
      // Passwords do not match
      res.status(401).json({ status: 'failed', message: 'Invalid password' });
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

