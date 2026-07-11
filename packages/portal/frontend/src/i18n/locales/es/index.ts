import brandSlogan from '../../pages/commons/es/brandSlogan';
import emails from '../../pages/commons/es/emails';
import legal from '../../pages/commons/es/legal';
import privacy from '../../pages/commons/es/privacy';

import home from '../../pages/portal/es/home';
import loginRegister from '../../pages/portal/es/login';
import errors from '../../pages/portal/es/errors';
import navigation from '../../pages/portal/es/navigation';
import cookie from '../../pages/portal/es/cookie';
import notFound from '../../pages/portal/es/notFound';
import dashboard from '../../pages/portal/es/dashboard';
import admin from '../../pages/portal/es/admin';
import support from '../../pages/portal/es/support';

const { login, register } = loginRegister;

const pages = {
  brandSlogan,
  emails,
  legal,
  privacy,
  home,
  login,
  register,
  errors,
  navigation,
  cookie,
  notFound,
  dashboard,
  admin,
  support,
};

export default pages;
export { pages };
