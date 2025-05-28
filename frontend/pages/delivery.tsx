import { useEffect, useState } from 'react';
import socket from '@/utils/socket';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function DeliveryPartnerPage() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (tracking) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
          socket.emit("send-location", { latitude, longitude, orderId: "123" }); // replace with real orderId
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [tracking]);

  return (
    <div>
      <h1>Delivery Partner Dashboard</h1>
      <button onClick={() => setTracking(true)}>Start Delivery</button>
      <MapView latitude={location.latitude} longitude={location.longitude} />
    </div>
  );
}
