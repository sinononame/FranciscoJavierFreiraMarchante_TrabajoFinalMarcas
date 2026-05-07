const express = require("express");
const app = express();
const port = 5555;

app.use(express.json())

app.listen(port, () => {

    console.log("Server abierto🐧")
})

//Datos

let Mi_Biblioteca = [
    {"id": 1, "Titulo": "La maldición de los sueños", "Autor/a": "Rebecca Ross", "Genero": "Fantasía", "Año": 2024, "Paginas": 448, "Disponible": true, "Editorial": "Puck"},
    
    {"id": 2, "Titulo": "Yumi y el pintor de pesadillas", "Autor/a": "Brandon Sanderson", "Genero": "Fantasía romántica", "Año": 2023, "Paginas": 496, "Disponible": true, "Editorial": "Nova"},
    
    {"id": 3, "Titulo": "El bestiario de Axlin", "Autor/a": "Laura Gallego", "Genero": "Fantasía", "Año": 2018, "Paginas": 312, "Disponible": true, "Editorial": "SM"},
    
    {"id": 4, "Titulo": "Trenza y el mar esmeralda", "Autor/a": "Brandon Sanderson", "Genero": "Fantasía", "Año": 2023, "Paginas": 432, "Disponible": true, "Editorial": "Nova"},
    
    {"id": 5, "Titulo": "El Imperio Final", "Autor/a": "Brandon Sanderson", "Genero": "Fantasía épica", "Año": 2006, "Paginas": 576, "Disponible": true, "Editorial": "Nova"}
];


// Interacciones

app.get("/", (req,res) => {
    return res.json(Mi_Biblioteca)
})

app.get("/mi_fav", (req,res) => {
    return res.json(Mi_Biblioteca[0])
})

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
    return res.status(201).json(nuevoLibro);  
})

app.put("/actualizar_libro", (req,res) => {

    Mi_Biblioteca[req.body.id-1].Titulo = req.body.Titulo;
    Mi_Biblioteca[req.body.id-1]["Autor/a"] = req.body["Autor/a"];
    Mi_Biblioteca[req.body.id-1].Genero = req.body.Genero;
    Mi_Biblioteca[req.body.id-1].Año = req.body.Año;
    Mi_Biblioteca[req.body.id-1].Paginas = req.body.Paginas;
    Mi_Biblioteca[req.body.id-1].Disponible = req.body.Disponible;
    Mi_Biblioteca[req.body.id-1].Editorial = req.body.Editorial;
    
    return res.json(Mi_Biblioteca[req.body.id-1])

})

app.delete("/borrar_libro", (req,res) => {

    const index = Mi_Biblioteca.findIndex(a => a.id == req.body.id)
    if (index === -1) return res.status(404).send("Libro no encontrado")
    Mi_Biblioteca.splice(index, 1)
    return res.send("Libro con id " + req.body.id + " eliminado")

})

//Route param
app.get("/libros/:id", (req, res) => {
    const libros = Mi_Biblioteca.find(a => a.id)
})


//Query param de nombre e id
app.get("/libros", (req, res) => {
    const libros = Mi_Biblioteca.find(a => a.Nombre == req.query.Nombre);
    return res.json(libros);
})

app.get("/libros", (req, res) => {
    const libros = Mi_Biblioteca.find(a => a.id == req.query.id);
    return res.json(libros);
})