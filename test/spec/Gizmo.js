define([
  'Gizmo/helpers/Base',
  'Gizmo/Gizmo'
], function(Base, Gizmo) {

  describe('Gizmo/Gizmo', function() {
    describe('Gizmo/Gizmo', function() {
      it('Should extend Base.', function() {
        Gizmo.instanceOf(Base).should.be.true;
      });
    });
  });
});
