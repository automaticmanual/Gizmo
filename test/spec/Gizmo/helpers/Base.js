define([
  'Gizmo/helpers/Base'
], function(Base) {

  describe('Gizmo/helpers/Base', function() {

    describe('#construct', function() {
      it('Should create new instance of Gizmo/helpers/Base.', function() {
        Base.construct().should.deep.equal(Base);
      });
    });

    describe('#extend', function() {
      it('Should clone the Gizmo/helpers/Base.', function() {
        Base.extend().should.deep.equal(Base);
        Base.extend().should.not.equal(Base);
      });

      it('Should contain extended properties.', function() {
        var Extended = Base.extend({
          item: 'item',
          cat: function() {
            return 'ronnie';
          }
        });

        Extended.should.have.property('item', 'item');
        Extended.should.have.property('cat');
        Extended.cat().should.equal('ronnie');
      });

      it('Should not clobber the parent Object.', function() {
        Base.extend({item: 'item'});

        Base.should.not.have.property('item');
      });
    });

    describe('#instanceOf', function() {
      it('Should determine if an object is an instanceOf of self.', function() {
        Base.instanceOf(Base).should.be.true;
        Base.extend().instanceOf(Base).should.be.true;
        Base.extend().instanceOf(Base.extend()).should.be.false;
        Base.extend().extend().instanceOf(Base).should.be.true;
        Base.extend({}).instanceOf(Base).should.be.true;

        var Extend = Base.extend({
          construct: function() {
            var extended = {
              item: 'item'
            };

            return this.extend(extended);
          }
        });

        Extend.instanceOf(Base).should.be.true;
        Extend.construct().instanceOf(Base).should.be.true;
      });
    });
  });
});