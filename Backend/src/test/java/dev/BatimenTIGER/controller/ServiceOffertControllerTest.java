package dev.BatimenTIGER.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.BatimenTIGER.Controlleur.ServiceOffertController;
import dev.BatimenTIGER.Service.IServiceOffertService;
import dev.BatimenTIGER.dto.ServiceDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = ServiceOffertController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class ServiceOffertControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IServiceOffertService serviceOffertService;

    @Autowired
    private ObjectMapper objectMapper;

    private ServiceDTO buildDTO(Long id, boolean active) {
        return new ServiceDTO(id, "Construction", "Réalisation sur le terrain", "construction", active);
    }

    @Test
    void getPublicServices_retourne200AvecServicesActifs() throws Exception {
        when(serviceOffertService.listerServicesPublics()).thenReturn(List.of(buildDTO(1L, true)));

        mockMvc.perform(get("/api/public/services"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titre").value("Construction"))
                .andExpect(jsonPath("$[0].isActive").value(true));
    }

    @Test
    void getAllServices_retourne200AvecTousLesServices() throws Exception {
        when(serviceOffertService.listerTousLesServices())
                .thenReturn(List.of(buildDTO(1L, true), buildDTO(2L, false)));

        mockMvc.perform(get("/api/admin/services"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void createService_retourne201AvecServiceCree() throws Exception {
        ServiceDTO input = buildDTO(null, true);
        ServiceDTO output = buildDTO(1L, true);

        when(serviceOffertService.ajouterService(any())).thenReturn(output);

        mockMvc.perform(post("/api/admin/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.titre").value("Construction"));
    }

    @Test
    void toggleServiceStatus_retourne200() throws Exception {
        doNothing().when(serviceOffertService).changerEtatService(1L, false);

        mockMvc.perform(patch("/api/admin/services/1/etat")
                        .param("isActive", "false"))
                .andExpect(status().isOk());

        verify(serviceOffertService).changerEtatService(1L, false);
    }

    @Test
    void deleteService_retourne204() throws Exception {
        doNothing().when(serviceOffertService).supprimerService(1L);

        mockMvc.perform(delete("/api/admin/services/1"))
                .andExpect(status().isNoContent());

        verify(serviceOffertService).supprimerService(1L);
    }
}
