import {Server} from "../src/presentation/server";
import {main} from "../src/app";
import { envs } from "../src/config";


jest.mock('../src/presentation/server');


describe('Shoud call server with argument and start', ()=>{

    test('Should Work', async()=>{
        await main();

        // expect(Server).toHaveBeenCalled();
        expect(Server).toHaveBeenCalledWith({
            port : envs.PORT,
            routes : expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalled();

    });
});








































// import {sum, isEven, divide, multiply, concatenate, isPrime} from '../src/app';

// describe('Testing App.ts', ()=> {

//     test('sum adds 1 +2 to equla 3', ()=>{
//         // Arrange 
//         const a =1;
//         const b =2;
//         const expectedSum = 3;

//         // Act
//         const result =  sum(a, b);

//         //Assert
//         expect(result).toBe(expectedSum);

//     });

//     test('isEvent return tru for even numbers', ()=>{
//         // Arrange 
//         const n = 4;
//         const expected = true;

//         // Act 
//         const result = isEven(n);

//         // Assert 
//         expect(result).toBe(expected);
//     });

//     test("isEvent return false for even numbers",()=>{
//         // Arrange 
//         const n = 5;
//         const expected = false;

//         // Act 
//         const result = isEven(n);

//         // Assert 
//         expect(result).toBe(expected);
//     });
// });

// describe('Testing divide function', ()=>{
//     test('divide entre dos numeros 6/2 =3', ()=>{
//         // Arrange 
//         const a =6;
//         const b =2;
//         const divideNumber = 3;

//         // Act
//         const result =  divide(a, b);

//         //Assert
//         expect(result).toBe(divideNumber);

//     });


//     test('divide entre dos numeros -6/2 = -3', ()=>{
//         // Arrange 
//         const a = -6;
//         const b =2;
//         const divideNumber = -3;

//         // Act
//         const result =  divide(a, b);

//         //Assert
//         expect(result).toBe(divideNumber);

//     });

//     test('erro cuando el valor sea cero', ()=>{


//         // // Arrange 
//         // const a =6;
//         // const b =0;

//         // // Act
//         // const result =  divide(a, b);


//         //Assert
//         // con  el throw se manda como callback 
//         expect(()=> divide(6, 0)).toThrow('Cannot divide by zero');

//     });
// });


// describe("Testing multiply funtion", ()=>{
//     test("Multiplicaion con dos mumeros positivos", ()=>{
//         // Arrange 
//         const a = 2;
//         const b = 3;
//         const result = 6;

//         // Act
//         const multiplicacion = multiply(a, b);

//         //Assert
//         expect(multiplicacion).toBe(result);
//     });

//     test("Multiplicaion con un numero positivo con un numero negativo", ()=>{
//         // Arrange 
//         const a = -2;
//         const b = 3;
//         const result = -6;

//         // Act
//         const multiplicacion = multiply(a, b);


//         //Assert
//         expect(multiplicacion).toBe(result);
//     });

//     test("Multiplicaion con el cero", ()=>{
//         // Arrange 
//         const a = 0;
//         const b = 10000;
//         const result = 0;

//         // Act
//         const multiplicacion = multiply(a, b);


//         //Assert
//         expect(multiplicacion).toBe(result);
//     });
// });


// describe("Concatenar dos palabras", ()=>{
//     test('prueba para 2 palabras', ()=>{
        
//         const str1 = 'Ismael';
//         const str2 =  'Alvarez';

//         const  result =  'IsmaelAlvarez'

//         const concatenateString =  concatenate(str1, str2);

//         expect(concatenateString).toBe(result)
//     });

//     test('prueba si el str1 es numero y el str2 un string', ()=>{
//         expect(()=> concatenate(2, "Ismael")).toThrow('El agumento debe ser un string')
//     });

//     test('prueba si el str1 es un string y el str2 es un number', ()=>{
//         expect(()=> concatenate("Ismael", 3)).toThrow('El agumento debe ser un string')
//     });
// });

// describe("number is Prime", ()=>{

//     test('El argumento debe ser un nuemero', ()=>{
//         expect(()=> isPrime("dsfd")).toThrow("El argumento debe ser un numero")
//     });

//     test('El argumento debe ser mayor a 0', ()=>{
//         expect(()=> isPrime(-60)).toThrow("el argumento debe ser mayor a cero")
//     });

//     test('El argumento debe ser un valor integro', ()=>{
//         expect(()=> isPrime(10.16)).toThrow("El valor debes ser sin decimales")
//     });

//     test("valor no es primo return un false", ()=>{

//         const number = 4;
//         const expected =  false;

//         const result =  isPrime(number);

//         expect(result).toBe(expected)
//     });

//     test("valor si es primo return un true", ()=>{

//         const number = 3;
//         const expected =  true;

//         const result =  isPrime(number);
        
//         expect(result).toBe(expected)
//     });
// });



