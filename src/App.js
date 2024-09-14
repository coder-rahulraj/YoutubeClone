import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import Footer from "./components/Footer";
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Body/>,
    children:[
      {
        path:'/',
        element:<MainContainer/>
      },
      {
        path:'/watch',
        element:<WatchPage/>
      }
    ]
  }
])

function App() {
  return (
    <Provider store={store}>
      <div className="p-1">
        <Head />
        <RouterProvider router={appRouter}/>
      </div>
      <div>
      <Footer/>
      </div>
      
    </Provider>
  );
}

export default App;
