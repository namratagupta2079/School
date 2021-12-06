package com.example.demo.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CourseDTO {

	@JsonIgnore
	private Long id;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("deptName")
	private String deptName;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("instructorId")
	private Integer instructorId;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("duration")
	private Integer duration;

	@ApiModelProperty(required = true)
	@NotNull
	@JsonProperty("courseName")
	private String courseName;

}
