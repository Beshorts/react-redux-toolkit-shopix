import React, {Suspense, lazy} from 'react';

// import components
//import Header from './Header';

// import elements
import { useDrawer } from '../elements/customHooks';

// import lazy component
const Header = lazy(() => import('./Header'));
const DrawerCategories = lazy(() => import('../drawer/DrawerCategories'));

// create component composition
const HeaderLayout = () => {

  // destructure custom hook to handle Drawer behaviours
  const [mobileOpen, openDrawerCallback, closeDrawerCallback] = useDrawer();

  return(
      <Suspense fallback={<div/>}>
    <Header mobileOpen={mobileOpen} openDrawerCallback={openDrawerCallback} >
        <DrawerCategories mobileOpen={mobileOpen} closeDrawerCallback={closeDrawerCallback} />
    </Header>
      </Suspense>
  );
};

export default HeaderLayout;
