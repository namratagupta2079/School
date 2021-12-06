package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Student;

/**
 * @author namratagupta
 *
 *         Repository for Student
 */
public interface StudentRepository extends JpaRepository<Student, Long> {

	@Query(value = "select st.* from student st inner join course_student cb on st.student_id = cb.student_id "
			+ "inner join course cors on cors.course_id = cb.course_id where cors.instructor_id = :instructorId", nativeQuery = true)
	List<Student> findStudentByInstructorId(@Param(value = "instructorId") Long instructorId);

}
