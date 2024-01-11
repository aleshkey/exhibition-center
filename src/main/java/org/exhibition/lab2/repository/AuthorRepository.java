package org.exhibition.lab2.repository;

import org.exhibition.lab2.model.Author;
import org.exhibition.lab2.model.Image;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long>{
    Author findByName(String name);

}