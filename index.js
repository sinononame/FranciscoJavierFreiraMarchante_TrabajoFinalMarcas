//Punto 1 -----

const express = require("express");
const app = express();
const port = 5555;

app.use(express.json())

app.listen(port, () => {

    console.log("Server abierto🐧")
})
// -----

//Punto 2 -----
//Datos

let Mi_Biblioteca = [
    {"id": 1, "Titulo": "La maldición de los sueños", "Autor/a": "Rebecca Ross", "Genero": "Fantasía", "Año": 2024, "Paginas": 448, "Disponible": true, "Editorial": "Puck"},
    
    {"id": 2, "Titulo": "Yumi y el pintor de pesadillas", "Autor/a": "Brandon Sanderson", "Genero": "Fantasía romántica", "Año": 2023, "Paginas": 496, "Disponible": true, "Editorial": "Nova"},
    
    {"id": 3, "Titulo": "El bestiario de Axlin", "Autor/a": "Laura Gallego", "Genero": "Fantasía", "Año": 2018, "Paginas": 312, "Disponible": true, "Editorial": "SM"},
    
    {"id": 4, "Titulo": "Trenza y el mar esmeralda", "Autor/a": "Brandon Sanderson", "Genero": "Fantasía", "Año": 2023, "Paginas": 432, "Disponible": true, "Editorial": "Nova"},
    
    {"id": 5, "Titulo": "El Imperio Final", "Autor/a": "Brandon Sanderson", "Genero": "Fantasía épica", "Año": 2006, "Paginas": 576, "Disponible": true, "Editorial": "Nova"}
];

let Mis_Prestamos = [
    {"id": 1, "libro_id": 1, "usuario": "Paco García", "fecha_prestamo": "01/05/2026", "fecha_devolucion": "15/05/2026", "devuelto": false},
 
    {"id": 2, "libro_id": 2, "usuario": "Manolita López", "fecha_prestamo": "20/04/2026", "fecha_devolucion": "04/05/2026", "devuelto": true},
    
    {"id": 3, "libro_id": 3, "usuario": "Carlos Ruiz", "fecha_prestamo": "03/04/2026", "fecha_devolucion": "17/05/2026", "devuelto": false},
    
    {"id": 4, "libro_id": 4, "usuario": "Laura Martínez", "fecha_prestamo": "20/04/2026", "fecha_devolucion": "24/04/2026", "devuelto": true},
    
    {"id": 5, "libro_id": 5, "usuario": "Manolito Díaz", "fecha_prestamo": "06/05/2026", "fecha_devolucion": "20/05/2026", "devuelto": false}
]

// -----

// Punto 3 -----

//TODO: Añadir alguno mas que falte

// Interacciones

// req (request) = lo que recibe el servidor del usuario
//      req.body -> datos que manda en el body (JSON de Bruno)
//      req.params -> datos que van en la URL (/libros/:id)
//      req.query -> datos que van después del ? (/libros?Titulo=algo)

// res (response) = lo que devuelve el servidor al usuario
//      res.json() -> devuelve un JSON
//      res.send() -> devuelve un texto
//      res.status(404) -> pone el código HTTP

//Al poner en el buscador simplemente la / saldrá toda la API al completo
app.get("/", (req,res) => {
    return res.json(Mi_Biblioteca)
})

//Al poner en el buscador simplemente la /mi_fav saldrá como ejemplo mi libro favorito(lo cambiaré)
app.get("/mi_fav", (req,res) => {
    return res.json(Mi_Biblioteca[0])
})

//Usando post y /guardar_libro podremos añadir libros usando los campos necesarios 
app.post("/guardar_libro", (req, res) => {

    // Comprobamos que los campos obligatorios vengan rellenos
    // Si alguno falta, devolvemos un error 400 y paramos aquí
    if (!req.body.Titulo || !req.body["Autor/a"] || !req.body.Genero || !req.body.Año || !req.body.Paginas || !req.body.Editorial) {
        return res.status(400).json({ error: "Faltan campos obligatorios" })
    }

    // Si llegamos aquí es que todos los campos están rellenos
    // Creamos el nuevo libro con los datos que nos mandan
    let nuevoLibro = {
        id: Mi_Biblioteca.length + 1,
        Titulo: req.body.Titulo,
        "Autor/a": req.body["Autor/a"],
        Genero: req.body.Genero,
        Año: req.body.Año,
        Paginas: req.body.Paginas,
        Disponible: req.body.Disponible ?? true, // si no mandan Disponible, por defecto true
        Editorial: req.body.Editorial
    }

    // Lo añadimos al array
    Mi_Biblioteca.push(nuevoLibro);

    // Devolvemos el libro creado con 201 que es "created"
    return res.status(201).json(nuevoLibro);
})

//Al usar esta funcion modificaremos los datos de los libros 
app.put("/actualizar_libro", (req, res) => {

    // req.body.id es el id que mandas en el JSON del body de Bruno
    // .find() recorre el array buscando el libro cuyo id coincida
    const libro = Mi_Biblioteca.find(a => a.id == req.body.id)
    
    // Si .find() no encontró nada, libro es undefined
    // En ese caso devolvemos un error 404 y paramos aquí
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" })

    // Si llegamos aquí es que el libro existe
    // Actualizamos cada campo con lo que nos mandan en el body
    libro.Titulo = req.body.Titulo;           // nuevo título
    libro["Autor/a"] = req.body["Autor/a"];   // nuevo autor (lleva / por eso va entre corchetes)
    libro.Genero = req.body.Genero;           // nuevo género
    libro.Año = req.body.Año;                 // nuevo año
    libro.Paginas = req.body.Paginas;         // nuevo número de páginas
    libro.Disponible = req.body.Disponible;   // true o false
    libro.Editorial = req.body.Editorial;     // nueva editorial

    // Devolvemos el libro ya actualizado
    return res.json(libro)
})

