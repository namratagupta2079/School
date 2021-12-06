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

import com.example.demo.dto.StudentDTO;
import com.example.demo.model.Course;
import com.example.demo.model.Student;
import com.example.demo.service.StudentService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/student")
@RequiredArgsConstructor
public class StudentController {

	@Autowired
	private StudentService service;

	/**
	 * This method creates a student resource in database. It accepts Student DTO as
	 * json body and validates it and then persist the object in database.
	 * 
	 * @param dto
	 * @return Student
	 */
	@PostMapping(consumes = "application/json")
	@ApiOperation(value = "This API is used to create student resource", response = Student.class)
	public ResponseEntity<Student> createStudent(@Valid @NotNull @RequestBody StudentDTO dto) {

		try {
			Student savedStudent = service.createStudent(dto);
			return new ResponseEntity<>(savedStudent, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method get all student resource from database if id is not provided. If
	 * id is provided in the request it will fetch the student as per the student id
	 * from database
	 * 
	 * @param id
	 * @return Student
	 */
	@GetMapping(produces = "application/json")
	@ApiOperation(value = "This API is used to get all students or student by id", response = Student.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Student.class, responseContainer = "List") })
	public ResponseEntity<List<Student>> getAllStudents(@RequestParam(required = false) Integer id) {
		try {
			List<Student> students = new ArrayList<Student>();

			if (id == null)
				service.findAllStudent().forEach(students::add);
			else {
				Optional<Student> student = service.findById(id.longValue());
				if (student.isPresent()) {
					students.add(student.get());
				}
			}

			if (students.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(students, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method is used to update Student resource as per the id provided in the
	 * request
	 * 
	 * @param id
	 * @param studentDto
	 * @return Student
	 */
	@PutMapping("/{id}")
	@ApiOperation(value = "This API is used to update student", response = Student.class)
	public ResponseEntity<Student> updateStudent(@NotNull @PathVariable("id") Integer id,
			@RequestBody StudentDTO studentDto) {
		Optional<Student> oldStudent = service.findById(id.longValue());
		if (oldStudent.isPresent()) {
			Student updatedStudent = service.updateStudent(studentDto, oldStudent.get());
			return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * This method is used to delete Student resource as per the id provided in the
	 * request
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping("/{id}")
	@ApiOperation(value = "This API is used to delete student")
	public ResponseEntity<HttpStatus> deleteStudent(@NotNull @PathVariable("id") Integer id) {
		try {
			service.deleteStudent(id.longValue());
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * This method is used to fetch all students from database as per the instructor
	 * id provided in the request
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/instructorId/{id}")
	@ApiOperation(value = "This API is used to get all Students for a particular instructor", response = Student.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Course.class, responseContainer = "List") })
	public ResponseEntity<Set<Student>> getStudentByInstructorId(@NotNull @PathVariable("id") Long id) {
		try {
			if (id == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
			Set<Student> students = service.findStudentByInstructorId(id);
			if (students != null && students.size() > 0) {
				return new ResponseEntity<>(students, HttpStatus.OK);
			}
			return null;
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method is to fetch total course duration from the database as per the
	 * student id provided in the request
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/courseDuration/studentId/{id}")
	@ApiOperation(value = "This API is used to get total course duration for a particular student", response = Student.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Course.class, responseContainer = "List") })
	public ResponseEntity<Integer> getCourseDurationByStudentId(@NotNull @PathVariable("id") Long id) {
		try {
			if (id == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
			Integer totalDuration = service.findCourseDurationByStudentId(id);
			if (totalDuration != null) {
				return new ResponseEntity<>(totalDuration, HttpStatus.OK);
			}
			return null;
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

}
