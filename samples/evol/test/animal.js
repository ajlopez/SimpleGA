
var evol = require('../evol');

exports['create animal'] = function (test) {
    var animal = evol.createAnimal({ energy: 100 });
    
    test.ok(animal);
    test.equal(animal.energy(), 100);
}

exports['in world'] = function (test) {
    var animal = evol.createAnimal({ energy: 100, eat: 20 });
    var world = evol.createWorld(10, 10);
    animal.world(world);
    
    test.ok(animal.x() >= 0);
    test.ok(animal.y() >= 0);
    test.ok(animal.x() < 10);
    test.ok(animal.y() < 10);
}

exports['eat'] = function (test) {
    var animal = evol.createAnimal({ energy: 100, eat: 20 });
    var world = evol.createWorld(10, 10);
    world.seed(100, 200);
    animal.world(world);

    var value = world.value(animal.x(), animal.y());
    animal.eat();
    
    test.equal(animal.energy(), 120);
    test.equal(world.value(animal.x(), animal.y()) + 20, value);
}