//Al usar esta simplemente borraremos un libro que queramos o si no, no se encontrará
app.delete("/borrar_libro", (req,res) => {

    const index = Mi_Biblioteca.findIndex(a => a.id == req.body.id)
    if (index === -1) return res.status(404).send("Libro no encontrado")
    Mi_Biblioteca.splice(index, 1)
    return res.send("Libro con id " + req.body.id + " eliminado")

})

//Route param
//Sirve para tomar el libro que yo quiera solo usando su ID
app.get("/libros/:id", (req, res) => {
    
    // req.params.id es el número que pones en la URL, ejemplo: /libros/3
    const libro = Mi_Biblioteca.find(a => a.id == req.params.id)
    
    // Si no encuentra ningún libro con ese id, devuelve error 404
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" })
    
    // Si lo encuentra, lo devuelve
    return res.json(libro)
})

//Query param de nombre y filtros 
// para su uso "localhost:5555/libros?Titulo=El bestiario de Axlin" un libro en concreto o simplemente algo menos concreto

app.get("/libros", (req, res) => {

    // Filtro 1 - Si pones ?Titulo=algo -> busca por título
    if (req.query.Titulo) {
        const libro = Mi_Biblioteca.filter(a => 
            a.Titulo.toLowerCase().includes(req.query.Titulo.toLowerCase())
        )
        if (libro.length === 0) return res.status(404).json({ error: "Libro no encontrado" })
        return res.json(libro)
    }

    // Filtro 2 - Si pones ?Disponible=true o ?Disponible=false → filtra por disponibilidad
    if (req.query.Disponible !== undefined) {
        const disponible = req.query.Disponible === "true"
        const libros = Mi_Biblioteca.filter(a => a.Disponible === disponible)
        return res.json(libros)
    }

    // Filtro 3 - Si pones ?min=300 o ?max=500 o ambos → filtra por páginas
    if (req.query.min || req.query.max) {
        let libros = Mi_Biblioteca

        // Solo libros con más de X páginas
        if (req.query.min) {
            libros = libros.filter(a => a.Paginas >= req.query.min)
        }

        // Solo libros con menos de X páginas
        if (req.query.max) {
            libros = libros.filter(a => a.Paginas <= req.query.max)
        }

        if (libros.length === 0) return res.status(404).json({ error: "No hay libros en ese rango" })
        return res.json(libros)
    }

    // Si no pones nada -> devuelve todos
    return res.json(Mi_Biblioteca)
})

app.get("/prestamos", (req, res) => {

    // Filtro 4 - Si pones ?usuario=(nombre) -> busca préstamos de esa persona en concreto
    if (req.query.usuario) {
        const prestamos = Mis_Prestamos.filter(a => 
            a.usuario.toLowerCase().includes(req.query.usuario.toLowerCase())
        )
        if (prestamos.length === 0) return res.status(404).json({ error: "No hay préstamos de ese usuario" })
        return res.json(prestamos)
    }

    // Si no pones nada -> devuelve todos los préstamos
    return res.json(Mis_Prestamos)
})

// -----

// Operaciones con los recursos secundarios

// Devuelve todos los préstamos
app.get("/prestamos", (req, res) => {
    return res.json(Mis_Prestamos)
})

// Devuelve todos los préstamos de un libro concreto
// Ejemplo: /prestamos/libro/3 -> préstamos del libro 3
app.get("/prestamos/libro/:libro_id", (req, res) => {

    // Filtramos los préstamos cuyo libro_id coincida con el de la URL
    const prestamos = Mis_Prestamos.filter(a => a.libro_id == req.params.libro_id)

    // Si no hay ninguno, devolvemos 404
    if (prestamos.length === 0) return res.status(404).json({ error: "No hay préstamos para ese libro" })

    // Si hay, los devolvemos
    return res.json(prestamos)
})

// Crea un nuevo préstamo
app.post("/prestamos", (req, res) => {

    // Comprobamos que vengan los campos obligatorios
    if (!req.body.libro_id || !req.body.usuario || !req.body.fecha_prestamo || !req.body.fecha_devolucion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" })
    }

    // Creamos el nuevo préstamo con los datos que nos mandan
    let nuevoPrestamo = {
        id: Mis_Prestamos.length + 1,       // id automático
        libro_id: req.body.libro_id,        // id del libro prestado
        usuario: req.body.usuario,      // nombre del usuario
        fecha_prestamo: req.body.fecha_prestamo,        // fecha de préstamo
        fecha_devolucion: req.body.fecha_devolucion,        // fecha de devolución
        devuelto: req.body.devuelto ?? false        // por defecto false
    }

    // Lo añadimos al array
    Mis_Prestamos.push(nuevoPrestamo)

    // Devolvemos el préstamo creado con código 201
    return res.status(201).json(nuevoPrestamo)
})

// Borra un préstamo por su id
// Ejemplo: /prestamos/3 → borra el préstamo 3
app.delete("/prestamos/:id", (req, res) => {

    // Buscamos la posición del préstamo en el array
    const index = Mis_Prestamos.findIndex(a => a.id == req.params.id)

    // Si no existe, devolvemos 404
    if (index === -1) return res.status(404).json({ error: "Préstamo no encontrado" })

    // Si existe, lo borramos
    Mis_Prestamos.splice(index, 1)

    // Devolvemos mensaje de confirmación
    return res.send("Préstamo con id " + req.params.id + " eliminado")
})

// -----
