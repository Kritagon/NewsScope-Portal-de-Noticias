import type { Article, NewsSource } from '@/types/news';

export const demoArticles: Article[] = [
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'Maria Gonzalez',
    title: 'La economía global muestra señales de recuperación sostenida en el segundo trimestre',
    description: 'Los principales indicadores económicos apuntan a una recuperación más rápida de lo esperado en los mercados emergentes y desarrollados, con el comercio internacional alcanzando niveles prepandemia.',
    url: 'https://example.com/news/1',
    urlToImage: 'https://readdy.ai/api/search-image?query=Modern%20financial%20district%20skyline%20with%20glass%20skyscrapers%20reflecting%20sunlight%2C%20clean%20professional%20aesthetic%2C%20bright%20blue%20sky%20with%20wispy%20clouds%2C%20editorial%20photography%20style%2C%20warm%20golden%20hour%20lighting&width=800&height=450&seq=demo-news-01&orientation=landscape',
    publishedAt: '2026-07-14T10:30:00Z',
    content: 'La economía global muestra señales de recuperación sostenida en el segundo trimestre del año, con un crecimiento superior al 3% en la mayoría de las regiones.',
  },
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'James Mitchell',
    title: 'Avances revolucionarios en inteligencia artificial transforman la investigación médica',
    description: 'Nuevos modelos de IA están acelerando el descubrimiento de fármacos y mejorando la precisión en diagnósticos de enfermedades complejas como el cáncer y Alzheimer.',
    url: 'https://example.com/news/2',
    urlToImage: 'https://readdy.ai/api/search-image?query=Futuristic%20medical%20research%20laboratory%20with%20holographic%20DNA%20displays%20and%20scientists%20analyzing%20data%2C%20clean%20white%20environment%20with%20blue%20accent%20lighting%2C%20professional%20editorial%20photography&width=800&height=450&seq=demo-news-02&orientation=landscape',
    publishedAt: '2026-07-14T08:15:00Z',
    content: 'La inteligencia artificial está transformando radicalmente el campo de la investigación médica, permitiendo avances que antes tomaban décadas en cuestión de meses.',
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Carlos Mendez',
    title: 'Cumbre climática alcanza acuerdo histórico sobre reducción de emisiones para 2035',
    description: 'Más de 190 países firman un pacto vinculante que establece metas ambiciosas de reducción de carbono, marcando un hito en la lucha contra el cambio climático.',
    url: 'https://example.com/news/3',
    urlToImage: 'https://readdy.ai/api/search-image?query=Aerial%20view%20of%20wind%20turbines%20and%20solar%20panels%20in%20a%20green%20landscape%20at%20sunset%2C%20clean%20renewable%20energy%20aesthetic%2C%20warm%20golden%20light%2C%20editorial%20environmental%20photography&width=800&height=450&seq=demo-news-03&orientation=landscape',
    publishedAt: '2026-07-13T18:00:00Z',
    content: 'En una cumbre histórica celebrada en Ginebra, más de 190 naciones alcanzaron un acuerdo sin precedentes para acelerar la reducción de emisiones de carbono.',
  },
  {
    source: { id: 'the-verge', name: 'The Verge' },
    author: 'Ana Torres',
    title: 'El nuevo chip cuántico promete resolver problemas imposibles en minutos',
    description: 'Una startup californiana presenta un procesador cuántico de 1000 qubits que podría revolucionar la criptografía, la simulación molecular y la optimización logística.',
    url: 'https://example.com/news/4',
    urlToImage: 'https://readdy.ai/api/search-image?query=Close%20up%20of%20a%20futuristic%20quantum%20computer%20chip%20with%20glowing%20circuits%20and%20intricate%20patterns%2C%20dark%20background%20with%20cool%20blue%20and%20gold%20accents%2C%20tech%20editorial%20photography%2C%20clean%20minimalist&width=800&height=450&seq=demo-news-04&orientation=landscape',
    publishedAt: '2026-07-13T14:45:00Z',
    content: 'El campo de la computación cuántica acaba de dar un salto monumental con el anuncio de un nuevo procesador de 1000 qubits desarrollado por la startup QuantumLeap.',
  },
  {
    source: { id: 'espn', name: 'ESPN' },
    author: 'Diego Ramirez',
    title: 'La Copa Mundial 2026 entra en su fase decisiva con sorpresas inesperadas',
    description: 'Varias selecciones consideradas favoritas quedan eliminadas en octavos de final, mientras equipos revelación avanzan a cuartos en un torneo lleno de emociones.',
    url: 'https://example.com/news/5',
    urlToImage: 'https://readdy.ai/api/search-image?query=Professional%20soccer%20stadium%20filled%20with%20cheering%20fans%20under%20dramatic%20stadium%20lights%2C%20green%20pitch%20with%20players%20celebrating%2C%20sports%20photography%20style%2C%20vibrant%20atmosphere&width=800&height=450&seq=demo-news-05&orientation=landscape',
    publishedAt: '2026-07-12T22:30:00Z',
    content: 'La Copa Mundial de la FIFA 2026 continúa sorprendiendo a aficionados de todo el mundo con resultados que nadie esperaba en las fases eliminatorias.',
  },
  {
    source: { id: 'wired', name: 'Wired' },
    author: null,
    title: 'Blockchain más allá de las criptomonedas: aplicaciones que están cambiando industrias',
    description: 'Desde cadenas de suministro hasta votación electrónica, la tecnología blockchain encuentra usos prácticos que van mucho más allá de Bitcoin y Ethereum.',
    url: 'https://example.com/news/6',
    urlToImage: 'https://readdy.ai/api/search-image?query=Abstract%20digital%20network%20visualization%20with%20interconnected%20nodes%20and%20data%20streams%2C%20dark%20background%20with%20teal%20and%20gold%20highlights%2C%20futuristic%20tech%20aesthetic%2C%20clean%20minimalist%20design&width=800&height=450&seq=demo-news-06&orientation=landscape',
    publishedAt: '2026-07-12T16:00:00Z',
    content: 'Aunque las criptomonedas dominan los titulares, la tecnología blockchain está encontrando aplicaciones transformadoras en sectores tradicionales.',
  },
  {
    source: { id: 'national-geographic', name: 'National Geographic' },
    author: 'Laura Castillo',
    title: 'Descubren nueva especie de coral bioluminiscente en las profundidades del Pacífico',
    description: 'Un equipo internacional de biólogos marinos documenta una especie de coral que emite luz propia a más de 2000 metros de profundidad frente a las costas de Chile.',
    url: 'https://example.com/news/7',
    urlToImage: 'https://readdy.ai/api/search-image?query=Bioluminescent%20deep%20sea%20coral%20reef%20glowing%20with%20blue%20and%20green%20light%20in%20dark%20ocean%20depths%2C%20marine%20biology%20photography%2C%20mysterious%20underwater%20atmosphere%2C%20scientific%20discovery&width=800&height=450&seq=demo-news-07&orientation=landscape',
    publishedAt: '2026-07-12T09:15:00Z',
    content: 'En las profundidades del Océano Pacífico, un equipo de científicos ha realizado un descubrimiento que parece sacado de una película de ciencia ficción.',
  },
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Pedro Alvarez',
    title: 'Startup latinoamericana de logística recibe inversión récord de $500 millones',
    description: 'La plataforma de logística y última milla LogiMax se convierte en el nuevo unicornio de la región tras una ronda de financiación Serie D liderada por SoftBank.',
    url: 'https://example.com/news/8',
    urlToImage: 'https://readdy.ai/api/search-image?query=Modern%20logistics%20warehouse%20with%20autonomous%20delivery%20robots%20and%20organized%20packages%2C%20clean%20industrial%20aesthetic%2C%20bright%20LED%20lighting%2C%20professional%20commercial%20photography&width=800&height=450&seq=demo-news-08&orientation=landscape',
    publishedAt: '2026-07-11T20:00:00Z',
    content: 'El ecosistema de startups latinoamericanas alcanza un nuevo hito con la inversión más grande registrada en el sector logístico de la región.',
  },
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'Sofia Herrera',
    title: 'Revolución en la educación: aulas virtuales con realidad aumentada llegan a zonas rurales',
    description: 'Un programa piloto en varios países latinoamericanos demuestra que la RA puede reducir la brecha educativa en comunidades sin acceso a infraestructura escolar tradicional.',
    url: 'https://example.com/news/9',
    urlToImage: null,
    publishedAt: '2026-07-11T14:00:00Z',
    content: 'La tecnología de realidad aumentada está transformando la educación en las zonas más remotas de América Latina.',
  },
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'Michael Torres',
    title: 'El telescopio James Webb detecta posibles señales de vida en un exoplaneta cercano',
    description: 'Los datos espectroscópicos revelan la presencia de moléculas orgánicas complejas en la atmósfera de un planeta a 40 años luz, desatando el debate científico.',
    url: 'https://example.com/news/10',
    urlToImage: 'https://readdy.ai/api/search-image?query=Artistic%20rendering%20of%20an%20exoplanet%20with%20colorful%20atmosphere%20orbiting%20a%20distant%20star%2C%20space%20telescope%20in%20foreground%2C%20deep%20space%20background%20with%20nebula%20colors%2C%20scientific%20illustration%20style&width=800&height=450&seq=demo-news-10&orientation=landscape',
    publishedAt: '2026-07-11T08:00:00Z',
    content: 'El telescopio espacial James Webb podría haber detectado las primeras señales de vida fuera de nuestro sistema solar.',
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: null,
    title: 'Mercados asiáticos cierran al alza impulsados por datos de empleo en Japón',
    description: null,
    url: 'https://example.com/news/11',
    urlToImage: 'https://readdy.ai/api/search-image?query=Tokyo%20stock%20exchange%20digital%20display%20showing%20green%20market%20numbers%2C%20modern%20financial%20district%20background%2C%20professional%20business%20photography%2C%20clean%20corporate%20aesthetic&width=800&height=450&seq=demo-news-11&orientation=landscape',
    publishedAt: '2026-07-10T23:00:00Z',
    content: 'Los principales índices bursátiles de Asia cerraron la jornada con ganancias significativas.',
  },
  {
    source: { id: 'ars-technica', name: 'Ars Technica' },
    author: 'Elena Vargas',
    title: 'Google presenta su nuevo sistema operativo para dispositivos del hogar inteligente',
    description: 'La plataforma unificada promete resolver los problemas de interoperabilidad que han frenado la adopción masiva de dispositivos IoT en los hogares.',
    url: 'https://example.com/news/12',
    urlToImage: 'https://readdy.ai/api/search-image?query=Modern%20smart%20home%20interior%20with%20connected%20devices%20and%20holographic%20interface%20controls%2C%20minimalist%20Scandinavian%20design%2C%20warm%20ambient%20lighting%2C%20tech%20lifestyle%20photography&width=800&height=450&seq=demo-news-12&orientation=landscape',
    publishedAt: '2026-07-10T18:30:00Z',
    content: 'Google ha presentado su apuesta más ambiciosa para dominar el mercado del hogar inteligente.',
  },
];

