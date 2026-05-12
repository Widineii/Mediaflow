const grid = document.querySelector("#catalogGrid");
const totalItems = document.querySelector("#totalItems");
const bestDeal = document.querySelector("#bestDeal");
const favoriteCount = document.querySelector("#favoriteCount");
const categoryCount = document.querySelector("#categoryCount");
const resultLabel = document.querySelector("#resultLabel");
const searchInput = document.querySelector("#searchInput");
const quickFilterLabel = document.querySelector("#quickFilterLabel");
const platformFilter = document.querySelector("#platformFilter");
const platformChips = document.querySelectorAll(".platform-chip");
const genreFilter = document.querySelector("#genreFilter");
const releaseFilter = document.querySelector("#releaseFilter");
const sortFilter = document.querySelector("#sortFilter");
const tabs = document.querySelectorAll(".tab");
const shortcuts = document.querySelectorAll("[data-filter-shortcut]");
const profileButton = document.querySelector("#profileButton");
const profilePanel = document.querySelector("#profilePanel");
const profileForm = document.querySelector("#profileForm");
const profileName = document.querySelector("#profileName");
const profileTaste = document.querySelector("#profileTaste");
const profileInitial = document.querySelector("#profileInitial");
const closeProfile = document.querySelector("#closeProfile");
const profileTitle = document.querySelector("#profileTitle");
const profileText = document.querySelector("#profileText");
const profileSubmit = document.querySelector("#profileSubmit");
const authTabs = document.querySelectorAll(".auth-tab");
const likedPanel = document.querySelector("#likedPanel");
const likedList = document.querySelector("#likedList");
const logoutProfile = document.querySelector("#logoutProfile");
const dealsCard = document.querySelector("#dealsCard");
const newsList = document.querySelector("#newsList");
const rankingList = document.querySelector("#rankingList");
const detailPanel = document.querySelector("#detailPanel");
const detailCard = document.querySelector("#detailCard");
const loadMoreButton = document.querySelector("#loadMoreButton");

let catalog = [];
let currentType = "todos";
let dealsOnly = false;
let visibleCount = 30;
let favorites = new Set(JSON.parse(localStorage.getItem("mediaflow:favorites") || "[]"));
let profile = JSON.parse(localStorage.getItem("mediaflow:profile") || "null");
let authMode = "login";

