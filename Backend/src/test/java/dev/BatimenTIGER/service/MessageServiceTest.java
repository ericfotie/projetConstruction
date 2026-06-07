package dev.BatimenTIGER.service;

import dev.BatimenTIGER.Mapper.MessageMapper;
import dev.BatimenTIGER.Model.Message;
import dev.BatimenTIGER.Repository.MessageRepository;
import dev.BatimenTIGER.Service.ServiceImpl.MessageServiceImpl;
import dev.BatimenTIGER.dto.MessageDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private MessageMapper mapper;

    @InjectMocks
    private MessageServiceImpl messageService;

    private MessageDTO buildDTO(Long id, boolean traite) {
        return new MessageDTO(id, "Jean Dupont", "jean@test.com", "+237600000000",
                "Projet villa", "Bonjour, je souhaite un devis.",
                LocalDateTime.now(), traite, "https://wa.me/237600000000");
    }

    @Test
    void envoyerMessage_sauvegardeEtRetourne() {
        MessageDTO dto = buildDTO(null, false);
        Message entity = new Message();
        Message saved = new Message();
        MessageDTO savedDto = buildDTO(1L, false);

        when(mapper.toEntity(dto)).thenReturn(entity);
        when(messageRepository.save(entity)).thenReturn(saved);
        when(mapper.toDTO(saved)).thenReturn(savedDto);

        MessageDTO result = messageService.envoyerMessage(dto);

        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.nomClient()).isEqualTo("Jean Dupont");
        verify(messageRepository).save(entity);
    }

    @Test
    void listerTousLesMessages_retourneTousLesMessages() {
        Message entity = new Message();
        MessageDTO dto = buildDTO(1L, false);

        when(messageRepository.findAll()).thenReturn(List.of(entity));
        when(mapper.toDTO(entity)).thenReturn(dto);

        List<MessageDTO> result = messageService.listerTousLesMessages();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).nomClient()).isEqualTo("Jean Dupont");
    }

    @Test
    void marquerCommeTraite_metsAJourLeFlag() {
        Message message = new Message();
        message.setEstTraite(false);

        when(messageRepository.findById(1L)).thenReturn(Optional.of(message));
        when(messageRepository.save(message)).thenReturn(message);

        messageService.marquerCommeTraite(1L);

        assertThat(message.isEstTraite()).isTrue();
        verify(messageRepository).save(message);
    }

    @Test
    void marquerCommeTraite_leveExceptionSiIntrouvable() {
        when(messageRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> messageService.marquerCommeTraite(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("introuvable");
    }

    @Test
    void obtenirMessage_leveExceptionSiIntrouvable() {
        when(messageRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> messageService.obtenirMessage(99L))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void supprimerMessage_appelleDeleteById() {
        doNothing().when(messageRepository).deleteById(1L);

        messageService.supprimerMessage(1L);

        verify(messageRepository).deleteById(1L);
    }
}
