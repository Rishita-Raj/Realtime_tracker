import { useEffect, useState } from "react";
import socket from "@/utils/socket";

type Props = {
  orderId: string;
};

export default function LocationTracker({ orderId }: Props) {
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (tracking && navigator.geolocation) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          socket.emit("send-location", { latitude, longitude, orderId });
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [tracking, orderId]);

  return (
    <div>
      <button onClick={() => setTracking(true)} disabled={tracking}>
        {tracking ? "Tracking..." : "Start Delivery"}
      </button>
    </div>
  );
}
