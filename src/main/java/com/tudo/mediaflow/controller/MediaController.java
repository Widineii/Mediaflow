package com.tudo.mediaflow.controller;

import com.tudo.mediaflow.model.Serie;
import com.tudo.mediaflow.model.CatalogItem;
import com.tudo.mediaflow.service.CatalogService;
import com.tudo.mediaflow.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @Autowired
    private CatalogService catalogService;

    @GetMapping("/buscar")
    public List<Serie> buscar(@RequestParam String nome) {
        return mediaService.buscarSeries(nome);
    }

    @GetMapping("/catalogo")
    public List<CatalogItem> catalogo() {
        return catalogService.listarCatalogo();
    }
}
