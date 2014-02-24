Gizmo [![Build Status](https://travis-ci.org/rstone770/Gizmo.png?branch=master)](https://travis-ci.org/rstone770/Gizmo)
=====

A small object library that tries to provide a super flexible and transparent way to create an use object. The goal for this project is to limit the gz compressed lib to under 1kb while providing rich features with transparency.  This library focuses on factories instead of the new operator. Compiled the library should play nicely as a Common, AMD and global include.

## Setup
As of 0.0.2 the repository contains a bin file in the bin folder. However to hack and build your own versions simply use:
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

### \#super
This is a new experemental method that should be used with cation. It will call the super of whatever method its currently in. This method relys on arguments.callee.caller so it will lose scope if your not careful. This feature is still in development so if you find a bug, please report.

```javascript
var MyObject = Gizmo.extend({
  construct: function() {
    return this.extend({
      name: 'john'
    });
  },
  method: function() {
    return this.name
  }
});

var AnotherObject = MyObject.extend({
  construct: function() {
    return this.super().extend({
      anotherName: 'doe';
    });
  },
  method: function() {
    return this.super() + this.anotherName;
  }
});

AnotherObject.construct().method(); // john doe
```

## Doc
A generated api doc is available on build or on grunt doc in the doc folder.
