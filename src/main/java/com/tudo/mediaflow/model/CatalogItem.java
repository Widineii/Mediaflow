package com.tudo.mediaflow.model;

import java.math.BigDecimal;

public record CatalogItem(
        Long id,
        String titulo,
        String tipo,
        String categoria,
        String plataforma,
        String genero,
        BigDecimal preco,
        BigDecimal precoOriginal,
        String loja,
        String nota,
        String descricao,
        String imagemUrl,
        String destaque,
        String atualizadoEm
) {
}
