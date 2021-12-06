package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author namratagupta
 *
 *         Entity class for Instructor
 */
@Getter
@Setter
@ToString(callSuper = true)
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "INSTRUCTOR")
public class Instructor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "instructorId")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "name")
	private Department deptName;

	@Column(name = "headedBy")
	private String headedBy;

	@Column(name = "firstName")
	private String firstName;

	@Column(name = "lastName")
	private String lastName;

	@Column(name = "phone")
	private String phone;

}
