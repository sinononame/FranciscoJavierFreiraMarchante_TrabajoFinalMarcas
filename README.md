# Mi trabajo final de Lenguaje de marcas

Este trabajo consiste en la creación de una API al completo usando Node y Express, de 
temática usaré una biblioteca personal usando 8 campos por cada registro.

// Express es una librería de Node la cual facilitará la creación de nuestra API

## API sobre mi biblioteca, instalación y uso

Instalé nodemon y express para poder empezar con el trabajo y luego lo alojé en
https://github.com/sinononame/FranciscoJavierFreiraMarchante_TrabajoFinalMarcas.git  

## Recursos

### Recurso principal — Libros
Cada libro contiene: `id`, `Titulo`, `Autor/a`, `Genero`, `Año`, `Paginas`, `Disponible`, `Editorial`

### Recurso secundario — Préstamos
Cada préstamo contiene: `id`, `libro_id`, `usuario`, `fecha_prestamo`, `fecha_devolucion`, `devuelto`

---

## Endpoints

### Libros

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /libros | Devuelve todos los libros |
| GET | /libros/:id | Devuelve un libro concreto por su ID |
| GET | /libros?Titulo=algo | Busca libros por título (búsqueda parcial) |
| GET | /libros?Disponible=true | Filtra libros por disponibilidad |
| GET | /libros?min=300&max=500 | Filtra libros por rango de páginas |
| GET | /libros/estadisticas | Devuelve media, máximo y mínimo de páginas |
| GET | /libros/top?n=3&orden=desc | Devuelve los N libros con más o menos páginas |
| GET | /libros/generos | Cuenta cuántos libros hay de cada género |
| POST | /guardar_libro | Crea un nuevo libro con validación de campos |
| PUT | /actualizar_libro | Modifica los datos de un libro existente |
| DELETE | /borrar_libro | Elimina un libro por su id |

### Préstamos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /prestamos | Devuelve todos los préstamos |
| GET | /prestamos?usuario=nombre | Busca préstamos de un usuario concreto |
| GET | /prestamos/libro/:libro_id | Devuelve los préstamos de un libro concreto |
| POST | /prestamos | Crea un nuevo préstamo con validación de campos |
| DELETE | /prestamos/:id | Elimina un préstamo por su id |

### Utilidades

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /totales | Devuelve el total de libros y préstamos |

---

## Ejemplos de uso

### Buscar un libro por título