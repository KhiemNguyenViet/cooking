package com.example.demo.controller.admin;

import com.example.demo.model.Edmin;
import com.example.demo.repository.EdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {
    @Autowired
    private EdminRepository edminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Edmin admin = edminRepository.findByEmail(loginRequest.getEmail());
        if (admin != null && admin.getPassword().equals(loginRequest.getPassword())) {
            // Đơn giản: trả về thông tin admin (thực tế nên trả về JWT hoặc session)
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.status(401).body("Sai email hoặc mật khẩu");
    }

    public static class LoginRequest {
        private String email;
        private String password;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
