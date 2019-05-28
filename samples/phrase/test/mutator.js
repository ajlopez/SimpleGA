
const phrases = require('../lib/phrases');

exports['create and apply mutator to genotype'] = function (test) {
    const text = 'HELLO, WORLD!';
    const genotype = phrases.genotype(text);
    const mutator = phrases.mutator();
    
    const result = mutator.mutate(genotype);
    
    test.equal(genotype.evaluate(phrases.values(text)), text.length * 8);
    test.equal(result.evaluate(phrases.values(text)), text.length * 8 - 1);
};

