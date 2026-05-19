# 🌸 Macel's Flower Shop - Web-Based Ordering System

**Location**: Canipaan, Hinunangan, Southern Leyte, Philippines  
**GPS Coordinates**: `10.414779, 125.185361` ([View on Google Maps](https://www.google.com/maps?q=10.414779,125.185361))

---

## 📖 Executive Summary
The **Macel's Flower Shop Web-Based Flower Ordering System** is a modern, responsive web application engineered for both customers and store administrators. Built using React 19, TypeScript, Vite, and Tailwind CSS, the platform streamlines the end-to-end flower ordering process—from secure registration and browsing flower catalogs, to custom arrangement architecture, exclusive GCash online payment verification, and real-time order tracking.

---

## 🔐 Quick Demo Credentials
To explore the system instantly, use the following pre-populated credentials (or click the **"Quick Demo Credentials"** shortcuts directly on the login page):

* **🧑 Customer Account**:
  * Email / Username: `juan.delacruz@gmail.com`
  * Password: `password123`
* **👑 Administrator Account (Macel Canipaan)**:
  * Email / Username: `macel.flowershop@gmail.com`
  * Password: `password123`

---

## 🌟 Key Features

### 1. 🧑 Customer Experience
* **Interactive Storefront**: Browse premium flower categories (*Bouquets, Dozen Flowers, Customized Arrangements*) with live search and filter tags.
* **Product Reviews & Ratings**: Customers can view existing feedback, average star ratings, and submit new star ratings (1–5) and review comments.
* **Dual Ordering Options**: Click **"Add to Cart"** to accumulate multiple arrangements, or click **"Buy Now"** to instantly proceed to single-item direct checkout.
* **Bespoke Arrangement Customizer**: Interactive tool allowing customers to customize base flowers, premium wrappers, ribbon colors, and optional sweet add-ons with real-time price updates. Includes a **Sample Photo Upload** feature for customers to attach reference inspiration pictures.
* **Verified GCash Checkout**: Secure checkout requiring pickup schedule (date and time), optional dedication cards, and **GCash Online Transfer verification**. Requires both entering a **GCash Reference Number** and uploading a **Receipt Screenshot**.
  * *Robust Validation*: If the Reference Number typed does not match the Reference Number embedded in the uploaded screenshot, the system blocks checkout and displays exactly: `"The reference number is invalid"`.
  * *Reviewer Shortcut*: Includes an **"Auto-Generate Valid Receipt"** button that renders an official-looking simulated GCash receipt image matching the typed reference number for foolproof testing!
* **Order Tracking Timeline**: View active orders with an intuitive progress bar tracking status from *Pending* ➔ *Preparing* ➔ *Ready for Pickup* ➔ *Completed*. Full itemized receipts and attached sample photos are viewable in a receipt modal.

### 2. 👑 Admin Portal (Direct Database Table Views)
The Administrator Portal acts as a direct graphical interface to the SQL database. Every tabular view in the admin dashboard strictly mirrors the live rows stored in the database tables (`users`, `products`, `orders`, `order_items`, and `reviews`):
* **Store Overview (Master Audit Table)**: Displays real-time summarized aggregations directly from the database—showing total verified gross revenue, pending order counts, active customer accounts, and an immediate interactive view of recent order records.
* **Order Management Table (`orders` & `order_items`)**: Renders a complete table of all incoming customer orders. The admin can audit GCash verification screenshots, customer sample reference photos, and dedication notes. Changing an order status from *Pending* ➔ *Preparing* ➔ *Ready for Pickup* ➔ *Completed* instantly updates the corresponding row in the `orders` database table.
* **Inventory Control Table (`products`)**: Renders the complete flower inventory table from the database. The admin can insert new rows (add products), update fields (edit pricing, description, image, or toggle in/out of stock availability), or delete rows from the database.
  * **📸 Advanced Image Management**: Admins can update product images using **TWO methods**:
    * **🔗 Paste Image URL**: Directly paste a high-quality image URL from Unsplash, Imgur, or your CDN.
    * **📁 Upload File**: Upload an image file directly from your device (PNG, JPG, WebP). The system converts it to Base64 and stores it in the database.
    * **Live Preview**: See an instant preview of the selected image before saving.
* **Customer Directory Table (`users`)**: Renders a clean table of all verified customer records stored in the `users` database table, displaying their full name, email, contact number, complete Canipaan/Hinunangan address, and their computed lifetime order count and total spend.
* **User Management Portal (`users`)**: Dedicated admin interface to view, modify, and delete all user accounts. Admins can:
  * **View All Accounts**: See complete list of customers and administrators with role badges.
  * **Modify User Details**: Edit full name, email, contact number, address, username, and role (Customer/Admin).
  * **Delete Accounts**: Remove user accounts with safety check preventing deletion of the last admin.
  * **Search & Filter**: Filter by role (All/Customer/Admin) and search by name, email, or phone.
* **Order Approval System**: Manual verification workflow for GCash payments:
  * **Pending Orders**: All new orders start as "Pending" awaiting admin review.
  * **Approve/Reject Buttons**: Admin reviews GCash receipts and either approves (moves to Preparing) or rejects the order.
  * **No Auto-Blocking**: Customers can complete checkout—admin handles verification manually for flexibility.
* **Sales Analytics & Reports**: Queries and aggregates sales data directly from the `orders` and `order_items` tables to generate gross revenue reports, average order value, and top-selling arrangements.
* **Store Reviews Table (`reviews`)**: Queries the `reviews` database table to display all customer feedback, comments, and star ratings across the shop in an easily filterable grid.

### 3. 👥 User Management System
* **Admin User Control**: Full user account management interface allowing administrators to view, modify, and delete all customer and admin accounts.
* **Role Management**: Change user roles between Customer and Administrator with a single click.
* **Account Modification**: Update user details including full name, email, contact number, address, and username.
* **Safety Checks**: Prevents deletion of the last admin account to maintain system access.
* **User Statistics**: Real-time display of total accounts, customer count, and admin count.

### 4. ✅ Order Approval Workflow
* **Pending Verification**: All new orders start in **Pending** status and require admin approval.
* **GCash Receipt Verification**: Admin manually reviews uploaded GCash receipts and reference numbers before approving orders.
* **Approve/Reject Actions**: Admin can approve orders (moves to *Preparing* status) or reject them (marks as *Rejected*).
* **No Automatic Blocking**: Customers can complete checkout without reference number validation—admin handles verification manually.
* **Status Tracking**: Visual status indicators show order progression through the approval workflow.

### 5. 🖥️ Backend API Server (Express + MySQL)
* **Production-Ready Backend**: Full Node.js/Express server (`server.js`) with complete REST API endpoints.
* **Database Integration**: Direct connection to Aiven MySQL cloud database with connection pooling.
* **Complete API Coverage**:
  * `/api/users` - User account management (GET, POST, PUT, DELETE)
  * `/api/products` - Product inventory management
  * `/api/orders` - Order processing and status updates
  * `/api/reviews` - Customer review management
  * `/api/analytics` - Sales reports and statistics
  * `/api/login` - Authentication endpoint
* **Order Approval Endpoints**:
  * `PUT /api/orders/:id/approve` - Admin approves pending order
  * `PUT /api/orders/:id/reject` - Admin rejects order
  * `PUT /api/orders/:id/status` - Update order status manually
* **SSL/TLS Support**: Secure connection to Aiven MySQL with SSL certificates.

### 6. 💾 State & Navigation Persistence
* All data (new user accounts, inventory changes, placed orders, cart items, and submitted reviews) is securely persisted in browser `localStorage`.
* **State Preservation**: The active tab and page view state are continuously synchronized to storage. When a user refreshes the browser, they remain exactly where they were without losing their current screen or tab.

---

## 🖥️ Running the Backend Server

### Option 1: Development Mode (Frontend Only)
```bash
npm run dev
```
This runs the React frontend on `http://localhost:5173` using localStorage for data persistence.

### Option 2: Production Mode (Full Stack)
```bash
# Install backend dependencies
npm install

# Set up your .env file (see .env.example)
cp .env.example .env

# Run the backend server
npm run server
```
The server will start on `http://localhost:3000` and connect to your Aiven MySQL database.

### Option 3: Full Development (Both Frontend & Backend)
```bash
npm run dev:full
```
This runs both the React dev server and Express backend simultaneously using concurrently.

### Environment Variables (.env)
Create a `.env` file with your Aiven MySQL credentials:
```env
MYSQL_HOST=macels-flowershop-db-your-account.aivencloud.com
MYSQL_PORT=25060
MYSQL_USER=avnadmin
MYSQL_PASSWORD=your_secure_password
MYSQL_DATABASE=macels_flower_shop
PORT=3000
```

---

## 🚀 Production Deployment Pipeline (GitHub ➔ Aiven MySQL ➔ Workbench ➔ Render)

This section provides complete, step-by-step instructions to connect Macel's Flower Shop to a production cloud database (**Aiven MySQL**), inspect it via **MySQL Workbench**, push the codebase to **GitHub**, and set up continuous automated deployment on **Render.com**.

---

### 🌐 1. Provisioning a Cloud Database on Aiven.io (MySQL)
1. **Create an Aiven Account**: Go to [Aiven.io](https://aiven.io/) and sign up or log in.
2. **Create a New Service**:
   * Click **Create Service** and select **MySQL**.
   * Choose your preferred cloud provider (e.g. AWS, Google Cloud, or Azure) and region (e.g. Southeast Asia / Singapore for lowest latency to Southern Leyte).
   * Select a service plan (e.g., Free / Hobbyist or Startup plan) and name the service `macels-flowershop-db`.
3. **Obtain Connection Details**:
   * Once running, go to the **Overview** tab of your service.
   * Under **Connection Information**, note down the **Host**, **Port**, **User** (default `avnadmin`), **Password**, and **URI**.

---

### 🖥️ 2. Connecting Remote Aiven MySQL to MySQL Workbench
To structure your cloud database directly from your local machine:
1. **Open MySQL Workbench** and click the **(+)** icon next to **MySQL Connections**.
2. **Configure Connection**:
   * **Connection Name**: `Aiven Cloud MySQL - Macel's Shop`
   * **Connection Method**: Standard (TCP/IP)
   * **Hostname**: Paste your Aiven `Host` (e.g., `macels-db.aivencloud.com`)
   * **Port**: Paste your Aiven `Port` (e.g., `25060`)
   * **Username**: `avnadmin` (or your created DB user)
   * **Password**: Click **"Store in Vault..."** and paste your secure Aiven password.
3. **SSL Setup** (Required for Aiven):
   * Go to the **SSL** tab inside the connection settings.
   * Set **Use SSL** to `Require` or `Verify CA`.
4. **Test & Connect**: Click **Test Connection**. Once successful, click **OK** to open your cloud connection.
5. **Execute Schema**:
   * Open `database_schema.sql` (located in the project root) inside this connection.
   * Click the lightning bolt (**⚡ Execute**) to construct all production tables in the Aiven cloud instance!

---

### 🐙 3. Uploading Codebase to GitHub
1. **Initialize Local Git**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Macel's Flower Shop web ordering system"
   ```
2. **Create GitHub Repository**:
   * Go to [GitHub](https://github.com/) and create a new repository named `macels-flower-shop`.
3. **Push Code to Remote**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/yourusername/macels-flower-shop.git
   git push -u origin main
   ```

---

### ☁️ 4. 1-Click Automated Hosting on Render.com
We have included a pre-configured `render.yaml` Blueprint file for seamless deployment.

1. **Log in to Render**: Go to [Render.com](https://render.com/) and sign in with your GitHub account.
2. **Deploy via Blueprint**:
   * On the dashboard, click **New (+)** and select **Blueprint**.
   * Connect your GitHub repository `macels-flower-shop`.
   * Render will automatically read `render.yaml`, configure the build command (`npm install && npm run build`), set the publish directory (`dist`), and configure single-page application redirect routing rules.
3. **Environment Variables**:
   * Under the **Environment** tab on Render, add your `DATABASE_URL` from Aiven (refer to `.env.example`).
4. **Live URL**: Once the build completes, your application will be live globally with SSL certificates configured!

---

### ⚠️ Render Build Troubleshooting: "vite: not found" Error
If your Render build fails with `sh: 1: vite: not found`, this means Render is trying to compile your project before installing your dependencies.
* **Why this occurs**: The Build Command in the Render dashboard has been configured to `npm run build && npm install`. This runs the build command first, before `npm install` installs `vite` and typescript.
* **How to fix this**:
  1. Open your service settings on the **Render Dashboard**.
  2. Locate the **Build Command** setting.
  3. Change the Build Command from `npm run build && npm install` to:
     ```bash
     npm install && npm run build
     ```
  4. Save changes and click **"Manual Deploy" ➔ "Clear Cache & Deploy"**. Your project will build and deploy successfully!

---

## 💾 Relational Database SQL Schema & MySQL Workbench Setup

### 🚀 Step-by-Step Guide: Local / Direct Import in MySQL Workbench
To set up the physical database tables for Macel's Flower Shop using **MySQL Workbench**, follow these exact steps:

1. **Open MySQL Workbench**:
   * Launch MySQL Workbench and connect to your local or remote MySQL Server instance (e.g., `Local instance 3306` with user `root`).
2. **Create a New Database (Schema)**:
   * In the top toolbar, click the **"Create a new schema in the connected server"** icon (or run the query `CREATE DATABASE macels_flower_shop;`).
   * Name your schema `macels_flower_shop`, select collation `utf8mb4_unicode_ci` (recommended), and click **Apply** ➔ **Apply** ➔ **Finish**.
3. **Set as Default Schema**:
   * In the left **"SCHEMAS"** navigation sidebar, right-click on `macels_flower_shop` and select **"Set as Default Schema"** (it should become bold).
4. **Open the SQL Script**:
   * In the top menu, go to **File** ➔ **Open SQL Script...** (or press `Ctrl+Shift+O` / `Cmd+Shift+O`).
   * Select the `database_schema.sql` file located in the root directory of this project.
5. **Execute the Script**:
   * Click the **Execute (Lightning Bolt ⚡)** icon in the toolbar (or press `Ctrl+Shift+Enter` / `Cmd+Shift+Enter`).
   * In the lower **"Action Output"** panel, verify that all tables (`users`, `products`, `orders`, `order_items`, `reviews`) and indexes were successfully created with green checkmarks (✔).
6. **Verify Tables**:
   * In the left **"SCHEMAS"** sidebar, expand `macels_flower_shop` ➔ `Tables` to view all your freshly structured tables!

---

### 📜 Complete DDL Script (`database_schema.sql`)
Below is the complete Data Definition Language (DDL) schema. Note the `USE macels_flower_shop;` declaration at the top:

```sql
CREATE DATABASE IF NOT EXISTS macels_flower_shop DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE macels_flower_shop;

-- ====================================================================
-- SQL SCHEMA FOR MACEL'S FLOWER SHOP (Hinunangan, Southern Leyte)
-- Target Database: MySQL / PostgreSQL / SQLite
-- ====================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(25) NOT NULL,
    address TEXT NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category ENUM('bouquets', 'dozen', 'customized') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 5.00,
    is_available BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pickup_date_time DATETIME NOT NULL,
    optional_message_card TEXT NULL,
    payment_method VARCHAR(50) DEFAULT 'GCash',
    payment_reference VARCHAR(100) NULL,
    payment_receipt_photo TEXT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('Pending', 'Preparing', 'Ready for Pickup', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. ORDER ITEMS TABLE (Cart Items attached to Orders)
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    wrapper_option VARCHAR(100) NULL,
    ribbon_option VARCHAR(100) NULL,
    sample_image TEXT NULL,
    custom_notes TEXT NULL,
    item_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ====================================================================
-- PERFORMANCE INDEXES
-- ====================================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_reviews_product ON reviews(product_id);
```

---

## 🗄️ How Data Flows from Database to UI

This system is designed with a **database-first architecture** where all menu items, products, orders, customers, and reviews displayed in the interface are **directly sourced from the database tables**. Here's how it works:

### 📊 Data Source Mapping

| UI Component | Database Table | What You See |
|--------------|----------------|--------------|
| **Customer Menu/Shop** | `products` | All flower arrangements (bouquets, dozen flowers, customized) with prices, images, descriptions |
| **Product Ratings** | `reviews` | Star ratings and customer comments for each product |
| **Cart Items** | `order_items` (session) | Items selected for checkout |
| **My Orders (Customer)** | `orders` + `order_items` | Order history with status tracking |
| **Admin Inventory** | `products` | Complete product catalog management |
| **Admin Orders** | `orders` + `order_items` | All customer orders with GCash receipts |
| **Admin Customers** | `users` (role='customer') | Customer directory with order stats |
| **Admin Reviews** | `reviews` | All customer feedback and ratings |
| **Admin Analytics** | `orders` + `order_items` | Sales reports, revenue, top products |

### 🔄 Real-Time Database Synchronization

Every action in the system **immediately updates the database**:
* **Customer registers** → New row inserted into `users` table
* **Product added by admin** → New row inserted into `products` table
* **Order placed** → New row in `orders` + multiple rows in `order_items`
* **Review submitted** → New row inserted into `reviews` table
* **Order status changed** → `status` field updated in `orders` table
* **Product image updated** → `image` field updated in `products` table

**Example**: When admin Macel changes a product image from URL to uploaded file, the system:
1. Converts the image file to Base64 format
2. Updates the `image` column in the `products` table for that specific product ID
3. All customers browsing the shop immediately see the new image

---

## 📝 Complete Sample Data (Ready for Database Import)

Below are realistic sample records that match the structure of Macel's Flower Shop. Execute these INSERT statements in MySQL Workbench **after** creating the tables:

```sql
-- ====================================================================
-- SAMPLE DATA FOR MACEL'S FLOWER SHOP
-- Realistic records for Canipaan, Hinunangan, Southern Leyte
-- ====================================================================

-- 1. INSERT USERS (Admin + Sample Customers)
INSERT INTO users (id, username, email, password_hash, full_name, contact_number, address, role) VALUES
('u-admin', 'admin', 'macel.flowershop@gmail.com', 'hashed_password_123', 'Macel Canipaan (Owner)', '09171234567', 'Purok E, Brgy Canipaan, Hinunangan, Southern Leyte', 'admin'),
('u-cust1', 'juan', 'juan.delacruz@gmail.com', 'hashed_password_456', 'Juan Dela Cruz', '09209876543', 'Purok A, Poblacion, Hinunangan, Southern Leyte', 'customer'),
('u-cust2', 'maria', 'maria.santos@yahoo.com', 'hashed_password_789', 'Maria Santos', '09665554433', 'Brgy Calag-itan, Hinunangan, Southern Leyte', 'customer'),
('u-cust3', 'anna', 'anna.reyes@gmail.com', 'hashed_password_012', 'Anna Reyes', '09171112233', 'Purok C, Brgy Canipaan, Hinunangan, Southern Leyte', 'customer');

-- 2. INSERT PRODUCTS (Flower Catalog)
INSERT INTO products (id, name, category, price, image, description, rating, is_available, featured) VALUES
('p1', 'Red Elegance Rose Bouquet', 'bouquets', 1450.00, 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800', 'A luxurious arrangement of premium red roses wrapped in elegant black paper with gold ribbon trim. Perfect for expressing deep affection.', 4.9, TRUE, TRUE),
('p2', 'Sunflower Sunshine Delight', 'bouquets', 1250.00, 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=800', 'Bright and cheerful sunflowers paired with delicate baby breath and lush eucalyptus leaves. Brings warmth to any room.', 4.8, TRUE, TRUE),
('p3', 'Pristine White Lilies & Carnations', 'bouquets', 1850.00, 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=800', 'Fragrant white oriental lilies combined with soft pink carnations in a gorgeous pastel wrapper. Exudes grace and serenity.', 4.7, TRUE, FALSE),
('p4', 'Pastel Dreams Tulip Arrangement', 'bouquets', 2200.00, 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800', 'Beautiful imported Dutch tulips in charming pastel shades of pink, yellow, and lavender. An exquisite visual masterpiece.', 5.0, TRUE, TRUE),
('p5', 'Dozen Scarlet Red Roses', 'dozen', 1200.00, 'https://images.unsplash.com/photo-1549388604-817d15aa0110?auto=format&fit=crop&q=80&w=800', 'Exactly 12 stems of long-stemmed velvety scarlet roses, freshly cut and bound with a simple satin tie.', 4.9, TRUE, FALSE),
('p6', 'Dozen Romantic Pink Peonies', 'dozen', 2400.00, 'https://images.unsplash.com/photo-1568897813876-c56a81b7a2d4?auto=format&fit=crop&q=80&w=800', '12 stems of lush, voluminous pink peonies with sweet fragrance. Highly sought after and extremely elegant.', 5.0, TRUE, FALSE),
('p7', 'Dozen Sunset Orange Gerberas', 'dozen', 950.00, 'https://images.unsplash.com/photo-1508615070457-7ba5be729491?auto=format&fit=crop&q=80&w=800', '12 vibrant orange and yellow gerbera daisies that radiate joy and positive energy. Beautifully boxed.', 4.6, TRUE, FALSE),
('p8', 'Dozen Pure White Roses', 'dozen', 1200.00, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800', '12 spotless white roses symbolizing purity and new beginnings. Carefully prepared with misty foliage.', 4.8, TRUE, FALSE),
('p9', 'Custom Florist Choice Box', 'customized', 1600.00, 'https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=800', 'A bespoke curated box featuring the freshest seasonal blooms picked by Macel herself. Tailored to your occasion.', 4.9, TRUE, TRUE),
('p10', 'Royal Purple Orchid Cascade', 'customized', 1950.00, 'https://images.unsplash.com/photo-1566807810034-cb15e7720336?auto=format&fit=crop&q=80&w=800', 'Stunning dendrobium purple orchids in a customized ceramic vase or bouquet presentation.', 4.7, TRUE, FALSE);

-- 3. INSERT ORDERS (Sample Orders)
INSERT INTO orders (id, order_number, customer_id, customer_name, contact_number, email, pickup_date_time, optional_message_card, payment_method, payment_reference, payment_receipt_photo, total_amount, status) VALUES
('ord-101', 'MFS-101', 'u-cust1', 'Juan Dela Cruz', '09209876543', 'juan.delacruz@gmail.com', '2026-05-15 14:30:00', 'Happy Anniversary my love! Thank you for 5 wonderful years.', 'GCash', '765290182736', 'receipt_101.jpg', 1450.00, 'Ready for Pickup'),
('ord-102', 'MFS-102', 'u-cust2', 'Maria Santos', '09665554433', 'maria.santos@yahoo.com', '2026-05-16 10:00:00', 'Congratulations on your graduation! So proud of you.', 'GCash', '992018273645', 'receipt_102.jpg', 2200.00, 'Preparing'),
('ord-103', 'MFS-103', 'u-cust1', 'Juan Dela Cruz', '09209876543', 'juan.delacruz@gmail.com', '2026-05-18 16:00:00', 'Get well soon mama! Sending you love.', 'GCash', '882312004921', 'receipt_103.jpg', 2200.00, 'Pending'),
('ord-100', 'MFS-100', 'u-cust2', 'Maria Santos', '09665554433', 'maria.santos@yahoo.com', '2026-05-01 11:00:00', 'Happy Birthday dear friend!', 'GCash', '110948273651', 'receipt_100.jpg', 1200.00, 'Completed');

-- 4. INSERT ORDER ITEMS
INSERT INTO order_items (id, order_id, product_id, product_name, unit_price, quantity, wrapper_option, ribbon_option, sample_image, custom_notes, item_total) VALUES
('ci-1', 'ord-101', 'p1', 'Red Elegance Rose Bouquet', 1450.00, 1, 'Black Premium Paper', 'Gold Ribbon', NULL, NULL, 1450.00),
('ci-2', 'ord-102', 'p2', 'Sunflower Sunshine Delight', 1250.00, 1, 'Natural Kraft', 'Sunflower Yellow Ribbon', NULL, NULL, 1250.00),
('ci-3', 'ord-102', 'p7', 'Dozen Sunset Orange Gerberas', 950.00, 1, 'Orange Tissue Paper', 'Orange Ribbon', NULL, NULL, 950.00),
('ci-4', 'ord-103', 'p4', 'Pastel Dreams Tulip Arrangement', 2200.00, 1, 'Pastel Pink Wrapper', 'Lavender Ribbon', NULL, NULL, 2200.00),
('ci-5', 'ord-100', 'p5', 'Dozen Scarlet Red Roses', 1200.00, 1, 'Classic Red Paper', 'Red Satin Ribbon', NULL, NULL, 1200.00);

-- 5. INSERT REVIEWS (Customer Feedback)
INSERT INTO reviews (id, product_id, customer_id, customer_name, rating, comment) VALUES
('rev-1', 'p1', 'u-cust1', 'Juan Dela Cruz', 5, 'Absolutely gorgeous! The red roses were incredibly fresh and the black wrapper looked so premium. My girlfriend loved them.'),
('rev-2', 'p1', 'u-cust2', 'Maria Santos', 5, 'Very elegant presentation. Fast preparation right on time for pickup at Purok E.'),
('rev-3', 'p2', 'u-cust2', 'Maria Santos', 5, 'The sunflowers brought so much warmth and happiness to our home! Will definitely order again from Macel.'),
('rev-4', 'p4', 'u-cust1', 'Juan Dela Cruz', 5, 'Beautiful imported tulips. Exactly as described and perfectly styled.');
```

### ✅ Verifying Data in MySQL Workbench

After executing the INSERT statements, verify the data:

```sql
-- Check all products (menu items)
SELECT * FROM products ORDER BY category, name;

-- Check all orders with customer details
SELECT o.order_number, o.customer_name, o.total_amount, o.status, o.pickup_date_time
FROM orders o
ORDER BY o.created_at DESC;

-- Check product ratings and reviews
SELECT p.name AS product, AVG(r.rating) AS avg_rating, COUNT(r.id) AS review_count
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.id, p.name;

-- Check customer order history
SELECT u.full_name, u.email, COUNT(o.id) AS total_orders, SUM(o.total_amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
WHERE u.role = 'customer'
GROUP BY u.id, u.full_name, u.email;
```

---

## 🛠 Technical Stack
* **Frontend**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS, Lucide React Icons
* **State Management**: React Hooks + Browser Local Storage Persistence
* **Deployment Output**: Optimized Single-File / Static Production Bundle

---
*Macel's Flower Shop Ordering System &copy; 2026. All rights reserved.*
