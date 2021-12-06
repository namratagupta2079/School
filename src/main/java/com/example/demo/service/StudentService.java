package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StudentDTO;
import com.example.demo.model.Course;
import com.example.demo.model.Student;
import com.example.demo.repositories.CourseRepository;
import com.example.demo.repositories.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

	@Autowired
	private StudentRepository repo;

	@Autowired
	private CourseRepository courseRepository;

	public List<Student> findAllStudent() {
		return repo.findAll();
	}

	public Optional<Student> findById(Long id) {
		return repo.findById(id);
	}

	public Student createStudent(StudentDTO studentDto) {
		Student student = new Student();
		BeanUtils.copyProperties(studentDto, student);
		return repo.save(student);
	}

	public Student updateStudent(StudentDTO studentDto, Student oldStudent) {
		BeanUtils.copyProperties(studentDto, oldStudent);
		return repo.save(oldStudent);
	}

	public void deleteStudent(Long id) {
		repo.deleteById(id);
	}

	public Set<Student> findStudentByInstructorId(Long instructorId) {
		List<Student> students = repo.findStudentByInstructorId(instructorId);
		return students.stream().collect(Collectors.toSet());
	}

	public Integer findCourseDurationByStudentId(Long studentId) {
		List<Course> courses = courseRepository.findCourseByStudentId(studentId);

		return courses.stream().map(Course::getDuration).collect(Collectors.summingInt(Integer::intValue));
	}

}
