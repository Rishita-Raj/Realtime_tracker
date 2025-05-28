import { useState } from 'react';

const orders = [
  { id: '123', customer: 'Alice', status: 'pending' },
  { id: '456', customer: 'Bob', status: 'delivered' }
];

export default function VendorDashboard() {
  const [assigned, setAssigned] = useState<{ [key: string]: boolean }>({});

  const assignDelivery = (orderId: string) => {
    // Call API to assign delivery partner
    setAssigned((prev) => ({ ...prev, [orderId]: true }));
  };

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order #{order.id} - {order.customer} - {order.status}</p>
          <button onClick={() => assignDelivery(order.id)} disabled={assigned[order.id]}>
            {assigned[order.id] ? 'Assigned' : 'Assign Delivery'}
          </button>
        </div>
      ))}
    </div>
  );
}
