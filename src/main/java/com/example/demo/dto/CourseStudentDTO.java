package com.example.demo.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author namratagupta
 *
 *         DTO class for CourseStudent
 */
@Getter
@Setter
@NoArgsConstructor
public class CourseStudentDTO {

	private Long id;

	@NotNull
	private Integer studentId;

	@NotNull
	private Integer courseId;

}
