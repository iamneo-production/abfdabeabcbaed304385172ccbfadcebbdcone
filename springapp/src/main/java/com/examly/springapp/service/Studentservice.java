package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Student;
import com.examly.springapp.repository.StudentRepo;

@Service
public class Studentservice {

    @Autowired
    private StudentRepo repo;

    public boolean addStudent(Student student) {
        return repo.save(student) != null ? true : false;
    }
        
    
    public List <Student> getAllStudents()
    {
        return repo.findAll();
    }

    public Optional<Student> getById(int id)
    {
        return repo.findById(id);
    }
}
