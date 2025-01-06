import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommend from "../Recommend/Recommend";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
  return (
    <div>
      <Helmet>
       <title>Hungry Fork | Home </title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <Recommend></Recommend>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;