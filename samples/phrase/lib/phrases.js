
function Gene() {
    const value = Math.floor(Math.random() * 32);
    
    this.value = function () { return value; };
}

function createGene() {
    return new Gene();
}

function Genotype(length) {
    const genes = [];
    
    for (let k = 0; k < length; k++)
        genes.push(createGene());
    
    this.genes = function () { return genes; };
}

function createGenotype(length) {
    return new Genotype(length);
}

module.exports = {
    genotype: createGenotype
}

