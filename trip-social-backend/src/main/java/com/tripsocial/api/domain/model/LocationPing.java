package com.tripsocial.api.domain.model;

import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "location_pings")
public class LocationPing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID convoyId;
    private UUID userId;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point coordinates;

    private Float speed;
    private Float heading;
    private LocalDateTime timestamp;
    private Boolean isOfflineSync;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getConvoyId() {
        return convoyId;
    }

    public void setConvoyId(UUID convoyId) {
        this.convoyId = convoyId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Point getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Point coordinates) {
        this.coordinates = coordinates;
    }

    public Float getSpeed() {
        return speed;
    }

    public void setSpeed(Float speed) {
        this.speed = speed;
    }

    public Float getHeading() {
        return heading;
    }

    public void setHeading(Float heading) {
        this.heading = heading;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getOfflineSync() {
        return isOfflineSync;
    }

    public void setOfflineSync(Boolean offlineSync) {
        isOfflineSync = offlineSync;
    }
}
