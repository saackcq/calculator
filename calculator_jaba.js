
const pantalla = document.getElementById('pantalla');
const historial = document.getElementById('historial');

let num1 = ''; 
let num2 = '';                         
let operador = '';  
let numnew = false; 
let punto = '';               
let listaHistorial = [];                

const opera = ['+', '-', '*', '/']; 



 function addNumber(num) {

   if (pantalla.textContent === '0') {             
    pantalla.textContent = num;                        
  } else  {
    pantalla.textContent += num;                    
     numnew = true;                            
  }
 
 
}


  function addOperator(op) {
      
    let lastc = pantalla.textContent[pantalla.textContent.length - 1]; 
    if ( opera.includes(lastc) ) return;                                // NO PERMITE INGRESAR UN OPERADOR DESPUES DE OTRO OPERADOR
    if (lastc === '.') return;                                          // NO PERMITE INGRESAR UN OPERADOR DESPUES DE UN PUNTO


   if (numnew) {
    calculate();
   }

    pantalla.textContent += op;                                        // AGREGA EL OPERADOR A LA PANTALLA
    operador = op;                                                     // ALMACENA EL OPERADOR SELECCIONADO PARA USARLO EN EL CALCULO               
                     
                                   
}



  function calculate() {
                  
    
    let array = pantalla.textContent.split(/(?<=\d)[+\-*\/]/)  
    console.log(array);
    num1 = array[0];                               
    num2 = array[1];

    if (operador === '+') {
        pantalla.textContent = Number(num1) + Number(num2); 
        historial.innerHTML += `<p class="operacion" style="cursor:pointer">${num1} ${operador} ${num2} = ${pantalla.textContent}</p>`;  
    }else if (operador === '-') {
        pantalla.textContent = Number(num1) - Number(num2);
        historial.innerHTML += `<p class="operacion" style="cursor:pointer">${num1} ${operador} ${num2} = ${pantalla.textContent}</p>`;  
    } else if (operador === '*') {                           
        pantalla.textContent = Number(num1) * Number(num2);
        historial.innerHTML += `<p class="operacion" style="cursor:pointer">${num1} ${operador} ${num2} = ${pantalla.textContent}</p>`;  
    } else if (operador === '/') {
        pantalla.textContent = Number(num1) / Number(num2);
        historial.innerHTML += `<p class="operacion" style="cursor:pointer">${num1} ${operador} ${num2} = ${pantalla.textContent}</p>`;   
    }
    
    numnew = false;

 
}


function addDecimal(point) {
  
  // NO PERMITE MAS DE UN PUNTO SEGUIDO
  const last = pantalla.textContent[pantalla.textContent.length - 1];
  if (last === '.') return;  
  
  // NO PERMITE INGRESAR UN PUNTO DESPUES DE UN NUMERO CON PUNTO
  const ptwo = pantalla.textContent[pantalla.textContent.length - 2];
  if (ptwo === '.') return;  

  // EVITA QUE SE INGRESE UN PUNTO DESPUES DE UN OPERADOR
  if (opera.includes(last)) return;  

  pantalla.textContent += point;

}




function clearDisplay() {
  pantalla.textContent = '0';

}


const supr = () => {
  const texto = pantalla.textContent;
  pantalla.textContent = texto.slice(0, -1);
}









historial.addEventListener("click", function(e) {
    if (e.target.classList.contains("operacion")) {
        let texto = e.target.textContent;          
        let resultado = texto.split("=")[1].trim(); 
        pantalla.textContent = resultado;
    }
});





















 