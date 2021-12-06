package com.example.demo.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.example.demo.dto.InstructorDTO;
import com.example.demo.model.Instructor;
import com.example.demo.service.InstructorService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

/**
 * @author namratagupta
 *
 *         This is controller class for Instructor resource
 */
@RestController
@RequestMapping(value = "/instructor")
@RequiredArgsConstructor
public class InstructorController {

	@Autowired
	private InstructorService service;

	/**
	 * This method is used to create Instructor resource in database
	 * 
	 * @param dto
	 * @return Instructor
	 */
	@PostMapping(consumes = "application/json")
	@ApiOperation(value = "This API is used to create Instructor resource", response = Instructor.class)
	public ResponseEntity<Instructor> createInstructor(@Valid @NotNull @RequestBody InstructorDTO dto) {

		try {
			Instructor savedInstructor = service.createInstructor(dto);
			return new ResponseEntity<>(savedInstructor, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method is used to fetch the Instructor as per the provided id else it
	 * will fetch all the Instructors.
	 * 
	 * @param id
	 * @return List<Instructor>
	 */
	@GetMapping(produces = "application/json")
	@ApiOperation(value = "This API is used to get all instructors or instructor by id", response = Instructor.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Instructor.class, responseContainer = "List") })
	public ResponseEntity<List<Instructor>> getAllInstructors(@RequestParam(required = false) Integer id) {
		try {
			List<Instructor> instructors = new ArrayList<Instructor>();

			if (id == null)
				service.findAllInstructor().forEach(instructors::add);
			else {
				Optional<Instructor> instructor = service.findById(id.longValue());
				if (instructor.isPresent()) {
					instructors.add(instructor.get());
				}
			}

			if (instructors.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(instructors, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method will update the existing Instructor resource.
	 * 
	 * @param id
	 * @param instructorDto
	 * @return Instructor
	 */
	@PutMapping("/{id}")
	@ApiOperation(value = "This API is used to update Instructor", response = Instructor.class)
	public ResponseEntity<Instructor> updateInstructor(@NotNull @PathVariable("id") Integer id,
			@RequestBody InstructorDTO instructorDto) {
		Optional<Instructor> oldInstructor = service.findById(id.longValue());
		if (oldInstructor.isPresent()) {
			Instructor updatedInstructor = service.updateInstructor(instructorDto, oldInstructor.get());
			return new ResponseEntity<>(updatedInstructor, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * This method will delete the Instructor resource as per the id provided in
	 * path parameter
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping("/{id}")
	@ApiOperation(value = "This API is used to delete Instructor")
	public ResponseEntity<HttpStatus> deleteInstructor(@NotNull @PathVariable("id") Integer id) {
		try {
			service.deleteInstructor(id.longValue());
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
