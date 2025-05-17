````markdown
# Task & User CRUD API (Hexagonal Architecture)

Este proyecto es una API RESTful para la gestión de Usuarios y sus Tareas asociadas, desarrollada en Node.js con Express y TypeScript. Sigue los principios de la Arquitectura Hexagonal y SOLID para promover un código mantenible, escalable y testable.

## Características Principales

- Gestión CRUD para Usuarios.
- Gestión CRUD para Tareas, asociadas a un Usuario.
- Validación de datos de entrada usando Zod.
- Estructura de proyecto clara dividida en dominio, aplicación e infraestructura.
- Inyección de Dependencias para desacoplar componentes.
- Persistencia en memoria (fácilmente extensible a otras bases de datos).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Lenguaje:** TypeScript
- **Validación de Esquemas:** Zod
- **Gestor de Paquetes:** pnpm
- **Desarrollo:**
  - `tsx`: Para ejecución de TypeScript en desarrollo con hot-reloading.
  - `typescript`: Compilador de TypeScript.
  - `eslint`: Para linting de código.
  - `morgan`: Logger de peticiones HTTP.
- **Dependencias de Desarrollo:**
  - `@types/*`: Tipos para librerías.
  - `globals`: Para configuración de ESLint.

## Prerrequisitos

- Node.js (v18 o superior recomendado)
- pnpm (instalado globalmente: `npm install -g pnpm`)

## Getting Started

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/sander-st/task-crud-AH.git
    cd task-crud-AH
    ```

2.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

## Ejecutar la Aplicación

1.  **Modo Desarrollo (con hot-reloading):**

    ```bash
    pnpm dev
    ```

    El servidor se iniciará en `http://localhost:3000` y se recargará automáticamente con los cambios.

2.  **Compilar para Producción:**

    ```bash
    pnpm build
    ```

    Esto generará los archivos JavaScript en el directorio `dist/`.

3.  **Ejecutar en Modo Producción:**
    ```bash
    pnpm start
    ```
    Esto ejecutará la aplicación desde los archivos compilados en `dist/`.

## Estructura del Proyecto

El proyecto sigue una estructura modular inspirada en la Arquitectura Hexagonal:
````

src/
├── app.ts # Configuración principal de Express, middlewares y rutas raíz.
├── lib/
│ ├── shared/ # Módulos compartidos (ej: contenedor DI).
│ │ ├── infrastructure/
│ │ │ └── simpleContainer.ts # Implementación simple de DI.
│ │ └── service-container.ts # Configuración y registro de servicios.
│ ├── task/ # Módulo de Tareas.
│ │ ├── application/ # Casos de uso (lógica de aplicación), DTOs.
│ │ ├── domain/ # Entidad Task, interfaz TaskRepository.
│ │ └── infrastructure/ # Controlador Express, InMemoryTaskRepository, rutas de tarea.
│ └── user/ # Módulo de Usuarios (estructura similar al módulo de tareas).
└── ...

````

## API Endpoints

La API base es `http://localhost:3000/api`.

### Usuarios (`/api/user`)

*   **Crear Usuario:** `POST /api/user`
    *   Body:
        ```json
        {
          "name": "Ada Lovelace"
        }
        ```
    *   Respuesta (201):
        ```json
        {
          "id": "some-uuid-string",
          "name": "Ada Lovelace"
        }
        ```

*   **Obtener Todos los Usuarios:** `GET /api/user`
    *   Respuesta (200):
        ```json
        [
          { "id": "user1", "name": "Jhon Dow" },
          { "id": "user2", "name": "Max Payne" }
        ]
        ```

*   **Obtener Usuario por ID:** `GET /api/user/:id`
    *   Ejemplo: `GET /api/user/user1`
    *   Respuesta (200):
        ```json
        { "id": "user1", "name": "Jhon Dow" }
        ```
    *   Respuesta (404 si no existe o 500 si hay error):
        ```json
        { "error": "User not found user1" }
        ```

### Tareas (`/api/:userId/task`)

*   **Crear Tarea para un Usuario:** `POST /api/:userId/task`
    *   Ejemplo: `POST /api/user1/task`
    *   Body:
        ```json
        {
          "title": "Implementar login",
          "description": "Usar JWT para la autenticación."
        }
        ```
    *   Respuesta (201):
        ```json
        {
          "id": "some-task-uuid",
          "userId": "user1",
          "title": "Implementar login",
          "description": "Usar JWT para la autenticación.",
          "completed": false,
          "createdAt": "2023-10-27T10:00:00.000Z",
          "updatedAt": "2023-10-27T10:00:00.000Z"
        }
        ```

