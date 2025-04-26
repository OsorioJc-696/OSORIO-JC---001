//objetos

// let datos ={
//     nombres:"jose jhunior",
//     apellidos: "osorio cayetano",
//     dni: "70669932",
//     telefono: "918405247"

// };

// let nmb = datos["nombres"];
// let ap = datos["apellidos"];
// let dni = datos ["dni"];
// let telefono = datos["telefono"];

// frase= `mi nombre es: <b>${nmb}</b> <br>
// mi apellido son: <b>${ap}</b> <br>
// mi numero de dni es: <b>${dni}</b> <br>
// y por ultimo mi numeor de telefono son: <b>${telefono}`

//document.write(frase )

// //******************while
// let num=0;

// while(num<10){

//     num++;
//    // document.writeln(num)
//     if (num ==7){
//         break
//     }
// }

//*************************** FOR */

// for (let i = 0; i <20; i++){
//     if(i==12){
//         continue;
//     }
//     //document.writeln(i+ "<br>");
    
// }
//  // ******************** FOR IN
// let animales = ["gato","perro","conejo"]

//  for (animal in animales){
//     //document.writeln(animal+"<br>")
//     //document.writeln(animales[animal]+"<br>")
//  }
//  document.writeln("<br>")

//  // ******************** FOR OF
//  for (animal of animales){
//     //document.writeln(animal+"<br>")
//  }

//  array1= ["maria","ale","rosa","ana"];
//  array2 = [ "jose", "alex", "fran", array1,"juan"];

//  //document.writeln(array2[3][3])
//  //document.writeln(array2[3])

//  forjc:
//  for (let array in array2){
//     if(array == 3) {
//         for (let array of array1){
//            // document.write(array + "<br>")
//             continue forjc;            
//         }
//     } else {
//         //document.write(array2[array]+".<br>")
//     }
//  }


//  //********************FUNCIONES */

//  //+++++++++++++++++++++++++
// function saludar (){
// //alert("hola");
// return "function retormada"
// }
// let saludo = saludar();
// //document.write(saludo)

// //+++++++++++++++++++++++++
// function suma (num1,num2){
   
//    let res= num1+num2;
//    return res
// }

// let result = suma(12,13)
// //document.write(result)


// //+++++++++++++++++++++++++++
// function sald(nombre){
//     let frase = `hola ${nombre} como estas `;
//    // document.write(frase)
// }
// sald("alex")

//++++++++++++++++++++++++++


//*****************funcion flecha

// const saluda = (nomb) =>{
//     document.write("hola como esats : " + nomb)
// }
// saluda("pedroski")




// 


// const  sumar = ()=>{
//    let  num1= prompt("ing. num1: ");
//    let num2= prompt("ing. num2: ");

//    let result=parseInt(num1) + parseInt(num2);
//     document.write(result) 
// }

// const  restar = ()=>{
//     let  num1= prompt("ing. num1: ");
//     let num2= prompt("ing. num2: ");
 
//     let result=parseInt(num1)- parseInt(num2);
//      document.write(result)
//  }
//  const  multiplicar = ()=>{
//     let  num1= prompt("ing. num1: ");
//     let num2= prompt("ing. num2: ");
 
//     let result=parseInt(num1)*parseInt(num2);
//      document.write(result)
//  }
//  const  dividir = ()=>{
//     let  num1= prompt("ing. num1: ");
//     let num2= prompt("ing. num2: ");
 
//     let result=parseInt(num1)/parseInt(num2);
//      document.write(result)
//  }

//  const seleccionar = () => {
//     let operar = prompt(" 1) suma \n 2) resta \n 3) multiplicacion \n 4) division")
//     if(parseInt(operar) ==1){
//         sumar()
//     }else if(parseInt(operar) ==2){
//         restar()
//     }else if(parseInt(operar) ==3){
//         multiplicar()
//     }else if(parseInt(operar) ==4){
//         dividir()
//     }
//     else{
//         document.write("opcion no valida")
//     }
//     }
// seleccionar()
// seleccionar()
// seleccionar()
// seleccionar()

