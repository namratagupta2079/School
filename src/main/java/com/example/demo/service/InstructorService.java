package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.InstructorDTO;
import com.example.demo.model.Instructor;
import com.example.demo.repositories.InstructorRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class InstructorService {

	@Autowired
	private InstructorRepository repo;

	public List<Instructor> findAllInstructor() {
		return repo.findAll();
	}

	public Optional<Instructor> findById(Long id) {
		return repo.findById(id);
	}

	public Instructor createInstructor(InstructorDTO instructorDto) {
		Instructor instructor = new Instructor();
		BeanUtils.copyProperties(instructorDto, instructor);
		return repo.save(instructor);
	}

	public Instructor updateInstructor(InstructorDTO instructorDto, Instructor oldInstructor) {
		BeanUtils.copyProperties(instructorDto, oldInstructor);
		return repo.save(oldInstructor);
	}

	public void deleteInstructor(Long id) {
		repo.deleteById(id);
	}

}
