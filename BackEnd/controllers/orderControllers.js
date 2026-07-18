const db = require("../config/db");

const createOrder = (req, res) => {
  const { customerId, customerName, sellerId, phone, address, note, total, totalItem, status, items } = req.body;

  const sqlOrder = `
    INSERT INTO orders (customerName, phone, address, note, total, totalItem, status, customer_id, seller_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sqlOrder, [
    customerName,
    phone,
    address,
    note,
    total,
    totalItem,
    status || 'Pending',
    customerId || 4, // Default mock customer ID
    sellerId || 3 // Default mock seller ID
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    const orderId = result.insertId;

    if (items && items.length > 0) {
      const sqlItems = `
        INSERT INTO order_items (order_id, product_id, name, price, qty, seller_id, category_id)
        VALUES ?
      `;
      const itemsValues = items.map(item => [
        orderId,
        item.productId || item.id,
        item.name,
        item.price,
        item.quantity || item.qty || 1,
        item.sellerId || sellerId || 3, // Default mock seller ID
        item.categoryId || 1 // Default mock category ID
      ]);

      db.query(sqlItems, [itemsValues], (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, message: "Order created successfully", orderId });
      });
    } else {
      res.status(201).json({ success: true, message: "Order created successfully", orderId });
    }
  });
};

const getAllOrders = (req, res) => {
  const sql = `
    SELECT o.*, 
           oi.id as item_id, oi.product_id, oi.name as item_name, oi.price as item_price, oi.qty as item_qty,
           oi.seller_id as item_seller_id, oi.category_id as item_category_id
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    const ordersMap = {};
    results.forEach(row => {
      if (!ordersMap[row.id]) {
        ordersMap[row.id] = {
          id: row.id,
          customerId: row.customer_id || 4,
          customerName: row.customerName,
          sellerId: row.seller_id || 3,
          phone: row.phone,
          address: row.address,
          note: row.note,
          total: Number(row.total),
          totalItem: row.totalItem,
          status: row.status,
          date: new Date(row.created_at).toLocaleDateString("id-ID"),
          items: []
        };
      }

      if (row.item_id) {
        ordersMap[row.id].items.push({
          id: row.item_id,
          productId: row.product_id,
          sellerId: row.item_seller_id || row.seller_id || 3,
          categoryId: row.item_category_id || 1,
          name: row.item_name,
          price: Number(row.item_price),
          quantity: row.item_qty,
          qty: row.item_qty // Backwards compatibility for UI
        });
      }
    });

    res.json({
      success: true,
      orders: Object.values(ordersMap)
    });
  });
};

const getOrderById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT o.*, 
           oi.id as item_id, oi.product_id, oi.name as item_name, oi.price as item_price, oi.qty as item_qty,
           oi.seller_id as item_seller_id, oi.category_id as item_category_id
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const firstRow = results[0];
    const order = {
      id: firstRow.id,
      customerId: firstRow.customer_id || 4,
      customerName: firstRow.customerName,
      sellerId: firstRow.seller_id || 3,
      phone: firstRow.phone,
      address: firstRow.address,
      note: firstRow.note,
      total: Number(firstRow.total),
      totalItem: firstRow.totalItem,
      status: firstRow.status,
      date: new Date(firstRow.created_at).toLocaleDateString("id-ID"),
      items: []
    };

    results.forEach(row => {
      if (row.item_id) {
        order.items.push({
          id: row.item_id,
          productId: row.product_id,
          sellerId: row.item_seller_id || row.seller_id || 3,
          categoryId: row.item_category_id || 1,
          name: row.item_name,
          price: Number(row.item_price),
          quantity: row.item_qty,
          qty: row.item_qty // Backwards compatibility for UI
        });
      }
    });

    res.json({
      success: true,
      order
    });
  });
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM orders WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  });
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated successfully" });
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus
};
