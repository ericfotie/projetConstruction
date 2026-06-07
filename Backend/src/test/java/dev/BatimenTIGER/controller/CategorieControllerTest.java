package dev.BatimenTIGER.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.BatimenTIGER.Controlleur.CategorieController;
import dev.BatimenTIGER.Service.ICategorieService;
import dev.BatimenTIGER.dto.CategorieDTO;
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

@WebMvcTest(value = CategorieController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class CategorieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ICategorieService categorieService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllCategories_retourne200AvecListe() throws Exception {
        CategorieDTO dto = new CategorieDTO("Génie Civil", "Travaux de structure");

        when(categorieService.listerToutesLesCategories()).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/admin/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nom").value("Génie Civil"))
                .andExpect(jsonPath("$[0].description").value("Travaux de structure"));
    }

    @Test
    void createCategorie_retourne201AvecDTO() throws Exception {
        CategorieDTO dto = new CategorieDTO("Toiture", "Couverture et étanchéité");

        when(categorieService.creerCategorie(any())).thenReturn(dto);

        mockMvc.perform(post("/api/admin/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nom").value("Toiture"));
    }

    @Test
    void updateCategorie_retourne200AvecDTOMisAJour() throws Exception {
        CategorieDTO dto = new CategorieDTO("Électricité", "Installations électriques");

        when(categorieService.modifierCategorie(eq(1L), any())).thenReturn(dto);

        mockMvc.perform(put("/api/admin/categories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("Électricité"));
    }

    @Test
    void deleteCategorie_retourne204() throws Exception {
        doNothing().when(categorieService).supprimerCategorie(1L);

        mockMvc.perform(delete("/api/admin/categories/1"))
                .andExpect(status().isNoContent());

        verify(categorieService).supprimerCategorie(1L);
    }
}
