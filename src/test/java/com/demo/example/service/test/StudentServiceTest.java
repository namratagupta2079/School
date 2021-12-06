package com.demo.example.service.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.StudentDTO;
import com.example.demo.model.Course;
import com.example.demo.model.Department;
import com.example.demo.model.Instructor;
import com.example.demo.model.Student;
import com.example.demo.repositories.CourseRepository;
import com.example.demo.repositories.StudentRepository;
import com.example.demo.service.StudentService;

/**
 * @author namratagupta
 *
 *         This class is to test the service method of Course resource
 */
@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

	@InjectMocks
	StudentService service;

	@Mock
	StudentRepository studentRepository;

	@Mock
	CourseRepository courseRepository;

	/**
	 * This method is to test create student
	 */
	@Test
	public void testCreateStudent() {
		Student student = buildStudent(1L, "John", "Joe", "1234");
		when(studentRepository.save(Mockito.any())).thenReturn(student);
		Student savedStudent = service.createStudent(buildStudentDTO(1L, "John", "Joe", "1234"));
		assertEquals(savedStudent.getId(), 1L);
		assertEquals(savedStudent.getFirstName(), "John");
		assertEquals(savedStudent.getLastName(), "Joe");
		assertEquals(savedStudent.getPhone(), "1234");
	}

	/**
	 * This method is to test fetch student by id
	 */
	@Test
	public void testfetchStudentById() {
		Student student = buildStudent(1L, "John", "Joe", "1234");
		when(studentRepository.findById(Mockito.any())).thenReturn(Optional.of(student));
		Optional<Student> savedStudent = service.findById(1L);
		assertEquals(savedStudent.get().getId(), 1L);
		assertEquals(savedStudent.get().getFirstName(), "John");
		assertEquals(savedStudent.get().getLastName(), "Joe");
		assertEquals(savedStudent.get().getPhone(), "1234");
	}

	/**
	 * This method is to test fetch student by instructor id
	 */
	@Test
	public void testfetchStudentByInstructorId() {
		Student student1 = buildStudent(1L, "John", "Joe", "1234");
		Student student2 = buildStudent(2L, "Maarten", "Moens", "1234567");

		List<Student> studentList = new ArrayList<Student>();
		studentList.add(student1);
		studentList.add(student2);

		when(studentRepository.findStudentByInstructorId(Mockito.any())).thenReturn(studentList);
		Set<Student> savedStudentList = service.findStudentByInstructorId(1L);
		assertEquals(savedStudentList.size(), 2);
	}

	/**
	 * This method is to test the total Course duration as per the student id.
	 */
	@Test
	public void testfindCourseDurationByStudentId() {
		when(courseRepository.findCourseByStudentId(Mockito.any())).thenReturn(buildCourseList());
		Integer totalDuration = service.findCourseDurationByStudentId(1L);
		assertEquals(totalDuration, 5);

	}

	private Student buildStudent(Long id, String firstName, String lastName, String phone) {
		return Student.builder().id(id).firstName(firstName).lastName(lastName).phone(phone).build();
	}

	private StudentDTO buildStudentDTO(Long id, String firstName, String lastName, String phone) {
		StudentDTO dto = new StudentDTO();
		dto.setId(id);
		dto.setFirstName(firstName);
		dto.setLastName(lastName);
		dto.setPhone(phone);
		return dto;
	}

	private List<Course> buildCourseList() {
		Department department = Department.builder().name("IT").location("jaipur").build();
		Instructor intructor = Instructor.builder().deptName(department).firstName("Michel").headedBy("Michael")
				.lastName("jay").phone("12345").build();
		Course course1 = Course.builder().id(1L).courseName("java").instructorId(intructor).duration(2).build();
		Course course2 = Course.builder().id(2L).courseName("advance java").instructorId(intructor).duration(3).build();

		List<Course> courseList = new ArrayList<Course>();
		courseList.add(course1);
		courseList.add(course2);
		return courseList;
	}
}
