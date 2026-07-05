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

    public Order placeOrder(Order order) {

        order.setStatus("PLACED");

        return repo.save(order);
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