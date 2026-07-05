package com.shopsphere.service;

import com.shopsphere.entity.Cart;
import com.shopsphere.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository repo;

    public Cart addToCart(Cart cart) {
        return repo.save(cart);
    }

    public List<Cart> getUserCart(Long userId) {
        return repo.findByUserId(userId);
    }

    public void removeCartItem(Long id) {
        repo.deleteById(id);
    }

    public Cart updateQuantity(Long id, int quantity) {

        Cart cart = repo.findById(id).orElseThrow();

        cart.setQuantity(quantity);

        return repo.save(cart);
    }

    public void removeCartByProduct(Long productId) {
        repo.deleteAllByProduct_Id(productId);
    }
}