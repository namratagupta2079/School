package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CourseDTO;
import com.example.demo.model.Course;
import com.example.demo.repositories.CourseRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * @author namratagupta
 *
 */
@Service
@AllArgsConstructor
@NoArgsConstructor
public class CourseService {

	@Autowired
	private CourseRepository repo;

	public List<Course> findAllCourse() {
		return repo.findAll();
	}

	public Optional<Course> findById(Long id) {
		return repo.findById(id);
	}

	public Course createCourse(CourseDTO courseDto) {
		Course course = new Course();
		BeanUtils.copyProperties(courseDto, course);
		return repo.save(course);
	}

	public Course updateCourse(CourseDTO courseDto, Course oldCourse) {
		BeanUtils.copyProperties(courseDto, oldCourse);
		return repo.save(oldCourse);
	}

	public void deleteCourse(Long id) {
		repo.deleteById(id);
	}

	public Set<Course> findCourseByStudentId(Long studentId) {
		List<Course> courses = repo.findCourseByStudentId(studentId);
		return courses.stream().collect(Collectors.toSet());
	}

}
