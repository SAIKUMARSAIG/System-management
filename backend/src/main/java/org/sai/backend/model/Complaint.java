package org.sai.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String status = "PENDING"; // PENDING, IN_PROGRESS, RESOLVED
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    private String createdBy; // Simple username instead of user relationship
    private String assignedWorker; // Simple username instead of user relationship

    public Complaint(String title, String description, String location, String createdBy) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.createdBy = createdBy;
    }

    // Getters and setters for all fields
}