export const demoSources: NewsSource[] = [
  { id: 'cnn', name: 'CNN', description: 'Cable News Network, líder mundial en noticias de última hora y análisis en profundidad.', url: 'https://cnn.com', category: 'general', language: 'en', country: 'us' },
  { id: 'bbc-news', name: 'BBC News', description: 'Servicio de noticias de la British Broadcasting Corporation, con cobertura global imparcial.', url: 'https://bbc.com/news', category: 'general', language: 'en', country: 'gb' },
  { id: 'reuters', name: 'Reuters', description: 'Agencia internacional de noticias con la red más grande de corresponsales del mundo.', url: 'https://reuters.com', category: 'general', language: 'en', country: 'gb' },
  { id: 'the-verge', name: 'The Verge', description: 'Publicación dedicada a la intersección entre tecnología, ciencia, arte y cultura.', url: 'https://theverge.com', category: 'technology', language: 'en', country: 'us' },
  { id: 'wired', name: 'Wired', description: 'Revista que cubre cómo la tecnología afecta la cultura, la economía y la política.', url: 'https://wired.com', category: 'technology', language: 'en', country: 'us' },
  { id: 'techcrunch', name: 'TechCrunch', description: 'Medio enfocado en startups, tecnología y noticias de Internet.', url: 'https://techcrunch.com', category: 'technology', language: 'en', country: 'us' },
  { id: 'ars-technica', name: 'Ars Technica', description: 'Publicación de noticias y análisis sobre tecnología, ciencia y política tecnológica.', url: 'https://arstechnica.com', category: 'technology', language: 'en', country: 'us' },
  { id: 'espn', name: 'ESPN', description: 'Entertainment and Sports Programming Network, líder en noticias deportivas mundiales.', url: 'https://espn.com', category: 'sports', language: 'en', country: 'us' },
  { id: 'national-geographic', name: 'National Geographic', description: 'Revista de ciencia, naturaleza, cultura e historia con fotografía excepcional.', url: 'https://nationalgeographic.com', category: 'science', language: 'en', country: 'us' },
  { id: 'el-pais', name: 'El País', description: 'Periódico español de información general con cobertura internacional en español.', url: 'https://elpais.com', category: 'general', language: 'es', country: 'es' },
  { id: 'le-monde', name: 'Le Monde', description: 'Periódico francés de referencia con análisis profundo de noticias internacionales.', url: 'https://lemonde.fr', category: 'general', language: 'fr', country: 'fr' },
  { id: 'der-spiegel', name: 'Der Spiegel', description: 'Revista semanal alemana, una de las más influyentes de Europa.', url: 'https://spiegel.de', category: 'general', language: 'de', country: 'de' },
];

export const demoHeadlines: Article[] = demoArticles.slice(0, 8);

export const demoFeaturedArticle: Article = demoArticles[0];

export const demoBusinessArticles: Article[] = [
  { ...demoArticles[0], source: { id: 'bloomberg', name: 'Bloomberg' }, title: 'Mercados financieros registran récord de inversión extranjera en Latinoamérica' },
  { ...demoArticles[7], source: { id: 'forbes', name: 'Forbes' }, title: 'Las 10 empresas más innovadoras del año según Forbes' },
  { ...demoArticles[10], source: { id: 'wsj', name: 'Wall Street Journal' }, title: 'Bancos centrales coordinan política monetaria ante inflación persistente' },
];

export const demoTechArticles: Article[] = [
  demoArticles[1], demoArticles[3], demoArticles[5], demoArticles[11],
];

export const demoScienceArticles: Article[] = [
  demoArticles[6], demoArticles[9],
];

export const demoSportsArticles: Article[] = [
  demoArticles[4],
];