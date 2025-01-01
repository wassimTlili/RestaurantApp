// controllers/orderController.js

const Order = require('../models/Order');  // Ensure the path is correct
const User = require('../models/User');    // Ensure the path is correct

// Function to create an order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryOption, userId } = req.body;
    if (!items || !totalAmount || !deliveryOption || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      items,
      totalAmount,
      deliveryOption,
      user: userId,
      status: 'pending',
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Function to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json({ message: 'All orders fetched successfully', orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Function to get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order fetched successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

// Function to update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json({ message: `Order status updated to ${status}`, order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// Function to delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
