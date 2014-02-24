define([
  './Dot'
], function(Dot){

  /**
   * Base module
   *
   * @exports Gizmo/helpers/Base
   */
  var Base = {

    /**
     * Object factory.
     * 
     * @return {!Gizmo/helpers/Base}
     */
    construct: function() {
      return Object.create(this);
    },

    /**
     * Extends self by adding items to own prototype. Returns new object.
     * 
     * @param  {!Object} object
     * @return {!Object}
     */
    extend: function(object) {
      return Dot.extend(Object.create(this), object);
    },

    /**
     * Determines if this object is an instance of another prototype.
     * 
     * @param  {!Object} prototype
     * @return {!Boolean}
     */
    instanceOf: function(prototype) {
      var object = this;

      while(object) {
        if(object === prototype) {
          return true;
        }

        object = Object.getPrototypeOf(object);
      }

      return false;
    },

    /**
     * Calls the super method of self.
     *
     * @param {...*}
     * @return {?*}
     */
    super: function() {
      var myArguments, caller, parent;

      myArguments = [].slice.call(arguments);

      caller = Dot.keyByValue(this, arguments.callee.caller);

      parent = this;

      if(!caller) {
        throw new Error('Unable to locate caller.');
      }

      while(parent) {
        if(parent[caller] === this[caller]) {
          me = parent;
        } else if(me && parent[caller]) {
          return parent[caller].apply(this, myArguments);
        }

        parent = Object.getPrototypeOf(parent);
      }

      throw new Error('No super method of caller.');
    }
  };

  return Base;
});
