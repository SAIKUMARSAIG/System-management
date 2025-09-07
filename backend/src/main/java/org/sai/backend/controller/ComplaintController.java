package org.sai.backend.controller;

import org.sai.backend.ResourceNotFoundException;
import org.sai.backend.model.Complaint;
import org.sai.backend.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend to access
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    // Get all complaints
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // Create a new complaint
    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        complaint.setCreatedAt(new Date());
        complaint.setUpdatedAt(new Date());
        return complaintRepository.save(complaint);
    }

    // Get complaint by ID
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));
        return ResponseEntity.ok(complaint);
    }

    // Update complaint status
    @PutMapping("/{id}")
    public ResponseEntity<Complaint> updateComplaint(@PathVariable Long id, @RequestBody Complaint complaintDetails) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        complaint.setStatus(complaintDetails.getStatus());
        complaint.setAssignedWorker(complaintDetails.getAssignedWorker());
        complaint.setUpdatedAt(new Date());

        Complaint updatedComplaint = complaintRepository.save(complaint);
        return ResponseEntity.ok(updatedComplaint);
    }

    // Get complaints by status
    @GetMapping("/status/{status}")
    public List<Complaint> getComplaintsByStatus(@PathVariable String status) {
        return complaintRepository.findByStatus(status);
    }

    // Get complaints by user
    @GetMapping("/user/{username}")
    public List<Complaint> getComplaintsByUser(@PathVariable String username) {
        return complaintRepository.findByCreatedBy(username);
    }

    // Get complaints assigned to worker
    @GetMapping("/worker/{username}")
    public List<Complaint> getComplaintsByWorker(@PathVariable String username) {
        return complaintRepository.findByAssignedWorker(username);
    }
}