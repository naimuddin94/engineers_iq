import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const loginUserValidationSchema = z.object({
  body: z.object({
    identity: z.string({
      required_error: 'Identity is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, { message: 'Password must be at least 4 characters' })
      .max(20, { message: 'Password no longer that 20 characters' }),
  }),
});

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    })
    .min(2)
    .max(30),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email format' }),
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must shorter than 20 characters'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password no longer that 20 characters' }),
  role: z
    .enum(['ADMIN', 'USER'], {
      message: 'Role is required in valid format USER or ADMIN',
    })
    .default(USER_ROLE.USER),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const accessTokenValidationSchema = z.object({
  cookies: z.object({
    accessToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required!',
    }),
    newPassword: z.string({
      required_error: 'New password is required!',
    }),
  }),
});

const createUserValidationSchema = z.object({
  body: userValidationSchema,
});

const updateUserValidationSchema = z.object({
  body: userValidationSchema.partial(),
});

export const UserValidation = {
  userValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
  accessTokenValidationSchema,
};
