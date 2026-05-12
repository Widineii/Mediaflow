package com.tudo.mediaflow.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Serie(
        @JsonProperty("name") String nome,
        @JsonProperty("overview") String sinopse,
        @JsonProperty("vote_average") Double nota,
        @JsonProperty("poster_path") String posterPath,
        @JsonProperty("first_air_date") String dataLancamento
) {
    public String getUrlImagem() {
        if (posterPath == null) return null;
        return "https://image.tmdb.org/t/p/w500" + posterPath;
    }
}