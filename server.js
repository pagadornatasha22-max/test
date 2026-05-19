import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images
app.use(cors());

// Database pool configuration for Aiven MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'macels_flower_shop',
  port: Number(process.env.MYSQL_PORT) || 3306,
  ssl: {
    rejectUnauthorized: false // Required for secure Aiven communication
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Successfully connected to Aiven MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

// ============================================================================
// USERS API
// ============================================================================

// Get all users (admin only)
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username, email, full_name, contact_number, address, role, created_at FROM users ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single user
app.get("/api/users/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username, email, full_name, contact_number, address, role, created_at FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new user (registration)
app.post("/api/users", async (req, res) => {
  const { id, username, email, password_hash, full_name, contact_number, address, role } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (id, username, email, password_hash, full_name, contact_number, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, username, email, password_hash, full_name, contact_number, address, role || 'customer']
    );
    res.status(201).json({ success: true, userId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user (admin modification)
app.put("/api/users/:id", async (req, res) => {
  const { username, email, full_name, contact_number, address, role } = req.body;
  try {
    await pool.query(
      "UPDATE users SET username = ?, email = ?, full_name = ?, contact_number = ?, address = ?, role = ? WHERE id = ?",
      [username, email, full_name, contact_number, address, role, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// AUTH API
// ============================================================================

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT id, username, email, full_name, contact_number, address, role FROM users WHERE email = ? AND password_hash = ?",
      [email, password]
    );
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// PRODUCTS API
// ============================================================================

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY category, name");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new product (admin)
app.post("/api/products", async (req, res) => {
  const { id, name, category, price, image, description, rating, is_available, featured } = req.body;
  try {
    await pool.query(
      "INSERT INTO products (id, name, category, price, image, description, rating, is_available, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, category, price, image, description, rating || 5.0, is_available !== false, featured || false]
    );
    res.status(201).json({ success: true, productId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product (admin)
app.put("/api/products/:id", async (req, res) => {
  const { name, category, price, image, description, rating, is_available, featured } = req.body;
  try {
    await pool.query(
      "UPDATE products SET name = ?, category = ?, price = ?, image = ?, description = ?, rating = ?, is_available = ?, featured = ? WHERE id = ?",
      [name, category, price, image, description, rating, is_available, featured, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product (admin)
app.delete("/api/products/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// ORDERS API
// ============================================================================

// Get all orders (admin)
app.get("/api/orders", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders by customer
app.get("/api/orders/customer/:customerId", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC", [req.params.customerId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single order with items
app.get("/api/orders/:id", async (req, res) => {
  try {
    const [orderRows] = await pool.query("SELECT * FROM orders WHERE id = ?", [req.params.id]);
    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    const [itemRows] = await pool.query("SELECT * FROM order_items WHERE order_id = ?", [req.params.id]);
    
    res.json({
      ...orderRows[0],
      items: itemRows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new order (checkout)
app.post("/api/orders", async (req, res) => {
  const { 
    id, order_number, customer_id, customer_name, contact_number, email, 
    pickup_date_time, optional_message_card, payment_method, payment_reference, 
    payment_receipt_photo, total_amount, status 
  } = req.body;
  
  try {
    await pool.query(
      "INSERT INTO orders (id, order_number, customer_id, customer_name, contact_number, email, pickup_date_time, optional_message_card, payment_method, payment_reference, payment_receipt_photo, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, order_number, customer_id, customer_name, contact_number, email, pickup_date_time, optional_message_card, payment_method, payment_reference, payment_receipt_photo, total_amount, status || 'Pending']
    );
    res.status(201).json({ success: true, orderId: id, orderNumber: order_number });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin approval)
app.put("/api/orders/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve order (admin verifies GCash receipt)
app.put("/api/orders/:id/approve", async (req, res) => {
  try {
    await pool.query("UPDATE orders SET status = 'Preparing' WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Order approved and moved to Preparing" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject order (admin rejects due to invalid receipt)
app.put("/api/orders/:id/reject", async (req, res) => {
  const { reason } = req.body;
  try {
    await pool.query("UPDATE orders SET status = 'Payment Rejected' WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Order rejected", reason });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// ORDER ITEMS API
// ============================================================================

// Create order items (called after order creation)
app.post("/api/order-items", async (req, res) => {
  const items = req.body.items;
  try {
    for (const item of items) {
      await pool.query(
        "INSERT INTO order_items (id, order_id, product_id, product_name, unit_price, quantity, wrapper_option, ribbon_option, sample_image, custom_notes, item_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [item.id, item.order_id, item.product_id, item.product_name, item.unit_price, item.quantity, item.wrapper_option, item.ribbon_option, item.sample_image, item.custom_notes, item.item_total]
      );
    }
    res.status(201).json({ success: true, itemsCreated: items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// REVIEWS API
// ============================================================================

// Get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reviews ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews by product
app.get("/api/reviews/product/:productId", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC", [req.params.productId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new review
app.post("/api/reviews", async (req, res) => {
  const { id, product_id, customer_id, customer_name, rating, comment } = req.body;
  try {
    await pool.query(
      "INSERT INTO reviews (id, product_id, customer_id, customer_name, rating, comment) VALUES (?, ?, ?, ?, ?, ?)",
      [id, product_id, customer_id, customer_name, rating, comment]
    );
    
    // Update product average rating
    const [avgResult] = await pool.query(
      "SELECT AVG(rating) as avg_rating FROM reviews WHERE product_id = ?",
      [product_id]
    );
    
    await pool.query("UPDATE products SET rating = ? WHERE id = ?", [avgResult[0].avg_rating, product_id]);
    
    res.status(201).json({ success: true, reviewId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM reviews WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// ANALYTICS API
// ============================================================================

// Get sales analytics
app.get("/api/analytics/sales", async (req, res) => {
  try {
    const [totalOrders] = await pool.query("SELECT COUNT(*) as count FROM orders");
    const [pendingOrders] = await pool.query("SELECT COUNT(*) as count FROM orders WHERE status = 'Pending'");
    const [completedOrders] = await pool.query("SELECT COUNT(*) as count FROM orders WHERE status = 'Completed'");
    const [totalRevenue] = await pool.query("SELECT SUM(total_amount) as revenue FROM orders WHERE status IN ('Completed', 'Ready for Pickup')");
    const [avgOrderValue] = await pool.query("SELECT AVG(total_amount) as avg_value FROM orders");
    
    res.json({
      totalOrders: totalOrders[0].count,
      pendingOrders: pendingOrders[0].count,
      completedOrders: completedOrders[0].count,
      totalRevenue: totalRevenue[0].revenue || 0,
      averageOrderValue: avgOrderValue[0].avg_value || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top selling products
app.get("/api/analytics/top-products", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.name, p.category, SUM(oi.quantity) as total_sold, SUM(oi.item_total) as total_revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status IN ('Completed', 'Ready for Pickup')
      GROUP BY p.id, p.name, p.category
      ORDER BY total_sold DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// SERVE REACT APP
// ============================================================================

// Serve static assets from the React build
app.use(express.static(path.join(__dirname, "dist")));

// React fallback - serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌸 Macel's Flower Shop Server running on port ${PORT}`);
  console.log(`📍 Location: Canipaan, Hinunangan, Southern Leyte`);
  console.log(`🗄️ Database: ${process.env.MYSQL_DATABASE || 'macels_flower_shop'}`);
});