//*******************
// 





// const verficarPar = () =>{
//     let num1 = parseInt(prompt("ingrese num1: "));
//     if(num1%2 ==0){
//         document.write("el numero es par")
//     }else{
//         document.write("el numero es impar")
//     }
// }
// verficarPar()

// const notaAlumno = () =>{
//     let nota = parseInt(prompt("ingrese nota: "));
//     if(nota >= 0 && nota < 35){
//         document.write("F")
//     }else if(nota >= 35 && nota < 50){
//         document.write("D")
//     }else if(nota >= 50 && nota < 75){
//         document.write("C")
//     }else if(nota >= 75 && nota < 90){
//         document.write("B")
//     }else if(nota >= 90 && nota <= 100){
//         document.write("A")
//     }else{
//         document.write("nota no valida")
//     }
// }
// notaAlumno()

// // numero de 1 - 100
// for (let i=1; i<101;i++){
//     document.write(i+"<br>")
// }

// //numero de 100 - 1
// for (let i=100; i>0;i--){
//     document.write(i+"<br>")
// }

// // multiplicacion de un numero
// let num = parseInt(prompt("ingrese numero: "));
// for (let i=1; i<=12;i++){
//     document.write(num+" x "+i+" = "+num*i+"<br>")
// }

// // //tabla de multiplicar de 1 al 10
// for (let i=1; i<=12;i++){
//     document.write("Tabla del "+i+"<br>")
//     for (let j=1; j<=10;j++){
//         document.write(i+" x "+j+" = "+i*j+"<br>")
//     }
//     document.write("<br>")
// }

// const factorial =()=>{
//     let num =parseInt(prompt("Ingrese un numero: "));
//     let fact = 1;
//     for(let i=1; i<=num; i++){
//         fact=fact*i;
//     }
//     document.write("el factorial de "+num+" es: "+fact)

// }
// factorial()

// const fibonacci =()=>{
//     let num =parseInt(prompt("Ingrese un numero: "));
//     let a=0, b=1, c;
//     for(let i=0; i<num; i++){
//         c=a+b;
//         a=b;
//         b=c;
//         document.write(c+"<br>")
//     }
// }
// fibonacci()

// const palindromo =()=>{
//     let palabra = prompt("Ingrese una palabra: ");
//     let pal = palabra.split("").reverse().join("");

//     if(palabra == pal){
//         document.write(" es palindromo")
//     }else{
//         document.write(" no es palindromo")
//     }
// }
// palindromo()

// const array = [10,60,50,40,130];
// let mayor = array[0];
// let menor = array[0];
// let suma = 0;
// let promedio = 0;

// for (let i=0; i<array.length; i++){
//     if(array[i]>mayor){
//         mayor=array[i];
//     }
//     if(array[i]<menor){
//         menor=array[i];
//     }
//     suma+=array[i];
// }

// const obtenerIniciales = () => {
//     let nombreCompleto = prompt("Ingrese su nombre completo: ");
//     let iniciales = "";
//     for (let palabra of nombreCompleto.split(" ")) {
//         iniciales += palabra[0].toUpperCase();
//     }
//     document.write("Las iniciales son: " + iniciales);
// };
// obtenerIniciales();

// const toTitleCase = () => {
//     let frase = prompt("Ingrese una frase: ");
//     let palabras = frase.split(" ");
//     let fraseTitleCase = palabras.map(palabra => 
//         palabra[0].toUpperCase() + palabra.slice(1).toLowerCase()
//     ).join(" ");
//     document.write("Frase en Title Case: " + fraseTitleCase);
// };
// toTitleCase();

// const mostrarNumerosPrimos = () => {
//     let limite = parseInt(prompt("Ingrese un número: "));
//     document.write("Números primos hasta " + limite + ":<br>");
    
