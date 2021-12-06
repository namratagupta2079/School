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

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.model.Department;
import com.example.demo.service.DepartmentService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

/**
 * @author namratagupta
 *
 *         This is controller class for Department resource
 */
@RestController
@RequestMapping(value = "/department")
@RequiredArgsConstructor
public class DepartmentController {

	@Autowired
	private DepartmentService service;

	/**
	 * This method is used to create Department resource in database
	 * 
	 * @param dto
	 * @return Department
	 */
	@PostMapping(consumes = "application/json")
	@ApiOperation(value = "This API is used to create Department resource", response = Department.class)
	public ResponseEntity<Department> createDepartment(@Valid @NotNull @RequestBody DepartmentDTO dto) {

		try {
			Department savedDepartment = service.createDepartment(dto);
			return new ResponseEntity<>(savedDepartment, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method is used to fetch the Department as per the provided id else it
	 * will fetch all the Departments.
	 * 
	 * @param name
	 * @return Department
	 */
	@GetMapping(produces = "application/json")
	@ApiOperation(value = "This API is used to get all department or department by id", response = Department.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Resource not found"),
			@ApiResponse(code = 200, message = "Successful retrieval", response = Department.class, responseContainer = "List") })
	public ResponseEntity<List<Department>> getDepartment(@RequestParam(required = false) String name) {
		try {
			List<Department> departments = new ArrayList<Department>();

			if (name == null)
				service.findAllDepartment().forEach(departments::add);
			else {
				Optional<Department> department = service.findById(name);
				if (department.isPresent()) {
					departments.add(department.get());
				}
			}

			if (departments.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(departments, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method will update the existing Department resource.
	 * 
	 * @param name
	 * @param departmentDto
	 * @return Department
	 */
	@PutMapping("/{name}")
	@ApiOperation(value = "This API is used to update department", response = Department.class)
	public ResponseEntity<Department> updateDepartment(@NotNull @PathVariable("id") String name,
			@RequestBody DepartmentDTO departmentDto) {
		Optional<Department> oldDepartment = service.findById(name);
		if (oldDepartment.isPresent()) {
			Department updatedDepartment = service.updateDepartment(departmentDto, oldDepartment.get());
			return new ResponseEntity<>(updatedDepartment, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * This method will delete the department resource as per the id provided in
	 * path parameter
	 * 
	 * @param name
	 * @return Department
	 */
	@DeleteMapping("/{name}")
	@ApiOperation(value = "This API is used to delete department")
	public ResponseEntity<HttpStatus> deleteDepartment(@NotNull @PathVariable("id") String name) {
		try {
			service.deleteDepartment(name);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
