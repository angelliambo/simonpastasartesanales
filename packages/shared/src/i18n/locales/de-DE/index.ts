import * as commonsPages from './commons';
import * as extPages from './ext';
import * as portalPages from './portal';

const pages = { ...commonsPages, ...extPages, ...portalPages };

export default pages;
export { pages };
