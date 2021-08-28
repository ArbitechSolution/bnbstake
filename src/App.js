import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import Info from './components/info/info';
import Banner from './components/banner/banner';
import BannerEndPlan from './components/banner2/bannerendplan';
import Myaccount from './components/myaccount/myaccount';
import Sponsor from './components/sponsors/sponsor';
import Footer from './components/footer/footer';
import Header from './components/header/header';

import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Info />
      <Header />
      <Banner />
      <BannerEndPlan />
      <Myaccount />
      <Sponsor />
      <Footer />


    </div>
  );
}

export default App;
