define([
  'Gizmo/helpers/Dot'
], function(Dot) {

  describe('Gizmo/helpers/Dot', function() {
    var PristineDot;

    beforeEach(function() {
      PristineDot = Dot.construct();
    });

    afterEach(function() {
      Dot = PristineDot;
    });

    describe('#create', function() {
      it('Should create an instance of Gizmo/helpers/Dot.', function() {
        Dot.construct().should.equal.Dot;
      });

      it('Should except arguments for arbitrary number of mixins and return the object.', function() {
        var mixin, moreMixin, dot;

        mixin = {item: 'item'};
        moreMixin = {cat: 'ronnie'};

        dot = Dot.construct(mixin, moreMixin);

        dot.should.have.property('item', 'item');
        dot.should.have.property('cat', 'ronnie');
      });

      it('Should not clober original Gizmo/helpers/Dot with mixins.', function() {
        var mixin, dot;

        mixin = {item: 'item'};

        dot = Dot.construct(mixin);

        Dot.should.not.have.property('item');
      });
    });

    describe('#mixin', function() {
      it('Should mixin methods and properties into static Dot.', function() {
        var mixin = {
          item: 'item',
          doStuff: function() {
            return 'stuff';
          }
        };

        Dot.mixin(mixin);

        Dot.should.have.property('item', 'item');
        Dot.should.have.property('doStuff', mixin.doStuff);
      });

      it('Should allow multiple mixins.', function() {
        var mixin, moreMixin, evenMoreMixin;

        mixin = {item: 'item'};
        moreMixin = {cat: 'ronnie'};
        evenMoreMixin = {color: 'blue'};

        Dot.mixin(mixin, moreMixin, evenMoreMixin);

        Dot.should.have.property('item', 'item');
        Dot.should.have.property('cat', 'ronnie');
        Dot.should.have.property('color', 'blue');
      });

      it('Should not clober Gizmo/helpers/Dot with instance Gizmo/helpers/Dot.', function() {
        var dot = Dot.construct();

        dot.mixin({
          item: 'item'
        });

        Dot.should.not.have.property('item');
      });

      it('Should return dot with mixin.', function() {
        var dot, mixin;

        dot = Dot.construct();

        mixin = dot.mixin({
          item: 'item'
        });

        dot.should.equal(mixin);
      });
    });

    describe('#extend', function() {
      it('Should copy arbitrary number of object methods and properties to target.', function() {
        var source, anotherSource, object;

        source = {item: 'item'};
        anotherSource = {cat: 'ronnie'};
        object = {};

        Dot.extend(object, source, anotherSource);

        object.should.have.property('item', 'item');
        object.should.have.property('cat', 'ronnie');
      });

      it('Should return extended object.', function() {
        var object, returned;

        object = {};

        returned = Dot.extend(object, {item: 'item'});

        returned.should.equal(object);
      });
    });

    describe('#has', function() {
      it('Should determine if an object has own property.', function() {
        var object = {item: 'item'};

        Dot.has(object, 'toString').should.be.false;
        Dot.has(object, 'doesnt-exist').should.be.false;
        Dot.has(object, 'item').should.be.true;
      });
    });
  });
});