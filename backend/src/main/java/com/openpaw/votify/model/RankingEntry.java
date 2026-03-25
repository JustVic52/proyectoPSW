package com.openpaw.votify.model;

import java.util.UUID;

public class RankingEntry {
    private UUID projectId;
    private String titulo;
    private double score;
    private int voteCount;

    public RankingEntry(UUID projectId, String titulo, double score, int voteCount) {
        this.projectId = projectId;
        this.titulo = titulo;
        this.score = score;
        this.voteCount = voteCount;
    }

    public UUID getProjectId() { return projectId; }
    public void setProjectId(UUID projectId) { this.projectId = projectId; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public int getVoteCount() { return voteCount; }
    public void setVoteCount(int voteCount) { this.voteCount = voteCount; }
}
