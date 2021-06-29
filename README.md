
### React + RTK + Material-UI - Make Up products -

- This app is built with **create-react-app** to consume makeup-api.herokuapp.com/api/v1/products.json API request with **Axios**.

- Using **Redux Toolkit** to manage Redux logic, and **createEntityAdapter** to generate a set of prebuilt reducers and selectors for performing CRUD operations on a normalized state structure. 

- **Apply single responsability principle** by creating **custom selectors** and **custom hooks** to keep  immutable Data structure and logic outside components  and let dumb components to be focused on UI.

- **Performance optimization techniques** applied with **code splitting** and **lazy loading** of components to reduce the main bundle. 

- **React.memo** and **React.useCallback** for component memoization to prevent useless re-rendering and cache expensive operations.

- **React-Window** and **React-Virtualized AutoSizer** to create products  grids to efficiently render only the data that's needed in addition to **custom lazy image IntersectionObserver**.

- **Prefetch** and **Preconnet** implemented methods in the HEAD to perform DNS lockups ahead of time.

- **Full responsive app mobile-first approach** styled with **MATERIAL UI** and **customized theme**. Adding dependencies **customize-cra** and **react-app-rewired** to override few webpack config for Material-ui better performance.

- Using **PropTypes** for structured  and defined props to avoid bugs and errors.

- Monitoring and debugging with **React Devtools , coverage, Profiler, Performance**  and **Lighthouse** extension.

### Usage

Responsive Web app that allows users to navigate through products categories, see details product, add and remove products from Shopping Cart, increment or decrement product quantity in cart updating the single amount and see the total of the purchase.

## Live Application URL
Deployed on Heroku :hearts:

[https://react-redux-toolkit-shopix.herokuapp.com/](
https://react-redux-toolkit-shopix.herokuapp.com/)

## Technologies used
See package.json for versions

* **React v17.0.2**
      - react-dom
      - react-router-dom
      - axios
      - prop-types
      - styled-components
      
* **React-Redux v7.2.4**
      - reduxjs/toolkit v1.5.1
      - redux-persist v6.0.0

* **Material-ui v4.11.4**
      - material-ui/core
      - material-ui/icons
      - material-ui/lab
      
* **React-window v1.8.6**
 
* **React-virtualized.auto-sizer v1.0.5**

* **Engines**
      - Node v14.17.1
      - npm v6.14.13

## **Installation**

- ``git clone https://github.com/Beshorts/react-redux-toolkit-shopix.git`` 

## **Run**

- ``npm install`` then ``npm start`` to start React

- visit [https://localhost:3000](https://localhost:3000) in your browser to see the app

- **Have fun!** :tada:



