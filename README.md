Gizmo [![Build Status](https://travis-ci.org/rstone770/Gizmo.png?branch=master)](https://travis-ci.org/rstone770/Gizmo)
=====

A small object library that tries to remove boilerplate code and promote better practice while providing a fresh interface when using objects. This library focuses on factories instead of the new operator. Compiled the library should play nicely as a Common, AMD and global include.

## Setup
This repository does not include the built version of gizmo. Instead you must either build it yourself or use the library as an extern and compile it with the rest of your project. If you are using the project as an extern library, you must use require. These issues should be resolved after I setup travis-ci with some sort of bin/artifact pushing to a gh-page.

To build the project simply use
```
npm install && npm build
```
or
```
npm install && grunt
```

You will need to have bower and grunt cli installed globally.

## Use
This library offers easy extension through composition.
```javascript
var MyObject = Gizmo.extend({
  construct: function(name) {
    return this.extend({
      name: name || 'john'
    });
  },
  sayHi: function(){
    alert(this.name + ' says hi!');
  }
});

MyObject.construct().sayHi();

MyObject.instanceOf(Gizmo); // true
MyObject.construct().instanceOf(Gizmo); // true

var AnotherObject = MyObject
  .extend({
    getName: function() {
      return this.name;
    }
  });
  
AnotherObject.instanceOf(MyObject); // true
AnotherObject.instanceOf(Gizmo); // true
AnotherObject.construct().instanceOf(AnotherObject); // true
MyObject.instanceOf(AnotherObject); // false
```

Accessing overridden parent methods via 'super' is verbose and requires
```javascript
var MyObject = Gizmo.extend({
  construct: function() {
    return Gizmo.construct.call(this);
  }
});
```
This is done for the purpose of forcing favoring of composition of objects rather the classical inheritance. I will implement some sort of super method in the feature though. 

## Methods 
### \#construct
Will create a new object. This is a constructor for all intents and purposes except new should not be used with it, it behaves more like a factory. It allows for binding constructors and some crazy dynamic objects.

```javascript
var myObject = Gizmo.extend({
  construct: function() {
    return this.extend({
      prop: 'ronnie'
    })
  }
}).construct();

// notice how im extending an instance object.
// All instance variables are inheritied.
var AnotherObject = myObject.extend({
  say: function() {
    console.log(this.prop); // ronnie
  }
});

AnotherObject.construct().say();
```

### \#extend
Allows for extending the current object with another one via concating. This will not override the parent object and will return a new shallow de-referenced object. This only supports one object as of now because I have no need for multiple inheritance. I will probably add limited support, because mixins and interfaces are pretty useful.

```javascript
var MyObject = Gizmo.extend({
  hello: function() {
    alert('hello');
  }
});

MyObject.hello(); // hello
MyObject.construct().hello(); // hello
```

### \#instanceOf
Determines if an objet is an instanceOf another one. This is done by comparing parent prototypes to object and its parent prototypes. Notice how this works with the Prototype objects and not just the created objects.

```javascript
Gizmo.extend().instanceOf(Gizmo); // true, a child is instanceOf its parent.
Gizmo.instanceOf(Gizmo.extend()); // false, no a parent is not an instanceOf its child
```
## Doc
A generated api doc is available on build or on grunt doc in the doc folder.
