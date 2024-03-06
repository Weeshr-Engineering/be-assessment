// import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
// import { User } from '@prisma/client';
// import { SignUpDto } from './dto/signUp.dto';
// import { Test } from '@nestjs/testing';
// import { AuthorService } from '../author/author.service';
// import { PrismaService } from '../prisma.service';
//
// describe('AuthService', () => {
//   let service: AuthService;
//   let fakeUserService: Partial<UserService>;
//   beforeEach(async () => {
//     const users: User[] = [];
//
//     fakeUserService = {
//       findUserByEmail: (email: string) => {
//         const filteredUser = users.find((user) => user.email === email);
//         return Promise.resolve(filteredUser);
//       },
//       createUser(body: SignUpDto) {
//         const user = { id: Math.floor(Math.random() * 9999), ...body } as User;
//         users.push(user);
//         return Promise.resolve(user);
//       },
//     };
//
//     const module = await Test.createTestingModule({
//       providers: [
//         AuthorService,
//         PrismaService,
//         {
//           provide: UserService,
//           useValue: fakeUserService,
//         },
//       ],
//     }).compile();
//
//     service = module.get(AuthorService);
//   });
//
//   it('can create an instance of auth service', () => {
//     expect(service).toBeDefined();
//   });
//
//   it('creates a new user with a hashed password', async () => {
//     const user = await service.signUp({
//       firstName: 'Daud',
//       lastName: 'Olarewaju',
//       email: 'daud@gmail.com',
//       password: 'daud',
//     });
//     expect(user.password).not.toEqual('daud');
//   });
// });

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(() => {
    authService = new AuthService(userService, jwtService);
    authController = new AuthController(authService);
  });

  describe('Signup', () => {
    it('should sign up', async () => {
      const result = Promise.resolve({
        id: 1,
        firstName: 'Daud',
        lastName: 'Olarewaju',
        email: 'daud@gmail.com',
        password: 'password',
      });
      jest.spyOn(authService, 'signUp').mockImplementation(() => result);
      const data = await authController.signUp({
        firstName: 'Daud',
        lastName: 'Olarewaju',
        email: 'daud@gmail.com',
        password: 'password',
      });
      expect(data.data).toBe(await result);
    });
  });

  describe('Signin', () => {
    it('should sign in', async () => {
      const result = {
        success: true,
        message: 'Signin successful!',
        accessToken: '',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockImplementation(async () => result.toString());
      const data = await authController.signIn({
        email: 'daud@gmail.com',
        password: 'password',
      });
      expect(data.success).toBe(true);
    });
  });
});
