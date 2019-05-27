
const letters = [];

for (let k = 0; k < 26; k++)
    letters[k] = String.fromCharCode(65 + k);

letters[26] = ' ';
letters[27] = ',';
letters[28] = '.';
letters[29] = '!';
letters[30] = '?';
letters[31] = ';';

const allletters = letters.join('');

function Gene(value) {
    if (value == null)
        value = Math.floor(Math.random() * 32);
    else if (typeof value === 'string')
        value = allletters.indexOf(value[0]);
    
    this.value = function () { return value; };
    
    this.distance = function (val) {
        const r = val ^ value;
        let d = 0;
        
        for (let k = 1; k <= 128; k <<= 1)
            if (r & k)
                d++;
            
        return d;
    }
    
    this.toString = function () { return letters[value]; };
}

function Genotype(data) {
    let value;
    const genes = [];
    
    if (typeof data === 'string')
        for (let k = 0; k < data.length; k++)
            genes.push(createGene(data[k]));
    else
        for (let k = 0; k < data; k++)
            genes.push(createGene());
    
    this.genes = function () { return genes; };
    
    this.toString = function () {
        let result = '';
        
        for (let k = 0, l = genes.length; k < l; k++)
            result = result + genes[k].toString();
        
        return result;
    };
    
    this.value = function () { return value; };
    
    this.evaluate = function (values) {
        value = 0;
        
        for (let k = 0, l = genes.length; k < l; k++)
            value += 8 - genes[k].distance(values[k]);
        
        return value;
    }
}

function createGenotype(length) {
    return new Genotype(length);
}

function createGene(value) {
    return new Gene(value);
}

function textToValues(text) {
    const values = [];
    
    for (let k = 0, l = text.length; k < l; k++)
        values[k] = allletters.indexOf(text[k]);
    
    return values;
}

module.exports = {
    genotype: createGenotype,
    gene: createGene,
    values: textToValues
}

