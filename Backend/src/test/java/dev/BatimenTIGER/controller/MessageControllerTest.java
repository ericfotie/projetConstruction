package dev.BatimenTIGER.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import dev.BatimenTIGER.Controlleur.MessageController;
import dev.BatimenTIGER.Service.IMessageService;
import dev.BatimenTIGER.dto.MessageDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = MessageController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class MessageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IMessageService messageService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    private MessageDTO buildDTO(Long id, boolean traite) {
        return new MessageDTO(id, "Jean Dupont", "jean@test.com", "+237600000000",
                "Projet villa", "Bonjour, je souhaite un devis.",
                LocalDateTime.of(2025, 6, 1, 10, 0), traite, "https://wa.me/237600000000");
    }

    @Test
    void postMessage_retourne201AvecMessageCree() throws Exception {
        MessageDTO input = buildDTO(null, false);
        MessageDTO output = buildDTO(1L, false);

        when(messageService.envoyerMessage(any())).thenReturn(output);

        mockMvc.perform(post("/api/public/messages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nomClient").value("Jean Dupont"));
    }

    @Test
    void getAllMessages_retourne200AvecListe() throws Exception {
        when(messageService.listerTousLesMessages()).thenReturn(List.of(buildDTO(1L, false)));

        mockMvc.perform(get("/api/admin/messages"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nomClient").value("Jean Dupont"))
                .andExpect(jsonPath("$[0].estTraite").value(false));
    }

    @Test
    void getMessageById_retourne200AvecMessage() throws Exception {
        when(messageService.obtenirMessage(1L)).thenReturn(buildDTO(1L, false));

        mockMvc.perform(get("/api/admin/messages/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void markAsProcessed_retourne200() throws Exception {
        doNothing().when(messageService).marquerCommeTraite(1L);

        mockMvc.perform(patch("/api/admin/messages/1/traiter"))
                .andExpect(status().isOk());

        verify(messageService).marquerCommeTraite(1L);
    }

    @Test
    void deleteMessage_retourne204() throws Exception {
        doNothing().when(messageService).supprimerMessage(1L);

        mockMvc.perform(delete("/api/admin/messages/1"))
                .andExpect(status().isNoContent());

        verify(messageService).supprimerMessage(1L);
    }
}