*   **Obtener Todas las Tareas de un Usuario:** `GET /api/:userId/task`
    *   Ejemplo: `GET /api/user1/task`
    *   Respuesta (200): Array de tareas del usuario.

*   **Obtener Tarea Específica de un Usuario por ID:** `GET /api/:userId/task/:id`
    *   Ejemplo: `GET /api/user1/task/task-uuid-1`
    *   Respuesta (200): Objeto de la tarea.

*   **Actualizar Tarea de un Usuario:** `PUT /api/:userId/task/:id`
    *   Ejemplo: `PUT /api/user1/task/task-uuid-1`
    *   Body (solo los campos a actualizar):
        ```json
        {
          "title": "Implementar login con OAuth2",
          "description": "Actualizar descripción y añadir OAuth2."
        }
        ```
    *   Respuesta (200): Objeto de la tarea actualizada.

*   **Eliminar Tarea de un Usuario:** `DELETE /api/:userId/task/:id`
    *   Ejemplo: `DELETE /api/user1/task/task-uuid-1`
    *   Respuesta (200):
        ```json
        { "success": true }
        ```

## Arquitectura

### Arquitectura Hexagonal (Puertos y Adaptadores)

El núcleo de la aplicación (dominio y casos de uso) está aislado de las preocupaciones de infraestructura (framework web, base de datos).
*   **Dominio:** Contiene las entidades (`User`, `Task`) con su lógica de negocio intrínseca y las interfaces de los repositorios (puertos).
*   **Aplicación:** Contiene los casos de uso que orquestan las interacciones con el dominio y los repositorios.
*   **Infraestructura:** Contiene los adaptadores que implementan los puertos (ej. `InMemoryUserRepository`) y los que interactúan con el mundo exterior (ej. controladores Express).

### Principios SOLID

Se ha intentado adherir a los principios SOLID:
*   **S (SRP):** Clases con responsabilidades bien definidas (entidades, repositorios, casos de uso, controladores).
*   **O (OCP):** La arquitectura permite extender funcionalidades (ej. añadir nuevos repositorios) sin modificar el código existente del dominio.
*   **L (LSP):** Las implementaciones de repositorios son sustituibles.
*   **I (ISP):** Interfaces de repositorio específicas para las necesidades de sus clientes.
*   **D (DIP):** Los módulos de alto nivel (casos de uso) dependen de abstracciones (interfaces de repositorio), no de implementaciones concretas.

## Futuras Mejoras y Buenas Prácticas

*   **Manejo de Errores Avanzado:**
    *   Implementar clases de error personalizadas (ej. `UserNotFoundError`, `ValidationError`) para un manejo más granular en los controladores.
    *   Centralizar el manejo de errores con un middleware de errores de Express.
*   **Testing:**
    *   Añadir **Unit Tests** para entidades de dominio, casos de uso (mockeando repositorios) y utilidades.
    *   Implementar **Integration Tests** para los adaptadores de infraestructura y flujos completos a través de los controladores (ej. usando `supertest`).
*   **Persistencia Real:**
    *   Reemplazar los repositorios en memoria por implementaciones que usen una base de datos real (ej. PostgreSQL con Prisma/TypeORM, MongoDB con Mongoose).
*   **Mejoras en la API:**
    *   Implementar paginación y filtrado para las listas de recursos.
    *   Considerar el uso de `toJSON()` en las entidades para simplificar la serialización en las respuestas.
*   **Configuración y Variables de Entorno:**
    *   Gestionar configuraciones (como el puerto del servidor, credenciales de BD) usando variables de entorno (ej. con `dotenv`).
*   **Logging Mejorado:**
    *   Integrar una librería de logging más estructurada (ej. `pino`, `winston`) para logs de aplicación.
*   **Seguridad:**
    *   Implementar autenticación y autorización (ej. JWT).
    *   Añadir rate limiting y headers de seguridad (ej. con `helmet`).
*   **Documentación de API:**
    *   Generar documentación de API usando OpenAPI/Swagger.
*   **Refinamiento de DTOs y Validación:**
    *   Asegurar que la validación de Zod en los DTOs de entrada sea exhaustiva para proteger los casos de uso y el dominio.
    *   Evaluar si la validación se duplica innecesariamente entre capas.
*   **Optimización del Contenedor DI:**
    *   Para proyectos más grandes, considerar librerías de DI más robustas como `tsyringe` o `InversifyJS`.
*   **Atomicidad en Operaciones:**
    *   Para operaciones que involucren múltiples cambios (ej. crear una entidad y luego otra relacionada), considerar patrones de transacción si se usa una BD que lo soporte.
````
