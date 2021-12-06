package com.example.demo.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CourseDTO;
import com.example.demo.model.Course;
import com.example.demo.service.CourseService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/course")
@RequiredArgsConstructor
public class CourseController {

	@Autowired
	private CourseService service;

	@PostMapping(consumes = "application/json")
	@ApiOperation(value = "This API is used to create Course resource", response = Course.class)
	public ResponseEntity<Course> createCourse(@Valid @NotNull @RequestBody CourseDTO dto) {

		try {
			Course savedCourse = service.createCourse(dto);
			return new ResponseEntity<>(savedCourse, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(produces = "application/json")
	@ApiOperation(value = "This API is used to get all Courses or Course by id", response = Course.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Course.class, responseContainer = "List") })
	public ResponseEntity<List<Course>> getAllCourses(@RequestParam(required = false) Integer id) {
		try {
			List<Course> courses = new ArrayList<Course>();

			if (id == null)
				service.findAllCourse().forEach(courses::add);
			else {
				Optional<Course> course = service.findById(id.longValue());
				if (course.isPresent()) {
					courses.add(course.get());
				}
			}

			if (courses.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(courses, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "This API is used to update Course", response = Course.class)
	public ResponseEntity<Course> updateCourse(@NotNull @PathVariable("id") Integer id,
			@RequestBody CourseDTO courseDto) {
		Optional<Course> oldCourse = service.findById(id.longValue());
		if (oldCourse.isPresent()) {
			Course updatedCourse = service.updateCourse(courseDto, oldCourse.get());
			return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "This API is used to delete Course")
	public ResponseEntity<HttpStatus> deleteCourse(@NotNull @PathVariable("id") Integer id) {
		try {
			service.deleteCourse(id.longValue());
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/studentId/{id}")
	@ApiOperation(value = "This API is used to get all Courses for a particular student", response = Course.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Course.class, responseContainer = "List") })
	public ResponseEntity<Set<Course>> getCourseByStudentId(@NotNull @PathVariable("id") Long id) {
		try {
			if (id == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
			Set<Course> courses = service.findCourseByStudentId(id);
			if (courses != null && courses.size() > 0) {
				return new ResponseEntity<>(courses, HttpStatus.OK);
			}
			return null;
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

}