const fallbackCatalog = [
    item(1, "Cyberpunk 2077: Ultimate Edition", "jogo", "Jogos", "PC, Xbox, PS5", "RPG / Acao", 199.90, 249.90, "4.7", "Night City completa com expansao, mundo aberto e campanha cinematografica.", "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg", "Oferta popular"),
    item(2, "Elden Ring", "jogo", "Jogos", "PC, Xbox, PS5", "Soulslike / Fantasia", 229.90, 299.90, "4.9", "Fantasia sombria, exploracao aberta e chefes memoraveis.", "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg", "Mais buscado"),
    item(3, "Forza Horizon 5", "jogo", "Jogos", "PC, Xbox", "Corrida", 149.90, 249.90, "4.8", "Corridas em mundo aberto com eventos, colecao de carros e multiplayer.", "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg", "Corrida"),
    item(4, "Spider-Man 2", "jogo", "Jogos", "PS5", "Acao / Aventura", 279.90, 349.90, "4.8", "Aventura heroica com combate fluido, travessia rapida e campanha dupla.", "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50e4c57db7f1ef8b6f7f3bbd56f10af1b6f7c9.jpg", "Exclusivo PS5"),
    item(5, "God of War Ragnarok", "jogo", "Jogos", "PS5", "Acao / Mitologia", 219.90, 349.90, "4.9", "Combate pesado, historia emocional e visual de alto nivel.", "https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg", "Imperdivel"),
    item(6, "Halo Infinite", "jogo", "Jogos", "PC, Xbox", "FPS / Sci-fi", 99.90, 199.90, "4.4", "Campanha sci-fi, multiplayer competitivo e acao classica.", "https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg", "Xbox"),
    item(7, "EA Sports FC 26", "jogo", "Jogos", "PC, Xbox, PS5", "Esporte", 299.90, 399.90, "4.3", "Futebol, temporadas, clubes e partidas online.", "https://cdn.akamai.steamstatic.com/steam/apps/2669320/header.jpg", "Esporte"),
    item(8, "Hogwarts Legacy", "jogo", "Jogos", "PC, Xbox, PS5", "RPG / Fantasia", 159.90, 299.90, "4.6", "Magia, exploracao, aulas e aventura em mundo aberto.", "https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg", "Fantasia"),
    item(9, "Resident Evil 4 Remake", "jogo", "Jogos", "PC, Xbox, PS5", "Terror / Acao", 139.90, 249.90, "4.8", "Terror de sobrevivencia com acao moderna e clima tenso.", "https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg", "Terror"),
    item(10, "Minecraft Deluxe", "jogo", "Jogos", "PC, Xbox, PS5", "Sandbox", 89.90, 149.90, "4.7", "Construcao, sobrevivencia, criatividade e multiplayer para todos.", "https://store-images.s-microsoft.com/image/apps.608.13510798887586243.5c7792f0-b887-4250-8c4e-4617af9c4509.1350f4d8-4cae-4e9d-a8d4-c4d11f5313e7", "Criativo"),
    item(11, "Solo Leveling", "manga", "Mangas", "Fisico / Digital", "Acao / Fantasia", 34.90, 44.90, "4.9", "Cacadores, portais e evolucao de poder em ritmo acelerado.", "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80", "Queridinho"),
    item(12, "Jujutsu Kaisen", "manga", "Mangas", "Fisico / Digital", "Acao / Sobrenatural", 29.90, 39.90, "4.8", "Maldicoes, feiticeiros e lutas intensas com elenco marcante.", "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&w=900&q=80", "Em alta"),
    item(13, "One Piece", "manga", "Mangas", "Fisico / Digital", "Aventura", 31.90, 39.90, "5.0", "A grande jornada pirata com humor, mundo gigante e muitos arcos.", "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80", "Catalogo gigante"),
    item(14, "Attack on Titan", "manga", "Mangas", "Fisico / Digital", "Drama / Acao", 32.90, 42.90, "4.9", "Conflito brutal, misterios politicos e viradas de alto impacto.", "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?auto=format&fit=crop&w=900&q=80", "Completo"),
    item(15, "Chainsaw Man", "manga", "Mangas", "Fisico / Digital", "Acao / Horror", 28.90, 39.90, "4.7", "Caos, humor acido, monstros e cenas de acao imprevisiveis.", "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=900&q=80", "Insano"),
    item(16, "Demon Slayer", "manga", "Mangas", "Fisico / Digital", "Acao / Drama", 27.90, 38.90, "4.8", "Espadas, demonios, familia e batalhas com muita emocao.", "https://images.unsplash.com/photo-1592513002316-e4fa19175023?auto=format&fit=crop&w=900&q=80", "Shonen"),
    item(17, "Berserk Deluxe", "manga", "Mangas", "Fisico", "Fantasia sombria", 149.90, 199.90, "4.9", "Edicao premium de fantasia sombria, arte detalhada e historia intensa.", "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80", "Premium"),
    item(18, "Blue Lock", "manga", "Mangas", "Fisico / Digital", "Esporte", 26.90, 36.90, "4.6", "Futebol competitivo, rivalidade e evolucao individual.", "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80", "Esporte"),
    item(19, "Duna: Parte Dois", "filme", "Filmes", "Streaming / Compra", "Ficcao cientifica", 39.90, 59.90, "4.7", "Ficcao cientifica grandiosa com politica, guerra e visual monumental.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", "Cinema premium"),
    item(20, "Oppenheimer", "filme", "Filmes", "Streaming / Compra", "Drama historico", 29.90, 49.90, "4.8", "Drama biografico intenso sobre ciencia, poder e consequencias.", "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80", "Premiado"),
    item(21, "John Wick 4", "filme", "Filmes", "Streaming / Compra", "Acao", 24.90, 44.90, "4.6", "Acao estilizada, lutas coreografadas e ritmo eletrico.", "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=900&q=80", "Acao"),
    item(22, "Avatar: O Caminho da Agua", "filme", "Filmes", "Streaming / Compra", "Aventura / Sci-fi", 34.90, 54.90, "4.5", "Mundo alienigena, familia, aventura e visual espetacular.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", "Visual"),
    item(23, "Interestelar", "filme", "Filmes", "Streaming / Compra", "Sci-fi / Drama", 19.90, 39.90, "4.9", "Viagem espacial, tempo, familia e uma trilha inesquecivel.", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80", "Classico"),
    item(24, "Top Gun: Maverick", "filme", "Filmes", "Streaming / Compra", "Acao", 22.90, 39.90, "4.7", "Avioes, adrenalina, nostalgia e cenas praticas impressionantes.", "https://images.unsplash.com/photo-1521727857535-28d2047619b7?auto=format&fit=crop&w=900&q=80", "Adrenalina"),
    item(25, "The Last of Us", "serie", "Series", "Streaming", "Drama / Sobrevivencia", 24.90, 34.90, "4.8", "Adaptacao emocional com jornada, tensao e personagens fortes.", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80", "Baseado em jogo"),
    item(26, "Stranger Things", "serie", "Series", "Streaming", "Suspense / Fantasia", 19.90, 29.90, "4.7", "Misterio sobrenatural, nostalgia e grupo jovem enfrentando o impossivel.", "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=900&q=80", "Maratona"),
    item(27, "The Boys", "serie", "Series", "Streaming", "Acao / Satira", 21.90, 32.90, "4.6", "Super-herois, critica social, violencia e humor acido.", "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80", "Adulto"),
    item(28, "House of the Dragon", "serie", "Series", "Streaming", "Fantasia / Drama", 24.90, 39.90, "4.5", "Familias poderosas, dragoes, disputas e intriga politica.", "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80", "Fantasia"),
    item(29, "The Mandalorian", "serie", "Series", "Streaming", "Sci-fi / Aventura", 22.90, 34.90, "4.7", "Cacadores, galaxia, aventura espacial e capitulos dinamicos.", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80", "Sci-fi"),
    item(30, "Round 6", "serie", "Series", "Streaming", "Suspense / Drama", 18.90, 29.90, "4.5", "Competicao mortal, critica social e suspense do inicio ao fim.", "https://images.unsplash.com/photo-1559583109-3e7968136c99?auto=format&fit=crop&w=900&q=80", "Popular"),
    item(31, "Spider-Man: Brand New Day", "filme", "Filmes", "Cinema", "Heroi / Acao", 0, 0, "Novo", "Peter Parker volta aos cinemas em uma nova fase do personagem.", "https://images.unsplash.com/photo-1608889825271-9696288ab804?auto=format&fit=crop&w=900&q=80", "Lanca em 2026"),
    item(32, "Avengers: Doomsday", "filme", "Filmes", "Cinema", "Heroi / Evento", 0, 0, "Novo", "Novo grande evento da Marvel Studios para fechar o ano nos cinemas.", "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=900&q=80", "Lanca em 2026"),
    item(33, "Avatar: The Last Airbender - Temporada 2", "serie", "Series", "Streaming", "Fantasia / Aventura", 0, 0, "Novo", "A jornada de Aang continua na segunda temporada live-action.", "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80", "Lanca em 2026"),
    item(34, "Enola Holmes 3", "filme", "Filmes", "Streaming", "Misterio / Aventura", 0, 0, "Novo", "Nova aventura da investigadora Enola no catalogo 2026 da Netflix.", "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80", "Lanca em 2026"),
    item(35, "ONE PIECE - Temporada 2", "serie", "Series", "Streaming", "Aventura / Fantasia", 0, 0, "Novo", "A tripulacao segue para novos mares na proxima temporada live-action.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", "Lanca em 2026"),
    item(36, "Peaky Blinders: The Immortal Man", "filme", "Filmes", "Streaming", "Crime / Drama", 0, 0, "Novo", "O universo de Peaky Blinders retorna em formato de filme.", "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80", "Lanca em 2026"),
    item(37, "Grand Theft Auto VI", "jogo", "Jogos", "Xbox, PS5", "Mundo aberto / Acao", 0, 0, "Novo", "Vice City volta em um dos lancamentos mais aguardados dos games.", "https://videos-rockstargames-com.akamaized.net/screencaps/6663/_global/1920.jpg", "Em breve"),
    item(38, "Marvel's Wolverine", "jogo", "Jogos", "PS5", "Acao / Heroi", 0, 0, "Novo", "Aventura solo do Wolverine criada pela Insomniac Games para PS5.", "https://gmedia.playstation.com/is/image/SIEPDC/marvels-wolverine-keyart-01-en-23sep25?$1200px$", "Em breve"),
    item(39, "Fable", "jogo", "Jogos", "PC, Xbox", "RPG / Fantasia", 0, 0, "Novo", "RPG de fantasia em mundo aberto, com Xbox Play Anywhere e Game Pass.", "https://store-images.s-microsoft.com/image/apps.21506.13716895554838136.7c6ab09f-3104-4114-90b4-c4333f587e9f.a2ac573c-0871-4b4a-8cf4-57f32614b331", "Em breve"),
    item(40, "Gears of War: E-Day", "jogo", "Jogos", "PC, Xbox", "Acao / Tiro", 0, 0, "Novo", "Prequel da franquia Gears mostrando o impacto do Emergence Day.", "https://store-images.s-microsoft.com/image/apps.12537.14158060132155019.a448debb-1c8e-47ac-b6aa-f9f0a964e316.82b60fd4-87c7-466a-995e-730b0d4551c7", "Em breve")
];

const expandedCatalog = buildExpandedCatalog(fallbackCatalog);

const releaseInfoById = {
    31: {
        date: "31/07/2026",
        label: "Cinema",
        source: "Marvel",
        url: "https://www.marvel.com/articles/movies/spider-man-brand-new-day-full-official-trailer-july-2026"
    },
    32: {
        date: "18/12/2026",
        label: "Cinema",
        source: "Marvel",
        url: "https://www.marvel.com/movies/avengers-doomsday"
    },
    33: {
        date: "25/06/2026",
        label: "Netflix",
        source: "Rotten Tomatoes",
        url: "https://editorial.rottentomatoes.com/article/tv-premiere-dates-2026/"
    },
    34: {
        date: "2026",
        label: "Netflix",
        source: "Netflix",
        url: "https://about.netflix.com/news/what-next-netflix-reveals-series-films-and-games-coming-in-2026"
    },
    35: {
        date: "2026",
        label: "Netflix",
        source: "Netflix",
        url: "https://about.netflix.com/news/what-next-netflix-reveals-series-films-and-games-coming-in-2026"
    },
    36: {
        date: "2026",
        label: "Netflix",
        source: "Netflix",
        url: "https://about.netflix.com/news/what-next-netflix-reveals-series-films-and-games-coming-in-2026"
    },
    37: {
        date: "19/11/2026",
        label: "PS5 e Xbox Series X|S",
        source: "Rockstar Games",
        url: "https://www.rockstargames.com/VI"
    },
    38: {
        date: "15/09/2026",
        label: "PS5",
        source: "PlayStation",
        url: "https://www.playstation.com/en-us/games/marvels-wolverine/"
    },
    39: {
        date: "Outono de 2026",
        label: "PC, Xbox e Game Pass",
        source: "Xbox",
        url: "https://www.xbox.com/en-US/games/fable"
    },
    40: {
        date: "2026",
        label: "PC e Xbox",
        source: "Xbox",
        url: "https://www.xbox.com/en-US/games/gears-of-war-e-day"
    }
};

const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

async function loadCatalog() {
    try {
        const response = await fetch("/api/media/catalogo");
        if (!response.ok) {
            throw new Error("Catalogo indisponivel");
        }
        const apiCatalog = await response.json();
        catalog = apiCatalog.length >= expandedCatalog.length ? apiCatalog : expandedCatalog;
    } catch (error) {
        catalog = expandedCatalog;
    }

    populateGenreFilter();
    renderCatalog();
}

function populateGenreFilter() {
    const genres = [...new Set(catalog.flatMap((catalogItem) => accentText(catalogItem.genero).split("/").map((genre) => genre.trim())))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, "pt-BR"));

    genreFilter.innerHTML = '<option value="todos">Todos</option>' + genres.map((genre) => `<option value="${genre}">${genre}</option>`).join("");
}

function renderCatalog() {
    const query = searchInput.value.trim().toLowerCase();
    const platform = platformFilter.value;
    const selectedGenre = genreFilter.value;

    let items = catalog.filter((catalogItem) => {
        const releaseInfo = getReleaseInfo(catalogItem);
        const matchesType = currentType === "todos" || catalogItem.tipo === currentType;
        const matchesPlatform = platform === "todos" || catalogItem.plataforma.includes(platform);
        const matchesGenre = selectedGenre === "todos" || accentText(catalogItem.genero).includes(selectedGenre);
        const matchesRelease = releaseFilter.value === "todos" || Boolean(releaseInfo);
        const matchesDeals = !dealsOnly || isGameType(catalogItem) && getDiscount(catalogItem) > 0;
        const haystack = `${catalogItem.titulo} ${catalogItem.genero} ${catalogItem.categoria} ${catalogItem.plataforma}`.toLowerCase();
        return matchesType && matchesPlatform && matchesGenre && matchesRelease && matchesDeals && haystack.includes(query);
    });

    if (sortFilter.value === "menor-preco") {
        items = [...items].sort((a, b) => getSortablePrice(a) - getSortablePrice(b));
    }

    if (sortFilter.value === "maior-nota") {
        items = [...items].sort((a, b) => Number(b.nota) - Number(a.nota));
    }

    if (sortFilter.value === "maior-desconto") {
        items = [...items].sort((a, b) => getDiscount(b) - getDiscount(a));
    }

    updateStats(items);
    renderRadar(items);

    if (items.length === 0) {
        grid.innerHTML = '<div class="empty">Nada encontrado com esses filtros.</div>';
        return;
    }

    const visibleItems = items.slice(0, visibleCount);
    grid.innerHTML = visibleItems.map(createCard).join("");
    loadMoreButton.hidden = visibleItems.length >= items.length;
    document.querySelectorAll(".favorite").forEach((button) => {
        button.addEventListener("click", () => toggleFavorite(Number(button.dataset.id)));
    });
    document.querySelectorAll(".platform-option").forEach((button) => {
        button.addEventListener("click", () => selectPlatform(button.dataset.platform));
    });
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", (event) => {
            if (event.target.closest("button, a")) {
                return;
            }
            openDetail(Number(card.dataset.id));
        });
    });
}

