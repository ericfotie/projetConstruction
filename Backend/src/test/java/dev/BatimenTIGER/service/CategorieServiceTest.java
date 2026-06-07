package dev.BatimenTIGER.service;

import dev.BatimenTIGER.Mapper.CategorieMapper;
import dev.BatimenTIGER.Model.Categorie;
import dev.BatimenTIGER.Repository.CategorieRepository;
import dev.BatimenTIGER.Service.ServiceImpl.CategorieServiceImpl;
import dev.BatimenTIGER.dto.CategorieDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategorieServiceTest {

    @Mock
    private CategorieRepository repository;

    @Mock
    private CategorieMapper mapper;

    @InjectMocks
    private CategorieServiceImpl categorieService;

    @Test
    void listerToutesLesCategories_retourneToutesLesCategories() {
        Categorie entity = new Categorie();
        CategorieDTO dto = new CategorieDTO("Génie Civil", "Travaux de structure");

        when(repository.findAll()).thenReturn(List.of(entity));
        when(mapper.toDTO(entity)).thenReturn(dto);

        List<CategorieDTO> result = categorieService.listerToutesLesCategories();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).nom()).isEqualTo("Génie Civil");
        verify(repository).findAll();
    }

    @Test
    void creerCategorie_sauvegardeEtRetourneDTO() {
        CategorieDTO dto = new CategorieDTO("Toiture", "Couverture et étanchéité");
        Categorie entity = new Categorie();
        Categorie saved = new Categorie();

        when(mapper.toEntity(dto)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(saved);
        when(mapper.toDTO(saved)).thenReturn(dto);

        CategorieDTO result = categorieService.creerCategorie(dto);

        assertThat(result.nom()).isEqualTo("Toiture");
        verify(repository).save(entity);
    }

    @Test
    void modifierCategorie_metsAJourEtRetourne() {
        CategorieDTO dto = new CategorieDTO("Électricité", "Installations électriques");
        Categorie existing = new Categorie();
        Categorie saved = new Categorie();

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(saved);
        when(mapper.toDTO(saved)).thenReturn(dto);

        CategorieDTO result = categorieService.modifierCategorie(1L, dto);

        assertThat(result.nom()).isEqualTo("Électricité");
        verify(mapper).updateEntityFromDTO(dto, existing);
        verify(repository).save(existing);
    }

    @Test
    void modifierCategorie_leveExceptionSiIntrouvable() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> categorieService.modifierCategorie(99L, new CategorieDTO("X", "Y")))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("introuvable");
    }

    @Test
    void supprimerCategorie_supprimeSiExiste() {
        when(repository.existsById(1L)).thenReturn(true);

        categorieService.supprimerCategorie(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void supprimerCategorie_leveExceptionSiIntrouvable() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> categorieService.supprimerCategorie(99L))
                .isInstanceOf(RuntimeException.class);
        verify(repository, never()).deleteById(any());
    }
}
