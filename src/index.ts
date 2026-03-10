export const multiplicar = (a: number, b: number): number => {
  return a * b;
};

export const saudacao = (nome: string): string => {
  return `Olá ${nome}`;
};

const resultado = multiplicar(6, 7);
const mensagem = saudacao("Maria");

console.log("Multiplicacao:", resultado);
console.log("Saudacao:", mensagem);
