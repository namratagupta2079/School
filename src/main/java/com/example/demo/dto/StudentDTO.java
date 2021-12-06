package com.example.demo.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author namratagupta
 *
 *         DTO class for Student
 */
@Getter
@Setter
@NoArgsConstructor
public class StudentDTO {

	@JsonIgnore
	private Long id;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("firstName")
	private String firstName;

	@NotNull
	@ApiModelProperty(required = true)
	@JsonProperty("lastName")
	private String lastName;

	@NotNull
	@ApiModelProperty(required = true)
	@JsonProperty("phone")
	private String phone;

}
