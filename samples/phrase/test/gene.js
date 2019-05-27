
const phrases = require('../lib/phrases');

exports['create gene with value'] = function (test) {
    const gene = phrases.gene(10);
    
    test.ok(gene);
    test.equal(gene.value(), 10);
};

exports['gene distance to value'] = function (test) {
    const gene = phrases.gene(1);
    
    test.equal(gene.distance(0), 1);
    test.equal(gene.distance(1), 0);
    test.equal(gene.distance(2), 2);
    test.equal(gene.distance(3), 1);
    test.equal(gene.distance(4), 2);
    test.equal(gene.distance(5), 1);
    test.equal(gene.distance(6), 3);
    test.equal(gene.distance(255), 7);
};

