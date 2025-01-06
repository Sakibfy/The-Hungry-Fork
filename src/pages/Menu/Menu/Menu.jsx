import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter(item => item.category === 'dessert')
  const soup = menu.filter(item => item.category === 'soup')
  const salad = menu.filter(item => item.category === 'salad')
  const pizza = menu.filter(item => item.category === 'pizza')
  const offered = menu.filter(item => item.category === 'offered')






  return (
    <div>
      <Helmet>
        <title>Hungry Fork | Menu </title>
      </Helmet>
      {/* main cover */}
      <Cover img={menuImg} title={'our menu'}></Cover>
      <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
      {/* offered cover */}
      <MenuCategory
        items={offered}
      ></MenuCategory>
      {/* dessert cover */}
      <MenuCategory
        items={desserts}
        title="dessert"
        img={dessertImg}
      ></MenuCategory>
      {/* pizza cover */}
      <MenuCategory
        items={pizza}
        title="pizza"
        img={pizzaImg}
      ></MenuCategory>
      {/* salad cover */}
      <MenuCategory
        items={salad}
        title="salad"
        img={saladImg}
      ></MenuCategory>
      {/*soup cover */}
      <MenuCategory
        items={soup}
        title="soup"
        img={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;