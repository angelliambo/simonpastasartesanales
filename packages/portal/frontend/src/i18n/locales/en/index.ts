import brandSlogan from '../../pages/commons/en/brandSlogan';
import emails from '../../pages/commons/en/emails';
import legal from '../../pages/commons/en/legal';
import privacy from '../../pages/commons/en/privacy';

import home from '../../pages/portal/en/home';
import loginRegister from '../../pages/portal/en/login';
import errors from '../../pages/portal/en/errors';
import navigation from '../../pages/portal/en/navigation';
import cookie from '../../pages/portal/en/cookie';
import notFound from '../../pages/portal/en/notFound';
import dashboard from '../../pages/portal/en/dashboard';
import admin from '../../pages/portal/en/admin';
import support from '../../pages/portal/en/support';

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
