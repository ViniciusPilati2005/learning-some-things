// tsc references.ts

// valor imutavel
const a = 10
console.log('Valor inicial do a:', a)

function increment(value) {
    value += 10
    console.log('Value na fn:', value)
    console.log('value é 20 pois está incrementando, o parametro seria apenas a referencia, porém sendo uma cópia do a, não o valor original')
}

increment(a)
console.log('a continua 10, mesmo executando a função, pois uma string é imutavel:',a , '\n')

// objetos
const b = { value: 'testing b'}
console.log('Valor inicial do b:', a)

function incrementObject(value: {value: string}) { 
    value.value = 'novo valor de b'
    console.log('como o objeto é mutavel, então eu altero o valor do objeto inteiro, não somente no escopo da função:', value)
}

incrementObject(b)
console.log('valor de b sendo chamado após função: ', b.value, '\n')


// vetores
const numbers = [1, 2, 3]
console.log('Valor inicial do array numbers:', numbers)

function resetNumbers(numbers:  number[]) {
    numbers.push(0)
    numbers[0] = 156
    console.log('função adicionando o valor de zero e adicionando 156 na primeira posição')
}

resetNumbers(numbers)
console.log('valor final de numbers após executar função:', numbers)

// Closures
function closure(a: string) {
    console.log(a)

    function ola() {
        console.log(a + 'zoio')
    }
    ola()
}

closure('everson')

// Closures com arrow
const closureComArrowFn = (text: string) => {
    console.log(text);

    (() => console.log(text + 'avemaria'))() // preciso executar a segunda função
};

closureComArrowFn('doido')