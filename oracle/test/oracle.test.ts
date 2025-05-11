import { assert } from "chai";
const Greeter = artifacts.require("Greeter");

contract("Greeter (TypeScript)", (accounts: string[]) => {
  const initialGreeting = "Hello, world";
  let greeter: any;

  before(async () => {
    greeter = await Greeter.new(initialGreeting);
  });

  it("should return the initial greeting", async () => {
    const greeting = await greeter.greet();
    assert.equal(greeting, initialGreeting);
  });

  it("should allow updating the greeting", async () => {
    const newGreeting = "Hello from TypeScript!";
    await greeter.setGreeting(newGreeting);
    const result = await greeter.greet();
    assert.equal(result, newGreeting);
  });
});
