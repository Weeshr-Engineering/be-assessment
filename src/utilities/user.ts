// export async function registerValidator(){
//     // do validation
// }

// validation.ts
import { object, string, Schema } from 'zod';

// Define the UserAttributes type
type UserAttributes = {
    authorName: string;
    email: string;
    password: string;
    phoneNumber: string; // Adjust as needed for phone number validation
};

// Create the user schema using Zod
export const userData: Schema<UserAttributes> = object({
    authorName: string(),
    email: string().email(),
    password: string().min(8),
    phoneNumber: string().min(11), 
});

export default userData;