function createCard(catalogItem) {
    const platforms = catalogItem.plataforma.split(",").map((platform) => platform.trim()).filter(Boolean);
    const favorite = favorites.has(Number(catalogItem.id));
    const offers = createOffers(catalogItem);
    const release = createReleaseBox(catalogItem);
    const platformButtons = createPlatformButtons(catalogItem, platforms);
    const category = accentText(catalogItem.categoria);
    const genre = accentText(catalogItem.genero);
    const description = accentText(catalogItem.descricao);
    const store = accentText(catalogItem.loja);
    const badge = accentText(catalogItem.destaque);

    return `
        <article class="card" data-id="${catalogItem.id}">
            <div class="cover" data-title="${catalogItem.titulo}">
                <img class="cover-img" src="${catalogItem.imagemUrl}" alt="${catalogItem.titulo}" loading="lazy" onerror="this.remove()">
                ${getDiscount(catalogItem) > 0 ? `<span class="discount">-${getDiscount(catalogItem)}%</span>` : ""}
                <button class="favorite ${favorite ? "active" : ""}" data-id="${catalogItem.id}" aria-label="Favoritar ${catalogItem.titulo}">${favorite ? "OK" : "+"}</button>
                <span class="badge">${badge}</span>
            </div>
            <div class="card-body">
                <span class="card-type">${category} | ${genre}</span>
                <h3>${catalogItem.titulo}</h3>
                <div class="card-meta">${accentText(catalogItem.plataforma)}</div>
                <div class="pill-row">${platformButtons}</div>
                ${offers}
                <p>${description}</p>
                <div class="info-line">${createInfoLine(catalogItem)}</div>
                <div class="store-line">${store} | atualizado em ${formatDate(catalogItem.atualizadoEm)}</div>
                ${release}
                ${createWatchBox(catalogItem)}
                ${createPriceRow(catalogItem)}
            </div>
        </article>
    `;
}

function createInfoLine(catalogItem) {
    if (isGameType(catalogItem)) {
        return "Ficha: plataformas, ofertas por loja e melhor valor do dia.";
    }

    if (catalogItem.tipo === "manga") {
        return "Ficha: formato, gênero, nota e preço de referência.";
    }

    return "Ficha: gênero, disponibilidade e serviços para pesquisar onde assistir.";
}

