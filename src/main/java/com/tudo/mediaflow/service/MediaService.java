package com.tudo.mediaflow.service;

import com.tudo.mediaflow.model.Serie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;

@Service
public class MediaService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Serie> buscarSeries(String nome) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/search/tv")
                .queryParam("api_key", apiKey)
                .queryParam("query", nome)
                .queryParam("language", "pt-BR")
                .toUriString();

        TmdbResponse response = restTemplate.getForObject(url, TmdbResponse.class);

        return response != null ? response.results() : List.of();
    }

    private record TmdbResponse(List<Serie> results) {}
}