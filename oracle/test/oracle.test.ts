import { assert } from "chai";
const Greeter = artifacts.require("Greeter");

contract("Greeter (TypeScript)", (accounts: string[]) => {
  const initialGreeting = "Hola, mundo";
  let greeter: any;

  before(async () => {
    greeter = await Greeter.new(initialGreeting);
  });

  it("debería devolver el saludo inicial", async () => {
    const greeting = await greeter.greet();
    assert.equal(greeting, initialGreeting);
  });

  it("debería permitir actualizar el saludo", async () => {
    const nuevoSaludo = "¡Hola desde TypeScript!";
    await greeter.setGreeting(nuevoSaludo);
    const resultado = await greeter.greet();
    assert.equal(resultado, nuevoSaludo);
  });
});
