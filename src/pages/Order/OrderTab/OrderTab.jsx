import Foodcard from "../../../component/Foodcard/Foodcard";


const OrderTab = ({items}) => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {
            items.map(item => <Foodcard
              key={item._id}
              item={item}
            ></Foodcard>)
        }
              </div>
    </div>
  );
};

export default OrderTab;