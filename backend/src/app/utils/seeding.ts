import config from '../config';
import { USER_ROLE } from '../modules/User/user.constant';
import User from '../modules/User/user.model';

const seedingAdmin = async () => {
  try {
    //at first check if the admin exist of not
    const admin = await User.findOne({
      role: USER_ROLE.ADMIN,
      email: config.admin_email,
    });

    if (!admin) {
      await User.create({
        name: 'Admin',
        role: USER_ROLE.ADMIN,
        email: config.admin_email,
        username: config.admin_username,
        password: config.admin_password,
      });
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};

export default seedingAdmin;
