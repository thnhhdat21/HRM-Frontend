import HeaderComponnent from './component/common/HeaderComponet';
import FooterComponent from './component/common/FooterComponent';
import LeftMenuComponnent from './component/common/LeftMenuComponent';
function App({ component: Component }) {
  return (
    <>
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
