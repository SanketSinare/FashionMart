package com.spring.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Place_Order")
public class PlaceOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private int orderId;

	private String email;

	@Column(name = "order_status")
	private String orderStatus;

	@Column(name = "order_date")
	private Date orderDate;

	@Column(name = "total_cost")
	private double totalCost;
	
	@OneToMany(fetch =FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "order_id")
	private List<PurchaseProduct> products;	
	
	//getters and setters
	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public List<PurchaseProduct> getProducts() {
		return products;
	}

	public void setProducts(List<PurchaseProduct> products) {
		this.products = products;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public double getTotalCost() {
		return totalCost;
	}

	
	@Override
	public String toString() {
		return "PlaceOrder [orderId=" + orderId + ", email=" + email + ", orderStatus=" + orderStatus + ", orderDate="
				+ orderDate + ", totalCost=" + totalCost + ", products=" + products + "]";
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public PlaceOrder(int orderId, String email, String orderStatus, Date orderDate, double totalCost) {
		super();
		this.orderId = orderId;
		this.email = email;
		this.orderStatus = orderStatus;
		this.orderDate = orderDate;
		this.totalCost = totalCost;
	}

	public PlaceOrder() {
		super();
	}

}