import React from 'react';

// import components
import Header from './Header';
import DrawerCategories from '../drawer/DrawerCategories';

// import elements
import { useDrawer } from '../elements/customHooks';

// create component composition
const HeaderLayout = () => {
  console.count("header layout")

  // custom hook to handle Drawer behaviours
  const [mobileOpen, openDrawerCallback, closeDrawerCallback] = useDrawer();

  return(
    <Header openDrawerCallback={openDrawerCallback}>
      <DrawerCategories mobileOpen={mobileOpen} closeDrawerCallback={closeDrawerCallback} />
    </Header>
  );
};

export default HeaderLayout;
