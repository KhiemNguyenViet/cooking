package com.example.demo.repository;

import com.example.demo.model.Edmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EdminRepository extends JpaRepository<Edmin, Long> {
    Edmin findByEmail(String email);
}
