# 🍕 PizzaBox

**PizzaBox** is a full-stack pizza ordering mobile application built with **React Native and Expo**. It provides separate **Customer** and **Admin** experiences, with authentication, pizza management, cart, orders, Stripe payments, and a Supabase backend.

## ✨ Features

### 👤 Customer Features

- 🔐 **Authentication** — Sign up, login, logout, and role-based access
- 🍕 **Browse Pizzas** — View pizzas with categories, sizes, prices, and images
- 🛒 **Shopping Cart** — Add pizzas, select sizes, update quantities, and manage items
- 💳 **Payments** — Pay securely with Stripe or choose Cash on Delivery
- 📦 **Place Orders** — Create and view orders
- 🚚 **Order Tracking** — Track the current status of orders
- ❌ **Cancel Orders** — Cancel eligible pending orders
- 👤 **Profile** — View and manage customer profile information

### 👨‍💼 Admin Features

- 🔐 **Admin Authentication** — Secure access based on admin role
- 🍕 **Pizza Management** — Add, edit, and manage pizzas
- 🏷️ **Category Management** — Manage pizza categories
- 💰 **Price Management** — Set prices for different pizza sizes
- 🖼️ **Image Management** — Upload and manage pizza images
- 📦 **Order Management** — View and manage customer orders
- 🔄 **Order Status Management** — Update the status of customer orders

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | **React Native · Expo · Expo Router · Zustand** |
| **Backend** | **Supabase · PostgreSQL · Supabase Auth · Storage · Edge Functions** |
| **Payments** | **Stripe** |
| **Local Storage** | **AsyncStorage** |



## 📱 App Screenshots

![PizzaBox App Screenshots](assets/screenshots/pizzabox-screenshots.png)

## 📁 .Env Setup

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key