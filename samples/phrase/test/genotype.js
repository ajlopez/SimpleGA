
const phrases = require('../lib/phrases');

exports['create genotype with length'] = function (test) {
    const genotype = phrases.genotype(10);
    
    test.ok(genotype);
    test.equal(typeof genotype, 'object');
    
    const genes = genotype.genes();
    
    test.ok(genes);
    test.ok(Array.isArray(genes));
    test.equal(genes.length, 10);
    
    for (let k = 0; k < genes.length; k++)
        test.ok(genes[k].value() >= 0 && genes[k].value() < 32);
};

