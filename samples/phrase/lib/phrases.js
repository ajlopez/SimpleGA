
const letters = [];

for (let k = 0; k < 26; k++)
    letters[k] = String.fromCharCode(65 + k);

letters[26] = ' ';
letters[27] = ',';
letters[28] = '.';
letters[29] = '!';
letters[30] = '?';
letters[31] = ';';

function Gene() {
    const value = Math.floor(Math.random() * 32);
    
    this.value = function () { return value; };
    
    this.toString = function () { return letters[value]; };
}

function createGene() {
    return new Gene();
}

function Genotype(length) {
    const genes = [];
    
    for (let k = 0; k < length; k++)
        genes.push(createGene());
    
    this.genes = function () { return genes; };
    
    this.toString = function () {
        let result = '';
        
        for (let k = 0, l = genes.length; k < l; k++)
            result = result + genes[k].toString();
        
        return result;
    };
}

function createGenotype(length) {
    return new Genotype(length);
}

module.exports = {
    genotype: createGenotype
}

