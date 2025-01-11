import config from '../config';
import { USER_ROLE } from '../modules/User/user.constant';
import User from '../modules/User/user.model';

const seedingAdmin = async () => {
  try {
    //at first check if the admin exist of not
    const admin = await User.findOne({
      role: USER_ROLE.admin,
      email: config.admin_email,
    });

    if (!admin) {
      await User.create({
        name: 'Admin',
        role: USER_ROLE.admin,
        email: config.admin_email,
        password: config.admin_password,
        phone: config.admin_mobile_number,
      });
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};

export default seedingAdmin;
