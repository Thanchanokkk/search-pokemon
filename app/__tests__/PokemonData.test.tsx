
import { pokemons } from '../__mocks__/Pokemon';

describe('Pokemon Test', () => {
  test('Pokemon have Bulbasaur and type Grass', () => {
    const bulbasaur = pokemons.find(p => p.name === 'Bulbasaur');
    expect(bulbasaur?.type).toBe("Grass");
  });
});

describe('Pokemon Test', () => {
  test('Pokemon have Charmander and type Fire', () => {
    const charmander = pokemons.find(p => p.name === 'Charmander');
    expect(charmander?.type).toBe("Fire");
  });
});

describe('Pokemon Test', () => {
  test('Pokemon have Squirtle and type Squirtle', () => {
    const squirtle = pokemons.find(p => p.name === 'Squirtle');
    expect(squirtle?.type).toBe("Water");
  });
});

//EXAM FOR TEST

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });