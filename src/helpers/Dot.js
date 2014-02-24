define(function() {

  /**
   * Dot module. Simple utility.
   * 
   * @exports Gizmo/helpers/Dot
   */
  var Dot = {

    /**
     * Creates dot instance.
     * 
     * @return {!Gizmo/helpers/Dot}
     */
    construct: function() {
      var dot = this.extend({}, this);

      return this.mixin.apply(dot, [].slice.call(arguments));
    },

    /**
     * Adds functionality to Dot.
     * 
     * @param  {...Object} 
     * @return {!Gizmo/helpers/Dot}
     */
    mixin: function() {
      return this.extend.apply(this, [this].concat([].slice.call(arguments)));
    },

    /**
     * Extends Object with any items in arguments.
     * 
     * @param  {!Object} object
     * @param  {...Object}
     * @return {!Object}
     */
    extend: function(object) {
      var sources, self;

      sources = [].slice.call(arguments, 1);

      self = this;

      sources.forEach(function(source) {
        for(var item in source) {
          if(self.has(source, item)) {
            object[item] = source[item];
          }
        }
      });

      return object;
    },

    /**
     * Determines if object has a property.
     * 
     * @param  {!Object} object
     * @param  {!String} key
     * @return {Boolean}
     */
    has: function(object, key) {
      return Object.hasOwnProperty.call(object, key);
    },

    /**
     * Returns the first key that has value.
     * 
     * @param  {!Object} object
     * @param  {!String} key
     * @return {?String}
     */
    keyByValue: function(object, value) {
      for(var property in object) {
        if(object[property] === value) {
          return property;
        }
      }
    }
  };

  return Dot;
});