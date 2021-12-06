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
 *         DTO class for Instructor
 */
@Getter
@Setter
@NoArgsConstructor
public class InstructorDTO {
	@JsonIgnore
	private Long id;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("deptName")
	private String deptName;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("headedBy")
	private String headedBy;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("firstName")
	private String firstName;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("lastName")
	private String lastName;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("phone")
	private String phone;
}
