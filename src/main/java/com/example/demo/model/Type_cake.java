package com.example.demo.model;

public class Type_cake {
	private int id;
	private String name;

	public Type_cake() {
	}

	public Type_cake(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}