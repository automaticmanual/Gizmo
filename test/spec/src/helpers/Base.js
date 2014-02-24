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

    describe('#super', function() {
      it('Should call the super method of an object.', function() {
        var Extend, ExtendFurther, ExtendEvenFurther, extendEvenFurther;

        Extend = Base.extend({
          construct: function() {
            return this.extend({
              name: 'name'
            });
          },
          method: function(method) {
            return this.name+method;
          }
        });

        ExtendFurther = Extend.extend({
          construct: function() {
            return this.super().extend({
              anotherName: 'anotherName'
            });
          },
          method: function() {
            return this.super(this.anotherName);
          }
        });

        ExtendEvenFurther = ExtendFurther.extend({});

        extendEvenFurther = ExtendEvenFurther.construct();

        extendEvenFurther.should.have.property('name', 'name');
        extendEvenFurther.should.have.property('anotherName', 'anotherName');
        extendEvenFurther.method().should.equal('nameanotherName');
      });

      it('Should throw on unable to find caller.', function() {
        var throwMe = function() {
          Base.super();
        };

        throwMe.should.throw('Unable to locate caller.');
      });

      it('Should throw when a super method cant be located.', function() {
        var throwMe = function() {
          Base.extend({
            method: function() {
              this.super();
            }
          })
          .construct()
          .method();
        };

        throwMe.should.throw('No super method of caller');
      });
    });
  });
});