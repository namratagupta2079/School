package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Course;

/**
 * @author namratagupta
 *
 *         Repository for course
 */
public interface CourseRepository extends JpaRepository<Course, Long> {

	@Query(value = "select cors.* from Course cors inner join Course_Student cs on cors.course_id = cs.course_id "
			+ "where cs.student_id = :studentId", nativeQuery = true)
	List<Course> findCourseByStudentId(@Param(value = "studentId") Long studentId);

}
