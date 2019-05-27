
const phrases = require('../lib/phrases');

exports['create genotype with length'] = function (test) {
    const genotype = phrases.genotype(10);
    
    test.ok(genotype);
    test.equal(typeof genotype, 'object');
    
    const genes = genotype.genes();
    
    test.ok(genes);
    test.ok(Array.isArray(genes));
    test.equal(genes.length, 10);
    
    for (let k = 0; k < genes.length; k++) {
        const gene = genes[k];
        test.ok(gene.value() >= 0 && gene.value() < 32);
        const letter = gene.toString();
        test.ok(letter);
        test.equal(letter.length, 1);
        test.ok(letter >= 'A' && letter <= 'Z' || ' ,.!?;'.indexOf(letter) >= 0);
    }
};

exports['create genotype with phrase'] = function (test) {
    const genotype = phrases.genotype('HELLO, WORLD!');
    
    test.equal(genotype.toString(), 'HELLO, WORLD!');
};

exports['genotype to string'] = function (test) {
    const genotype = phrases.genotype(50);
    
    const result = genotype.toString();
    
    test.ok(result);
    test.equal(typeof result, 'string');
    test.equal(result.length, 50);
    
    for (let k = 0; k < result.length; k++) {
        const letter = result[k];
        test.ok(letter >= 'A' && letter <= 'Z' || ' ,.!?;'.indexOf(letter) >= 0);
    }
};

