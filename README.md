# 🚚 Real-Time Multivendor Delivery Tracker

A full-stack, real-time delivery tracking system built with **Next.js (TypeScript)**, **Socket.IO**, and **Leaflet.js**. This platform enables vendors to assign delivery partners, delivery agents to share live GPS location, and customers to track deliveries in real time.

---

## 🏗️ Architecture

### 📦 Frontend (Next.js + TypeScript)
- **Vendor Dashboard**
  - View orders
  - Assign delivery partners
- **Delivery Partner Dashboard**
  - Start tracking
  - Simulate real-time GPS location
- **Customer Tracking Page**
  - View real-time location of delivery agent on a map (Leaflet.js)

### 🔌 Real-Time Communication
- **WebSocket** via **Socket.IO**
  - Delivery partner sends location to backend
  - Backend emits location to relevant customer based on `orderId`

### 🗂 Folder Structure


---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js ≥ 18
- npm or yarn
- Git

### 📁 Clone the Repository

```bash
git clone https://github.com/yourusername/delivery-tracker.git
cd delivery-tracker


# Frontend
cd ../frontend
npm install
