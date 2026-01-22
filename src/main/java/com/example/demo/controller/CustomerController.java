package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        System.out.println("[DEBUG] Đã nhận request đăng ký: " + customer);
        if (customerRepository.existsByEmail(customer.getEmail())) {
            System.out.println("[DEBUG] Email đã tồn tại: " + customer.getEmail());
            return ResponseEntity.badRequest().body("Email đã tồn tại!");
        }
        // Đặt role mặc định nếu chưa có
        if (customer.getRole() == null || customer.getRole().isEmpty()) {
            customer.setRole("USER");
        }
        customerRepository.save(customer);
        System.out.println("[DEBUG] Đã lưu customer vào DB: " + customer.getEmail());
        return ResponseEntity.ok(customer);
    }
}
