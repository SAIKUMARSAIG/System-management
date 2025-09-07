package org.sai.backend.repository;


import org.sai.backend.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;


public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStatus(String status);
    List<Complaint> findByCreatedBy(String createdBy);
    List<Complaint> findByAssignedWorker(String assignedWorker);
}