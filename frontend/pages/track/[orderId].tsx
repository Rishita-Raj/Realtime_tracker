import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import socket from '@/utils/socket';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function CustomerTrackingPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    socket.on("receive-location", (data) => {
      if (data.orderId === orderId) {
        setLocation({ latitude: data.latitude, longitude: data.longitude });
      }
    });

    return () => {
      socket.off("receive-location");
    };
  }, [orderId]);

  return (
    <div>
      <h1>Tracking Order #{orderId}</h1>
      <MapView latitude={location.latitude} longitude={location.longitude} />
    </div>
  );
}