//     const esPrimo = (num) => {
//         if (num < 2) return false;
//         for (let i = 2; i <= Math.sqrt(num); i++) { // Usamos la raíz cuadrada para optimizar
//             if (num % i === 0) return false; // Si encontramos un divisor, no es primo
//         }
//         return true; // Si no encontramos divisores, es primo
//     };

//     for (let num = 2; num <= limite; num++) {
//         if (esPrimo(num)) {
//             document.write(num + "<br>");
//         }
//     }
// };
// mostrarNumerosPrimos();


// const adivinarNumero = () => {
//     const numeroSecreto = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
//     let intento;

//     do {
//         intento = parseInt(prompt("Adivina el número (entre 1 y 10): "));
//         if (intento < numeroSecreto) {
//             alert("El número es mayor.");
//         } else if (intento > numeroSecreto) {
//             alert("El número es menor.");
//         } else {
//             alert("¡Felicidades! Adivinaste el número.");
//         }
//     } while (intento !== numeroSecreto);
// };

// adivinarNumero();


// const calcularPromedio = (matriz) => {
//     if (matriz.length === 0) return 0; // Evitar división por cero
//     const suma = matriz.reduce((acumulador, numero) => acumulador + numero, 0);
//     return suma / matriz.length;
// };

// // Ejemplo de uso
// const numeros = [10, 20, 30, 40, 50];
// document.write("El promedio es: " + calcularPromedio(numeros));

// const persona = {
//     nombre: "jose",
//     apellido: "osorio",
//     edad: 25,
//     dni: 70669932,
//     telefono: 918405247
// };

// function saludar(persona) {
//     document.write(`Hola ${persona.nombre} ${persona.apellido}, tienes ${persona.edad} años.`);
// }

// saludar(persona);

// const contactos = [];

// const agregarContacto = () => {
//     const nombre = prompt("Ingrese el nombre del contacto:");
//     const telefono = prompt("Ingrese el teléfono del contacto:");
//     const correo = prompt("Ingrese el correo electrónico del contacto:");
//     contactos.push({ nombre, telefono, correo });
//     alert("Contacto agregado exitosamente.");
// };

// const mostrarContactos = () => {
//     if (contactos.length === 0) {
//         document.write("No hay contactos en la lista.<br>");
//         return;
//     }
//     document.write("Lista de contactos:<br>");
//     contactos.forEach((contacto, index) => {
//         document.write(`${index + 1}. Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono}, Correo: ${contacto.correo}<br>`);
//     });
// };

// const buscarContacto = () => {
//     const nombre = prompt("Ingrese el nombre del contacto a buscar:");
//     const resultado = contactos.filter(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase());
//     if (resultado.length > 0) {
//         document.write("Contacto(s) encontrado(s):<br>");
//         resultado.forEach(contacto => {
//             document.write(`Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono}, Correo: ${contacto.correo}<br>`);
//         });
//     } else {
//         document.write("No se encontró ningún contacto con ese nombre.<br>");
//     }
// };

// const eliminarContacto = () => {
//     const nombre = prompt("Ingrese el nombre del contacto a eliminar:");
//     const indice = contactos.findIndex(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase());
//     if (indice !== -1) {
//         contactos.splice(indice, 1);
//         alert("Contacto eliminado exitosamente.");
//     } else {
//         alert("No se encontró ningún contacto con ese nombre.");
//     }
// };

// const menu = () => {
//     let opcion;
//     do {
//         opcion = parseInt(prompt("Seleccione una opción:\n1. Agregar contacto\n2. Mostrar contactos\n3. Buscar contacto\n4. Eliminar contacto\n5. Salir"));
//         switch (opcion) {
//             case 1:
//                 agregarContacto();
//                 break;
//             case 2:
//                 mostrarContactos();
//                 break;
//             case 3:
//                 buscarContacto();
//                 break;
//             case 4:
//                 eliminarContacto();
//                 break;
//             case 5:
//                 alert("Saliendo del programa.");
//                 break;
//             default:
//                 alert("Opción no válida.");
//         }
//     } while (opcion !== 5);
// };

// menu();