function renderRadar(items) {
    const source = items.length ? items : catalog;
    const topItems = [...source]
        .sort((a, b) => Number(b.nota) - Number(a.nota))
        .slice(0, 5);
    const dealItem = [...source]
        .filter((catalogItem) => isGameType(catalogItem) && getDiscount(catalogItem) > 0)
        .sort((a, b) => getDiscount(b) - getDiscount(a))[0];
    const releaseItem = source.find((catalogItem) => getReleaseInfo(catalogItem));
    const watchItem = source.find((catalogItem) => catalogItem.tipo === "filme" || catalogItem.tipo === "serie");

    const news = [
        dealItem ? {
            title: "Promoção em destaque",
            body: `${dealItem.titulo} aparece com até ${getDiscount(dealItem)}% de desconto.`
        } : null,
        releaseItem ? {
            title: "No radar de lançamentos",
            body: `${releaseItem.titulo} tem previsão marcada no guia.`
        } : null,
        watchItem ? {
            title: "Onde assistir",
            body: `${watchItem.titulo} já mostra serviços para pesquisar disponibilidade.`
        } : null
    ].filter(Boolean);

    newsList.innerHTML = news.map((entry) => `
        <div class="news-item">
            <strong>${entry.title}</strong>
            <span>${entry.body}</span>
        </div>
    `).join("");

    rankingList.innerHTML = topItems.map((catalogItem, index) => `
        <button class="ranking-item" type="button" data-id="${catalogItem.id}">
            <strong>${index + 1}</strong>
            <span>${catalogItem.titulo}</span>
            <em>${catalogItem.nota}</em>
        </button>
    `).join("");

    rankingList.querySelectorAll(".ranking-item").forEach((button) => {
        button.addEventListener("click", () => openDetail(Number(button.dataset.id)));
    });
}

function openDetail(id) {
    const catalogItem = catalog.find((entry) => Number(entry.id) === id);
    if (!catalogItem) {
        return;
    }

    const favorite = favorites.has(Number(catalogItem.id));
    const release = getReleaseInfo(catalogItem);
    const offers = getOffersForItem(catalogItem).slice(0, 4);
    const watchServices = getWatchServices(catalogItem);

    detailCard.innerHTML = `
        <button class="detail-close" type="button" aria-label="Fechar detalhes">Fechar</button>
        <div class="detail-cover">
            <img src="${catalogItem.imagemUrl}" alt="${catalogItem.titulo}" onerror="this.remove()">
        </div>
        <div class="detail-content">
            <span class="card-type">${accentText(catalogItem.categoria)} | ${accentText(catalogItem.genero)}</span>
            <h2>${catalogItem.titulo}</h2>
            <p>${accentText(catalogItem.descricao)}</p>
            <div class="detail-facts">
                <span>Nota ${catalogItem.nota}</span>
                <span>${accentText(catalogItem.plataforma)}</span>
                <span>${createInfoLine(catalogItem)}</span>
                <span>Atualizado em ${formatDate(catalogItem.atualizadoEm)}</span>
            </div>
            ${release ? `<div class="release-box"><strong>Lançamento ${release.date}</strong><span>${release.label} | ${release.source}</span><a class="release-link" href="${release.url}" target="_blank" rel="noopener noreferrer">Ver fonte</a></div>` : ""}
            ${offers.length ? `<div class="offers-box"><div class="offers-title"><span>Onde comprar</span><span>melhores preços</span></div>${offers.map((offer) => `<div class="offer-row"><div class="offer-store"><strong>${offer.store}</strong><span class="offer-date">${offer.platform}</span></div><span class="offer-price">${currency.format(offer.price)}</span></div>`).join("")}</div>` : ""}
            ${(catalogItem.tipo === "filme" || catalogItem.tipo === "serie") ? `<div class="watch-box"><div class="offers-title"><span>Onde assistir</span><span>pesquisa segura</span></div><div class="watch-list">${watchServices.map((service) => `<a class="watch-service" href="${service.url}" target="_blank" rel="noopener noreferrer"><strong>${service.name}</strong><span>${service.mode}</span></a>`).join("")}</div></div>` : ""}
            <div class="related-box">
                <strong>Relacionados</strong>
                <div>${createRelatedLinks(catalogItem)}</div>
            </div>
            <button class="primary-action detail-like" type="button">${favorite ? "Remover curtida" : "Curtir"}</button>
        </div>
    `;

    detailPanel.hidden = false;
    detailCard.querySelector(".detail-close").addEventListener("click", () => detailPanel.hidden = true);
    detailCard.querySelector(".detail-like").addEventListener("click", () => {
        toggleFavorite(Number(catalogItem.id));
        openDetail(Number(catalogItem.id));
    });
    detailCard.querySelectorAll(".related-chip").forEach((button) => {
        button.addEventListener("click", () => openDetail(Number(button.dataset.id)));
    });
}

function createRelatedLinks(catalogItem) {
    return catalog
        .filter((entry) => entry.id !== catalogItem.id && (entry.tipo === catalogItem.tipo || entry.genero === catalogItem.genero))
        .slice(0, 4)
        .map((entry) => `<button class="related-chip" type="button" data-id="${entry.id}">${entry.titulo}</button>`)
        .join("");
}

function createPlatformButtons(catalogItem, platforms) {
    if (!isGameType(catalogItem)) {
        return platforms.map((platform) => `<span class="pill">${accentText(platform)}</span>`).join("");
    }

    return platforms.map((platform) => {
        const active = platformFilter.value === platform ? " active" : "";
        return `<button class="pill platform-option${active}" type="button" data-platform="${platform}">${platform}</button>`;
    }).join("");
}

function createPriceRow(catalogItem) {
    if (catalogItem.tipo === "filme" || catalogItem.tipo === "serie") {
        return "";
    }

    const price = Number(catalogItem.preco);
    const original = Number(catalogItem.precoOriginal);

    if (!price) {
        return `
            <div class="price-row">
                <div>
                    <div class="price">Aguardando preço</div>
                    <div class="old-price">Lançamento futuro</div>
                </div>
                <div class="score">Nota ${catalogItem.nota}</div>
            </div>
        `;
    }

    return `
        <div class="price-row">
            <div>
                <div class="price">${currency.format(price)}</div>
                <div class="old-price">${original ? currency.format(original) : ""}</div>
            </div>
            <div class="score">Nota ${catalogItem.nota}</div>
        </div>
    `;
}

function createWatchBox(catalogItem) {
    if (catalogItem.tipo !== "filme" && catalogItem.tipo !== "serie") {
        return "";
    }

    const services = getWatchServices(catalogItem);

    return `
        <div class="watch-box">
            <div class="offers-title">
                <span>Onde assistir</span>
                <span>${catalogItem.tipo === "filme" ? "filme" : "série"}</span>
            </div>
            <div class="watch-list">
                ${services.map((service) => `
                    <a class="watch-service" href="${service.url}" target="_blank" rel="noopener noreferrer">
                        <strong>${service.name}</strong>
                        <span>${service.mode}</span>
                    </a>
                `).join("")}
            </div>
        </div>
    `;
}

function createReleaseBox(catalogItem) {
    const releaseInfo = getReleaseInfo(catalogItem);
    if (!releaseInfo) {
        return "";
    }

    return `
        <div class="release-box">
            <strong>Lançamento ${releaseInfo.date}</strong>
            <span>${releaseInfo.label} | atualizado por ${releaseInfo.source}</span>
            <a class="release-link" href="${releaseInfo.url}" target="_blank" rel="noopener noreferrer">Ver fonte</a>
        </div>
    `;
}

