// =====================
// Funções Lógicas
// =====================

// Retorna true se TODOS os valores forem verdadeiros
export function and(...args: boolean[]): boolean {
  return args.every(Boolean);
}

// Retorna true se ALGUM valor for verdadeiro
export function or(...args: boolean[]): boolean {
  return args.some(Boolean);
}

// Retorna a negação de um valor booleano
// Ou, se receber múltiplos, true se ALGUM for falso
export function not(...args: boolean[]): boolean {
  if (args.length === 1) return !args[0];
  return !and(...args);
}

// =====================
// Funções de Comparação Numérica
// =====================

export function gt<T extends number | string>(...args: T[]): boolean {
  if (args.length < 2) throw new Error("gt requires at least 2 arguments");
  return args.every((val, i) => i === 0 || val > args[i - 1]);
}

export function gte<T extends number | string>(...args: T[]): boolean {
  if (args.length < 2) throw new Error("gte requires at least 2 arguments");
  return args.every((val, i) => i === 0 || val >= args[i - 1]);
}

export function lt<T extends number | string>(...args: T[]): boolean {
  if (args.length < 2) throw new Error("lt requires at least 2 arguments");
  return args.every((val, i) => i === 0 || val < args[i - 1]);
}

export function lte<T extends number | string>(...args: T[]): boolean {
  if (args.length < 2) throw new Error("lte requires at least 2 arguments");
  return args.every((val, i) => i === 0 || val <= args[i - 1]);
}

// =====================
// Igualdade Estrita
// =====================

export function eq<T>(...args: T[]): boolean {
  if (args.length < 2) throw new Error("eq requires at least 2 arguments");
  return args.every((val) => val === args[0]);
}
