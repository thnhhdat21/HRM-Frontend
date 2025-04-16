import HeaderComponnent from './component/common/HeaderComponet';
import FooterComponent from './component/common/FooterComponent';
import LeftMenuComponnent from './component/common/LeftMenuComponent';
import { ToastContainer } from 'react-toastify';
function App({ component: Component }) {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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
      <div className="App">
        <HeaderComponnent />
        <LeftMenuComponnent />
        {Component && <Component />}
        <FooterComponent />
      </div>
    </>
  );
}

export default App;