function createOffers(catalogItem) {
    const selectedPlatform = platformFilter.value;
    const offers = getOffersForItem(catalogItem)
        .filter((offer) => selectedPlatform === "todos" || offer.platform === selectedPlatform)
        .slice(0, selectedPlatform === "todos" ? 2 : 3);

    if (offers.length === 0) {
        return "";
    }

    const bestOffer = offers[0];
    const platformLabel = selectedPlatform === "todos" ? "melhores lojas" : `preço em ${selectedPlatform}`;

    return `
        <div class="offers-box">
            <div class="offers-title">
                <span>${dealsOnly ? "Promoção de hoje" : "Onde comprar"}</span>
                <span>${platformLabel}</span>
            </div>
            <div class="best-offer">
                <span>Melhor valor</span>
                <strong>${currency.format(bestOffer.price)}</strong>
            </div>
            ${offers.map((offer) => `
                <div class="offer-row">
                    <div class="offer-store">
                        <strong>${offer.store}</strong>
                        <span class="offer-date">${offer.platform} | preço atualizado hoje</span>
                    </div>
                    <span class="offer-price">${currency.format(offer.price)}</span>
                </div>
            `).join("")}
        </div>
    `;
}

function updateStats(items) {
    const largestDiscount = items.reduce((max, catalogItem) => Math.max(max, getDiscount(catalogItem)), 0);
    const types = new Set(catalog.map((catalogItem) => catalogItem.tipo));

    totalItems.textContent = items.length;
    bestDeal.textContent = `${largestDiscount}%`;
    favoriteCount.textContent = favorites.size;
    categoryCount.textContent = types.size;
    resultLabel.textContent = dealsOnly
        ? `${items.length} jogo${items.length === 1 ? "" : "s"} em promoção hoje`
        : `${items.length} resultado${items.length === 1 ? "" : "s"} na vitrine`;
}

function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }

    localStorage.setItem("mediaflow:favorites", JSON.stringify([...favorites]));
    if (profile && !likedPanel.hidden) {
        renderLikedList();
    }
    renderCatalog();
}

function getDiscount(catalogItem) {
    const original = Number(catalogItem.precoOriginal);
    const current = Number(catalogItem.preco);
    if (!original || original <= current) {
        return 0;
    }
    return Math.round(((original - current) / original) * 100);
}

function getBestPrice(catalogItem) {
    const offers = getOffersForItem(catalogItem)
        .filter((offer) => platformFilter.value === "todos" || offer.platform === platformFilter.value);

    if (offers.length === 0) {
        return Number(catalogItem.preco);
    }

    return Math.min(...offers.map((offer) => offer.price));
}

function getSortablePrice(catalogItem) {
    if (catalogItem.tipo === "filme" || catalogItem.tipo === "serie") {
        return Number.MAX_SAFE_INTEGER;
    }

    return getBestPrice(catalogItem);
}

function getReleaseInfo(catalogItem) {
    return releaseInfoById[Number(catalogItem.id)] || null;
}

function item(id, titulo, tipo, categoria, plataforma, genero, preco, precoOriginal, nota, descricao, imagemUrl, destaque) {
    const image = getSpecificImage(titulo, imagemUrl);

    return {
        id,
        titulo,
        tipo,
        categoria,
        plataforma,
        genero,
        preco,
        precoOriginal,
        loja: "Catalogo MediaFlow",
        nota,
        descricao,
        imagemUrl: image,
        destaque,
        atualizadoEm: today()
    };
}

function accentText(value) {
    if (!value) {
        return "";
    }

    const replacements = [
        ["Mangas", "Mangás"],
        ["Series", "Séries"],
        ["Catalogo", "Catálogo"],
        ["catalogo", "catálogo"],
        ["Acao", "Ação"],
        ["acao", "ação"],
        ["Fisico", "Físico"],
        ["Ficcao", "Ficção"],
        ["cientifica", "científica"],
        ["historico", "histórico"],
        ["biografico", "biográfico"],
        ["ciencia", "ciência"],
        ["Heroi", "Herói"],
        ["Misterio", "Mistério"],
        ["sobrevivencia", "sobrevivência"],
        ["expansao", "expansão"],
        ["cinematografica", "cinematográfica"],
        ["exploracao", "exploração"],
        ["memoraveis", "memoráveis"],
        ["rapida", "rápida"],
        ["historia", "história"],
        ["nivel", "nível"],
        ["classica", "clássica"],
        ["Construcao", "Construção"],
        ["Cacadores", "Caçadores"],
        ["evolucao", "evolução"],
        ["Maldicoes", "Maldições"],
        ["misterios", "mistérios"],
        ["politicos", "políticos"],
        ["acido", "ácido"],
        ["imprevisiveis", "imprevisíveis"],
        ["demonios", "demônios"],
        ["familia", "família"],
        ["emocao", "emoção"],
        ["Edicao", "Edição"],
        ["consequencias", "consequências"],
        ["eletrico", "elétrico"],
        ["alienigena", "alienígena"],
        ["Classico", "Clássico"],
        ["Avioes", "Aviões"],
        ["praticas", "práticas"],
        ["Adaptacao", "Adaptação"],
        ["tensao", "tensão"],
        ["impossivel", "impossível"],
        ["Super-herois", "Super-heróis"],
        ["critica", "crítica"],
        ["dragoes", "dragões"],
        ["galaxia", "galáxia"],
        ["capitulos", "capítulos"],
        ["Competicao", "Competição"],
        ["inicio", "início"],
        ["tripulacao", "tripulação"],
        ["proxima", "próxima"],
        ["lancamentos", "lançamentos"],
        ["lancamento", "lançamento"],
        ["Lanca", "Lança"],
        ["preco", "preço"]
    ];

    return replacements.reduce((text, [from, to]) => text.replaceAll(from, to), value);
}

function getSpecificImage(title, fallback) {
    const images = {
        "Cyberpunk 2077: Ultimate Edition": "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
        "Elden Ring": "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
        "Forza Horizon 5": "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg",
        "Spider-Man 2": "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-2-keyart-01-en-19may23?$1200px$",
        "God of War Ragnarok": "https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg",
        "Halo Infinite": "https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg",
        "EA Sports FC 26": "https://cdn.akamai.steamstatic.com/steam/apps/2669320/header.jpg",
        "Hogwarts Legacy": "https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg",
        "Resident Evil 4 Remake": "https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg",
        "Minecraft Deluxe": "https://store-images.s-microsoft.com/image/apps.608.13510798887586243.5c7792f0-b887-4250-8c4e-4617af9c4509.1350f4d8-4cae-4e9d-a8d4-c4d11f5313e7",
        "Grand Theft Auto VI": "https://videos-rockstargames-com.akamaized.net/screencaps/6663/_global/1920.jpg",
        "Marvel's Wolverine": "https://gmedia.playstation.com/is/image/SIEPDC/marvels-wolverine-keyart-01-en-23sep25?$1200px$",
        "Fable": "https://store-images.s-microsoft.com/image/apps.21506.13716895554838136.7c6ab09f-3104-4114-90b4-c4333f587e9f.a2ac573c-0871-4b4a-8cf4-57f32614b331",
        "Gears of War: E-Day": "https://store-images.s-microsoft.com/image/apps.12537.14158060132155019.a448debb-1c8e-47ac-b6aa-f9f0a964e316.82b60fd4-87c7-466a-995e-730b0d4551c7",
        "Solo Leveling": "https://upload.wikimedia.org/wikipedia/en/0/06/Solo_Leveling_Volume_1_Cover.jpg",
        "Jujutsu Kaisen": "https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg",
        "One Piece": "https://upload.wikimedia.org/wikipedia/en/2/2c/OnePiece61Cover.png",
        "Attack on Titan": "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg",
        "Chainsaw Man": "https://upload.wikimedia.org/wikipedia/en/2/24/Chainsawman.jpg",
        "Demon Slayer": "https://upload.wikimedia.org/wikipedia/en/0/0b/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg",
        "Berserk Deluxe": "https://upload.wikimedia.org/wikipedia/en/4/4a/Berserk_vol01.png",
        "Blue Lock": "https://upload.wikimedia.org/wikipedia/en/1/17/Blue_Lock_volume_1.png"
    };

    return images[title] || fallback;
}

