
const pantalla = document.getElementById('pantalla');
const historial = document.getElementById('historial');

let num1 = ''; 
let num2 = '';                         
let operador = '';  
let numnew = false; 
let punto = '';               
let listaHistorial = [];                
let contador = 0;


const opera = ['+', '-', '*', '/']; 



 function addNumber(num) {

   if (pantalla.textContent === '0') {             
    pantalla.textContent = num;                        
  } else  {
    pantalla.textContent += num;                    
                               
  }
 
 
}


  function addOperator(op) {
      
    

    let lastc = pantalla.textContent[pantalla.textContent.length - 1];
    // NO PERMITE INGRESAR UN OPERADOR DESPUES DE OTRO OPERADOR 
    if ( opera.includes(lastc) ) return; 
    // NO PERMITE INGRESAR UN OPERADOR DESPUES DE UN PUNTO                               
    if (lastc === '.') return;                                          


   if (numnew) {
    calculate();
   }
    // AGREGA EL OPERADOR A LA PANTALLA
    pantalla.textContent += op;     
    // ALMACENA EL OPERADOR SELECCIONADO PARA USARLO EN EL CALCULO                                      
    operador = op;                                                                 
    numnew = true;              
    contador = 0;                               
}



  function calculate() {
     
    

    // NO PERMITE CALCULAR SI NO HAY UN OPERADOR SELECCIONADO
    if (!operador) return;
    // NO PERMITE CALCULAR SI SOLO HAY UN CERO
    if (pantalla.textContent === '0') return; 
    // NO PERMITE DOS IGUALES EN PANTALLA
    if (pantalla.textContent.includes('=')) return;
    

    let array = pantalla.textContent.split(/(?<=\d)[+\-*\/]/)  
    console.log(array);
    num1 = array[0];                               
    num2 = array[1];

    // NO PERMITE CALCULAR SI NO HAY UN SEGUNDO NUMERO
    if (!num2) return;
    

    //EVALUA EL OPERADOR
    if (operador === '+') {
        pantalla.textContent = Number(num1) + Number(num2); 
    }else if (operador === '-') {
        pantalla.textContent = Number(num1) - Number(num2);
        
    } else if (operador === '*') {                           
        pantalla.textContent = Number(num1) * Number(num2);
         
    } else if (operador === '/') {
        pantalla.textContent = Number(num1) / Number(num2);
         
    }
    
    // AGREGA LAS OPERACIONES AL HISTORIAL
    const nuevaEntrada = `<p class="operacion" style="cursor:pointer">${num1} ${operador} ${num2} = ${pantalla.textContent}</p>`;
    historial.insertAdjacentHTML('beforeend', nuevaEntrada);


    numnew = false;
    contador = 0;
 
}


function addDecimal(point) {

  // UN PUNTO POR NUMERO
  if (contador === 1) return;

  // NO PERMITE MAS DE UN PUNTO SEGUIDO
  const last = pantalla.textContent[pantalla.textContent.length - 1];
  if (last === '.') return;  
  // NO PERMITE INGRESAR UN PUNTO SI LA PANTALLA ESTA VACIA
  if (pantalla.textContent === "") return;
  
  // NO PERMITE INGRESAR UN PUNTO DESPUES DE UN NUMERO CON PUNTO
  const ptwo = pantalla.textContent[pantalla.textContent.length - 2];
  if (ptwo === '.') return;  

  // EVITA QUE SE INGRESE UN PUNTO DESPUES DE UN OPERADOR
  if (opera.includes(last)) return; 

  pantalla.textContent += point;
  contador++;
 
}




function clearDisplay() {
  pantalla.textContent = '0';
  
}


const supr = () => {
  const texto = pantalla.textContent;
  pantalla.textContent = texto.slice(0, -1);
  numnew = false;
}




historial.addEventListener("click", function(e) {
    if (e.target.classList.contains("operacion")) {
        let texto = e.target.textContent;          
        let partes = texto.split("=");
        let resultado = partes[1].trim(); 
        pantalla.textContent = resultado;
        numnew = false;
    }
});





















 