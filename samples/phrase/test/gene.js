
const phrases = require('../lib/phrases');

exports['create gene with value'] = function (test) {
    const gene = phrases.gene(10);
    
    test.ok(gene);
    test.equal(gene.value(), 10);
};

