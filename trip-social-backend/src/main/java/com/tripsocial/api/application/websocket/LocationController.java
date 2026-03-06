package com.tripsocial.api.application.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.UUID;

@Controller
public class LocationController {

    public record LocationPingMessage(UUID userId, double lat, double lon, float speed, LocalDateTime timestamp) {
    }

    @MessageMapping("/convoy/{convoyId}/location")
    @SendTo("/topic/convoy/{convoyId}")
    public LocationPingMessage broadcastLocation(@DestinationVariable UUID convoyId, LocationPingMessage ping) {
        // Envia o ping em tempo real para todos no tópico deste comboio
        return ping;
    }
}
