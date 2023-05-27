import { expect, test } from "vitest";
import WoodenPickaxe from "../src/minemc/items/pickaxe/wooden_pickaxe";
 
test("wooden_pickaxe", () => {
  const wooden_pickaxe = new WoodenPickaxe();
  expect(wooden_pickaxe.getEfficiency()).toBe(1 + wooden_pickaxe.getLevel());
  wooden_pickaxe.addLevel(1);
  expect(wooden_pickaxe.getEfficiency()).toBe(1 + wooden_pickaxe.getLevel());
});