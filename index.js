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
 
    {"id": 2, "libro_id": 2, "usuario": "María López", "fecha_prestamo": "20/04/2026", "fecha_devolucion": "04/05/2026", "devuelto": true},
    
    {"id": 3, "libro_id": 3, "usuario": "Carlos Ruiz", "fecha_prestamo": "03/04/2026", "fecha_devolucion": "17/05/2026", "devuelto": false},
    
    {"id": 4, "libro_id": 4, "usuario": "Laura Martínez", "fecha_prestamo": "20/04/2026", "fecha_devolucion": "24/04/2026", "devuelto": true},
    
    {"id": 5, "libro_id": 5, "usuario": "Sergio Díaz", "fecha_prestamo": "06/05/2026", "fecha_devolucion": "20/05/2026", "devuelto": false}
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

    let nuevoLibro = {
        id: Mi_Biblioteca.length + 1,
        Titulo: req.body.Titulo,
        "Autor/a": req.body["Autor/a"],
        Genero: req.body.Genero,
        Año: req.body.Año,
        Paginas: req.body.Paginas,
        Disponible: req.body.Disponible,
        Editorial: req.body.Editorial
    }

    Mi_Biblioteca.push(nuevoLibro);
    return res.status(201).json(nuevoLibro);  //El mensaje de HTTP 201 es "created"
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

//Query param de nombre
// para su uso "localhost:5555/libros?Titulo=El bestiario de Axlin" un libro en concreto
app.get("/libros", (req, res) => {

    // Si pones ?Titulo=algo -> busca por título
    if (req.query.Titulo) {
        const libro = Mi_Biblioteca.find(a => a.Titulo == req.query.Titulo)
        if (!libro) return res.status(404).json({ error: "Libro no encontrado" })
        return res.json(libro)
    }

    // Si no pones nada -> devuelve todos los libros
    return res.json(Mi_Biblioteca)
})

// -----