function getOffersForItem(catalogItem) {
    if (!isGameType(catalogItem)) {
        return [];
    }

    const base = Number(catalogItem.preco);
    const platforms = catalogItem.plataforma.split(",").map((platform) => platform.trim());
    const offers = [];

    if (platforms.includes("PC")) {
        offers.push(
            offer("PC", "Steam", base),
            offer("PC", "Epic Games", base * 0.96),
            offer("PC", "Nuuvem", base * 0.92)
        );
    }

    if (platforms.includes("Xbox")) {
        offers.push(
            offer("Xbox", "Microsoft Store", base * 1.02),
            offer("Xbox", "Game Pass / Loja Xbox", base * 0.88),
            offer("Xbox", "Amazon Brasil", base * 0.95)
        );
    }

    if (platforms.includes("PS5")) {
        offers.push(
            offer("PS5", "PlayStation Store", base * 1.05),
            offer("PS5", "Amazon Brasil", base * 0.98),
            offer("PS5", "Magazine Luiza", base * 0.94)
        );
    }

    return offers.sort((a, b) => a.price - b.price);
}

function getWatchServices(catalogItem) {
    const serviceSets = [
        [
            { name: "Netflix", mode: "Streaming" },
            { name: "Prime Video", mode: "Aluguel/streaming" }
        ],
        [
            { name: "Max (HBO)", mode: "Streaming" },
            { name: "Apple TV", mode: "Compra/aluguel" }
        ],
        [
            { name: "Disney+", mode: "Streaming" },
            { name: "Star+", mode: "Streaming" }
        ],
        [
            { name: "Crunchyroll", mode: "Anime/streaming" },
            { name: "Netflix", mode: "Streaming" }
        ],
        [
            { name: "Globoplay", mode: "Streaming" },
            { name: "YouTube Filmes", mode: "Aluguel/compra" }
        ]
    ];
    const selected = serviceSets[Number(catalogItem.id) % serviceSets.length];

    return selected.map((service) => ({
        ...service,
        url: makeWatchSearchUrl(catalogItem.titulo, service.name)
    }));
}

