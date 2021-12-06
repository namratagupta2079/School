package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author namratagupta
 *
 */
@Getter
@Setter
@ToString(callSuper = true)
public class User {
	private String user;

	private String pwd;

	private String token;

}
