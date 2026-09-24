package com.shopsphere.service;

import com.shopsphere.entity.Order;
import com.shopsphere.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    @Autowired
    private CartService cartService;

    public Order placeOrder(Order order) {

        order.setStatus("PLACED");

        Order savedOrder = repo.save(order);

        // Clear cart after order is successfully created
        cartService.clearUserCart(order.getUserId());

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return repo.findAll();
    }

    public List<Order> getUserOrders(Long userId) {
        return repo.findByUserId(userId);
    }

    public Order updateStatus(
            Long id,
            String status) {

        Order order =
                repo.findById(id).orElseThrow();

        order.setStatus(status);

        return repo.save(order);
    }
}
