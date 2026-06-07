package dev.BatimenTIGER.service;

import dev.BatimenTIGER.Mapper.ServiceOffertMapper;
import dev.BatimenTIGER.Model.ServiceOffert;
import dev.BatimenTIGER.Repository.ServiceOffertRepository;
import dev.BatimenTIGER.Service.ServiceImpl.ServiceOffertServiceImpl;
import dev.BatimenTIGER.dto.ServiceDTO;
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
class ServiceOffertServiceTest {

    @Mock
    private ServiceOffertRepository repository;

    @Mock
    private ServiceOffertMapper mapper;

    @InjectMocks
    private ServiceOffertServiceImpl serviceOffertService;

    private ServiceDTO buildDTO(Long id, boolean active) {
        return new ServiceDTO(id, "Construction", "Réalisation sur le terrain", "construction", active);
    }

    @Test
    void listerServicesPublics_retourneSeulementServicesActifs() {
        ServiceOffert activeService = new ServiceOffert();
        ServiceDTO dto = buildDTO(1L, true);

        when(repository.findByIsActiveTrue()).thenReturn(List.of(activeService));
        when(mapper.toDTO(activeService)).thenReturn(dto);

        List<ServiceDTO> result = serviceOffertService.listerServicesPublics();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).isActive()).isTrue();
        verify(repository).findByIsActiveTrue();
        verify(repository, never()).findAll();
    }

    @Test
    void listerTousLesServices_retourneTousLesServices() {
        ServiceOffert s1 = new ServiceOffert();
        ServiceOffert s2 = new ServiceOffert();

        when(repository.findAll()).thenReturn(List.of(s1, s2));
        when(mapper.toDTO(s1)).thenReturn(buildDTO(1L, true));
        when(mapper.toDTO(s2)).thenReturn(buildDTO(2L, false));

        List<ServiceDTO> result = serviceOffertService.listerTousLesServices();

        assertThat(result).hasSize(2);
    }

    @Test
    void ajouterService_sauvegardeEtRetourne() {
        ServiceDTO dto = buildDTO(null, true);
        ServiceOffert entity = new ServiceOffert();
        ServiceOffert saved = new ServiceOffert();

        when(mapper.toEntity(dto)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(saved);
        when(mapper.toDTO(saved)).thenReturn(buildDTO(1L, true));

        ServiceDTO result = serviceOffertService.ajouterService(dto);

        assertThat(result.id()).isEqualTo(1L);
        verify(repository).save(entity);
    }

    @Test
    void changerEtatService_desactiveLeService() {
        ServiceOffert service = new ServiceOffert();
        service.setActive(true);

        when(repository.findById(1L)).thenReturn(Optional.of(service));
        when(repository.save(service)).thenReturn(service);

        serviceOffertService.changerEtatService(1L, false);

        assertThat(service.isActive()).isFalse();
        verify(repository).save(service);
    }

    @Test
    void supprimerService_supprimeSiExiste() {
        when(repository.existsById(1L)).thenReturn(true);

        serviceOffertService.supprimerService(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void supprimerService_leveExceptionSiInexistant() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> serviceOffertService.supprimerService(99L))
                .isInstanceOf(RuntimeException.class);
        verify(repository, never()).deleteById(any());
    }
}
