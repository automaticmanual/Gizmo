define([
  'Gizmo/helpers/Base',
  'Gizmo/gizmo'
], function(Base, Gizmo) {

  describe('Gizmo/gizmo', function() {
    describe('Gizmo/gizmo', function() {
      it('Should extend Base.', function() {
        Gizmo.instanceOf(Base).should.be.true;
      });
    });
  });
});