function makeWatchSearchUrl(title, serviceName) {
    const query = `${title} ${serviceName} onde assistir`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function isGameType(catalogItem) {
    return catalogItem.tipo === "jogo" || catalogItem.tipo === "retro";
}

function buildExpandedCatalog(baseCatalog) {
    const wantedPerType = 300;
    const expanded = [...baseCatalog];
    const existingTitles = new Set(expanded.map((entry) => entry.titulo));
    const seedGroups = [
        {
            tipo: "jogo",
            categoria: "Jogos",
            plataforma: "PC, Xbox, PS5",
            genero: "Ação / Aventura",
            titles: [
                "Baldur's Gate 3", "Starfield", "Alan Wake 2", "Diablo IV", "Street Fighter 6",
                "Mortal Kombat 1", "Tekken 8", "Dragon's Dogma 2", "Final Fantasy XVI", "Final Fantasy VII Rebirth",
                "Black Myth: Wukong", "Lies of P", "Sea of Thieves", "Palworld", "Helldivers 2",
                "Call of Duty: Black Ops 6", "Assassin's Creed Mirage", "Assassin's Creed Shadows", "Star Wars Jedi: Survivor", "Dead Space Remake",
                "The Witcher 3", "Red Dead Redemption 2", "GTA V", "No Man's Sky", "Stardew Valley",
                "Terraria", "Hades II", "Hollow Knight: Silksong", "Control Ultimate Edition", "Death Stranding",
                "Doom Eternal", "Atomic Heart", "Monster Hunter Wilds", "Monster Hunter Rise", "Persona 3 Reload",
                "Persona 5 Royal", "Yakuza: Like a Dragon", "Like a Dragon: Infinite Wealth", "Metaphor: ReFantazio", "Sifu",
                "Cuphead", "Ori and the Will of the Wisps", "It Takes Two", "A Way Out", "Overwatch 2",
                "Fortnite", "Apex Legends", "Valorant", "Rocket League", "Fall Guys",
                "The Crew Motorfest", "Gran Turismo 7", "Need for Speed Unbound", "F1 25", "NBA 2K26",
                "WWE 2K25", "UFC 5", "The Sims 4", "Cities: Skylines II", "Planet Coaster 2"
            ]
        },
        {
            tipo: "retro",
            categoria: "Game Retrô",
            plataforma: "PC, Xbox, PS5",
            genero: "Clássico / Retrô",
            titles: [
                "Super Mario Bros.", "Super Mario World", "Sonic the Hedgehog", "Sonic 2", "The Legend of Zelda",
                "A Link to the Past", "Ocarina of Time", "Mega Man 2", "Mega Man X", "Castlevania",
                "Castlevania: Symphony of the Night", "Contra", "Street Fighter II", "Mortal Kombat II", "Final Fight",
                "Double Dragon", "Golden Axe", "Streets of Rage 2", "Metal Slug", "Pac-Man",
                "Ms. Pac-Man", "Galaga", "Donkey Kong", "Tetris", "Bomberman",
                "Chrono Trigger", "Final Fantasy VI", "Dragon Quest V", "Secret of Mana", "EarthBound",
                "Super Metroid", "Metroid", "Kirby's Adventure", "Star Fox", "F-Zero",
                "Pilotwings", "Punch-Out!!", "DuckTales", "Aladdin", "The Lion King",
                "Crash Bandicoot", "Crash Team Racing", "Spyro the Dragon", "Tony Hawk's Pro Skater 2", "Resident Evil",
                "Silent Hill", "Tomb Raider", "Dino Crisis", "Tekken 3", "Ridge Racer",
                "Crazy Taxi", "Shenmue", "Virtua Fighter 2", "Phantasy Star IV", "Alex Kidd",
                "R-Type", "OutRun", "After Burner", "Ninja Gaiden", "Prince of Persia"
            ]
        },
        {
            tipo: "manga",
            categoria: "Mangás",
            plataforma: "Físico / Digital",
            genero: "Ação / Fantasia",
            titles: [
                "Naruto", "Dragon Ball", "Dragon Ball Super", "Bleach", "Hunter x Hunter",
                "My Hero Academia", "Black Clover", "Tokyo Ghoul", "Tokyo Revengers", "Vinland Saga",
                "Vagabond", "Kingdom", "20th Century Boys", "Monster", "Pluto",
                "Death Note", "Fullmetal Alchemist", "Haikyu!!", "Slam Dunk", "Kuroko no Basket",
                "JoJo's Bizarre Adventure", "Spy x Family", "Kaiju No. 8", "Dandadan", "Frieren",
                "Made in Abyss", "Mob Psycho 100", "One Punch Man", "Dr. Stone", "The Promised Neverland",
                "Claymore", "Soul Eater", "Fairy Tail", "Gintama", "Hellsing",
                "Akira", "Ghost in the Shell", "Nana", "Fruits Basket", "Ouran High School Host Club",
                "Kaguya-sama: Love is War", "Horimiya", "Komi Can't Communicate", "Oshi no Ko", "Sailor Moon",
                "Cardcaptor Sakura", "Yu Yu Hakusho", "Rurouni Kenshin", "Inuyasha", "Ranma 1/2",
                "Initial D", "Baki", "Record of Ragnarok", "Fire Force", "Ajin",
                "Dororo", "Parasyte", "Noragami", "Magi", "Black Lagoon"
            ]
        },
        {
            tipo: "filme",
            categoria: "Filmes",
            plataforma: "Streaming / Compra",
            genero: "Ação / Drama",
            titles: [
                "Matrix", "Matrix Reloaded", "Mad Max: Fury Road", "Blade Runner 2049", "Inception",
                "Tenet", "The Batman", "Batman: O Cavaleiro das Trevas", "Coringa", "Logan",
                "Deadpool", "Deadpool & Wolverine", "Guardiões da Galáxia", "Vingadores: Ultimato", "Homem-Aranha no Aranhaverso",
                "Homem-Aranha: Através do Aranhaverso", "Jurassic Park", "Jurassic World", "Transformers", "Bumblebee",
                "Missão Impossível: Efeito Fallout", "Missão Impossível: Acerto de Contas", "007: Cassino Royale", "Gladiador", "Gladiador II",
                "O Senhor dos Anéis: A Sociedade do Anel", "O Senhor dos Anéis: As Duas Torres", "O Senhor dos Anéis: O Retorno do Rei", "O Hobbit", "Harry Potter e a Pedra Filosofal",
                "Harry Potter e as Relíquias da Morte", "Star Wars: Uma Nova Esperança", "Star Wars: O Império Contra-Ataca", "Star Wars: O Despertar da Força", "Rogue One",
                "Alien", "Aliens", "Predador", "O Exterminador do Futuro 2", "De Volta para o Futuro",
                "Os Caça-Fantasmas", "Top Gun", "Rocky", "Creed", "Clube da Luta",
                "Seven", "A Origem dos Guardiões", "Toy Story", "Shrek", "Como Treinar o seu Dragão",
                "Divertida Mente", "Divertida Mente 2", "Coco", "Wall-E", "Up",
                "A Viagem de Chihiro", "Princesa Mononoke", "O Menino e a Garça", "Your Name", "Suzume"
            ]
        },
        {
            tipo: "serie",
            categoria: "Séries",
            plataforma: "Streaming",
            genero: "Drama / Aventura",
            titles: [
                "Breaking Bad", "Better Call Saul", "Game of Thrones", "Westworld", "The Witcher",
                "Arcane", "Cyberpunk: Edgerunners", "Castlevania", "Castlevania: Nocturne", "Fallout",
                "Halo", "The Walking Dead", "Fear the Walking Dead", "Lost", "Prison Break",
                "Dark", "Black Mirror", "Love, Death & Robots", "The Umbrella Academy", "Wednesday",
                "Sandman", "Loki", "WandaVision", "Cavaleiro da Lua", "Demolidor",
                "Jessica Jones", "The Punisher", "Invincible", "Gen V", "Doom Patrol",
                "Titans", "Supernatural", "The Flash", "Arrow", "Smallville",
                "Sherlock", "Doctor Who", "The Expanse", "Battlestar Galactica", "Star Trek: Strange New Worlds",
                "Andor", "Ahsoka", "Obi-Wan Kenobi", "The Book of Boba Fett", "Severance",
                "Silo", "Foundation", "See", "The Bear", "Succession",
                "Dexter", "True Detective", "Fargo", "Mr. Robot", "Peaky Blinders",
                "Vikings", "The Last Kingdom", "Narcos", "La Casa de Papel", "Alice in Borderland"
            ]
        }
    ];

    seedGroups.forEach((group) => {
        let count = expanded.filter((entry) => entry.tipo === group.tipo).length;
        let cursor = 0;

        while (count < wantedPerType) {
            const baseTitle = group.titles[cursor % group.titles.length];
            const edition = Math.floor(cursor / group.titles.length);
            const title = edition === 0 ? baseTitle : `${baseTitle} - Edição ${edition + 1}`;

            if (!existingTitles.has(title)) {
                expanded.push(makeGeneratedItem(expanded.length + 1, group, title, count));
                existingTitles.add(title);
                count += 1;
            }

            cursor += 1;
        }
    });

    return expanded;
}

function makeGeneratedItem(id, group, title, index) {
    const price = group.tipo === "manga"
        ? 24.90 + (index % 12) * 3
        : group.tipo === "filme" || group.tipo === "serie"
            ? 14.90 + (index % 10) * 2
            : 59.90 + (index % 14) * 10;
    const original = price + 20 + (index % 5) * 10;
    const note = (4.2 + (index % 8) / 10).toFixed(1);
    const descriptionByType = {
        jogo: "Jogo selecionado para ampliar a vitrine com opções novas e populares.",
        retro: "Clássico retrô para quem curte nostalgia, desafio e história dos games.",
        manga: "Mangá selecionado para deixar a prateleira maior e com mais variedade.",
        filme: "Filme selecionado para ampliar as opções de ação, drama, aventura e animação.",
        serie: "Série selecionada para maratonas, descobertas e listas de favoritos."
    };

    return item(
        id,
        title,
        group.tipo,
        group.categoria,
        group.plataforma,
        group.genero,
        Number(price.toFixed(2)),
        Number(original.toFixed(2)),
        note,
        descriptionByType[group.tipo],
        makeCoverImage(title, group.categoria, group.tipo, index),
        group.tipo === "retro" ? "Retrô" : "Catálogo"
    );
}

function makeCoverImage(title, category, type, index) {
    const palettes = {
        jogo: ["#0f766e", "#111827", "#facc15"],
        retro: ["#7c2d12", "#111827", "#fb923c"],
        manga: ["#be123c", "#111827", "#f9a8d4"],
        filme: ["#1d4ed8", "#111827", "#93c5fd"],
        serie: ["#6d28d9", "#111827", "#c4b5fd"]
    };
    const [primary, dark, accent] = palettes[type] || palettes.jogo;
    const safeTitle = escapeSvg(title);
    const safeCategory = escapeSvg(category);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="900" height="506" viewBox="0 0 900 506">
            <defs>
                <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="${primary}"/>
                    <stop offset="1" stop-color="${dark}"/>
                </linearGradient>
            </defs>
            <rect width="900" height="506" fill="url(#g)"/>
            <circle cx="${120 + (index % 5) * 130}" cy="100" r="130" fill="${accent}" opacity=".18"/>
            <rect x="54" y="54" width="792" height="398" rx="28" fill="#000" opacity=".22"/>
            <text x="76" y="118" fill="${accent}" font-family="Arial, sans-serif" font-size="32" font-weight="800">${safeCategory}</text>
            <text x="76" y="260" fill="#fff" font-family="Arial, sans-serif" font-size="58" font-weight="900">${safeTitle}</text>
            <text x="76" y="330" fill="#dbeafe" font-family="Arial, sans-serif" font-size="26">MediaFlow Collection</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvg(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function offer(platform, store, price) {
    return {
        platform,
        store,
        price: Number(price.toFixed(2))
    };
}

function formatDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}

function today() {
    return new Date().toISOString().slice(0, 10);
}

function selectType(type) {
    currentType = type;
    dealsOnly = false;
    visibleCount = 30;
    genreFilter.value = "todos";
    tabs.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === type);
    });
    syncFiltersWithCategory();
    renderCatalog();
}

