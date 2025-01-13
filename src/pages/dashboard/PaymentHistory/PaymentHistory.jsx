import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { data: payments =[] } = useQuery({
    queryKey: ['payment', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`)
      console.log(res.data);
      return res.data;
    }
  })
  return (
    <div>
      <h2 className="text-3`">Total Payment: { payments.length}</h2>
      <div>
        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>price</th>
        <th>Transation Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment, indx) =>  <tr key={payment.id}>
        <th>{ indx + 1}</th>
        <td>$ {payment.price}</td>
        <td>{ payment.transactionId}</td>
        <td>{ payment.statue}</td>
      </tr>
     )}
     
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default PaymentHistory;