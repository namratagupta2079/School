package com.example.demo.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author namratagupta
 *
 *         DTO class for Department
 */
@Getter
@Setter
@NoArgsConstructor
public class DepartmentDTO {

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("name")
	private String name;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("location")
	private String location;

}
