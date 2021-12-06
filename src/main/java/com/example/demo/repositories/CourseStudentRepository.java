package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.CourseStudent;

/**
 * @author namratagupta
 *
 *         Repository for CourseStudent
 */
public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {

}
