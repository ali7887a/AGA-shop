import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import IsNotValid404Desktop from "./Errors/IsNotValid404Desktop";
import IsNotValid404Mobile from "./Errors/IsNotValid404Mobile";
import Addresses from "./finalBuy/Addresses";
import { Factor } from "./finalBuy/Factor";
import SuccessBuy from "./finalBuy/SuccessBuy";
import Header from "./Header/Header";
import AllProducts from "./Home/AllProducts";
import HomeScreen from "./Home/HomeScreen";
import OneProduct from "./Home/OneProduct";
import Change from "./Info&history/Change";
import InfoUser from "./Info&history/InfoUser";
import History from "./Info&history/History";
import Login from "./loginsignup.js/Login";
import SignUp from "./loginsignup.js/SignUp";
import NoNet from "./No internet/NoNet";
import SaleCard from "./SaleCard/SaleCard";
import OneOrder from "./Info&history/OneOrder";
const App = () => {
  //for handle error
  const { error } = useSelector((e) => e.OneProduct);
  //the state for change desktop view to mobile view
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 670;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
    return(
    <>{navigator.onLine? <BrowserRouter>
      <Header/>
  {error ? width < breakpoint ? <IsNotValid404Mobile /> : <IsNotValid404Desktop />: <Routes>
        <Route path="/" element={<HomeScreen/>}>
          <Route index element={<AllProducts/>}/>
          <Route path="SaleCard" element={<SaleCard/>}/>
          <Route path="address" element={<Addresses/>}/>
          <Route path="Factor" element={<Factor/>}/>
          <Route path="Success" element={<SuccessBuy/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="SignUp" element={<SignUp/>}/>
          <Route path="ChangeInfo" element={<Change/>}/>
          <Route path="UserInfo" element={<InfoUser/>}/>
          <Route path="History" element={<History/>}/>
          <Route path=":productID" element={<OneProduct/>}></Route>
          <Route path="History/:orderID" element={<OneOrder/>}></Route>
        </Route>
        {/* <Route path="/" element={<HomeScreen/>}> */}
          {/* <Route index element={<AllUser/>}/>
          <Route path=":userID" element={<OneUserScreen/>}>
            <Route index element={<OneUser/>}/>
            <Route path=":cmID/cm" element={<Comment/>}/>
            <Route path="todos" element={<Todos/>}/>
          </Route> */}
        {/* </Route> */}
        {/* <Route path="/posts" element={<PostsScreen/>}>
          <Route index element={<AllPost/>}/>
          <Route path=":ID" element={<OnePostScreen/>}>
            <Route index element={<OnePost/>}/>
            <Route path=":cmID" element={<Comment/>}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route> */}
        <Route path="*" element={width < breakpoint ? <IsNotValid404Mobile /> : <IsNotValid404Desktop />}/>
      </Routes>}
      </BrowserRouter>: <NoNet/> }
    </>
    )};

export default App;
