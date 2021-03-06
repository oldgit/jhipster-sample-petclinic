package io.github.jhipster.petclinic.web.rest;

import io.github.jhipster.petclinic.domain.Vet;
import io.github.jhipster.petclinic.repository.VetRepository;
import io.github.jhipster.petclinic.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.petclinic.domain.Vet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VetResource {

    private final Logger log = LoggerFactory.getLogger(VetResource.class);

    private static final String ENTITY_NAME = "vet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VetRepository vetRepository;

    public VetResource(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    /**
     * {@code POST  /vets} : Create a new vet.
     *
     * @param vet the vet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vet, or with status {@code 400 (Bad Request)} if the vet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vets")
    public ResponseEntity<Vet> createVet(@Valid @RequestBody Vet vet) throws URISyntaxException {
        log.debug("REST request to save Vet : {}", vet);
        if (vet.getId() != null) {
            throw new BadRequestAlertException("A new vet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vet result = vetRepository.save(vet);
        return ResponseEntity.created(new URI("/api/vets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vets} : Updates an existing vet.
     *
     * @param vet the vet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vet,
     * or with status {@code 400 (Bad Request)} if the vet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vets")
    public ResponseEntity<Vet> updateVet(@Valid @RequestBody Vet vet) throws URISyntaxException {
        log.debug("REST request to update Vet : {}", vet);
        if (vet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vet result = vetRepository.save(vet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vets} : get all the vets.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vets in body.
     */
    @GetMapping("/vets")
    public ResponseEntity<List<Vet>> getAllVets(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Vets");
        Page<Vet> page;
        if (eagerload) {
            page = vetRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = vetRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vets/:id} : get the "id" vet.
     *
     * @param id the id of the vet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vets/{id}")
    public ResponseEntity<Vet> getVet(@PathVariable Long id) {
        log.debug("REST request to get Vet : {}", id);
        Optional<Vet> vet = vetRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(vet);
    }

    /**
     * {@code DELETE  /vets/:id} : delete the "id" vet.
     *
     * @param id the id of the vet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vets/{id}")
    public ResponseEntity<Void> deleteVet(@PathVariable Long id) {
        log.debug("REST request to delete Vet : {}", id);
        vetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