function showDailyDeals() {
    dealsOnly = true;
    currentType = "jogo";
    searchInput.value = "";
    releaseFilter.value = "todos";
    sortFilter.value = "maior-desconto";
    tabs.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === "jogo");
    });
    selectPlatform("todos");
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncFiltersWithCategory() {
    searchInput.value = "";
    sortFilter.value = "destaque";

    if (currentType === "jogo" || currentType === "retro") {
        quickFilterLabel.textContent = "Plataforma";
        searchInput.placeholder = currentType === "retro"
            ? "Super Mario, Sonic, Castlevania..."
            : "Elden Ring, GTA VI, Minecraft...";
        releaseFilter.value = "todos";
        if (!["todos", "PC", "Xbox", "PS5"].includes(platformFilter.value)) {
            platformFilter.value = "todos";
        }
        selectPlatform(platformFilter.value);
        return;
    }

    if (currentType === "filme" || currentType === "serie") {
        quickFilterLabel.textContent = "Jogos";
        searchInput.placeholder = currentType === "filme"
            ? "Duna, John Wick, Avengers..."
            : "The Last of Us, Stranger Things...";
        selectPlatform("todos");
        return;
    }

    if (currentType === "manga") {
        quickFilterLabel.textContent = "Jogos";
        searchInput.placeholder = "One Piece, Solo Leveling, Berserk...";
        selectPlatform("todos");
        releaseFilter.value = "todos";
        return;
    }

    quickFilterLabel.textContent = "Jogos";
    searchInput.placeholder = "Elden Ring, One Piece, Duna...";
    selectPlatform("todos");
    releaseFilter.value = "todos";
}

function selectPlatform(platform) {
    platformFilter.value = platform;
    visibleCount = 30;
    platformChips.forEach((button) => {
        button.classList.toggle("active", button.dataset.platform === platform);
    });
    renderCatalog();
}

function renderProfile() {
    if (!profile || !profile.name) {
        profileInitial.textContent = "+";
        profileTitle.textContent = "Entrar ou cadastrar";
        profileText.textContent = "Entre para ver suas curtidas e continuar sua lista.";
        profileForm.hidden = false;
        likedPanel.hidden = true;
        return;
    }

    profileInitial.textContent = profile.name.trim().charAt(0).toUpperCase();
    profileName.value = profile.name;
    profileTaste.value = profile.taste;
    profileTitle.textContent = `Olá, ${profile.name}`;
    profileText.textContent = `Seu gosto principal: ${profile.taste}`;
    profileForm.hidden = true;
    likedPanel.hidden = false;
    renderLikedList();
}

function toggleProfilePanel(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : profilePanel.hidden;
    profilePanel.hidden = !shouldOpen;
    if (shouldOpen) {
        renderProfile();
    }
}

function setAuthMode(mode) {
    authMode = mode;
    authTabs.forEach((button) => button.classList.toggle("active", button.dataset.authMode === mode));
    profileSubmit.textContent = mode === "login" ? "Entrar" : "Cadastrar";
    profileTitle.textContent = mode === "login" ? "Entrar no perfil" : "Cadastrar perfil";
    profileText.textContent = mode === "login"
        ? "Digite seu nome para entrar e ver suas curtidas."
        : "Crie um perfil simples para salvar suas curtidas neste navegador.";
}

function renderLikedList() {
    const likedItems = catalog.filter((catalogItem) => favorites.has(Number(catalogItem.id))).slice(0, 60);

    if (likedItems.length === 0) {
        likedList.innerHTML = '<div class="liked-item"><strong>Nenhuma curtida ainda</strong><span>Use o botão + nos cards para salvar itens aqui.</span></div>';
        return;
    }

    likedList.innerHTML = likedItems.map((catalogItem) => `
        <div class="liked-item">
            <strong>${catalogItem.titulo}</strong>
            <span>${accentText(catalogItem.categoria)} | ${accentText(catalogItem.genero)}</span>
        </div>
    `).join("");
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectType(tab.dataset.filter));
});

shortcuts.forEach((shortcut) => {
    shortcut.addEventListener("click", () => {
        selectType(shortcut.dataset.filterShortcut);
        document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

platformChips.forEach((button) => {
    button.addEventListener("click", () => selectPlatform(button.dataset.platform));
});

profileButton.addEventListener("click", () => toggleProfilePanel());
closeProfile.addEventListener("click", () => toggleProfilePanel(false));
logoutProfile.addEventListener("click", () => {
    profile = null;
    localStorage.removeItem("mediaflow:profile");
    setAuthMode("login");
    renderProfile();
});
authTabs.forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
});
profilePanel.addEventListener("click", (event) => {
    if (event.target === profilePanel) {
        toggleProfilePanel(false);
    }
});
detailPanel.addEventListener("click", (event) => {
    if (event.target === detailPanel) {
        detailPanel.hidden = true;
    }
});

profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = profileName.value.trim() || "Player";
    const savedProfile = JSON.parse(localStorage.getItem("mediaflow:profile") || "null");

    if (authMode === "login" && savedProfile && savedProfile.name.toLowerCase() === name.toLowerCase()) {
        profile = savedProfile;
        renderProfile();
        return;
    }

    profile = {
        name,
        taste: profileTaste.value
    };
    localStorage.setItem("mediaflow:profile", JSON.stringify(profile));
    renderProfile();
    toggleProfilePanel(false);
});

dealsCard.addEventListener("click", showDailyDeals);

searchInput.addEventListener("input", () => {
    visibleCount = 30;
    renderCatalog();
});
platformFilter.addEventListener("change", () => selectPlatform(platformFilter.value));
releaseFilter.addEventListener("change", () => {
    visibleCount = 30;
    renderCatalog();
});
genreFilter.addEventListener("change", () => {
    visibleCount = 30;
    renderCatalog();
});
sortFilter.addEventListener("change", () => {
    visibleCount = 30;
    renderCatalog();
});
loadMoreButton.addEventListener("click", () => {
    visibleCount += 30;
    renderCatalog();
});

renderProfile();
loadCatalog();
