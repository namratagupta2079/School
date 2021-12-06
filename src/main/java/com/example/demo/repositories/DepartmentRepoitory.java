package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Department;

/**
 * @author namratagupta
 *
 *         Repository for Department
 */
public interface DepartmentRepoitory extends JpaRepository<Department, String> {

}
