package com.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.model.PurchaseProduct;

public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct, Integer> {

}