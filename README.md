# Nolik

**Nolik** es una herramienta que se integra con la API de GitHub para facilitar la resolución de *issues*. Cuando llega una nueva incidencia, Nolik busca en el historial otras incidencias similares que ya hayan sido respondidas y te muestra tanto la pregunta original como su respuesta, evitando contestar una y otra vez lo mismo.

## Características

- **Integración con la API de GitHub**: obtiene los issues y sus respuestas directamente desde tus repositorios.
- **Búsqueda semántica por similitud coseno**: encuentra issues parecidos aunque no compartan las mismas palabras.
- **Base de datos vectorial [Milvus](https://milvus.io/)**: almacena y consulta los embeddings de los issues de forma eficiente.
- **Preguntas y respuestas juntas**: si existe un issue similar ya resuelto, se muestra la pregunta junto con la respuesta que recibió.
- **Backend y frontend separados**: API para la lógica de negocio e interfaz web para consultar los resultados.
- **Despliegue sencillo**: todo el sistema, incluida la base de datos vectorial, se levanta con un único `docker-compose.yml`.

## Cómo funciona

1. Nolik obtiene los issues (y sus respuestas) de GitHub a través de su API.
2. Convierte el contenido de cada issue en un vector (embedding) y lo guarda en Milvus.
3. Cuando se consulta un issue nuevo, se calcula su embedding y se compara con los almacenados mediante **similitud coseno**.
4. Se devuelven los issues más parecidos que ya tienen respuesta, mostrando la pregunta y su solución.

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│ Frontend │ ───▶ │ Backend  │ ───▶ │  Milvus  │
└──────────┘      └────┬─────┘      └──────────┘
                       │
                       ▼
                 ┌────────────┐
                 │ API GitHub │
                 └────────────┘
```

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Un token de acceso personal de GitHub con permisos de lectura sobre los repositorios que quieras analizar

## Instalación y despliegue

1. Clona el repositorio:

   ```bash
   git clone https://github.com/<tu-usuario>/nolik.git
   cd nolik
   ```

2. Crea tu archivo de configuración a partir del ejemplo (si el proyecto incluye uno):

   ```bash
   cp .env.example .env
   ```

   y rellena las variables necesarias, por ejemplo el token de GitHub:

   ```env
   GITHUB_TOKEN=tu_token_de_github
   ```

3. Levanta todos los servicios (backend, frontend y Milvus):

   ```bash
   docker-compose up -d
   ```

4. Accede a la aplicación desde tu navegador (ajusta el puerto según tu configuración):

   ```
   http://localhost:3000
   ```

Para detener los servicios:

```bash
docker-compose down
```

## Estructura del proyecto

```
nolik/
├── backend/             # API y lógica de búsqueda de issues similares
├── frontend/            # Interfaz web
├── docker-compose.yml   # Orquestación de backend, frontend y Milvus
└── README.md
```

## Uso

1. Configura el repositorio de GitHub cuyos issues quieres indexar.
2. Deja que Nolik indexe los issues existentes en Milvus.
3. Al abrir o consultar un issue nuevo, Nolik mostrará los issues similares ya respondidos, con su pregunta y su respuesta.

## Tecnologías

- **GitHub API**: origen de los issues y sus respuestas
- **Milvus**: base de datos vectorial
- **Similitud coseno**: métrica de comparación entre embeddings
- **Docker / Docker Compose**: despliegue

