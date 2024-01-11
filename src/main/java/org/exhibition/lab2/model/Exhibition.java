package org.exhibition.lab2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.lang.Nullable;

import java.util.List;

@Data
@Entity
@Table(name = "exhibitions")
public class Exhibition implements Model{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exhibition_id", nullable = false)
    private int id;

    @Column(name = "exhibition_name")
    private String name;

    @Column(name = "exhibition_type")
    private String type;

    @Column(name = "exhibition_date")
    private String date;

    @OneToOne(mappedBy = "exhibition")
    @JsonBackReference
    private Hall hall;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "images_exhibition",
            joinColumns = { @JoinColumn(name = "exhibition_id") },
            inverseJoinColumns = { @JoinColumn(name = "image_id") }
    )
    @JsonManagedReference
    @Nullable
    private List<Image> images;

    @Column(name = "is_free")
    private boolean isFree = true;

}
