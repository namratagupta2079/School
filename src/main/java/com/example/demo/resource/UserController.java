package com.example.demo.resource;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;

/**
 * @author namratagupta
 *
 *         This is controller class for User resource
 */
@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserController {

	/**
	 * This method will authenticate the user with the provided credentials and
	 * return the JWT token.
	 * 
	 * @param username
	 * @param password
	 * @return User
	 */
	@ApiOperation(value = "This API is used to generate token based on user login detail")
	@PostMapping("/login")
	public User login(@RequestParam("user") String username, @RequestParam("password") String password) {

		String token = getJWTToken(username);
		User user = new User();
		user.setUser(username);
		user.setToken(token);
		return user;

	}

	/**
	 * This method is used to generate the JWT token using Signature Algorithm and
	 * secret key. It includes the expiration time.
	 * 
	 * @param username
	 * @return token
	 */
	private String getJWTToken(String username) {
		String secretKey = "mySecretKey";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

		String token = Jwts.builder().setId("softtekJWT").setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).compact();

		return "Bearer " + token;
	}
}
