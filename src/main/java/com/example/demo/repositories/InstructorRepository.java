package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Instructor;

/**
 * @author namratagupta
 *
 *         Repository for Instructor
 */
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

}
