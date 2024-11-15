import Navbar from '../components/Navbar';
import Slide from "../components/Slide"
import Categories from "../components/Categories"




const HomePage = () => {

  // Lấy thông tin người dùng từ Redux state
  return <div>
    <Navbar/>
    <Slide/>
    <Categories/>
  </div>;
};

export default HomePage;
