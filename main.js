let tablero = document.querySelector('canvas');
let contenido_tablero = tablero.getContext('2d')
let tamaño_bloque = 20;
let tablero_ancho = 14;
let tablero_alto = 30;
let puntuacion = 0;

let iniciar_juego = document.querySelector('#iniciar')

//botones para movil

let Up = document.getElementById('Up')
let Left = document.getElementById('Left')
let Right = document.getElementById('Right')
let Down = document.getElementById('Down')


//pintando tablero 

tablero.width = tablero_ancho * tamaño_bloque ;
tablero.height = tablero_alto * tamaño_bloque;

contenido_tablero.scale(tamaño_bloque, tamaño_bloque)

const pintarTablero = []
for(let columna = 0; columna < tablero_alto; columna++ ){
    pintarTablero[columna] = [];
    for(let fila = 0; fila < tablero_ancho; fila++ ){
        pintarTablero[columna][fila] = 0;
    }
}

//piesas

const piesa = {
    pocision: {x: 5, y: 0},
    forma: [
            [1,1],
            [1,1]
    ]
    
}

//piesas

const piesas = [
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1,1,1],
        
    ],
    [
        [1,0],
        [1,0],
        [1,1]
    ],
    [
        [1,1,0],
        [0,1,1]
    ],
]
//inicializar tablero 
function iniciar_tablero(){
    contenido_tablero.fillStyle = '#ccc'
    contenido_tablero.fillRect(0, 0, tablero.width,tablero.height )  
    pintarTablero.forEach((row, y) =>{
        row.forEach((value, x)=>{
            if(value === 0){
                contenido_tablero.fillStyle = 'red'
                contenido_tablero.fillRect(x, y, 1, 1)
            }
        })
    })
}

//Inicializar movimiento tablero
let contador = 0;
let tiempo = 0 ;
function actualizar(time = 0){
    const TodoTiempo = time - tiempo
    tiempo = time 

    contador += TodoTiempo
    if(contador > 1000){
        piesa.pocision.y++
        contador = 0

        if(colicionar()){
            piesa.pocision.y--
            solificar()
            remover()
        }
    }
    iniciar()
    requestAnimationFrame(actualizar)
}

function iniciar(){
    contenido_tablero.fillStyle = '#ccc'
    contenido_tablero.fillRect(0, 0, tablero.width,tablero.height )  
    pintarTablero.forEach((row, y) =>{
        row.forEach((value, x)=>{
            if(value === 0){
                contenido_tablero.fillStyle = 'red'
                contenido_tablero.fillRect(x, y, 1, 1)
            }
        })
    })
    piesa.forma.forEach((row, y)=>{
        row.forEach((value, x)=>{
            if(value){
                contenido_tablero.fillStyle = 'green'
                contenido_tablero.fillRect(x + piesa.pocision.x, y + piesa.pocision.y, 1, 1)
            }
        })
    })

    document.querySelector('span').innerText = puntuacion
}


// Movimiento de piesas

document.addEventListener('keydown', event =>{
    if(event.key === 'ArrowLeft'  ) {
        piesa.pocision.x--
        if(colicionar()){
            piesa.pocision.x++
        }
        }
    if(event.key === 'ArrowRight'){
        piesa.pocision.x++
        if(colicionar()){
            piesa.pocision.x--
        }
        }
    if(event.key === 'ArrowDown'){
        piesa.pocision.y++
        if(colicionar()){
            piesa.pocision.y--
            solificar()
            remover()
        }
    }
    if(event.key === 'ArrowUp'){
        const rotar = []

        for(let i = 0; i < piesa.forma[0].length; i++){
            const row = []

            for(let j = piesa.forma.length - 1; j >= 0; j--){
                row.push(piesa.forma[j][i])
            }

            rotar.push(row)
        }
        const revisarPiesa = piesa.forma
        piesa.forma = rotar
        if(colicionar()){
            piesa.forma = revisarPiesa
        }
        
    }
})
addEventListener('click',event => {
    if(event.target.id === 'Left'  ) {
        piesa.pocision.x--
        if(colicionar()){
            piesa.pocision.x++
        }
        }
    if(event.target.id === 'Right'){
        piesa.pocision.x++
        if(colicionar()){
            piesa.pocision.x--
        }
        }
    if(event.target.id === 'Down'){
        piesa.pocision.y++
        if(colicionar()){
            piesa.pocision.y--
            solificar()
            remover()
        }
    }
    if(event.target.id === 'Up'){
        console.log(event)
        const rotar = []

        for(let i = 0; i < piesa.forma[0].length; i++){
            const row = []

            for(let j = piesa.forma.length - 1; j >= 0; j--){
                row.push(piesa.forma[j][i])
            }

            rotar.push(row)
        }
        const revisarPiesa = piesa.forma
        piesa.forma = rotar
        if(colicionar()){
            piesa.forma = revisarPiesa
        }
        
    }
})

// colucionar

function colicionar(){
    return piesa.forma.find((row, y)=>{
        return row.find((value, x)=>{
            return (
                value != 0 &&
                pintarTablero[y + piesa.pocision.y]?.[x + piesa.pocision.x] !=0
            )
        })
    })
}

// solificar 

function solificar(){
    piesa.forma.forEach((row, y)=>{
        row.forEach((value, x)=>{
            if(value === 1){
                pintarTablero[y + piesa.pocision.y][x + piesa.pocision.x] = 1
            }
        })
    })

    piesa.forma = piesas[Math.floor(Math.random()*piesas.length)]

    piesa.pocision.x = tablero_ancho / 2 - 2
    piesa.pocision.y = 0

    if(colicionar()){
        window.alert("GAME OVER")
        pintarTablero.forEach((row)=>row.fill(0))
    }
}
//mostrar piesa siguiente 



//eliminar fila 

function remover(){
    const removerFila = []

    pintarTablero.forEach((row, y)=>{
        if(row.every(value => value === 1)){
            removerFila.push(y)
        }
    })

    removerFila.forEach(y => {
        pintarTablero.splice(y, 1)
        const nuevaFila = Array(tablero_ancho).fill(0)
        pintarTablero.unshift(nuevaFila)
        puntuacion += 10
    })
}
iniciar_tablero()
iniciar_juego.addEventListener('click', event =>{
    const audio = new Audio('tetris.mp3')
    audio.volume = 0.5
    audio.play()
    audio.loop = true;
    console.log(event)
    actualizar()
    
})

