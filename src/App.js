import HeaderComponnent from './component/common/HeaderComponet';
import FooterComponent from './component/common/FooterComponent';
import LeftMenuComponnent from './component/common/LeftMenuComponent';
import { ToastContainer } from 'react-toastify';
import FilterSearchComponent from './component/common/FilterSearchComponent';
import { Outlet } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="toast-login"
      />
      <PrivateRoutes >
        <div className="App">
          <HeaderComponnent />
          <LeftMenuComponnent />
          <Outlet />
          <FooterComponent />
        </div>
      </PrivateRoutes>
    </>
  );
}

export default App;
