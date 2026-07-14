# NewsScope

## 1. Project Description
NewsScope es un portal moderno de noticias y reportería que consume datos en tiempo real desde NewsAPI.org. Permite a los usuarios consultar titulares, explorar noticias por categoría, buscar por palabras clave, analizar tendencias con gráficos interactivos, comparar la cobertura de dos temas y explorar el catálogo de fuentes disponibles. No requiere autenticación ni almacena datos — todo funciona mediante consultas en tiempo real.

## 2. Page Structure
- `/` - Inicio (titulares destacados, KPIs, categorías)
- `/explorar` - Explorar noticias (búsqueda avanzada con filtros)
- `/tendencias` - Tendencias (análisis de cobertura con gráficos)
- `/comparador` - Comparador (comparación entre dos temas)
- `/fuentes` - Fuentes (catálogo de medios disponibles)

## 3. Core Features
- [ ] Consulta de titulares destacados por país y categoría
- [ ] Búsqueda avanzada con filtros (keyword, fecha, idioma, fuente, orden)
- [ ] Vista alternable entre tarjetas y tabla
- [ ] Análisis de tendencias con gráficos (líneas, barras, dona, palabras frecuentes)
- [ ] Comparador de cobertura entre dos temas
- [ ] Catálogo de fuentes con filtros
- [ ] Modo demostración cuando no hay API key configurada
- [ ] Diseño responsive con menú hamburguesa en móvil
- [ ] Manejo completo de estados (loading, error, empty, rate-limit)
- [ ] Paginación en resultados de búsqueda
- [ ] Protección de API key mediante proxy de Vite

## 4. Data Model Design
No se requiere base de datos. Todos los datos se obtienen en tiempo real desde NewsAPI.org.

## 5. Backend / Third-party Integration Plan
- **NewsAPI.org**: API externa de noticias consumida mediante proxy de Vite
  - `GET /api/news/top-headlines` → `https://newsapi.org/v2/top-headlines`
  - `GET /api/news/everything` → `https://newsapi.org/v2/everything`
  - `GET /api/news/sources` → `https://newsapi.org/v2/top-headlines/sources`
- **API Key**: `NEWS_API_KEY` en variables de entorno, utilizada solo en el proxy del servidor
- **Sin** Supabase, autenticación, base de datos, Stripe ni Shopify

## 6. Development Phase Plan

### Phase 1: Fundación + Página de Inicio
- Goal: Configurar toda la infraestructura base y crear la página de inicio funcional
- Deliverable: Navegación completa, footer, página de inicio con hero, KPIs, noticias destacadas y categorías

### Phase 2: Página Explorar
- Goal: Búsqueda avanzada con filtros, paginación y vista dual tarjetas/tabla
- Deliverable: Página de exploración completa con todos los filtros funcionando

### Phase 3: Página Tendencias
- Goal: Panel de análisis con gráficos interactivos
- Deliverable: Gráficos de líneas, barras, dona, palabras frecuentes y tabla de detalle

### Phase 4: Página Comparador
- Goal: Comparación visual entre dos temas
- Deliverable: KPIs comparativos, gráficos de evolución y tabla comparativa

### Phase 5: Página Fuentes
- Goal: Catálogo de medios con filtros y visualizaciones
- Deliverable: Listado de fuentes, filtros y gráfico por categoría

### Phase 6: Pulido final
- Goal: Responsive completo, animaciones, edge cases y optimización
- Status: ✅ COMPLETADO
- Deliverable: Aplicación completamente pulida y lista para producción
- Detalles:
  - Sistema de animaciones CSS (fade-in-up, fade-in-down, scale-in, slide-in, stagger-children)
  - Efecto shimmer en skeletons (reemplaza animate-pulse)
  - Animaciones de entrada en todas las páginas
  - Hover effects con scale/lift en cards y botones
  - Scroll-to-top automático en cambio de ruta
  - Menú móvil con animación slide-down
  - Corrección de bugs: imports faltantes en Trends/DetailTable
  - Estilizado de scrollbar personalizado
  - Optimización de transiciones y hover states