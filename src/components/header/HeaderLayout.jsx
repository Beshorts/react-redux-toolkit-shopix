import React, {Suspense, lazy} from 'react';

// import components
import Header from './Header';
//import DrawerCategories from '../drawer/DrawerCategories';

// import elements
import { useDrawer } from '../elements/customHooks';
const DrawerCategories = lazy(() => import('../drawer/DrawerCategories'));

// create component composition
const HeaderLayout = () => {

  // custom hook to handle Drawer behaviours
  const [mobileOpen, openDrawerCallback, closeDrawerCallback] = useDrawer();

  return(
    <Header openDrawerCallback={openDrawerCallback}>
      <Suspense fallback={<div/>}>
        <DrawerCategories mobileOpen={mobileOpen} closeDrawerCallback={closeDrawerCallback} />
      </Suspense>
    </Header>
  );
};

export default HeaderLayout;
