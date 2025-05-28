type Order = {
  id: string;
  customer: string;
  status: string;
  assigned: boolean;
};

type Props = {
  orders: Order[];
  onAssign: (orderId: string) => void;
};

export default function OrderList({ orders, onAssign }: Props) {
  return (
    <div>
      <h2>Order List</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ marginBottom: '10px' }}>
          <p>Order #{order.id} - {order.customer} - {order.status}</p>
          <button
            onClick={() => onAssign(order.id)}
            disabled={order.assigned}
          >
            {order.assigned ? 'Assigned' : 'Assign Delivery'}
          </button>
        </div>
      ))}
    </div>
  );
}
