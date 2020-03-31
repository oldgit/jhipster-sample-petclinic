package io.github.jhipster.petclinic.repository;

import io.github.jhipster.petclinic.domain.Vet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Vet entity.
 */
@Repository
public interface VetRepository extends JpaRepository<Vet, Long> {

    @Query(value = "select distinct vet from Vet vet left join fetch vet.specialities",
        countQuery = "select count(distinct vet) from Vet vet")
    Page<Vet> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct vet from Vet vet left join fetch vet.specialities")
    List<Vet> findAllWithEagerRelationships();

    @Query("select vet from Vet vet left join fetch vet.specialities where vet.id =:id")
    Optional<Vet> findOneWithEagerRelationships(@Param("id") Long id);
}
