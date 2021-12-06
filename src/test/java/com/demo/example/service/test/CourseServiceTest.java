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

import com.example.demo.dto.CourseDTO;
import com.example.demo.model.Course;
import com.example.demo.model.Department;
import com.example.demo.model.Instructor;
import com.example.demo.repositories.CourseRepository;
import com.example.demo.service.CourseService;

/**
 * @author namratagupta
 * 
 *         This class is to test the service methods of Course resource
 */
@ExtendWith(MockitoExtension.class)
public class CourseServiceTest {

	@InjectMocks
	CourseService service;

	@Mock
	CourseRepository repository;

	/**
	 * This method is to test create course
	 */
	@Test
	public void testCreateStudent() {
		Department department = Department.builder().name("IT").location("jaipur").build();

		Instructor intructor = Instructor.builder().deptName(department).firstName("Michel").headedBy("Michael")
				.lastName("jay").phone("12345").build();

		Course course = Course.builder().id(1L).courseName("java").instructorId(intructor).duration(2).build();

		when(repository.save(Mockito.any())).thenReturn(course);
		Course savedStudent = service.createCourse(buildCourseDTO());
		assertEquals(savedStudent.getId(), 1L);
		assertEquals(savedStudent.getDuration(), 2);
	}

	/**
	 * This method is to test fetch course by id
	 */
	@Test
	public void testfetchStudentById() {
		Department department = Department.builder().name("IT").location("jaipur").build();

		Instructor intructor = Instructor.builder().deptName(department).firstName("Michel").headedBy("Michael")
				.lastName("jay").phone("12345").build();

		Course course = Course.builder().id(1L).courseName("java").instructorId(intructor).duration(2).build();

		when(repository.findById(Mockito.any())).thenReturn(Optional.of(course));
		Optional<Course> savedCourse = service.findById(1L);
		assertEquals(savedCourse.get().getId(), 1L);
		assertEquals(savedCourse.get().getDuration(), 2);
	}

	@Test
	public void testfindCourseListByStudentId() {
		when(repository.findCourseByStudentId(Mockito.any())).thenReturn(buildCourseList());
		Set<Course> courseList = service.findCourseByStudentId(1L);
		assertEquals(courseList.size(), 2);
	}

	private CourseDTO buildCourseDTO() {
		CourseDTO dto = new CourseDTO();
		dto.setCourseName("Maths");
		dto.setDeptName("Advance Maths");
		dto.setDuration(2);
		dto.setId(1L);
		dto.setInstructorId(1);
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
