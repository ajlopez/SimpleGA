
const simplega = require('../..');
const phrases = require('./lib/phrases');

const phrase = process.argv[2];
const values = phrases.values(phrase);

const population = [];

for (let k = 0; k < 1000; k++)
    population.push(phrases.genotype(phrase.length));

const engine = simplega.engine();

engine.population(population);
engine.mutators([ phrases.mutator() ]);
engine.crossovers([ phrases.crossover() ]);

for (let k = 0; k < 1000; k++) {
    engine.evolve(values);
    const best = simplega.bests(engine.population(), 1)[0];
    console.log(k, best.toString(), best.value());
    
    if (best.value() === phrase.length * 8)
        break;
}

