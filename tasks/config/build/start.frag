(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('Gizmo', [], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Gizmo = factory();
  }
}(this, function () {