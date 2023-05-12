package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.model.Product;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {

	Product findByProductid(int productid);

	void deleteByProductid(int productid);

	@Query(value = "select * from product where price between ?1 and ?2", nativeQuery = true)
	List<Product> findAll(String minPrice, String maxPrice);

	@Query(value = "select * from product where productname like %?1% and price between ?2 and ?3", nativeQuery = true)
	List<Product> findByProductnameContains(String productname,String minPrice, String maxPrice);
	
	@Query(value = "select * from product where category=?1 and price between ?2 and ?3", nativeQuery = true)
	List<Product> findByCategory(String category, String minPrice, String maxPrice);

	
	@Query(value = "select * from product where productname like %?1% and category=?2 and price between ?3 and ?4", nativeQuery = true)
	List<Product> findByProductnameAndCategoryAndPriceBetween(String productname, String Category, String minPrice,String maxPrice);


	
}
