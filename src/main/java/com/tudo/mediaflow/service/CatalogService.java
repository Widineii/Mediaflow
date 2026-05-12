package com.tudo.mediaflow.service;

import com.tudo.mediaflow.model.CatalogItem;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class CatalogService {

    public List<CatalogItem> listarCatalogo() {
        String hoje = LocalDate.now().toString();

        return List.of(
                new CatalogItem(1L, "Cyberpunk 2077: Ultimate Edition", "jogo", "Jogos", "PC, Xbox, PS5", "RPG / Acao",
                        new BigDecimal("199.90"), new BigDecimal("249.90"), "Catalogo MediaFlow", "4.7",
                        "Night City completa com expansao, mundo aberto e campanha cinematografica.",
                        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
                        "Oferta popular", hoje),
                new CatalogItem(2L, "Elden Ring", "jogo", "Jogos", "PC, Xbox, PS5", "Soulslike / Fantasia",
                        new BigDecimal("229.90"), new BigDecimal("299.90"), "Catalogo MediaFlow", "4.9",
                        "Aventura de fantasia sombria com exploracao aberta e chefes memoraveis.",
                        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
                        "Mais buscado", hoje),
                new CatalogItem(3L, "Forza Horizon 5", "jogo", "Jogos", "PC, Xbox", "Corrida",
                        new BigDecimal("149.90"), new BigDecimal("249.90"), "Catalogo MediaFlow", "4.8",
                        "Corridas em mundo aberto com eventos, colecao de carros e multiplayer.",
                        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
                        "Game Pass vibe", hoje),
                new CatalogItem(4L, "Spider-Man 2", "jogo", "Jogos", "PS5", "Acao / Aventura",
                        new BigDecimal("279.90"), new BigDecimal("349.90"), "Catalogo MediaFlow", "4.8",
                        "Aventura heroica com combate fluido, travessia rapida e campanha dupla.",
                        "https://images.unsplash.com/photo-1608889825271-9696288ab804?auto=format&fit=crop&w=900&q=80",
                        "Exclusivo PS5", hoje),
                new CatalogItem(5L, "Solo Leveling", "manga", "Mangas", "Fisico / Digital", "Acao / Fantasia",
                        new BigDecimal("34.90"), new BigDecimal("44.90"), "Catalogo MediaFlow", "4.9",
                        "Cacadores, portais e evolucao de poder em ritmo acelerado.",
                        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80",
                        "Queridinho", hoje),
                new CatalogItem(6L, "Jujutsu Kaisen", "manga", "Mangas", "Fisico / Digital", "Acao / Sobrenatural",
                        new BigDecimal("29.90"), new BigDecimal("39.90"), "Catalogo MediaFlow", "4.8",
                        "Maldicoes, feiticeiros e lutas intensas com elenco marcante.",
                        "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&w=900&q=80",
                        "Em alta", hoje),
                new CatalogItem(7L, "One Piece", "manga", "Mangas", "Fisico / Digital", "Aventura",
                        new BigDecimal("31.90"), new BigDecimal("39.90"), "Catalogo MediaFlow", "5.0",
                        "A grande jornada pirata com arcos longos, humor e mundo gigante.",
                        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80",
                        "Catalogo gigante", hoje),
                new CatalogItem(8L, "Attack on Titan", "manga", "Mangas", "Fisico / Digital", "Drama / Acao",
                        new BigDecimal("32.90"), new BigDecimal("42.90"), "Catalogo MediaFlow", "4.9",
                        "Conflito brutal, misterios politicos e viradas de alto impacto.",
                        "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?auto=format&fit=crop&w=900&q=80",
                        "Completo", hoje),
                new CatalogItem(9L, "Duna: Parte Dois", "filme", "Filmes", "Streaming / Compra", "Ficcao cientifica",
                        new BigDecimal("39.90"), new BigDecimal("59.90"), "Catalogo MediaFlow", "4.7",
                        "Ficcao cientifica grandiosa com politica, guerra e visual monumental.",
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
                        "Cinema premium", hoje),
                new CatalogItem(10L, "Oppenheimer", "filme", "Filmes", "Streaming / Compra", "Drama historico",
                        new BigDecimal("29.90"), new BigDecimal("49.90"), "Catalogo MediaFlow", "4.8",
                        "Drama biografico intenso sobre ciencia, poder e consequencias.",
                        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
                        "Premiado", hoje),
                new CatalogItem(11L, "The Last of Us", "serie", "Series", "Streaming", "Drama / Sobrevivencia",
                        new BigDecimal("24.90"), new BigDecimal("34.90"), "Catalogo MediaFlow", "4.8",
                        "Adaptacao emocional com jornada, tensao e personagens fortes.",
                        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
                        "Baseado em jogo", hoje),
                new CatalogItem(12L, "Stranger Things", "serie", "Series", "Streaming", "Suspense / Fantasia",
                        new BigDecimal("19.90"), new BigDecimal("29.90"), "Catalogo MediaFlow", "4.7",
                        "Misterio sobrenatural, nostalgia e grupo jovem enfrentando o impossivel.",
                        "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=900&q=80",
                        "Maratona", hoje)
        );
    }
}
