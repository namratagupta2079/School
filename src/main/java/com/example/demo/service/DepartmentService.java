package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.model.Department;
import com.example.demo.repositories.DepartmentRepoitory;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentService {

	@Autowired
	private DepartmentRepoitory repo;

	public List<Department> findAllDepartment() {
		return repo.findAll();
	}

	public Optional<Department> findById(String name) {
		return repo.findById(name);
	}

	public Department createDepartment(DepartmentDTO departmentDto) {
		Department department = new Department();
		BeanUtils.copyProperties(departmentDto, department);
		return repo.save(department);
	}

	public Department updateDepartment(DepartmentDTO departmentDto, Department oldDepartment) {
		BeanUtils.copyProperties(departmentDto, oldDepartment);
		return repo.save(oldDepartment);
	}

	public void deleteDepartment(String name) {
		repo.deleteById(name);
	}

}
