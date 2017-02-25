/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _stringify = __webpack_require__(1);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _vue = __webpack_require__(4);

	var _vue2 = _interopRequireDefault(_vue);

	var _socket = __webpack_require__(6);

	var _socket2 = _interopRequireDefault(_socket);

	var _LineChart = __webpack_require__(60);

	var _LineChart2 = _interopRequireDefault(_LineChart);

	var _Stock = __webpack_require__(62);

	var _Stock2 = _interopRequireDefault(_Stock);

	var _NetWorth = __webpack_require__(63);

	var _NetWorth2 = _interopRequireDefault(_NetWorth);

	var _Form = __webpack_require__(64);

	var _Form2 = _interopRequireDefault(_Form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// NumberWang!
	// ===========

	var MaxNumberWang = 25;
	var RandomNumberWangs = ["Giraffe", "Badger", "Anteater", "Lemur", "Dodo", "Babelfish", "Elephant", "Panda", "Zebra", "Rhino", "Meerkat", "Rabbit", "Turtle", "Tiger", "Piglet", "Kangaroo"];

	function RandomNumberWang() {
	  return Math.floor(Math.random() * MaxNumberWang) + 1;
	}

	function RandomNumberWanger() {
	  return RandomNumberWangs[Math.floor(Math.random() * RandomNumberWangs.length)];
	}

	// Components
	// -----------

	// Socket.io
	// ---------

	var socket = _socket2.default.connect();

	_vue2.default.component('numberwang', {
	  template: '<div> \
	             <h1> {{ number }} </h1> \
	             <h3>Target: <b>{{target}}</b></h3> \
	             <p>{{ winner.name }} is winning with {{winner.points}} points! You have <b>{{ points }}</b> points.</p> \
	             <button class="increase" v-on:click="increase">Increase</button> \
	             <button class="decrease" v-on:click="decrease">Decrease</button> \
	             <ul class="events" ><li v-for="event in events">{{ event }}</li></ul> \
	             </div>',
	  data: function data() {
	    return {
	      number: 0,
	      name: "",
	      clicked: 0,
	      connections: 0,
	      target: RandomNumberWang(),
	      events: [],
	      points: 0,
	      winner: {
	        name: "a",
	        points: 0
	      }
	    };
	  },
	  created: function created() {

	    if (!window.localStorage.numberwang) {
	      this.name = prompt("What's your name?");

	      if (this.name) {
	        window.localStorage.numberwang = (0, _stringify2.default)({
	          "name": this.name
	        });
	      } else {
	        this.name = "Anonymous " + RandomNumberWanger();
	      }
	    } else {
	      var numberwangData = JSON.parse(window.localStorage.numberwang);
	      this.name = numberwangData.name;
	    }

	    socket.emit('name', this.name);

	    socket.on('connections', function (res) {
	      this.connections = res.connections;
	      this.clicked = res.clicked;
	      this.number = res.number;
	      this.winner = res.winner || { name: "John Smith", points: 0 };
	      this.events = this.events.concat(res.events);
	      this.events.unshift("Welcome back " + this.name + ", let's play NumberWang!");
	    }.bind(this));

	    socket.on('event', function (event) {
	      console.log(event);
	      this.events.unshift(event);
	    }.bind(this));

	    socket.on('winnerUpdate', function (winner) {
	      this.winner = winner.event;
	      this.events.unshift(winner.event.name + " is now winning with " + winner.event.points + "!");
	    }.bind(this));

	    socket.on('change', function (change) {
	      this.number = change.number;
	      this.clicked = change.clicked;
	      this.winner = change.winner;

	      if (this.number == this.target) {
	        this.points++;
	        this.target = RandomNumberWang();
	        this.events.unshift("And that's NumberWang! Your new target is " + this.target + ".");
	        socket.emit('pointWon', 1);
	      }
	    }.bind(this));
	  },
	  methods: {
	    increase: function increase() {
	      this.number++;
	      socket.emit('numberChange', 1);
	    },
	    decrease: function decrease() {
	      this.number--;
	      socket.emit('numberChange', -1);
	    }
	  }
	});

	// Views
	// -----

	var game = new _vue2.default({
	  el: '#app',
	  data: {},
	  components: {},
	  methods: {}
	}).$mount('#app');

	// That's WangerNumb!

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(3);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * Vue.js v2.1.6
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10);
	  return (n || n === 0) ? n : val
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  }
	}

	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var formatComponentName;

	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set$1 (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set$1(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isBooleanType(prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isBooleanType (fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === 'Boolean'
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === 'Boolean') {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		identity: identity,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		isServerRendering: isServerRendering,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index];
	    var id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};

	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  this.deep = !!options.deep;
	  this.user = !!options.user;
	  this.lazy = !!options.lazy;
	  this.sync = !!options.sync;
	  this.expression = expOrFn.toString();
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            process.env.NODE_ENV !== 'production' && warn(
	              ("Error in watcher \"" + (this.expression) + "\""),
	              this.vm
	            );
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initMethods(vm);
	  initData(vm);
	  initComputed(vm);
	  initWatch(vm);
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm) {
	  var props = vm.$options.props;
	  if (props) {
	    var propsData = vm.$options.propsData || {};
	    var keys = vm.$options._propKeys = Object.keys(props);
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot;
	    var loop = function ( i ) {
	      var key = keys[i];
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        if (isReservedProp[key]) {
	          warn(
	            ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	            vm
	          );
	        }
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            );
	          }
	        });
	      } else {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true;
	  }
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data);
	  data.__ob__ && data.__ob__.vmCount++;
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	        computedSharedDefinition.set = noop;
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop;
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop;
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition);
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	      if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set$1;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.child = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      if (process.env.NODE_ENV !== 'production') {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	    if (vm._vnode) { // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      vm._updateListeners(listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (
	  vnode,
	  hydrating,
	  parentElm,
	  refElm
	) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(
	      vnode,
	      activeInstance,
	      parentElm,
	      refElm
	    );
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.child = oldVnode.child;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true;
	    callHook(vnode.child, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false;
	    callHook(vnode.child, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy();
	    } else {
	      vnode.child._inactive = true;
	      callHook(vnode.child, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, fn, event, capture, once;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (!cur) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Invalid handler for event \"" + name + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      once = name.charAt(0) === '~'; // Prefixed last, checked first
	      event = once ? name.slice(1) : name;
	      capture = event.charAt(0) === '!';
	      event = capture ? event.slice(1) : event;
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), once, capture);
	      } else {
	        if (!cur.invoker) {
	          fn = cur;
	          cur = on[name] = {};
	          cur.fn = fn;
	          cur.invoker = fnInvoker(cur);
	        }
	        add(event, cur.invoker, once, capture);
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length;
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
	        on[name] = old;
	      } else {
	        old.fn = cur;
	        on[name] = old;
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      once = name.charAt(0) === '~'; // Prefixed last, checked first
	      event = once ? name.slice(1) : name;
	      capture = event.charAt(0) === '!';
	      event = capture ? event.slice(1) : event;
	      remove$$1(event, oldOn[name].invoker, capture);
	    }
	  }
	}

	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;

	    var single = arguments.length === 1;
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
	    }
	  }
	}

	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1;
	    single ? o.fn(ev) : o.fn.apply(null, arguments);
	  }
	}

	/*  */

	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  needNormalization,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    needNormalization = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { needNormalization = true; }
	  return _createElement(context, tag, data, children, needNormalization)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  needNormalization
	) {
	  if (data && data.__ob__) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (needNormalization) {
	    children = normalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      ns = tag === 'foreignObject' ? 'xhtml' : ns;
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = {};
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, needNormalization, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (_parentVnode && _parentVnode.data.scopedSlots) {
	      vm.$scopedSlots = _parentVnode.data.scopedSlots;
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	        }
	        throw e
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // convert text to vnode
	  Vue.prototype._v = createTextVNode;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = createEmptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };

	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };

	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }

	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }

	  // filter resolution helper
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val)) {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback,
	    props
	  ) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    if (scopedSlotFn) { // scoped slot
	      return scopedSlotFn(props || {}) || fallback
	    } else {
	      var slotNodes = this.$slots[name];
	      // warn duplicate slot usage
	      if (slotNodes && process.env.NODE_ENV !== 'production') {
	        slotNodes._rendered && warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	        slotNodes._rendered = true;
	      }
	      return slotNodes || fallback
	    }
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    tag,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var hash = asProp || config.mustUseProp(tag, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // check v-on keyCodes
	  Vue.prototype._k = function checkKeyCodes (
	    eventKeyCode,
	    key,
	    builtInAlias
	  ) {
	    var keyCodes = config.keyCodes[key] || builtInAlias;
	    if (Array.isArray(keyCodes)) {
	      return keyCodes.indexOf(eventKeyCode) === -1
	    } else {
	      return keyCodes !== eventKeyCode
	    }
	  };
	}

	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  var add = function (event, fn, once) {
	    once ? vm.$once(event, fn) : vm.$on(event, fn);
	  };
	  var remove$$1 = bind$1(vm.$off, vm);
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, add, remove$$1, vm);
	  };
	  if (listeners) {
	    vm._updateListeners(listeners);
	  }
	}

	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm);
	    } else {
	      vm._renderProxy = vm;
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    initRender(vm);
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      extendOptions._scopeId = options._scopeId;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function Vue$3 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else {
	    return pattern.test(name)
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions;
	      // check pattern
	      var name = opts.Ctor.options.name || opts.tag;
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + (opts.tag ? ("::" + (opts.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      var vnode = this$1.cache[key];
	      callHook(vnode.child, 'deactivated');
	      vnode.child.$destroy();
	    }
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set$1;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$3.version = '2.1.6';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.child) {
	    childNode = childNode.child._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML',
	  xhtml: 'http://www.w3.org/1999/xhtml'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.child || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.child) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isReactivated) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.child) {
	      innerNode = innerNode.child._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (parent) {
	      if (ref) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.child.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeElement(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      vnode.child = oldVnode.child;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var elm, parent;
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }

	        // replacing existing element
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);
	        createElm(vnode, insertedVnodeQueue, parent, nodeOps.nextSibling(elm));

	        if (vnode.parent) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parent !== null) {
	          removeVnodes(parent, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var target;

	function add$1 (event, handler, once, capture) {
	  if (once) {
	    var oldHandler = handler;
	    handler = function (ev) {
	      remove$2(event, handler, capture);
	      arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	    };
	  }
	  target.addEventListener(event, handler, capture);
	}

	function remove$2 (event, handler, capture) {
	  target.removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target = vnode.elm;
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (!elm.composing && (
	        (document.activeElement !== elm && elm.value !== strCur) ||
	        isValueChanged(vnode, strCur)
	      )) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	function isValueChanged (vnode, newVal) {
	  var value = vnode.elm.value;
	  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.child) {
	      childNode = childNode.child._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.context === vnode.context &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    var key = child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && oldChild.key !== key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);

	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      process.env.NODE_ENV !== 'production' &&
	      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var hasLang = function (attr) { return attr.name === 'lang' && attr.value !== 'html'; };
	var isSpecialTag = function (tag, isSFC, stack) {
	  if (isScriptOrStyle(tag)) {
	    return true
	  }
	  if (isSFC && stack.length === 1) {
	    // top-level template that has no pre-processor
	    if (tag === 'template' && !stack[0].attrs.some(hasLang)) {
	      return false
	    } else {
	      return true
	    }
	  }
	  return false
	};

	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag, options.sfc, stack)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
	    }

	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tag, tagName, start, end) {
	    var pos;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !/[\w$]/.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        process.env.NODE_ENV !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">."
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        if (process.env.NODE_ENV !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else if (process.env.NODE_ENV !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            "Component template should contain exactly one root element:" +
	            "\n\n" + template + "\n\n" +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if (process.env.NODE_ENV !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && currentParent.children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          currentParent.children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else {
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      process.env.NODE_ENV !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn$1(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if (process.env.NODE_ENV !== 'production' && el.key) {
	      warn$1(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if (process.env.NODE_ENV !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      if (process.env.NODE_ENV !== 'production') {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].tag) { return children[i] }
	  }
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}

	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;',
	  ctrl: 'if(!$event.ctrlKey)return;',
	  shift: 'if(!$event.shiftKey)return;',
	  alt: 'if(!$event.altKey)return;',
	  meta: 'if(!$event.metaKey)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      process.env.NODE_ENV !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}

	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if (process.env.NODE_ENV !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$2('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (slots) {
	  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
	}

	function genScopedSlot (key, el) {
	  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}"
	}

	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
	        ? canSkipNormalization(children) ? '' : ',true'
	        : ''))
	  }
	}

	function canSkipNormalization (children) {
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (needsNormalization(el) ||
	        (el.if && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      return false
	    }
	  }
	  return true
	}

	function needsNormalization (el) {
	  return el.for || el.tag === 'template' || el.tag === 'slot'
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  return ("_t(" + slotName + (children ? ("," + children) : '') + (el.attrs ? ((children ? '' : ',null') + ",{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}") : '') + ")")
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if (process.env.NODE_ENV !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production') {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  if (process.env.NODE_ENV !== 'production') {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if (process.env.NODE_ENV !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" +
	      ":_q(" + value + "," + trueValueBinding + ")"
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if (process.env.NODE_ENV !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;

	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if (process.env.NODE_ENV !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }

	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    el.children.some(checkOptionWarning);
	  }

	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');

	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	module.exports = Vue$3;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var url = __webpack_require__(7);
	var parser = __webpack_require__(12);
	var Manager = __webpack_require__(23);
	var debug = __webpack_require__(9)('socket.io-client');

	/**
	 * Module exports.
	 */

	module.exports = exports = lookup;

	/**
	 * Managers cache.
	 */

	var cache = exports.managers = {};

	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */

	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }

	  opts = opts || {};

	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;

	  var io;

	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  } else if (opts && 'object' === typeof opts.query) {
	    opts.query = encodeQueryString(opts.query);
	  }
	  return io.socket(parsed.path, opts);
	}
	/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */
	function encodeQueryString (obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join('&');
	}
	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = parser.protocol;

	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */

	exports.connect = lookup;

	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */

	exports.Manager = __webpack_require__(23);
	exports.Socket = __webpack_require__(54);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */

	var parseuri = __webpack_require__(8);
	var debug = __webpack_require__(9)('socket.io-client:url');

	/**
	 * Module exports.
	 */

	module.exports = url;

	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */

	function url (uri, loc) {
	  var obj = uri;

	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;

	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }

	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }

	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }

	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }

	  obj.path = obj.path || '/';

	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

	  return obj;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];

	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');

	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }

	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;

	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }

	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }

	    return uri;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(10);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(11);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(13)('socket.io-parser');
	var json = __webpack_require__(16);
	var Emitter = __webpack_require__(19);
	var binary = __webpack_require__(20);
	var isBuf = __webpack_require__(22);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = 4;

	/**
	 * Packet types.
	 *
	 * @api public
	 */

	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];

	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */

	exports.CONNECT = 0;

	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */

	exports.DISCONNECT = 1;

	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */

	exports.EVENT = 2;

	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */

	exports.ACK = 3;

	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */

	exports.ERROR = 4;

	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */

	exports.BINARY_EVENT = 5;

	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */

	exports.BINARY_ACK = 6;

	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */

	exports.Encoder = Encoder;

	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */

	exports.Decoder = Decoder;

	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */

	function Encoder() {}

	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */

	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);

	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};

	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */

	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;

	  // first is type
	  str += obj.type;

	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }

	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }

	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }

	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }

	  debug('encoded %j as %s', obj, str);
	  return str;
	}

	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */

	function encodeAsBinary(obj, callback) {

	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;

	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }

	  binary.removeBlobs(obj, writeEncoding);
	}

	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */

	function Decoder() {
	  this.reconstructor = null;
	}

	/**
	 * Mix in `Emitter` with Decoder.
	 */

	Emitter(Decoder.prototype);

	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */

	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);

	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};

	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */

	function decodeString(str) {
	  var p = {};
	  var i = 0;

	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();

	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }

	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }

	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }

	  // look up json data
	  if (str.charAt(++i)) {
	    p = tryParse(p, str.substr(i));
	  }

	  debug('decoded %s as %j', str, p);
	  return p;
	}

	function tryParse(p, str) {
	  try {
	    p.data = json.parse(str);
	  } catch(e){
	    return error();
	  }
	  return p; 
	};

	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */

	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};

	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */

	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}

	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */

	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};

	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */

	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};

	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(14);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(15);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(18);

	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };

	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }

	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());

	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];

	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }

	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;

	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}

	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }

	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";

	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");

	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }

	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }

	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;

	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;

	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;

	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };

	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };

	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };

	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };

	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };

	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }

	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;

	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };

	        // Internal: Stores the parser state.
	        var Index, Source;

	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };

	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };

	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };

	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };

	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };

	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }

	    exports["runInContext"] = runInContext;
	    return exports;
	  }

	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;

	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));

	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }

	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module), (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 19 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

	/**
	 * Module requirements
	 */

	var isArray = __webpack_require__(21);
	var isBuf = __webpack_require__(22);

	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */

	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;

	  function _deconstructPacket(data) {
	    if (!data) return data;

	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }

	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};

	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */

	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;

	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }

	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};

	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */

	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;

	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;

	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }

	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };

	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }

	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;

	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */

	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var eio = __webpack_require__(24);
	var Socket = __webpack_require__(54);
	var Emitter = __webpack_require__(55);
	var parser = __webpack_require__(12);
	var on = __webpack_require__(57);
	var bind = __webpack_require__(58);
	var debug = __webpack_require__(9)('socket.io-client:manager');
	var indexOf = __webpack_require__(52);
	var Backoff = __webpack_require__(59);

	/**
	 * IE6+ hasOwnProperty
	 */

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Module exports
	 */

	module.exports = Manager;

	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */

	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};

	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}

	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */

	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};

	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */

	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.engine.id;
	    }
	  }
	};

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Manager.prototype);

	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};

	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};

	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};

	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};

	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};

	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};

	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */

	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};

	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */

	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;

	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;

	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });

	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });

	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);

	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }

	  this.subs.push(openSub);
	  this.subs.push(errorSub);

	  return this;
	};

	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */

	Manager.prototype.onopen = function () {
	  debug('open');

	  // clear old subs
	  this.cleanup();

	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');

	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};

	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */

	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};

	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */

	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};

	/**
	 * Called with data.
	 *
	 * @api private
	 */

	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};

	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */

	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */

	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};

	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */

	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.engine.id;
	    });

	    if (this.autoConnect) {
	      // manually call here since connecting evnet is fired before listening
	      onConnecting();
	    }
	  }

	  function onConnecting () {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }

	  return socket;
	};

	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */

	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;

	  this.close();
	};

	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};

	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */

	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};

	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */

	Manager.prototype.cleanup = function () {
	  debug('cleanup');

	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }

	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;

	  this.decoder.destroy();
	};

	/**
	 * Close the current socket.
	 *
	 * @api private
	 */

	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};

	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */

	Manager.prototype.onclose = function (reason) {
	  debug('onclose');

	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);

	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};

	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */

	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;

	  var self = this;

	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);

	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;

	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);

	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;

	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};

	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */

	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(25);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(26);

	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(33);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var transports = __webpack_require__(27);
	var Emitter = __webpack_require__(42);
	var debug = __webpack_require__(46)('engine.io-client:socket');
	var index = __webpack_require__(52);
	var parser = __webpack_require__(33);
	var parseuri = __webpack_require__(8);
	var parsejson = __webpack_require__(53);
	var parseqs = __webpack_require__(43);

	/**
	 * Module exports.
	 */

	module.exports = Socket;

	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */

	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);

	  opts = opts || {};

	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }

	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }

	  this.secure = null != opts.secure ? opts.secure
	    : (global.location && 'https:' === location.protocol);

	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }

	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }

	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;

	  // other options for Node.js client
	  var freeGlobal = typeof global === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }

	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }

	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;

	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;

	  this.open();
	}

	Socket.priorWebsocketSuccess = false;

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	Socket.protocol = parser.protocol; // this is an int

	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */

	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(32);
	Socket.transports = __webpack_require__(27);
	Socket.parser = __webpack_require__(33);

	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */

	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);

	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;

	  // transport name
	  query.transport = name;

	  // session id if we already have one
	  if (this.id) query.sid = this.id;

	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders,
	    forceNode: this.forceNode,
	    localAddress: this.localAddress
	  });

	  return transport;
	};

	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}

	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';

	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }

	  transport.open();
	  this.setTransport(transport);
	};

	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */

	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;

	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }

	  // set up transport
	  this.transport = transport;

	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};

	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */

	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;

	  Socket.priorWebsocketSuccess = false;

	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;

	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');

	          cleanup();

	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }

	  function freezeTransport () {
	    if (failed) return;

	    // Any callback called by transport should be ignored since now
	    failed = true;

	    cleanup();

	    transport.close();
	    transport = null;
	  }

	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;

	    freezeTransport();

	    debug('probe transport "%s" failed because of error: %s', name, err);

	    self.emit('upgradeError', error);
	  }

	  function onTransportClose () {
	    onerror('transport closed');
	  }

	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }

	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }

	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }

	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);

	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);

	  transport.open();
	};

	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */

	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();

	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};

	/**
	 * Handles a packet.
	 *
	 * @api private
	 */

	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

	    this.emit('packet', packet);

	    // Socket is live - any packet counts
	    this.emit('heartbeat');

	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;

	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;

	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;

	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};

	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */

	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();

	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};

	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */

	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};

	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */

	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};

	/**
	* Sends a ping packet.
	*
	* @api private
	*/

	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};

	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */

	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);

	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;

	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};

	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */

	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};

	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */

	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */

	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }

	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }

	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }

	  options = options || {};
	  options.compress = false !== options.compress;

	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};

	/**
	 * Closes the connection.
	 *
	 * @api private
	 */

	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';

	    var self = this;

	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }

	  function close () {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }

	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }

	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }

	  return this;
	};

	/**
	 * Called upon transport error
	 *
	 * @api private
	 */

	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};

	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */

	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;

	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);

	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');

	    // ensure transport won't stay open
	    this.transport.close();

	    // ignore further transport communication
	    this.transport.removeAllListeners();

	    // set ready state
	    this.readyState = 'closed';

	    // clear session id
	    this.id = null;

	    // emit close event
	    this.emit('close', reason, desc);

	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};

	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */

	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */

	var XMLHttpRequest = __webpack_require__(28);
	var XHR = __webpack_require__(30);
	var JSONP = __webpack_require__(49);
	var websocket = __webpack_require__(50);

	/**
	 * Export transports.
	 */

	exports.polling = polling;
	exports.websocket = websocket;

	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */

	function polling (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }

	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);

	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

	var hasCORS = __webpack_require__(29);

	module.exports = function (opts) {
	  var xdomain = opts.xdomain;

	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;

	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;

	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }

	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }

	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */

	var XMLHttpRequest = __webpack_require__(28);
	var Polling = __webpack_require__(31);
	var Emitter = __webpack_require__(42);
	var inherit = __webpack_require__(44);
	var debug = __webpack_require__(46)('engine.io-client:polling-xhr');

	/**
	 * Module exports.
	 */

	module.exports = XHR;
	module.exports.Request = Request;

	/**
	 * Empty function
	 */

	function empty () {}

	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function XHR (opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    this.xd = opts.hostname !== global.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(XHR, Polling);

	/**
	 * XHR supports binary
	 */

	XHR.prototype.supportsBinary = true;

	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */

	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;

	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;

	  return new Request(opts);
	};

	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */

	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};

	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;

	  this.create();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */

	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;

	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }

	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }

	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}

	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }

	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }

	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }

	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }

	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};

	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */

	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};

	/**
	 * Called if we have data.
	 *
	 * @api private
	 */

	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};

	/**
	 * Called upon error.
	 *
	 * @api private
	 */

	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};

	/**
	 * Cleans up house.
	 *
	 * @api private
	 */

	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }

	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }

	  if (global.document) {
	    delete Request.requests[this.index];
	  }

	  this.xhr = null;
	};

	/**
	 * Called upon load.
	 *
	 * @api private
	 */

	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }

	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};

	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */

	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};

	/**
	 * Aborts the request.
	 *
	 * @api public
	 */

	Request.prototype.abort = function () {
	  this.cleanup();
	};

	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	Request.requestsCount = 0;
	Request.requests = {};

	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}

	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(32);
	var parseqs = __webpack_require__(43);
	var parser = __webpack_require__(33);
	var inherit = __webpack_require__(44);
	var yeast = __webpack_require__(45);
	var debug = __webpack_require__(46)('engine.io-client:polling');

	/**
	 * Module exports.
	 */

	module.exports = Polling;

	/**
	 * Is XHR2 supported?
	 */

	var hasXHR2 = (function () {
	  var XMLHttpRequest = __webpack_require__(28);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();

	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */

	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(Polling, Transport);

	/**
	 * Transport name.
	 */

	Polling.prototype.name = 'polling';

	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */

	Polling.prototype.doOpen = function () {
	  this.poll();
	};

	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */

	Polling.prototype.pause = function (onPause) {
	  var self = this;

	  this.readyState = 'pausing';

	  function pause () {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }

	  if (this.polling || !this.writable) {
	    var total = 0;

	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }

	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};

	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */

	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};

	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */

	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }

	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }

	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };

	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);

	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');

	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};

	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */

	Polling.prototype.doClose = function () {
	  var self = this;

	  function close () {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }

	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};

	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */

	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };

	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';

	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(33);
	var Emitter = __webpack_require__(42);

	/**
	 * Module exports.
	 */

	module.exports = Transport;

	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */

	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Transport.prototype);

	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */

	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};

	/**
	 * Opens the transport.
	 *
	 * @api public
	 */

	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }

	  return this;
	};

	/**
	 * Closes the transport.
	 *
	 * @api private
	 */

	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }

	  return this;
	};

	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */

	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};

	/**
	 * Called upon open
	 *
	 * @api private
	 */

	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};

	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */

	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};

	/**
	 * Called with a decoded packet.
	 */

	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon close.
	 *
	 * @api private
	 */

	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var keys = __webpack_require__(34);
	var hasBinary = __webpack_require__(35);
	var sliceBuffer = __webpack_require__(37);
	var after = __webpack_require__(38);
	var utf8 = __webpack_require__(39);

	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(40);
	}

	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */

	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;

	/**
	 * Current protocol version.
	 */

	exports.protocol = 3;

	/**
	 * Packet types.
	 */

	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};

	var packetslist = keys(packets);

	/**
	 * Premade error packet.
	 */

	var err = { type: 'error', data: 'parser error' };

	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */

	var Blob = __webpack_require__(41);

	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */

	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }

	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }

	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;

	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }

	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }

	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];

	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }

	  return callback('' + encoded);

	};

	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}

	/**
	 * Encode packet helpers for binary types
	 */

	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);

	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }

	  return callback(resultBuffer.buffer);
	}

	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}

	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }

	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);

	  return callback(blob);
	}

	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */

	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }

	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};

	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */

	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data == 'string') {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }

	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);

	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }

	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }

	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};

	function tryDecode(data) {
	  try {
	    data = utf8.decode(data);
	  } catch (e) {
	    return false;
	  }
	  return data;
	}

	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */

	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }

	  var data = base64encoder.decode(msg.substr(1));

	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }

	  return { type: type, data: data };
	};

	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */

	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }

	  var isBinary = hasBinary(packets);

	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }

	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }

	  if (!packets.length) {
	    return callback('0:');
	  }

	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};

	/**
	 * Async array map using after
	 */

	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);

	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };

	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}

	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */

	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }

	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	  var length = ''
	    , n, msg;

	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);

	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      msg = data.substr(i + 1, n);

	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);

	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }

	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }

	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }

	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	};

	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */

	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }

	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);

	    var resultArray = new Uint8Array(totalLength);

	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }

	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }

	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;

	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });

	    return callback(resultArray.buffer);
	  });
	};

	/**
	 * Encode as Blob
	 */

	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }

	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;

	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;

	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};

	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */

	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var bufferTail = data;
	  var buffers = [];

	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';

	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;

	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }

	      msgLength += tailArray[i];
	    }

	    if(numberTooLong) return callback(err, 0, 1);

	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);

	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }

	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }

	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */

	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;

	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */

	var isArray = __webpack_require__(36);

	/**
	 * Module exports.
	 */

	module.exports = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary(data) {

	  function _hasBinary(obj) {
	    if (!obj) return false;

	    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }

	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      // see: https://github.com/Automattic/has-binary/pull/4
	      if (obj.toJSON && 'function' == typeof obj.toJSON) {
	        obj = obj.toJSON();
	      }

	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return _hasBinary(data);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */

	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;

	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }

	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }

	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = after

	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count

	    return (count === 0) ? callback() : proxy

	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count

	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}

	function noop() {}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/wtf8 v1.0.0 by @mathias */
	;(function(root) {

		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}

		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}

		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid WTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return wtf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.wtf8 = wtf8;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module), (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){
	  "use strict";

	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }

	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";

	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }

	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }

	    return base64;
	  };

	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;

	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }

	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);

	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];

	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }

	    return arraybuffer;
	  };
	})();


/***/ },
/* 41 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */

	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;

	/**
	 * Check if Blob constructor is supported
	 */

	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */

	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if BlobBuilder is supported
	 */

	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;

	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */

	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;

	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }

	      ary[i] = buf;
	    }
	  }
	}

	function BlobBuilderConstructor(ary, options) {
	  options = options || {};

	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);

	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }

	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};

	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};

	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */

	exports.encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};

	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */

	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;

	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}

	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}

	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());

	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}

	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;

	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(47);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(48);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */

	var Polling = __webpack_require__(31);
	var inherit = __webpack_require__(44);

	/**
	 * Module exports.
	 */

	module.exports = JSONPPolling;

	/**
	 * Cached regular expressions.
	 */

	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;

	/**
	 * Global JSONP callbacks.
	 */

	var callbacks;

	/**
	 * Noop.
	 */

	function empty () { }

	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */

	function JSONPPolling (opts) {
	  Polling.call(this, opts);

	  this.query = this.query || {};

	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }

	  // callback identifier
	  this.index = callbacks.length;

	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });

	  // append to query string
	  this.query.j = this.index;

	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(JSONPPolling, Polling);

	/*
	 * JSONP only supports binary as base64 encoded strings
	 */

	JSONPPolling.prototype.supportsBinary = false;

	/**
	 * Closes the socket.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }

	  Polling.prototype.doClose.call(this);
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');

	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };

	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;

	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};

	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */

	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;

	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;

	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);

	    this.form = form;
	    this.area = area;
	  }

	  this.form.action = this.uri();

	  function complete () {
	    initIframe();
	    fn();
	  }

	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }

	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }

	    iframe.id = self.iframeId;

	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }

	  initIframe();

	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');

	  try {
	    this.form.submit();
	  } catch (e) {}

	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(32);
	var parser = __webpack_require__(33);
	var parseqs = __webpack_require__(43);
	var inherit = __webpack_require__(44);
	var yeast = __webpack_require__(45);
	var debug = __webpack_require__(46)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(51);
	  } catch (e) { }
	}

	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */

	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}

	/**
	 * Module exports.
	 */

	module.exports = WS;

	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */

	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(WS, Transport);

	/**
	 * Transport name.
	 *
	 * @api public
	 */

	WS.prototype.name = 'websocket';

	/*
	 * WebSockets support binary
	 */

	WS.prototype.supportsBinary = true;

	/**
	 * Opens socket.
	 *
	 * @api private
	 */

	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }

	  var uri = this.uri();
	  var protocols = void (0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }

	  try {
	    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }

	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }

	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }

	  this.addEventListeners();
	};

	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */

	WS.prototype.addEventListeners = function () {
	  var self = this;

	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};

	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */

	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;

	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }

	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }

	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }

	        --total || done();
	      });
	    })(packets[i]);
	  }

	  function done () {
	    self.emit('flush');

	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};

	/**
	 * Called upon close
	 *
	 * @api private
	 */

	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};

	/**
	 * Closes socket.
	 *
	 * @api private
	 */

	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';

	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */

	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 51 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 52 */
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;

	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */

	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;

	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }

	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }

	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(12);
	var Emitter = __webpack_require__(55);
	var toArray = __webpack_require__(56);
	var on = __webpack_require__(57);
	var bind = __webpack_require__(58);
	var debug = __webpack_require__(9)('socket.io-client:socket');
	var hasBin = __webpack_require__(35);

	/**
	 * Module exports.
	 */

	module.exports = exports = Socket;

	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */

	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};

	/**
	 * Shortcut to `Emitter#emit`.
	 */

	var emit = Emitter.prototype.emit;

	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */

	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */

	Socket.prototype.subEvents = function () {
	  if (this.subs) return;

	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};

	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */

	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;

	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};

	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};

	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }

	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };

	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;

	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }

	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }

	  delete this.flags;

	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};

	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */

	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');

	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      this.packet({type: parser.CONNECT, query: this.query});
	    } else {
	      this.packet({type: parser.CONNECT});
	    }
	  }
	};

	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */

	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};

	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;

	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;

	    case parser.EVENT:
	      this.onevent(packet);
	      break;

	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;

	    case parser.ACK:
	      this.onack(packet);
	      break;

	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;

	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;

	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};

	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);

	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }

	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};

	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */

	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);

	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};

	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};

	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */

	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};

	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */

	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];

	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};

	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */

	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};

	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */

	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }

	  this.io.destroy(this);
	};

	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }

	  // remove socket from pool
	  this.destroy();

	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};

	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = toArray

	function toArray(list, index) {
	    var array = []

	    index = index || 0

	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }

	    return array
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */

	module.exports = on;

	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */

	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * Slice reference.
	 */

	var slice = [].slice;

	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */

	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ },
/* 59 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */

	module.exports = Backoff;

	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}

	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */

	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};

	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */

	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};

	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};

	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};

	/**
	 * Set the jitter
	 *
	 * @api public
	 */

	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};



/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vueChartjs = __webpack_require__(61);

	var reactiveProp = _vueChartjs.mixins.reactiveProp; // Stocks game - Line Chart
	// ========================

	exports.default = _vueChartjs.Line.extend({
	  mixins: [reactiveProp],
	  props: ["money", "options"],
	  mounted: function mounted() {
	    this.renderChart({
	      labels: [60, 90, 80, 50, 20, 40, 24, 23, 30, 50],
	      datasets: [{
	        data: this.chartData,
	        backgroundColor: '#f87979'
	      }]
	    }, {
	      responsive: true,
	      maintainAspectRatio: false,
	      legend: false
	    });
	  },

	  events: {
	    updatedChartData: function updatedChartData() {
	      console.log(" updatedChartData event");
	      this.render();
	    }
	  },
	  methods: {
	    render: function render() {
	      console.log(this);
	      console.log("render");

	      // this.chartData.datasets[0].data = [2,23]
	      // this._chart.update()
	    }

	  }
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueChartJs=t():e.VueChartJs=t()}(this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="/",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.mixins=t.Bubble=t.Radar=t.PolarArea=t.Pie=t.Line=t.Doughnut=t.Bar=t.VueCharts=void 0;var r=n(206),i=a(r),o=n(208),s=a(o),d=n(209),u=a(d),l=n(210),c=a(l),h=n(211),_=a(h),m=n(212),f=a(m),p=n(207),g=a(p),y=n(213),v=a(y),M={Bar:i.default,Doughnut:s.default,Line:u.default,Pie:c.default,PolarArea:_.default,Radar:f.default,Bubble:g.default,mixins:v.default};t.default=M,t.VueCharts=M,t.Bar=i.default,t.Doughnut=s.default,t.Line=u.default,t.Pie=c.default,t.PolarArea=_.default,t.Radar=f.default,t.Bubble=g.default,t.mixins=v.default},function(e,t,n){(function(e){!function(t,n){e.exports=n()}(this,function(){"use strict";function t(){return ga.apply(null,arguments)}function a(e){ga=e}function r(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function i(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function o(e){var t;for(t in e)return!1;return!0}function s(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function d(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function u(e,t){var n,a=[];for(n=0;n<e.length;++n)a.push(t(e[n],n));return a}function l(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function c(e,t){for(var n in t)l(t,n)&&(e[n]=t[n]);return l(t,"toString")&&(e.toString=t.toString),l(t,"valueOf")&&(e.valueOf=t.valueOf),e}function h(e,t,n,a){return vt(e,t,n,a,!0).utc()}function _(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function m(e){return null==e._pf&&(e._pf=_()),e._pf}function f(e){if(null==e._isValid){var t=m(e),n=va.call(t.parsedDateParts,function(e){return null!=e}),a=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(a=a&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return a;e._isValid=a}return e._isValid}function p(e){var t=h(NaN);return null!=e?c(m(t),e):m(t).userInvalidated=!0,t}function g(e){return void 0===e}function y(e,t){var n,a,r;if(g(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),g(t._i)||(e._i=t._i),g(t._f)||(e._f=t._f),g(t._l)||(e._l=t._l),g(t._strict)||(e._strict=t._strict),g(t._tzm)||(e._tzm=t._tzm),g(t._isUTC)||(e._isUTC=t._isUTC),g(t._offset)||(e._offset=t._offset),g(t._pf)||(e._pf=m(t)),g(t._locale)||(e._locale=t._locale),Ma.length>0)for(n in Ma)a=Ma[n],r=t[a],g(r)||(e[a]=r);return e}function v(e){y(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),ba===!1&&(ba=!0,t.updateOffset(this),ba=!1)}function M(e){return e instanceof v||null!=e&&null!=e._isAMomentObject}function b(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function L(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=b(t)),n}function k(e,t,n){var a,r=Math.min(e.length,t.length),i=Math.abs(e.length-t.length),o=0;for(a=0;a<r;a++)(n&&e[a]!==t[a]||!n&&L(e[a])!==L(t[a]))&&o++;return o+i}function Y(e){t.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function x(e,n){var a=!0;return c(function(){if(null!=t.deprecationHandler&&t.deprecationHandler(null,e),a){for(var r,i=[],o=0;o<arguments.length;o++){if(r="","object"==typeof arguments[o]){r+="\n["+o+"] ";for(var s in arguments[0])r+=s+": "+arguments[0][s]+", ";r=r.slice(0,-2)}else r=arguments[o];i.push(r)}Y(e+"\nArguments: "+Array.prototype.slice.call(i).join("")+"\n"+(new Error).stack),a=!1}return n.apply(this,arguments)},n)}function D(e,n){null!=t.deprecationHandler&&t.deprecationHandler(e,n),La[e]||(Y(n),La[e]=!0)}function w(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function T(e){var t,n;for(n in e)t=e[n],w(t)?this[n]=t:this["_"+n]=t;this._config=e,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function S(e,t){var n,a=c({},e);for(n in t)l(t,n)&&(i(e[n])&&i(t[n])?(a[n]={},c(a[n],e[n]),c(a[n],t[n])):null!=t[n]?a[n]=t[n]:delete a[n]);for(n in e)l(e,n)&&!l(t,n)&&i(e[n])&&(a[n]=c({},a[n]));return a}function j(e){null!=e&&this.set(e)}function A(e,t,n){var a=this._calendar[e]||this._calendar.sameElse;return w(a)?a.call(t,n):a}function H(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])}function P(){return this._invalidDate}function C(e){return this._ordinal.replace("%d",e)}function O(e,t,n,a){var r=this._relativeTime[n];return w(r)?r(e,t,n,a):r.replace(/%d/i,e)}function F(e,t){var n=this._relativeTime[e>0?"future":"past"];return w(n)?n(t):n.replace(/%s/i,t)}function W(e,t){var n=e.toLowerCase();Ha[n]=Ha[n+"s"]=Ha[t]=e}function E(e){return"string"==typeof e?Ha[e]||Ha[e.toLowerCase()]:void 0}function I(e){var t,n,a={};for(n in e)l(e,n)&&(t=E(n),t&&(a[t]=e[n]));return a}function R(e,t){Pa[e]=t}function z(e){var t=[];for(var n in e)t.push({unit:n,priority:Pa[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}function N(e,n){return function(a){return null!=a?(B(this,e,a),t.updateOffset(this,n),this):V(this,e)}}function V(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function B(e,t,n){e.isValid()&&e._d["set"+(e._isUTC?"UTC":"")+t](n)}function $(e){return e=E(e),w(this[e])?this[e]():this}function U(e,t){if("object"==typeof e){e=I(e);for(var n=z(e),a=0;a<n.length;a++)this[n[a].unit](e[n[a].unit])}else if(e=E(e),w(this[e]))return this[e](t);return this}function J(e,t,n){var a=""+Math.abs(e),r=t-a.length,i=e>=0;return(i?n?"+":"":"-")+Math.pow(10,Math.max(0,r)).toString().substr(1)+a}function q(e,t,n,a){var r=a;"string"==typeof a&&(r=function(){return this[a]()}),e&&(Wa[e]=r),t&&(Wa[t[0]]=function(){return J(r.apply(this,arguments),t[1],t[2])}),n&&(Wa[n]=function(){return this.localeData().ordinal(r.apply(this,arguments),e)})}function G(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function K(e){var t,n,a=e.match(Ca);for(t=0,n=a.length;t<n;t++)Wa[a[t]]?a[t]=Wa[a[t]]:a[t]=G(a[t]);return function(t){var r,i="";for(r=0;r<n;r++)i+=a[r]instanceof Function?a[r].call(t,e):a[r];return i}}function Z(e,t){return e.isValid()?(t=X(t,e.localeData()),Fa[t]=Fa[t]||K(t),Fa[t](e)):e.localeData().invalidDate()}function X(e,t){function n(e){return t.longDateFormat(e)||e}var a=5;for(Oa.lastIndex=0;a>=0&&Oa.test(e);)e=e.replace(Oa,n),Oa.lastIndex=0,a-=1;return e}function Q(e,t,n){tr[e]=w(t)?t:function(e,a){return e&&n?n:t}}function ee(e,t){return l(tr,e)?tr[e](t._strict,t._locale):new RegExp(te(e))}function te(e){return ne(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,a,r){return t||n||a||r}))}function ne(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ae(e,t){var n,a=t;for("string"==typeof e&&(e=[e]),s(t)&&(a=function(e,n){n[t]=L(e)}),n=0;n<e.length;n++)nr[e[n]]=a}function re(e,t){ae(e,function(e,n,a,r){a._w=a._w||{},t(e,a._w,a,r)})}function ie(e,t,n){null!=t&&l(nr,e)&&nr[e](t,n._a,n,e)}function oe(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function se(e,t){return e?r(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||_r).test(t)?"format":"standalone"][e.month()]:this._months}function de(e,t){return e?r(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[_r.test(t)?"format":"standalone"][e.month()]:this._monthsShort}function ue(e,t,n){var a,r,i,o=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],a=0;a<12;++a)i=h([2e3,a]),this._shortMonthsParse[a]=this.monthsShort(i,"").toLocaleLowerCase(),this._longMonthsParse[a]=this.months(i,"").toLocaleLowerCase();return n?"MMM"===t?(r=hr.call(this._shortMonthsParse,o),r!==-1?r:null):(r=hr.call(this._longMonthsParse,o),r!==-1?r:null):"MMM"===t?(r=hr.call(this._shortMonthsParse,o),r!==-1?r:(r=hr.call(this._longMonthsParse,o),r!==-1?r:null)):(r=hr.call(this._longMonthsParse,o),r!==-1?r:(r=hr.call(this._shortMonthsParse,o),r!==-1?r:null))}function le(e,t,n){var a,r,i;if(this._monthsParseExact)return ue.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),a=0;a<12;a++){if(r=h([2e3,a]),n&&!this._longMonthsParse[a]&&(this._longMonthsParse[a]=new RegExp("^"+this.months(r,"").replace(".","")+"$","i"),this._shortMonthsParse[a]=new RegExp("^"+this.monthsShort(r,"").replace(".","")+"$","i")),n||this._monthsParse[a]||(i="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[a]=new RegExp(i.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[a].test(e))return a;if(n&&"MMM"===t&&this._shortMonthsParse[a].test(e))return a;if(!n&&this._monthsParse[a].test(e))return a}}function ce(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=L(t);else if(t=e.localeData().monthsParse(t),!s(t))return e;return n=Math.min(e.date(),oe(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function he(e){return null!=e?(ce(this,e),t.updateOffset(this,!0),this):V(this,"Month")}function _e(){return oe(this.year(),this.month())}function me(e){return this._monthsParseExact?(l(this,"_monthsRegex")||pe.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(l(this,"_monthsShortRegex")||(this._monthsShortRegex=pr),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)}function fe(e){return this._monthsParseExact?(l(this,"_monthsRegex")||pe.call(this),e?this._monthsStrictRegex:this._monthsRegex):(l(this,"_monthsRegex")||(this._monthsRegex=gr),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)}function pe(){function e(e,t){return t.length-e.length}var t,n,a=[],r=[],i=[];for(t=0;t<12;t++)n=h([2e3,t]),a.push(this.monthsShort(n,"")),r.push(this.months(n,"")),i.push(this.months(n,"")),i.push(this.monthsShort(n,""));for(a.sort(e),r.sort(e),i.sort(e),t=0;t<12;t++)a[t]=ne(a[t]),r[t]=ne(r[t]);for(t=0;t<24;t++)i[t]=ne(i[t]);this._monthsRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+a.join("|")+")","i")}function ge(e){return ye(e)?366:365}function ye(e){return e%4===0&&e%100!==0||e%400===0}function ve(){return ye(this.year())}function Me(e,t,n,a,r,i,o){var s=new Date(e,t,n,a,r,i,o);return e<100&&e>=0&&isFinite(s.getFullYear())&&s.setFullYear(e),s}function be(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function Le(e,t,n){var a=7+t-n,r=(7+be(e,0,a).getUTCDay()-t)%7;return-r+a-1}function ke(e,t,n,a,r){var i,o,s=(7+n-a)%7,d=Le(e,a,r),u=1+7*(t-1)+s+d;return u<=0?(i=e-1,o=ge(i)+u):u>ge(e)?(i=e+1,o=u-ge(e)):(i=e,o=u),{year:i,dayOfYear:o}}function Ye(e,t,n){var a,r,i=Le(e.year(),t,n),o=Math.floor((e.dayOfYear()-i-1)/7)+1;return o<1?(r=e.year()-1,a=o+xe(r,t,n)):o>xe(e.year(),t,n)?(a=o-xe(e.year(),t,n),r=e.year()+1):(r=e.year(),a=o),{week:a,year:r}}function xe(e,t,n){var a=Le(e,t,n),r=Le(e+1,t,n);return(ge(e)-a+r)/7}function De(e){return Ye(e,this._week.dow,this._week.doy).week}function we(){return this._week.dow}function Te(){return this._week.doy}function Se(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")}function je(e){var t=Ye(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")}function Ae(e,t){return"string"!=typeof e?e:isNaN(e)?(e=t.weekdaysParse(e),"number"==typeof e?e:null):parseInt(e,10)}function He(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}function Pe(e,t){return e?r(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:this._weekdays}function Ce(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort}function Oe(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin}function Fe(e,t,n){var a,r,i,o=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],a=0;a<7;++a)i=h([2e3,1]).day(a),this._minWeekdaysParse[a]=this.weekdaysMin(i,"").toLocaleLowerCase(),this._shortWeekdaysParse[a]=this.weekdaysShort(i,"").toLocaleLowerCase(),this._weekdaysParse[a]=this.weekdays(i,"").toLocaleLowerCase();return n?"dddd"===t?(r=hr.call(this._weekdaysParse,o),r!==-1?r:null):"ddd"===t?(r=hr.call(this._shortWeekdaysParse,o),r!==-1?r:null):(r=hr.call(this._minWeekdaysParse,o),r!==-1?r:null):"dddd"===t?(r=hr.call(this._weekdaysParse,o),r!==-1?r:(r=hr.call(this._shortWeekdaysParse,o),r!==-1?r:(r=hr.call(this._minWeekdaysParse,o),r!==-1?r:null))):"ddd"===t?(r=hr.call(this._shortWeekdaysParse,o),r!==-1?r:(r=hr.call(this._weekdaysParse,o),r!==-1?r:(r=hr.call(this._minWeekdaysParse,o),r!==-1?r:null))):(r=hr.call(this._minWeekdaysParse,o),r!==-1?r:(r=hr.call(this._weekdaysParse,o),r!==-1?r:(r=hr.call(this._shortWeekdaysParse,o),r!==-1?r:null)))}function We(e,t,n){var a,r,i;if(this._weekdaysParseExact)return Fe.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),a=0;a<7;a++){if(r=h([2e3,1]).day(a),n&&!this._fullWeekdaysParse[a]&&(this._fullWeekdaysParse[a]=new RegExp("^"+this.weekdays(r,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[a]=new RegExp("^"+this.weekdaysShort(r,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[a]=new RegExp("^"+this.weekdaysMin(r,"").replace(".",".?")+"$","i")),this._weekdaysParse[a]||(i="^"+this.weekdays(r,"")+"|^"+this.weekdaysShort(r,"")+"|^"+this.weekdaysMin(r,""),this._weekdaysParse[a]=new RegExp(i.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[a].test(e))return a;if(n&&"ddd"===t&&this._shortWeekdaysParse[a].test(e))return a;if(n&&"dd"===t&&this._minWeekdaysParse[a].test(e))return a;if(!n&&this._weekdaysParse[a].test(e))return a}}function Ee(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=Ae(e,this.localeData()),this.add(e-t,"d")):t}function Ie(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")}function Re(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=He(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7}function ze(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(l(this,"_weekdaysRegex")||(this._weekdaysRegex=kr),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)}function Ne(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(l(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Yr),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Ve(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(l(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=xr),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Be(){function e(e,t){return t.length-e.length}var t,n,a,r,i,o=[],s=[],d=[],u=[];for(t=0;t<7;t++)n=h([2e3,1]).day(t),a=this.weekdaysMin(n,""),r=this.weekdaysShort(n,""),i=this.weekdays(n,""),o.push(a),s.push(r),d.push(i),u.push(a),u.push(r),u.push(i);for(o.sort(e),s.sort(e),d.sort(e),u.sort(e),t=0;t<7;t++)s[t]=ne(s[t]),d[t]=ne(d[t]),u[t]=ne(u[t]);this._weekdaysRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+d.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+s.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+o.join("|")+")","i")}function $e(){return this.hours()%12||12}function Ue(){return this.hours()||24}function Je(e,t){q(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function qe(e,t){return t._meridiemParse}function Ge(e){return"p"===(e+"").toLowerCase().charAt(0)}function Ke(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"}function Ze(e){return e?e.toLowerCase().replace("_","-"):e}function Xe(e){for(var t,n,a,r,i=0;i<e.length;){for(r=Ze(e[i]).split("-"),t=r.length,n=Ze(e[i+1]),n=n?n.split("-"):null;t>0;){if(a=Qe(r.slice(0,t).join("-")))return a;if(n&&n.length>=t&&k(r,n,!0)>=t-1)break;t--}i++}return null}function Qe(t){var a=null;if(!jr[t]&&"undefined"!=typeof e&&e&&e.exports)try{a=Dr._abbr,n(389)("./"+t),et(a)}catch(e){}return jr[t]}function et(e,t){var n;return e&&(n=g(t)?at(e):tt(e,t),n&&(Dr=n)),Dr._abbr}function tt(e,t){if(null!==t){var n=Sr;if(t.abbr=e,null!=jr[e])D("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=jr[e]._config;else if(null!=t.parentLocale){if(null==jr[t.parentLocale])return Ar[t.parentLocale]||(Ar[t.parentLocale]=[]),Ar[t.parentLocale].push({name:e,config:t}),null;n=jr[t.parentLocale]._config}return jr[e]=new j(S(n,t)),Ar[e]&&Ar[e].forEach(function(e){tt(e.name,e.config)}),et(e),jr[e]}return delete jr[e],null}function nt(e,t){if(null!=t){var n,a=Sr;null!=jr[e]&&(a=jr[e]._config),t=S(a,t),n=new j(t),n.parentLocale=jr[e],jr[e]=n,et(e)}else null!=jr[e]&&(null!=jr[e].parentLocale?jr[e]=jr[e].parentLocale:null!=jr[e]&&delete jr[e]);return jr[e]}function at(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Dr;if(!r(e)){if(t=Qe(e))return t;e=[e]}return Xe(e)}function rt(){return xa(jr)}function it(e){var t,n=e._a;return n&&m(e).overflow===-2&&(t=n[rr]<0||n[rr]>11?rr:n[ir]<1||n[ir]>oe(n[ar],n[rr])?ir:n[or]<0||n[or]>24||24===n[or]&&(0!==n[sr]||0!==n[dr]||0!==n[ur])?or:n[sr]<0||n[sr]>59?sr:n[dr]<0||n[dr]>59?dr:n[ur]<0||n[ur]>999?ur:-1,m(e)._overflowDayOfYear&&(t<ar||t>ir)&&(t=ir),m(e)._overflowWeeks&&t===-1&&(t=lr),m(e)._overflowWeekday&&t===-1&&(t=cr),m(e).overflow=t),e}function ot(e){var t,n,a,r,i,o,s=e._i,d=Hr.exec(s)||Pr.exec(s);if(d){for(m(e).iso=!0,t=0,n=Or.length;t<n;t++)if(Or[t][1].exec(d[1])){r=Or[t][0],a=Or[t][2]!==!1;break}if(null==r)return void(e._isValid=!1);if(d[3]){for(t=0,n=Fr.length;t<n;t++)if(Fr[t][1].exec(d[3])){i=(d[2]||" ")+Fr[t][0];break}if(null==i)return void(e._isValid=!1)}if(!a&&null!=i)return void(e._isValid=!1);if(d[4]){if(!Cr.exec(d[4]))return void(e._isValid=!1);o="Z"}e._f=r+(i||"")+(o||""),ht(e)}else e._isValid=!1}function st(e){var n=Wr.exec(e._i);return null!==n?void(e._d=new Date(+n[1])):(ot(e),void(e._isValid===!1&&(delete e._isValid,t.createFromInputFallback(e))))}function dt(e,t,n){return null!=e?e:null!=t?t:n}function ut(e){var n=new Date(t.now());return e._useUTC?[n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()]:[n.getFullYear(),n.getMonth(),n.getDate()]}function lt(e){var t,n,a,r,i=[];if(!e._d){for(a=ut(e),e._w&&null==e._a[ir]&&null==e._a[rr]&&ct(e),e._dayOfYear&&(r=dt(e._a[ar],a[ar]),e._dayOfYear>ge(r)&&(m(e)._overflowDayOfYear=!0),n=be(r,0,e._dayOfYear),e._a[rr]=n.getUTCMonth(),e._a[ir]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=i[t]=a[t];for(;t<7;t++)e._a[t]=i[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[or]&&0===e._a[sr]&&0===e._a[dr]&&0===e._a[ur]&&(e._nextDay=!0,e._a[or]=0),e._d=(e._useUTC?be:Me).apply(null,i),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[or]=24)}}function ct(e){var t,n,a,r,i,o,s,d;if(t=e._w,null!=t.GG||null!=t.W||null!=t.E)i=1,o=4,n=dt(t.GG,e._a[ar],Ye(Mt(),1,4).year),a=dt(t.W,1),r=dt(t.E,1),(r<1||r>7)&&(d=!0);else{i=e._locale._week.dow,o=e._locale._week.doy;var u=Ye(Mt(),i,o);n=dt(t.gg,e._a[ar],u.year),a=dt(t.w,u.week),null!=t.d?(r=t.d,(r<0||r>6)&&(d=!0)):null!=t.e?(r=t.e+i,(t.e<0||t.e>6)&&(d=!0)):r=i}a<1||a>xe(n,i,o)?m(e)._overflowWeeks=!0:null!=d?m(e)._overflowWeekday=!0:(s=ke(n,a,r,i,o),e._a[ar]=s.year,e._dayOfYear=s.dayOfYear)}function ht(e){if(e._f===t.ISO_8601)return void ot(e);e._a=[],m(e).empty=!0;var n,a,r,i,o,s=""+e._i,d=s.length,u=0;for(r=X(e._f,e._locale).match(Ca)||[],n=0;n<r.length;n++)i=r[n],a=(s.match(ee(i,e))||[])[0],a&&(o=s.substr(0,s.indexOf(a)),o.length>0&&m(e).unusedInput.push(o),s=s.slice(s.indexOf(a)+a.length),u+=a.length),Wa[i]?(a?m(e).empty=!1:m(e).unusedTokens.push(i),ie(i,a,e)):e._strict&&!a&&m(e).unusedTokens.push(i);m(e).charsLeftOver=d-u,s.length>0&&m(e).unusedInput.push(s),e._a[or]<=12&&m(e).bigHour===!0&&e._a[or]>0&&(m(e).bigHour=void 0),m(e).parsedDateParts=e._a.slice(0),m(e).meridiem=e._meridiem,e._a[or]=_t(e._locale,e._a[or],e._meridiem),lt(e),it(e)}function _t(e,t,n){var a;return null==n?t:null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?(a=e.isPM(n),a&&t<12&&(t+=12),a||12!==t||(t=0),t):t}function mt(e){var t,n,a,r,i;if(0===e._f.length)return m(e).invalidFormat=!0,void(e._d=new Date(NaN));for(r=0;r<e._f.length;r++)i=0,t=y({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[r],ht(t),f(t)&&(i+=m(t).charsLeftOver,i+=10*m(t).unusedTokens.length,m(t).score=i,(null==a||i<a)&&(a=i,n=t));c(e,n||t)}function ft(e){if(!e._d){var t=I(e._i);e._a=u([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),lt(e)}}function pt(e){var t=new v(it(gt(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function gt(e){var t=e._i,n=e._f;return e._locale=e._locale||at(e._l),null===t||void 0===n&&""===t?p({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),M(t)?new v(it(t)):(d(t)?e._d=t:r(n)?mt(e):n?ht(e):yt(e),f(e)||(e._d=null),e))}function yt(e){var n=e._i;void 0===n?e._d=new Date(t.now()):d(n)?e._d=new Date(n.valueOf()):"string"==typeof n?st(e):r(n)?(e._a=u(n.slice(0),function(e){return parseInt(e,10)}),lt(e)):"object"==typeof n?ft(e):s(n)?e._d=new Date(n):t.createFromInputFallback(e)}function vt(e,t,n,a,s){var d={};return n!==!0&&n!==!1||(a=n,n=void 0),(i(e)&&o(e)||r(e)&&0===e.length)&&(e=void 0),d._isAMomentObject=!0,d._useUTC=d._isUTC=s,d._l=n,d._i=e,d._f=t,d._strict=a,pt(d)}function Mt(e,t,n,a){return vt(e,t,n,a,!1)}function bt(e,t){var n,a;if(1===t.length&&r(t[0])&&(t=t[0]),!t.length)return Mt();for(n=t[0],a=1;a<t.length;++a)t[a].isValid()&&!t[a][e](n)||(n=t[a]);return n}function Lt(){var e=[].slice.call(arguments,0);return bt("isBefore",e)}function kt(){var e=[].slice.call(arguments,0);return bt("isAfter",e)}function Yt(e){var t=I(e),n=t.year||0,a=t.quarter||0,r=t.month||0,i=t.week||0,o=t.day||0,s=t.hour||0,d=t.minute||0,u=t.second||0,l=t.millisecond||0;this._milliseconds=+l+1e3*u+6e4*d+1e3*s*60*60,this._days=+o+7*i,this._months=+r+3*a+12*n,this._data={},this._locale=at(),this._bubble()}function xt(e){return e instanceof Yt}function Dt(e){return e<0?Math.round(-1*e)*-1:Math.round(e)}function wt(e,t){q(e,0,0,function(){var e=this.utcOffset(),n="+";return e<0&&(e=-e,n="-"),n+J(~~(e/60),2)+t+J(~~e%60,2)})}function Tt(e,t){var n=(t||"").match(e);if(null===n)return null;var a=n[n.length-1]||[],r=(a+"").match(zr)||["-",0,0],i=+(60*r[1])+L(r[2]);return 0===i?0:"+"===r[0]?i:-i}function St(e,n){var a,r;return n._isUTC?(a=n.clone(),r=(M(e)||d(e)?e.valueOf():Mt(e).valueOf())-a.valueOf(),a._d.setTime(a._d.valueOf()+r),t.updateOffset(a,!1),a):Mt(e).local()}function jt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function At(e,n){var a,r=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(e=Tt(Xa,e),null===e)return this}else Math.abs(e)<16&&(e*=60);return!this._isUTC&&n&&(a=jt(this)),this._offset=e,this._isUTC=!0,null!=a&&this.add(a,"m"),r!==e&&(!n||this._changeInProgress?Jt(this,Nt(e-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,t.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:jt(this)}function Ht(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function Pt(e){return this.utcOffset(0,e)}function Ct(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(jt(this),"m")),this}function Ot(){if(null!=this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var e=Tt(Za,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this}function Ft(e){return!!this.isValid()&&(e=e?Mt(e).utcOffset():0,(this.utcOffset()-e)%60===0)}function Wt(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Et(){if(!g(this._isDSTShifted))return this._isDSTShifted;var e={};if(y(e,this),e=gt(e),e._a){var t=e._isUTC?h(e._a):Mt(e._a);this._isDSTShifted=this.isValid()&&k(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function It(){return!!this.isValid()&&!this._isUTC}function Rt(){return!!this.isValid()&&this._isUTC}function zt(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Nt(e,t){var n,a,r,i=e,o=null;return xt(e)?i={ms:e._milliseconds,d:e._days,M:e._months}:s(e)?(i={},t?i[t]=e:i.milliseconds=e):(o=Nr.exec(e))?(n="-"===o[1]?-1:1,i={y:0,d:L(o[ir])*n,h:L(o[or])*n,m:L(o[sr])*n,s:L(o[dr])*n,ms:L(Dt(1e3*o[ur]))*n}):(o=Vr.exec(e))?(n="-"===o[1]?-1:1,i={y:Vt(o[2],n),M:Vt(o[3],n),w:Vt(o[4],n),d:Vt(o[5],n),h:Vt(o[6],n),m:Vt(o[7],n),s:Vt(o[8],n)}):null==i?i={}:"object"==typeof i&&("from"in i||"to"in i)&&(r=$t(Mt(i.from),Mt(i.to)),i={},i.ms=r.milliseconds,i.M=r.months),a=new Yt(i),xt(e)&&l(e,"_locale")&&(a._locale=e._locale),a}function Vt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Bt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function $t(e,t){var n;return e.isValid()&&t.isValid()?(t=St(t,e),e.isBefore(t)?n=Bt(e,t):(n=Bt(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function Ut(e,t){return function(n,a){var r,i;return null===a||isNaN(+a)||(D(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),i=n,n=a,a=i),n="string"==typeof n?+n:n,r=Nt(n,a),Jt(this,r,e),this}}function Jt(e,n,a,r){var i=n._milliseconds,o=Dt(n._days),s=Dt(n._months);e.isValid()&&(r=null==r||r,i&&e._d.setTime(e._d.valueOf()+i*a),o&&B(e,"Date",V(e,"Date")+o*a),s&&ce(e,V(e,"Month")+s*a),r&&t.updateOffset(e,o||s))}function qt(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"}function Gt(e,n){var a=e||Mt(),r=St(a,this).startOf("day"),i=t.calendarFormat(this,r)||"sameElse",o=n&&(w(n[i])?n[i].call(this,a):n[i]);return this.format(o||this.localeData().calendar(i,this,Mt(a)))}function Kt(){return new v(this)}function Zt(e,t){var n=M(e)?e:Mt(e);return!(!this.isValid()||!n.isValid())&&(t=E(g(t)?"millisecond":t),"millisecond"===t?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())}function Xt(e,t){var n=M(e)?e:Mt(e);return!(!this.isValid()||!n.isValid())&&(t=E(g(t)?"millisecond":t),"millisecond"===t?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())}function Qt(e,t,n,a){return a=a||"()",("("===a[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===a[1]?this.isBefore(t,n):!this.isAfter(t,n))}function en(e,t){var n,a=M(e)?e:Mt(e);return!(!this.isValid()||!a.isValid())&&(t=E(t||"millisecond"),"millisecond"===t?this.valueOf()===a.valueOf():(n=a.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))}function tn(e,t){return this.isSame(e,t)||this.isAfter(e,t)}function nn(e,t){return this.isSame(e,t)||this.isBefore(e,t)}function an(e,t,n){var a,r,i,o;return this.isValid()?(a=St(e,this),a.isValid()?(r=6e4*(a.utcOffset()-this.utcOffset()),t=E(t),"year"===t||"month"===t||"quarter"===t?(o=rn(this,a),"quarter"===t?o/=3:"year"===t&&(o/=12)):(i=this-a,o="second"===t?i/1e3:"minute"===t?i/6e4:"hour"===t?i/36e5:"day"===t?(i-r)/864e5:"week"===t?(i-r)/6048e5:i),n?o:b(o)):NaN):NaN}function rn(e,t){var n,a,r=12*(t.year()-e.year())+(t.month()-e.month()),i=e.clone().add(r,"months");return t-i<0?(n=e.clone().add(r-1,"months"),a=(t-i)/(i-n)):(n=e.clone().add(r+1,"months"),a=(t-i)/(n-i)),-(r+a)||0}function on(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function sn(){var e=this.clone().utc();return 0<e.year()&&e.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():Z(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):Z(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function dn(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',a=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",r="-MM-DD[T]HH:mm:ss.SSS",i=t+'[")]';return this.format(n+a+r+i)}function un(e){e||(e=this.isUtc()?t.defaultFormatUtc:t.defaultFormat);var n=Z(this,e);return this.localeData().postformat(n)}function ln(e,t){return this.isValid()&&(M(e)&&e.isValid()||Mt(e).isValid())?Nt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function cn(e){return this.from(Mt(),e)}function hn(e,t){return this.isValid()&&(M(e)&&e.isValid()||Mt(e).isValid())?Nt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function _n(e){return this.to(Mt(),e)}function mn(e){var t;return void 0===e?this._locale._abbr:(t=at(e),null!=t&&(this._locale=t),this)}function fn(){return this._locale}function pn(e){switch(e=E(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this}function gn(e){return e=E(e),void 0===e||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))}function yn(){return this._d.valueOf()-6e4*(this._offset||0)}function vn(){return Math.floor(this.valueOf()/1e3)}function Mn(){return new Date(this.valueOf())}function bn(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function Ln(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function kn(){return this.isValid()?this.toISOString():null}function Yn(){return f(this)}function xn(){return c({},m(this))}function Dn(){return m(this).overflow}function wn(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Tn(e,t){q(0,[e,e.length],0,t)}function Sn(e){return Pn.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function jn(e){return Pn.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)}function An(){return xe(this.year(),1,4)}function Hn(){var e=this.localeData()._week;return xe(this.year(),e.dow,e.doy);
	}function Pn(e,t,n,a,r){var i;return null==e?Ye(this,a,r).year:(i=xe(e,a,r),t>i&&(t=i),Cn.call(this,e,t,n,a,r))}function Cn(e,t,n,a,r){var i=ke(e,t,n,a,r),o=be(i.year,0,i.dayOfYear);return this.year(o.getUTCFullYear()),this.month(o.getUTCMonth()),this.date(o.getUTCDate()),this}function On(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)}function Fn(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")}function Wn(e,t){t[ur]=L(1e3*("0."+e))}function En(){return this._isUTC?"UTC":""}function In(){return this._isUTC?"Coordinated Universal Time":""}function Rn(e){return Mt(1e3*e)}function zn(){return Mt.apply(null,arguments).parseZone()}function Nn(e){return e}function Vn(e,t,n,a){var r=at(),i=h().set(a,t);return r[n](i,e)}function Bn(e,t,n){if(s(e)&&(t=e,e=void 0),e=e||"",null!=t)return Vn(e,t,n,"month");var a,r=[];for(a=0;a<12;a++)r[a]=Vn(e,a,n,"month");return r}function $n(e,t,n,a){"boolean"==typeof e?(s(t)&&(n=t,t=void 0),t=t||""):(t=e,n=t,e=!1,s(t)&&(n=t,t=void 0),t=t||"");var r=at(),i=e?r._week.dow:0;if(null!=n)return Vn(t,(n+i)%7,a,"day");var o,d=[];for(o=0;o<7;o++)d[o]=Vn(t,(o+i)%7,a,"day");return d}function Un(e,t){return Bn(e,t,"months")}function Jn(e,t){return Bn(e,t,"monthsShort")}function qn(e,t,n){return $n(e,t,n,"weekdays")}function Gn(e,t,n){return $n(e,t,n,"weekdaysShort")}function Kn(e,t,n){return $n(e,t,n,"weekdaysMin")}function Zn(){var e=this._data;return this._milliseconds=ei(this._milliseconds),this._days=ei(this._days),this._months=ei(this._months),e.milliseconds=ei(e.milliseconds),e.seconds=ei(e.seconds),e.minutes=ei(e.minutes),e.hours=ei(e.hours),e.months=ei(e.months),e.years=ei(e.years),this}function Xn(e,t,n,a){var r=Nt(t,n);return e._milliseconds+=a*r._milliseconds,e._days+=a*r._days,e._months+=a*r._months,e._bubble()}function Qn(e,t){return Xn(this,e,t,1)}function ea(e,t){return Xn(this,e,t,-1)}function ta(e){return e<0?Math.floor(e):Math.ceil(e)}function na(){var e,t,n,a,r,i=this._milliseconds,o=this._days,s=this._months,d=this._data;return i>=0&&o>=0&&s>=0||i<=0&&o<=0&&s<=0||(i+=864e5*ta(ra(s)+o),o=0,s=0),d.milliseconds=i%1e3,e=b(i/1e3),d.seconds=e%60,t=b(e/60),d.minutes=t%60,n=b(t/60),d.hours=n%24,o+=b(n/24),r=b(aa(o)),s+=r,o-=ta(ra(r)),a=b(s/12),s%=12,d.days=o,d.months=s,d.years=a,this}function aa(e){return 4800*e/146097}function ra(e){return 146097*e/4800}function ia(e){var t,n,a=this._milliseconds;if(e=E(e),"month"===e||"year"===e)return t=this._days+a/864e5,n=this._months+aa(t),"month"===e?n:n/12;switch(t=this._days+Math.round(ra(this._months)),e){case"week":return t/7+a/6048e5;case"day":return t+a/864e5;case"hour":return 24*t+a/36e5;case"minute":return 1440*t+a/6e4;case"second":return 86400*t+a/1e3;case"millisecond":return Math.floor(864e5*t)+a;default:throw new Error("Unknown unit "+e)}}function oa(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*L(this._months/12)}function sa(e){return function(){return this.as(e)}}function da(e){return e=E(e),this[e+"s"]()}function ua(e){return function(){return this._data[e]}}function la(){return b(this.days()/7)}function ca(e,t,n,a,r){return r.relativeTime(t||1,!!n,e,a)}function ha(e,t,n){var a=Nt(e).abs(),r=pi(a.as("s")),i=pi(a.as("m")),o=pi(a.as("h")),s=pi(a.as("d")),d=pi(a.as("M")),u=pi(a.as("y")),l=r<gi.s&&["s",r]||i<=1&&["m"]||i<gi.m&&["mm",i]||o<=1&&["h"]||o<gi.h&&["hh",o]||s<=1&&["d"]||s<gi.d&&["dd",s]||d<=1&&["M"]||d<gi.M&&["MM",d]||u<=1&&["y"]||["yy",u];return l[2]=t,l[3]=+e>0,l[4]=n,ca.apply(null,l)}function _a(e){return void 0===e?pi:"function"==typeof e&&(pi=e,!0)}function ma(e,t){return void 0!==gi[e]&&(void 0===t?gi[e]:(gi[e]=t,!0))}function fa(e){var t=this.localeData(),n=ha(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)}function pa(){var e,t,n,a=yi(this._milliseconds)/1e3,r=yi(this._days),i=yi(this._months);e=b(a/60),t=b(e/60),a%=60,e%=60,n=b(i/12),i%=12;var o=n,s=i,d=r,u=t,l=e,c=a,h=this.asSeconds();return h?(h<0?"-":"")+"P"+(o?o+"Y":"")+(s?s+"M":"")+(d?d+"D":"")+(u||l||c?"T":"")+(u?u+"H":"")+(l?l+"M":"")+(c?c+"S":""):"P0D"}var ga,ya;ya=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,a=0;a<n;a++)if(a in t&&e.call(this,t[a],a,t))return!0;return!1};var va=ya,Ma=t.momentProperties=[],ba=!1,La={};t.suppressDeprecationWarnings=!1,t.deprecationHandler=null;var ka;ka=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)l(e,t)&&n.push(t);return n};var Ya,xa=ka,Da={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},wa={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ta="Invalid date",Sa="%d",ja=/\d{1,2}/,Aa={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ha={},Pa={},Ca=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Oa=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Fa={},Wa={},Ea=/\d/,Ia=/\d\d/,Ra=/\d{3}/,za=/\d{4}/,Na=/[+-]?\d{6}/,Va=/\d\d?/,Ba=/\d\d\d\d?/,$a=/\d\d\d\d\d\d?/,Ua=/\d{1,3}/,Ja=/\d{1,4}/,qa=/[+-]?\d{1,6}/,Ga=/\d+/,Ka=/[+-]?\d+/,Za=/Z|[+-]\d\d:?\d\d/gi,Xa=/Z|[+-]\d\d(?::?\d\d)?/gi,Qa=/[+-]?\d+(\.\d{1,3})?/,er=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,tr={},nr={},ar=0,rr=1,ir=2,or=3,sr=4,dr=5,ur=6,lr=7,cr=8;Ya=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1};var hr=Ya;q("M",["MM",2],"Mo",function(){return this.month()+1}),q("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),q("MMMM",0,0,function(e){return this.localeData().months(this,e)}),W("month","M"),R("month",8),Q("M",Va),Q("MM",Va,Ia),Q("MMM",function(e,t){return t.monthsShortRegex(e)}),Q("MMMM",function(e,t){return t.monthsRegex(e)}),ae(["M","MM"],function(e,t){t[rr]=L(e)-1}),ae(["MMM","MMMM"],function(e,t,n,a){var r=n._locale.monthsParse(e,a,n._strict);null!=r?t[rr]=r:m(n).invalidMonth=e});var _r=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,mr="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),fr="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),pr=er,gr=er;q("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),q(0,["YY",2],0,function(){return this.year()%100}),q(0,["YYYY",4],0,"year"),q(0,["YYYYY",5],0,"year"),q(0,["YYYYYY",6,!0],0,"year"),W("year","y"),R("year",1),Q("Y",Ka),Q("YY",Va,Ia),Q("YYYY",Ja,za),Q("YYYYY",qa,Na),Q("YYYYYY",qa,Na),ae(["YYYYY","YYYYYY"],ar),ae("YYYY",function(e,n){n[ar]=2===e.length?t.parseTwoDigitYear(e):L(e)}),ae("YY",function(e,n){n[ar]=t.parseTwoDigitYear(e)}),ae("Y",function(e,t){t[ar]=parseInt(e,10)}),t.parseTwoDigitYear=function(e){return L(e)+(L(e)>68?1900:2e3)};var yr=N("FullYear",!0);q("w",["ww",2],"wo","week"),q("W",["WW",2],"Wo","isoWeek"),W("week","w"),W("isoWeek","W"),R("week",5),R("isoWeek",5),Q("w",Va),Q("ww",Va,Ia),Q("W",Va),Q("WW",Va,Ia),re(["w","ww","W","WW"],function(e,t,n,a){t[a.substr(0,1)]=L(e)});var vr={dow:0,doy:6};q("d",0,"do","day"),q("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),q("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),q("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),q("e",0,0,"weekday"),q("E",0,0,"isoWeekday"),W("day","d"),W("weekday","e"),W("isoWeekday","E"),R("day",11),R("weekday",11),R("isoWeekday",11),Q("d",Va),Q("e",Va),Q("E",Va),Q("dd",function(e,t){return t.weekdaysMinRegex(e)}),Q("ddd",function(e,t){return t.weekdaysShortRegex(e)}),Q("dddd",function(e,t){return t.weekdaysRegex(e)}),re(["dd","ddd","dddd"],function(e,t,n,a){var r=n._locale.weekdaysParse(e,a,n._strict);null!=r?t.d=r:m(n).invalidWeekday=e}),re(["d","e","E"],function(e,t,n,a){t[a]=L(e)});var Mr="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),br="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Lr="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),kr=er,Yr=er,xr=er;q("H",["HH",2],0,"hour"),q("h",["hh",2],0,$e),q("k",["kk",2],0,Ue),q("hmm",0,0,function(){return""+$e.apply(this)+J(this.minutes(),2)}),q("hmmss",0,0,function(){return""+$e.apply(this)+J(this.minutes(),2)+J(this.seconds(),2)}),q("Hmm",0,0,function(){return""+this.hours()+J(this.minutes(),2)}),q("Hmmss",0,0,function(){return""+this.hours()+J(this.minutes(),2)+J(this.seconds(),2)}),Je("a",!0),Je("A",!1),W("hour","h"),R("hour",13),Q("a",qe),Q("A",qe),Q("H",Va),Q("h",Va),Q("HH",Va,Ia),Q("hh",Va,Ia),Q("hmm",Ba),Q("hmmss",$a),Q("Hmm",Ba),Q("Hmmss",$a),ae(["H","HH"],or),ae(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ae(["h","hh"],function(e,t,n){t[or]=L(e),m(n).bigHour=!0}),ae("hmm",function(e,t,n){var a=e.length-2;t[or]=L(e.substr(0,a)),t[sr]=L(e.substr(a)),m(n).bigHour=!0}),ae("hmmss",function(e,t,n){var a=e.length-4,r=e.length-2;t[or]=L(e.substr(0,a)),t[sr]=L(e.substr(a,2)),t[dr]=L(e.substr(r)),m(n).bigHour=!0}),ae("Hmm",function(e,t,n){var a=e.length-2;t[or]=L(e.substr(0,a)),t[sr]=L(e.substr(a))}),ae("Hmmss",function(e,t,n){var a=e.length-4,r=e.length-2;t[or]=L(e.substr(0,a)),t[sr]=L(e.substr(a,2)),t[dr]=L(e.substr(r))});var Dr,wr=/[ap]\.?m?\.?/i,Tr=N("Hours",!0),Sr={calendar:Da,longDateFormat:wa,invalidDate:Ta,ordinal:Sa,ordinalParse:ja,relativeTime:Aa,months:mr,monthsShort:fr,week:vr,weekdays:Mr,weekdaysMin:Lr,weekdaysShort:br,meridiemParse:wr},jr={},Ar={},Hr=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Pr=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Cr=/Z|[+-]\d\d(?::?\d\d)?/,Or=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Fr=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Wr=/^\/?Date\((\-?\d+)/i;t.createFromInputFallback=x("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),t.ISO_8601=function(){};var Er=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Mt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:p()}),Ir=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Mt.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:p()}),Rr=function(){return Date.now?Date.now():+new Date};wt("Z",":"),wt("ZZ",""),Q("Z",Xa),Q("ZZ",Xa),ae(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Tt(Xa,e)});var zr=/([\+\-]|\d\d)/gi;t.updateOffset=function(){};var Nr=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Vr=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Nt.fn=Yt.prototype;var Br=Ut(1,"add"),$r=Ut(-1,"subtract");t.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",t.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Ur=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});q(0,["gg",2],0,function(){return this.weekYear()%100}),q(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Tn("gggg","weekYear"),Tn("ggggg","weekYear"),Tn("GGGG","isoWeekYear"),Tn("GGGGG","isoWeekYear"),W("weekYear","gg"),W("isoWeekYear","GG"),R("weekYear",1),R("isoWeekYear",1),Q("G",Ka),Q("g",Ka),Q("GG",Va,Ia),Q("gg",Va,Ia),Q("GGGG",Ja,za),Q("gggg",Ja,za),Q("GGGGG",qa,Na),Q("ggggg",qa,Na),re(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,a){t[a.substr(0,2)]=L(e)}),re(["gg","GG"],function(e,n,a,r){n[r]=t.parseTwoDigitYear(e)}),q("Q",0,"Qo","quarter"),W("quarter","Q"),R("quarter",7),Q("Q",Ea),ae("Q",function(e,t){t[rr]=3*(L(e)-1)}),q("D",["DD",2],"Do","date"),W("date","D"),R("date",9),Q("D",Va),Q("DD",Va,Ia),Q("Do",function(e,t){return e?t._ordinalParse:t._ordinalParseLenient}),ae(["D","DD"],ir),ae("Do",function(e,t){t[ir]=L(e.match(Va)[0],10)});var Jr=N("Date",!0);q("DDD",["DDDD",3],"DDDo","dayOfYear"),W("dayOfYear","DDD"),R("dayOfYear",4),Q("DDD",Ua),Q("DDDD",Ra),ae(["DDD","DDDD"],function(e,t,n){n._dayOfYear=L(e)}),q("m",["mm",2],0,"minute"),W("minute","m"),R("minute",14),Q("m",Va),Q("mm",Va,Ia),ae(["m","mm"],sr);var qr=N("Minutes",!1);q("s",["ss",2],0,"second"),W("second","s"),R("second",15),Q("s",Va),Q("ss",Va,Ia),ae(["s","ss"],dr);var Gr=N("Seconds",!1);q("S",0,0,function(){return~~(this.millisecond()/100)}),q(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),q(0,["SSS",3],0,"millisecond"),q(0,["SSSS",4],0,function(){return 10*this.millisecond()}),q(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),q(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),q(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),q(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),q(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),W("millisecond","ms"),R("millisecond",16),Q("S",Ua,Ea),Q("SS",Ua,Ia),Q("SSS",Ua,Ra);var Kr;for(Kr="SSSS";Kr.length<=9;Kr+="S")Q(Kr,Ga);for(Kr="S";Kr.length<=9;Kr+="S")ae(Kr,Wn);var Zr=N("Milliseconds",!1);q("z",0,0,"zoneAbbr"),q("zz",0,0,"zoneName");var Xr=v.prototype;Xr.add=Br,Xr.calendar=Gt,Xr.clone=Kt,Xr.diff=an,Xr.endOf=gn,Xr.format=un,Xr.from=ln,Xr.fromNow=cn,Xr.to=hn,Xr.toNow=_n,Xr.get=$,Xr.invalidAt=Dn,Xr.isAfter=Zt,Xr.isBefore=Xt,Xr.isBetween=Qt,Xr.isSame=en,Xr.isSameOrAfter=tn,Xr.isSameOrBefore=nn,Xr.isValid=Yn,Xr.lang=Ur,Xr.locale=mn,Xr.localeData=fn,Xr.max=Ir,Xr.min=Er,Xr.parsingFlags=xn,Xr.set=U,Xr.startOf=pn,Xr.subtract=$r,Xr.toArray=bn,Xr.toObject=Ln,Xr.toDate=Mn,Xr.toISOString=sn,Xr.inspect=dn,Xr.toJSON=kn,Xr.toString=on,Xr.unix=vn,Xr.valueOf=yn,Xr.creationData=wn,Xr.year=yr,Xr.isLeapYear=ve,Xr.weekYear=Sn,Xr.isoWeekYear=jn,Xr.quarter=Xr.quarters=On,Xr.month=he,Xr.daysInMonth=_e,Xr.week=Xr.weeks=Se,Xr.isoWeek=Xr.isoWeeks=je,Xr.weeksInYear=Hn,Xr.isoWeeksInYear=An,Xr.date=Jr,Xr.day=Xr.days=Ee,Xr.weekday=Ie,Xr.isoWeekday=Re,Xr.dayOfYear=Fn,Xr.hour=Xr.hours=Tr,Xr.minute=Xr.minutes=qr,Xr.second=Xr.seconds=Gr,Xr.millisecond=Xr.milliseconds=Zr,Xr.utcOffset=At,Xr.utc=Pt,Xr.local=Ct,Xr.parseZone=Ot,Xr.hasAlignedHourOffset=Ft,Xr.isDST=Wt,Xr.isLocal=It,Xr.isUtcOffset=Rt,Xr.isUtc=zt,Xr.isUTC=zt,Xr.zoneAbbr=En,Xr.zoneName=In,Xr.dates=x("dates accessor is deprecated. Use date instead.",Jr),Xr.months=x("months accessor is deprecated. Use month instead",he),Xr.years=x("years accessor is deprecated. Use year instead",yr),Xr.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Ht),Xr.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Et);var Qr=j.prototype;Qr.calendar=A,Qr.longDateFormat=H,Qr.invalidDate=P,Qr.ordinal=C,Qr.preparse=Nn,Qr.postformat=Nn,Qr.relativeTime=O,Qr.pastFuture=F,Qr.set=T,Qr.months=se,Qr.monthsShort=de,Qr.monthsParse=le,Qr.monthsRegex=fe,Qr.monthsShortRegex=me,Qr.week=De,Qr.firstDayOfYear=Te,Qr.firstDayOfWeek=we,Qr.weekdays=Pe,Qr.weekdaysMin=Oe,Qr.weekdaysShort=Ce,Qr.weekdaysParse=We,Qr.weekdaysRegex=ze,Qr.weekdaysShortRegex=Ne,Qr.weekdaysMinRegex=Ve,Qr.isPM=Ge,Qr.meridiem=Ke,et("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=1===L(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),t.lang=x("moment.lang is deprecated. Use moment.locale instead.",et),t.langData=x("moment.langData is deprecated. Use moment.localeData instead.",at);var ei=Math.abs,ti=sa("ms"),ni=sa("s"),ai=sa("m"),ri=sa("h"),ii=sa("d"),oi=sa("w"),si=sa("M"),di=sa("y"),ui=ua("milliseconds"),li=ua("seconds"),ci=ua("minutes"),hi=ua("hours"),_i=ua("days"),mi=ua("months"),fi=ua("years"),pi=Math.round,gi={s:45,m:45,h:22,d:26,M:11},yi=Math.abs,vi=Yt.prototype;return vi.abs=Zn,vi.add=Qn,vi.subtract=ea,vi.as=ia,vi.asMilliseconds=ti,vi.asSeconds=ni,vi.asMinutes=ai,vi.asHours=ri,vi.asDays=ii,vi.asWeeks=oi,vi.asMonths=si,vi.asYears=di,vi.valueOf=oa,vi._bubble=na,vi.get=da,vi.milliseconds=ui,vi.seconds=li,vi.minutes=ci,vi.hours=hi,vi.days=_i,vi.weeks=la,vi.months=mi,vi.years=fi,vi.humanize=fa,vi.toISOString=pa,vi.toString=pa,vi.toJSON=pa,vi.locale=mn,vi.localeData=fn,vi.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",pa),vi.lang=Ur,q("X",0,0,"unix"),q("x",0,0,"valueOf"),Q("x",Ka),Q("X",Qa),ae("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ae("x",function(e,t,n){n._d=new Date(L(e))}),t.version="2.17.1",a(Mt),t.fn=Xr,t.min=Lt,t.max=kt,t.now=Rr,t.utc=h,t.unix=Rn,t.months=Un,t.isDate=d,t.locale=et,t.invalid=p,t.duration=Nt,t.isMoment=M,t.weekdays=qn,t.parseZone=zn,t.localeData=at,t.isDuration=xt,t.monthsShort=Jn,t.weekdaysMin=Kn,t.defineLocale=tt,t.updateLocale=nt,t.locales=rt,t.weekdaysShort=Gn,t.normalizeUnits=E,t.relativeTimeRounding=_a,t.relativeTimeThreshold=ma,t.calendarFormat=qt,t.prototype=Xr,t})}).call(t,n(32)(e))},function(e,t,n){var a=n(77),r="object"==typeof self&&self&&self.Object===Object&&self,i=a||r||Function("return this")();e.exports=i},function(e,t){var n=Array.isArray;e.exports=n},function(e,t){function n(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}e.exports=n},function(e,t){function n(e){return null!=e&&"object"==typeof e}e.exports=n},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){return(0,o.default)(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.mergeOptions=r;var i=n(372),o=a(i)},function(e,t,n){var a=n(236)();n(234)(a),n(230)(a),n(233)(a),n(229)(a),n(231)(a),n(232)(a),n(237)(a),n(241)(a),n(239)(a),n(242)(a),n(240)(a),n(243)(a),n(238)(a),n(235)(a),n(244)(a),n(245)(a),n(246)(a),n(247)(a),n(248)(a),n(251)(a),n(249)(a),n(250)(a),n(252)(a),n(253)(a),n(254)(a),n(223)(a),n(224)(a),n(225)(a),n(226)(a),n(227)(a),n(228)(a),n(216)(a),n(217)(a),n(218)(a),n(219)(a),n(220)(a),n(221)(a),n(222)(a),window.Chart=e.exports=a},function(e,t,n){function a(e,t){var n=i(e,t);return r(n)?n:void 0}var r=n(281),i=n(319);e.exports=a},function(e,t,n){(function(t){/*!
		 * Vue.js v2.1.6
		 * (c) 2014-2016 Evan You
		 * Released under the MIT License.
		 */
	"use strict";function n(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function a(e){var t=parseFloat(e,10);return t||0===t?t:e}function r(e,t){for(var n=Object.create(null),a=e.split(","),r=0;r<a.length;r++)n[a[r]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function i(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function o(e,t){return gn.call(e,t)}function s(e){return"string"==typeof e||"number"==typeof e}function d(e){var t=Object.create(null);return function(n){var a=t[n];return a||(t[n]=e(n))}}function u(e,t){function n(n){var a=arguments.length;return a?a>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function l(e,t){t=t||0;for(var n=e.length-t,a=new Array(n);n--;)a[n]=e[n+t];return a}function c(e,t){for(var n in t)e[n]=t[n];return e}function h(e){return null!==e&&"object"==typeof e}function _(e){return kn.call(e)===Yn}function m(e){for(var t={},n=0;n<e.length;n++)e[n]&&c(t,e[n]);return t}function f(){}function p(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}function g(e,t){return e==t||!(!h(e)||!h(t))&&JSON.stringify(e)===JSON.stringify(t)}function y(e,t){for(var n=0;n<e.length;n++)if(g(e[n],t))return n;return-1}function v(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function M(e,t,n,a){Object.defineProperty(e,t,{value:n,enumerable:!!a,writable:!0,configurable:!0})}function b(e){if(!Tn.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function L(e){return/native code/.test(e.toString())}function k(e){$n.target&&Un.push($n.target),$n.target=e}function Y(){$n.target=Un.pop()}function x(e,t){e.__proto__=t}function D(e,t,n){for(var a=0,r=n.length;a<r;a++){var i=n[a];M(e,i,t[i])}}function w(e){if(h(e)){var t;return o(e,"__ob__")&&e.__ob__ instanceof Zn?t=e.__ob__:Kn.shouldConvert&&!Wn()&&(Array.isArray(e)||_(e))&&Object.isExtensible(e)&&!e._isVue&&(t=new Zn(e)),t}}function T(e,t,n,a){var r=new $n,i=Object.getOwnPropertyDescriptor(e,t);if(!i||i.configurable!==!1){var o=i&&i.get,s=i&&i.set,d=w(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=o?o.call(e):n;return $n.target&&(r.depend(),d&&d.dep.depend(),Array.isArray(t)&&A(t)),t},set:function(t){var i=o?o.call(e):n;t===i||t!==t&&i!==i||("production"!=={NODE_ENV:"production"}&&a&&a(),s?s.call(e,t):n=t,d=w(t),r.notify())}})}}function S(e,t,n){if(Array.isArray(e))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(o(e,t))return void(e[t]=n);var a=e.__ob__;return e._isVue||a&&a.vmCount?void("production"!=={NODE_ENV:"production"}&&zn("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.")):a?(T(a.value,t,n),a.dep.notify(),n):void(e[t]=n)}function j(e,t){var n=e.__ob__;return e._isVue||n&&n.vmCount?void("production"!=={NODE_ENV:"production"}&&zn("Avoid deleting properties on a Vue instance or its root $data - just set it to null.")):void(o(e,t)&&(delete e[t],n&&n.dep.notify()))}function A(e){for(var t=void 0,n=0,a=e.length;n<a;n++)t=e[n],t&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&A(t)}function H(e,t){if(!t)return e;for(var n,a,r,i=Object.keys(t),s=0;s<i.length;s++)n=i[s],a=e[n],r=t[n],o(e,n)?_(a)&&_(r)&&H(a,r):S(e,n,r);return e}function P(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function C(e,t){var n=Object.create(e||null);return t?c(n,t):n}function O(e){for(var t in e.components){var n=t.toLowerCase();(pn(n)||wn.isReservedTag(n))&&zn("Do not use built-in or reserved HTML elements as component id: "+t)}}function F(e){var t=e.props;if(t){var n,a,r,i={};if(Array.isArray(t))for(n=t.length;n--;)a=t[n],"string"==typeof a?(r=vn(a),i[r]={type:null}):"production"!=={NODE_ENV:"production"}&&zn("props must be strings when using array syntax.");else if(_(t))for(var o in t)a=t[o],r=vn(o),i[r]=_(a)?a:{type:a};e.props=i}}function W(e){var t=e.directives;if(t)for(var n in t){var a=t[n];"function"==typeof a&&(t[n]={bind:a,update:a})}}function E(e,t,n){function a(a){var r=Xn[a]||ea;l[a]=r(e[a],t[a],n,a)}"production"!=={NODE_ENV:"production"}&&O(t),F(t),W(t);var r=t.extends;if(r&&(e="function"==typeof r?E(e,r.options,n):E(e,r,n)),t.mixins)for(var i=0,s=t.mixins.length;i<s;i++){var d=t.mixins[i];d.prototype instanceof Ve&&(d=d.options),e=E(e,d,n)}var u,l={};for(u in e)a(u);for(u in t)o(e,u)||a(u);return l}function I(e,t,n,a){if("string"==typeof n){var r=e[t];if(o(r,n))return r[n];var i=vn(n);if(o(r,i))return r[i];var s=Mn(i);if(o(r,s))return r[s];var d=r[n]||r[i]||r[s];return"production"!=={NODE_ENV:"production"}&&a&&!d&&zn("Failed to resolve "+t.slice(0,-1)+": "+n,e),d}}function R(e,t,n,a){var r=t[e],i=!o(n,e),s=n[e];if($(r.type)&&(i&&!o(r,"default")?s=!1:""!==s&&s!==Ln(e)||(s=!0)),void 0===s){s=z(a,r,e);var d=Kn.shouldConvert;Kn.shouldConvert=!0,w(s),Kn.shouldConvert=d}return"production"!=={NODE_ENV:"production"}&&N(r,e,s,a,i),s}function z(e,t,n){if(o(t,"default")){var a=t.default;return h(a)&&"production"!=={NODE_ENV:"production"}&&zn('Invalid default value for prop "'+n+'": Props with type Object/Array must use a factory function to return the default value.',e),e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e[n]?e[n]:"function"==typeof a&&t.type!==Function?a.call(e):a}}function N(e,t,n,a,r){if(e.required&&r)return void zn('Missing required prop: "'+t+'"',a);if(null!=n||e.required){var i=e.type,o=!i||i===!0,s=[];if(i){Array.isArray(i)||(i=[i]);for(var d=0;d<i.length&&!o;d++){var u=V(n,i[d]);s.push(u.expectedType),o=u.valid}}if(!o)return void zn('Invalid prop: type check failed for prop "'+t+'". Expected '+s.map(Mn).join(", ")+", got "+Object.prototype.toString.call(n).slice(8,-1)+".",a);var l=e.validator;l&&(l(n)||zn('Invalid prop: custom validator check failed for prop "'+t+'".',a))}}function V(e,t){var n,a=B(t);return n="String"===a?typeof e==(a="string"):"Number"===a?typeof e==(a="number"):"Boolean"===a?typeof e==(a="boolean"):"Function"===a?typeof e==(a="function"):"Object"===a?_(e):"Array"===a?Array.isArray(e):e instanceof t,{valid:n,expectedType:a}}function B(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t&&t[1]}function $(e){if(!Array.isArray(e))return"Boolean"===B(e);for(var t=0,n=e.length;t<n;t++)if("Boolean"===B(e[t]))return!0;return!1}function U(){da.length=0,ua={},"production"!=={NODE_ENV:"production"}&&(la={}),ca=ha=!1}function J(){for(ha=!0,da.sort(function(e,t){return e.id-t.id}),_a=0;_a<da.length;_a++){var e=da[_a],t=e.id;if(ua[t]=null,e.run(),"production"!=={NODE_ENV:"production"}&&null!=ua[t]&&(la[t]=(la[t]||0)+1,la[t]>wn._maxUpdateCount)){zn("You may have an infinite update loop "+(e.user?'in watcher with expression "'+e.expression+'"':"in a component render function."),e.vm);break}}En&&wn.devtools&&En.emit("flush"),U()}function q(e){var t=e.id;if(null==ua[t]){if(ua[t]=!0,ha){for(var n=da.length-1;n>=0&&da[n].id>e.id;)n--;da.splice(Math.max(n,_a)+1,0,e)}else da.push(e);ca||(ca=!0,In(J))}}function G(e){pa.clear(),K(e,pa)}function K(e,t){var n,a,r=Array.isArray(e);if((r||h(e))&&Object.isExtensible(e)){if(e.__ob__){var i=e.__ob__.dep.id;if(t.has(i))return;t.add(i)}if(r)for(n=e.length;n--;)K(e[n],t);else for(a=Object.keys(e),n=a.length;n--;)K(e[a[n]],t)}}function Z(e){e._watchers=[],X(e),ne(e),Q(e),ee(e),ae(e)}function X(e){var t=e.$options.props;if(t){var n=e.$options.propsData||{},a=e.$options._propKeys=Object.keys(t),r=!e.$parent;Kn.shouldConvert=r;for(var i=function(r){var i=a[r];"production"!=={NODE_ENV:"production"}?(ga[i]&&zn('"'+i+'" is a reserved attribute and cannot be used as component prop.',e),T(e,i,R(i,t,n,e),function(){e.$parent&&!Kn.isSettingProps&&zn("Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: \""+i+'"',e)})):T(e,i,R(i,t,n,e))},o=0;o<a.length;o++)i(o);Kn.shouldConvert=!0}}function Q(e){var t=e.$options.data;t=e._data="function"==typeof t?t.call(e):t||{},_(t)||(t={},"production"!=={NODE_ENV:"production"}&&zn("data functions should return an object:\nhttps://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",e));for(var n=Object.keys(t),a=e.$options.props,r=n.length;r--;)a&&o(a,n[r])?"production"!=={NODE_ENV:"production"}&&zn('The data property "'+n[r]+'" is already declared as a prop. Use prop default value instead.',e):oe(e,n[r]);w(t),t.__ob__&&t.__ob__.vmCount++}function ee(e){var t=e.$options.computed;if(t)for(var n in t){var a=t[n];"function"==typeof a?(ya.get=te(a,e),ya.set=f):(ya.get=a.get?a.cache!==!1?te(a.get,e):u(a.get,e):f,ya.set=a.set?u(a.set,e):f),Object.defineProperty(e,n,ya)}}function te(e,t){var n=new fa(t,e,f,{lazy:!0});return function(){return n.dirty&&n.evaluate(),$n.target&&n.depend(),n.value}}function ne(e){var t=e.$options.methods;if(t)for(var n in t)e[n]=null==t[n]?f:u(t[n],e),"production"!=={NODE_ENV:"production"}&&null==t[n]&&zn('method "'+n+'" has an undefined value in the component definition. Did you reference the function correctly?',e)}function ae(e){var t=e.$options.watch;if(t)for(var n in t){var a=t[n];if(Array.isArray(a))for(var r=0;r<a.length;r++)re(e,n,a[r]);else re(e,n,a)}}function re(e,t,n){var a;_(n)&&(a=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,a)}function ie(e){var t={};t.get=function(){return this._data},"production"!=={NODE_ENV:"production"}&&(t.set=function(e){zn("Avoid replacing instance root $data. Use nested data properties instead.",this)}),Object.defineProperty(e.prototype,"$data",t),e.prototype.$set=S,e.prototype.$delete=j,e.prototype.$watch=function(e,t,n){var a=this;n=n||{},n.user=!0;var r=new fa(a,e,t,n);return n.immediate&&t.call(a,r.value),function(){r.teardown()}}}function oe(e,t){v(t)||Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return e._data[t]},set:function(n){e._data[t]=n}})}function se(e){return new va(void 0,void 0,void 0,String(e))}function de(e){var t=new va(e.tag,e.data,e.children,e.text,e.elm,e.context,e.componentOptions);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isCloned=!0,t}function ue(e){for(var t=new Array(e.length),n=0;n<e.length;n++)t[n]=de(e[n]);return t}function le(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function ce(e){e.prototype._mount=function(e,t){var n=this;return n.$el=e,n.$options.render||(n.$options.render=Ma,"production"!=={NODE_ENV:"production"}&&(n.$options.template&&"#"!==n.$options.template.charAt(0)?zn("You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build.",n):zn("Failed to mount component: template or render function not defined.",n))),he(n,"beforeMount"),n._watcher=new fa(n,function(){n._update(n._render(),t)},f),t=!1,null==n.$vnode&&(n._isMounted=!0,he(n,"mounted")),n},e.prototype._update=function(e,t){var n=this;n._isMounted&&he(n,"beforeUpdate");var a=n.$el,r=n._vnode,i=ba;ba=n,n._vnode=e,r?n.$el=n.__patch__(r,e):n.$el=n.__patch__(n.$el,e,t,!1,n.$options._parentElm,n.$options._refElm),ba=i,a&&(a.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el),n._isMounted&&he(n,"updated")},e.prototype._updateFromParent=function(e,t,n,a){var r=this,i=!(!r.$options._renderChildren&&!a);if(r.$options._parentVnode=n,r.$vnode=n,r._vnode&&(r._vnode.parent=n),r.$options._renderChildren=a,e&&r.$options.props){Kn.shouldConvert=!1,"production"!=={NODE_ENV:"production"}&&(Kn.isSettingProps=!0);for(var o=r.$options._propKeys||[],s=0;s<o.length;s++){var d=o[s];r[d]=R(d,r.$options.props,e,r)}Kn.shouldConvert=!0,"production"!=={NODE_ENV:"production"}&&(Kn.isSettingProps=!1),r.$options.propsData=e}if(t){var u=r.$options._parentListeners;r.$options._parentListeners=t,r._updateListeners(t,u)}i&&(r.$slots=We(a,n.context),r.$forceUpdate())},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){he(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||i(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,he(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.__patch__(e._vnode,null)}}}function he(e,t){var n=e.$options[t];if(n)for(var a=0,r=n.length;a<r;a++)n[a].call(e);e.$emit("hook:"+t)}function _e(e,t,n,a,r){if(e){var i=n.$options._base;if(h(e)&&(e=i.extend(e)),"function"!=typeof e)return void("production"!=={NODE_ENV:"production"}&&zn("Invalid Component definition: "+String(e),n));if(!e.cid)if(e.resolved)e=e.resolved;else if(e=Me(e,i,function(){n.$forceUpdate()}),!e)return;Ne(e),t=t||{};var o=be(t,e);if(e.options.functional)return me(e,o,t,n,a);var s=t.on;t.on=t.nativeOn,e.options.abstract&&(t={}),ke(t);var d=e.options.name||r,u=new va("vue-component-"+e.cid+(d?"-"+d:""),t,void 0,void 0,void 0,n,{Ctor:e,propsData:o,listeners:s,tag:r,children:a});return u}}function me(e,t,n,a,r){var i={},o=e.options.props;if(o)for(var s in o)i[s]=R(s,o,t);var d=Object.create(a),u=function(e,t,n,a){return He(d,e,t,n,a,!0)},l=e.options.render.call(null,u,{props:i,data:n,parent:a,children:r,slots:function(){return We(r,a)}});return l instanceof va&&(l.functionalContext=a,n.slot&&((l.data||(l.data={})).slot=n.slot)),l}function fe(e,t,n,a){var r=e.componentOptions,i={_isComponent:!0,parent:t,propsData:r.propsData,_componentTag:r.tag,_parentVnode:e,_parentListeners:r.listeners,_renderChildren:r.children,_parentElm:n||null,_refElm:a||null},o=e.data.inlineTemplate;return o&&(i.render=o.render,i.staticRenderFns=o.staticRenderFns),new r.Ctor(i)}function pe(e,t,n,a){if(!e.child||e.child._isDestroyed){var r=e.child=fe(e,ba,n,a);r.$mount(t?e.elm:void 0,t)}else if(e.data.keepAlive){var i=e;ge(i,i)}}function ge(e,t){var n=t.componentOptions,a=t.child=e.child;a._updateFromParent(n.propsData,n.listeners,t,n.children)}function ye(e){e.child._isMounted||(e.child._isMounted=!0,he(e.child,"mounted")),e.data.keepAlive&&(e.child._inactive=!1,he(e.child,"activated"))}function ve(e){e.child._isDestroyed||(e.data.keepAlive?(e.child._inactive=!0,he(e.child,"deactivated")):e.child.$destroy())}function Me(e,t,n){if(!e.requested){e.requested=!0;var a=e.pendingCallbacks=[n],r=!0,i=function(n){if(h(n)&&(n=t.extend(n)),e.resolved=n,!r)for(var i=0,o=a.length;i<o;i++)a[i](n)},o=function(t){"production"!=={NODE_ENV:"production"}&&zn("Failed to resolve async component: "+String(e)+(t?"\nReason: "+t:""))},s=e(i,o);return s&&"function"==typeof s.then&&!e.resolved&&s.then(i,o),r=!1,e.resolved}e.pendingCallbacks.push(n)}function be(e,t){var n=t.options.props;if(n){var a={},r=e.attrs,i=e.props,o=e.domProps;if(r||i||o)for(var s in n){var d=Ln(s);Le(a,i,s,d,!0)||Le(a,r,s,d)||Le(a,o,s,d)}return a}}function Le(e,t,n,a,r){if(t){if(o(t,n))return e[n]=t[n],r||delete t[n],!0;if(o(t,a))return e[n]=t[a],r||delete t[a],!0}return!1}function ke(e){e.hook||(e.hook={});for(var t=0;t<ka.length;t++){var n=ka[t],a=e.hook[n],r=La[n];e.hook[n]=a?Ye(r,a):r}}function Ye(e,t){return function(n,a,r,i){e(n,a,r,i),t(n,a,r,i)}}function xe(e,t,n,a){a+=t;var r=e.__injected||(e.__injected={});if(!r[a]){r[a]=!0;var i=e[t];i?e[t]=function(){i.apply(this,arguments),n.apply(this,arguments)}:e[t]=n}}function De(e,t,n,a,r){var i,o,s,d,u,l,c;for(i in e)if(o=e[i],s=t[i],o)if(s){if(o!==s)if(Array.isArray(s)){s.length=o.length;for(var h=0;h<s.length;h++)s[h]=o[h];e[i]=s}else s.fn=o,e[i]=s}else c="~"===i.charAt(0),u=c?i.slice(1):i,l="!"===u.charAt(0),u=l?u.slice(1):u,Array.isArray(o)?n(u,o.invoker=we(o),c,l):(o.invoker||(d=o,o=e[i]={},o.fn=d,o.invoker=Te(o)),n(u,o.invoker,c,l));else"production"!=={NODE_ENV:"production"}&&zn('Invalid handler for event "'+i+'": got '+String(o),r);for(i in t)e[i]||(c="~"===i.charAt(0),u=c?i.slice(1):i,l="!"===u.charAt(0),u=l?u.slice(1):u,a(u,t[i].invoker,l))}function we(e){return function(t){for(var n=arguments,a=1===arguments.length,r=0;r<e.length;r++)a?e[r](t):e[r].apply(null,n)}}function Te(e){return function(t){var n=1===arguments.length;n?e.fn(t):e.fn.apply(null,arguments)}}function Se(e){return s(e)?[se(e)]:Array.isArray(e)?je(e):void 0}function je(e,t){var n,a,r,i=[];for(n=0;n<e.length;n++)a=e[n],null!=a&&"boolean"!=typeof a&&(r=i[i.length-1],Array.isArray(a)?i.push.apply(i,je(a,(t||"")+"_"+n)):s(a)?r&&r.text?r.text+=String(a):""!==a&&i.push(se(a)):a.text&&r&&r.text?i[i.length-1]=se(r.text+a.text):(a.tag&&null==a.key&&null!=t&&(a.key="__vlist"+t+"_"+n+"__"),i.push(a)));return i}function Ae(e){return e&&e.filter(function(e){return e&&e.componentOptions})[0]}function He(e,t,n,a,r,i){return(Array.isArray(n)||s(n))&&(r=a,a=n,n=void 0),i&&(r=!0),Pe(e,t,n,a,r)}function Pe(e,t,n,a,r){if(n&&n.__ob__)return"production"!=={NODE_ENV:"production"}&&zn("Avoid using observed data object as vnode data: "+JSON.stringify(n)+"\nAlways create fresh vnode data objects in each render!",e),Ma();if(!t)return Ma();Array.isArray(a)&&"function"==typeof a[0]&&(n=n||{},n.scopedSlots={default:a[0]},a.length=0),r&&(a=Se(a));var i,o;if("string"==typeof t){var s;o=wn.getTagNamespace(t),wn.isReservedTag(t)?i=new va(wn.parsePlatformTagName(t),n,a,void 0,void 0,e):(s=I(e.$options,"components",t))?i=_e(s,n,e,a,t):(o="foreignObject"===t?"xhtml":o,i=new va(t,n,a,void 0,void 0,e))}else i=_e(t,n,e,a);return i?(o&&Ce(i,o),i):Ma()}function Ce(e,t){if(e.ns=t,e.children)for(var n=0,a=e.children.length;n<a;n++){var r=e.children[n];r.tag&&!r.ns&&Ce(r,t)}}function Oe(e){e.$vnode=null,e._vnode=null,e._staticTrees=null;var t=e.$options._parentVnode,n=t&&t.context;e.$slots=We(e.$options._renderChildren,n),e.$scopedSlots={},e._c=function(t,n,a,r){return He(e,t,n,a,r,!1)},e.$createElement=function(t,n,a,r){return He(e,t,n,a,r,!0)},e.$options.el&&e.$mount(e.$options.el)}function Fe(e){function t(e,t,n){if(Array.isArray(e))for(var a=0;a<e.length;a++)e[a]&&"string"!=typeof e[a]&&r(e[a],t+"_"+a,n);else r(e,t,n)}function r(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}e.prototype.$nextTick=function(e){return In(e,this)},e.prototype._render=function(){var e=this,t=e.$options,n=t.render,a=t.staticRenderFns,r=t._parentVnode;if(e._isMounted)for(var i in e.$slots)e.$slots[i]=ue(e.$slots[i]);r&&r.data.scopedSlots&&(e.$scopedSlots=r.data.scopedSlots),a&&!e._staticTrees&&(e._staticTrees=[]),e.$vnode=r;var o;try{o=n.call(e._renderProxy,e.$createElement)}catch(t){if(!wn.errorHandler)throw"production"!=={NODE_ENV:"production"}&&zn("Error when rendering "+Rn(e)+":"),t;wn.errorHandler.call(null,t,e),o=e._vnode}return o instanceof va||("production"!=={NODE_ENV:"production"}&&Array.isArray(o)&&zn("Multiple root nodes returned from render function. Render function should return a single root node.",e),o=Ma()),o.parent=r,o},e.prototype._s=n,e.prototype._v=se,e.prototype._n=a,e.prototype._e=Ma,e.prototype._q=g,e.prototype._i=y,e.prototype._m=function(e,n){var a=this._staticTrees[e];return a&&!n?Array.isArray(a)?ue(a):de(a):(a=this._staticTrees[e]=this.$options.staticRenderFns[e].call(this._renderProxy),t(a,"__static__"+e,!1),a)},e.prototype._o=function(e,n,a){return t(e,"__once__"+n+(a?"_"+a:""),!0),e},e.prototype._f=function(e){return I(this.$options,"filters",e,!0)||Dn},e.prototype._l=function(e,t){var n,a,r,i,o;if(Array.isArray(e))for(n=new Array(e.length),a=0,r=e.length;a<r;a++)n[a]=t(e[a],a);else if("number"==typeof e)for(n=new Array(e),a=0;a<e;a++)n[a]=t(a+1,a);else if(h(e))for(i=Object.keys(e),n=new Array(i.length),a=0,r=i.length;a<r;a++)o=i[a],n[a]=t(e[o],o,a);return n},e.prototype._t=function(e,t,n){var a=this.$scopedSlots[e];if(a)return a(n||{})||t;var r=this.$slots[e];return r&&"production"!=={NODE_ENV:"production"}&&(r._rendered&&zn('Duplicate presence of slot "'+e+'" found in the same render tree - this will likely cause render errors.',this),r._rendered=!0),r||t},e.prototype._b=function(e,t,n,a){if(n)if(h(n)){Array.isArray(n)&&(n=m(n));for(var r in n)if("class"===r||"style"===r)e[r]=n[r];else{var i=a||wn.mustUseProp(t,r)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={});i[r]=n[r]}}else"production"!=={NODE_ENV:"production"}&&zn("v-bind without argument expects an Object or Array value",this);return e},e.prototype._k=function(e,t,n){var a=wn.keyCodes[t]||n;return Array.isArray(a)?a.indexOf(e)===-1:a!==e}}function We(e,t){var n={};if(!e)return n;for(var a,r,i=[],o=0,s=e.length;o<s;o++)if(r=e[o],(r.context===t||r.functionalContext===t)&&r.data&&(a=r.data.slot)){var d=n[a]||(n[a]=[]);"template"===r.tag?d.push.apply(d,r.children):d.push(r)}else i.push(r);return i.length&&(1!==i.length||" "!==i[0].text&&!i[0].isComment)&&(n.default=i),n}function Ee(e){e._events=Object.create(null);var t=e.$options._parentListeners,n=function(t,n,a){a?e.$once(t,n):e.$on(t,n)},a=u(e.$off,e);e._updateListeners=function(t,r){De(t,r||{},n,a,e)},t&&e._updateListeners(t)}function Ie(e){e.prototype.$on=function(e,t){var n=this;return(n._events[e]||(n._events[e]=[])).push(t),n},e.prototype.$once=function(e,t){function n(){a.$off(e,n),t.apply(a,arguments)}var a=this;return n.fn=t,a.$on(e,n),a},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;var a=n._events[e];if(!a)return n;if(1===arguments.length)return n._events[e]=null,n;for(var r,i=a.length;i--;)if(r=a[i],r===t||r.fn===t){a.splice(i,1);break}return n},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?l(n):n;for(var a=l(arguments,1),r=0,i=n.length;r<i;r++)n[r].apply(t,a)}return t}}function Re(e){e.prototype._init=function(e){var t=this;t._uid=Ya++,t._isVue=!0,e&&e._isComponent?ze(t,e):t.$options=E(Ne(t.constructor),e||{},t),"production"!=={NODE_ENV:"production"}?Qn(t):t._renderProxy=t,t._self=t,le(t),Ee(t),he(t,"beforeCreate"),Z(t),he(t,"created"),Oe(t)}}function ze(e,t){var n=e.$options=Object.create(e.constructor.options);n.parent=t.parent,n.propsData=t.propsData,n._parentVnode=t._parentVnode,n._parentListeners=t._parentListeners,n._renderChildren=t._renderChildren,n._componentTag=t._componentTag,n._parentElm=t._parentElm,n._refElm=t._refElm,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function Ne(e){var t=e.options;if(e.super){var n=e.super.options,a=e.superOptions,r=e.extendOptions;n!==a&&(e.superOptions=n,r.render=t.render,r.staticRenderFns=t.staticRenderFns,r._scopeId=t._scopeId,t=e.options=E(n,r),t.name&&(t.components[t.name]=e))}return t}function Ve(e){"production"==={NODE_ENV:"production"}||this instanceof Ve||zn("Vue is a constructor and should be called with the `new` keyword"),this._init(e)}function Be(e){e.use=function(e){if(!e.installed){var t=l(arguments,1);return t.unshift(this),"function"==typeof e.install?e.install.apply(e,t):e.apply(null,t),e.installed=!0,this}}}function $e(e){e.mixin=function(e){this.options=E(this.options,e)}}function Ue(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,a=n.cid,r=e._Ctor||(e._Ctor={});if(r[a])return r[a];var i=e.name||n.options.name;"production"!=={NODE_ENV:"production"}&&(/^[a-zA-Z][\w-]*$/.test(i)||zn('Invalid component name: "'+i+'". Component names can only contain alphanumeric characters and the hyphen, and must start with a letter.'));var o=function(e){this._init(e)};return o.prototype=Object.create(n.prototype),o.prototype.constructor=o,o.cid=t++,o.options=E(n.options,e),o.super=n,o.extend=n.extend,o.mixin=n.mixin,o.use=n.use,wn._assetTypes.forEach(function(e){o[e]=n[e]}),i&&(o.options.components[i]=o),o.superOptions=n.options,o.extendOptions=e,r[a]=o,o}}function Je(e){wn._assetTypes.forEach(function(t){e[t]=function(e,n){return n?("production"!=={NODE_ENV:"production"}&&"component"===t&&wn.isReservedTag(e)&&zn("Do not use built-in or reserved HTML elements as component id: "+e),"component"===t&&_(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function qe(e,t){return"string"==typeof e?e.split(",").indexOf(t)>-1:e.test(t)}function Ge(e){var t={};t.get=function(){return wn},"production"!=={NODE_ENV:"production"}&&(t.set=function(){zn("Do not replace the Vue.config object, set individual fields instead.")}),Object.defineProperty(e,"config",t),e.util=ta,e.set=S,e.delete=j,e.nextTick=In,e.options=Object.create(null),wn._assetTypes.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,c(e.options.components,wa),Be(e),$e(e),Ue(e),Je(e)}function Ke(e){for(var t=e.data,n=e,a=e;a.child;)a=a.child._vnode,a.data&&(t=Ze(a.data,t));for(;n=n.parent;)n.data&&(t=Ze(t,n.data));return Xe(t)}function Ze(e,t){return{staticClass:Qe(e.staticClass,t.staticClass),class:e.class?[e.class,t.class]:t.class}}function Xe(e){var t=e.class,n=e.staticClass;return n||t?Qe(n,et(t)):""}function Qe(e,t){return e?t?e+" "+t:e:t||""}function et(e){var t="";if(!e)return t;if("string"==typeof e)return e;if(Array.isArray(e)){for(var n,a=0,r=e.length;a<r;a++)e[a]&&(n=et(e[a]))&&(t+=n+" ");return t.slice(0,-1)}if(h(e)){for(var i in e)e[i]&&(t+=i+" ");return t.slice(0,-1)}return t}function tt(e){return Ra(e)?"svg":"math"===e?"math":void 0}function nt(e){if(!jn)return!0;if(za(e))return!1;if(e=e.toLowerCase(),null!=Na[e])return Na[e];var t=document.createElement(e);return e.indexOf("-")>-1?Na[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Na[e]=/HTMLUnknownElement/.test(t.toString())}function at(e){if("string"==typeof e){var t=e;if(e=document.querySelector(e),!e)return"production"!=={NODE_ENV:"production"}&&zn("Cannot find element: "+t),document.createElement("div")}return e}function rt(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&"multiple"in t.data.attrs&&n.setAttribute("multiple","multiple"),n)}function it(e,t){return document.createElementNS(Ea[e],t)}function ot(e){return document.createTextNode(e)}function st(e){return document.createComment(e)}function dt(e,t,n){e.insertBefore(t,n)}function ut(e,t){e.removeChild(t)}function lt(e,t){e.appendChild(t)}function ct(e){return e.parentNode}function ht(e){return e.nextSibling}function _t(e){return e.tagName}function mt(e,t){e.textContent=t}function ft(e,t,n){e.setAttribute(t,n)}function pt(e,t){var n=e.data.ref;if(n){var a=e.context,r=e.child||e.elm,o=a.$refs;t?Array.isArray(o[n])?i(o[n],r):o[n]===r&&(o[n]=void 0):e.data.refInFor?Array.isArray(o[n])&&o[n].indexOf(r)<0?o[n].push(r):o[n]=[r]:o[n]=r}}function gt(e){return null==e}function yt(e){return null!=e}function vt(e,t){return e.key===t.key&&e.tag===t.tag&&e.isComment===t.isComment&&!e.data==!t.data}function Mt(e,t,n){var a,r,i={};for(a=t;a<=n;++a)r=e[a].key,yt(r)&&(i[r]=a);return i}function bt(e){function t(e){return new va(S.tagName(e).toLowerCase(),{},[],void 0,e)}function a(e,t){function n(){0===--n.listeners&&i(e)}return n.listeners=t,n}function i(e){var t=S.parentNode(e);t&&S.removeChild(t,e)}function o(e,t,n,a,r){if(e.isRootInsert=!r,!d(e,t,n,a)){var i=e.data,o=e.children,s=e.tag;yt(s)?("production"!=={NODE_ENV:"production"}&&(i&&i.pre&&j++,j||e.ns||wn.ignoredElements&&wn.ignoredElements.indexOf(s)>-1||!wn.isUnknownElement(s)||zn("Unknown custom element: <"+s+'> - did you register the component correctly? For recursive components, make sure to provide the "name" option.',e.context)),e.elm=e.ns?S.createElementNS(e.ns,s):S.createElement(s,e),f(e),c(e,o,t),yt(i)&&_(e,t),l(n,e.elm,a),"production"!=={NODE_ENV:"production"}&&i&&i.pre&&j--):e.isComment?(e.elm=S.createComment(e.text),l(n,e.elm,a)):(e.elm=S.createTextNode(e.text),l(n,e.elm,a))}}function d(e,t,n,a){var r=e.data;if(yt(r)){var i=yt(e.child)&&r.keepAlive;if(yt(r=r.hook)&&yt(r=r.init)&&r(e,!1,n,a),yt(e.child))return m(e,t),i&&u(e,t,n,a),!0}}function u(e,t,n,a){for(var r,i=e;i.child;)if(i=i.child._vnode,yt(r=i.data)&&yt(r=r.transition)){for(r=0;r<w.activate.length;++r)w.activate[r]($a,i);t.push(i);break}l(n,e.elm,a)}function l(e,t,n){e&&(n?S.insertBefore(e,t,n):S.appendChild(e,t))}function c(e,t,n){if(Array.isArray(t))for(var a=0;a<t.length;++a)o(t[a],n,e.elm,null,!0);else s(e.text)&&S.appendChild(e.elm,S.createTextNode(e.text))}function h(e){for(;e.child;)e=e.child._vnode;return yt(e.tag)}function _(e,t){for(var n=0;n<w.create.length;++n)w.create[n]($a,e);x=e.data.hook,yt(x)&&(x.create&&x.create($a,e),x.insert&&t.push(e))}function m(e,t){e.data.pendingInsert&&t.push.apply(t,e.data.pendingInsert),e.elm=e.child.$el,h(e)?(_(e,t),f(e)):(pt(e),t.push(e))}function f(e){var t;yt(t=e.context)&&yt(t=t.$options._scopeId)&&S.setAttribute(e.elm,t,""),yt(t=ba)&&t!==e.context&&yt(t=t.$options._scopeId)&&S.setAttribute(e.elm,t,"")}function p(e,t,n,a,r,i){for(;a<=r;++a)o(n[a],i,e,t)}function g(e){var t,n,a=e.data;if(yt(a))for(yt(t=a.hook)&&yt(t=t.destroy)&&t(e),t=0;t<w.destroy.length;++t)w.destroy[t](e);if(yt(t=e.children))for(n=0;n<e.children.length;++n)g(e.children[n])}function y(e,t,n,a){for(;n<=a;++n){var r=t[n];yt(r)&&(yt(r.tag)?(v(r),g(r)):S.removeChild(e,r.elm))}}function v(e,t){if(t||yt(e.data)){var n=w.remove.length+1;for(t?t.listeners+=n:t=a(e.elm,n),yt(x=e.child)&&yt(x=x._vnode)&&yt(x.data)&&v(x,t),x=0;x<w.remove.length;++x)w.remove[x](e,t);yt(x=e.data.hook)&&yt(x=x.remove)?x(e,t):t()}else i(e.elm)}function M(e,t,n,a,r){for(var i,s,d,u,l=0,c=0,h=t.length-1,_=t[0],m=t[h],f=n.length-1,g=n[0],v=n[f],M=!r;l<=h&&c<=f;)gt(_)?_=t[++l]:gt(m)?m=t[--h]:vt(_,g)?(b(_,g,a),_=t[++l],g=n[++c]):vt(m,v)?(b(m,v,a),m=t[--h],v=n[--f]):vt(_,v)?(b(_,v,a),M&&S.insertBefore(e,_.elm,S.nextSibling(m.elm)),_=t[++l],v=n[--f]):vt(m,g)?(b(m,g,a),M&&S.insertBefore(e,m.elm,_.elm),m=t[--h],g=n[++c]):(gt(i)&&(i=Mt(t,l,h)),s=yt(g.key)?i[g.key]:null,gt(s)?(o(g,a,e,_.elm),g=n[++c]):(d=t[s],"production"==={NODE_ENV:"production"}||d||zn("It seems there are duplicate keys that is causing an update error. Make sure each v-for item has a unique key."),vt(d,g)?(b(d,g,a),t[s]=void 0,M&&S.insertBefore(e,g.elm,_.elm),g=n[++c]):(o(g,a,e,_.elm),g=n[++c])));l>h?(u=gt(n[f+1])?null:n[f+1].elm,p(e,u,n,c,f,a)):c>f&&y(e,t,l,h)}function b(e,t,n,a){if(e!==t){if(t.isStatic&&e.isStatic&&t.key===e.key&&(t.isCloned||t.isOnce))return t.elm=e.elm,void(t.child=e.child);var r,i=t.data,o=yt(i);o&&yt(r=i.hook)&&yt(r=r.prepatch)&&r(e,t);var s=t.elm=e.elm,d=e.children,u=t.children;if(o&&h(t)){for(r=0;r<w.update.length;++r)w.update[r](e,t);yt(r=i.hook)&&yt(r=r.update)&&r(e,t)}gt(t.text)?yt(d)&&yt(u)?d!==u&&M(s,d,u,n,a):yt(u)?(yt(e.text)&&S.setTextContent(s,""),p(s,null,u,0,u.length-1,n)):yt(d)?y(s,d,0,d.length-1):yt(e.text)&&S.setTextContent(s,""):e.text!==t.text&&S.setTextContent(s,t.text),o&&yt(r=i.hook)&&yt(r=r.postpatch)&&r(e,t)}}function L(e,t,n){if(n&&e.parent)e.parent.data.pendingInsert=t;else for(var a=0;a<t.length;++a)t[a].data.hook.insert(t[a])}function k(e,t,n){if("production"!=={NODE_ENV:"production"}&&!Y(e,t))return!1;t.elm=e;var a=t.tag,r=t.data,i=t.children;if(yt(r)&&(yt(x=r.hook)&&yt(x=x.init)&&x(t,!0),yt(x=t.child)))return m(t,n),!0;if(yt(a)){if(yt(i))if(e.hasChildNodes()){for(var o=!0,s=e.firstChild,d=0;d<i.length;d++){if(!s||!k(s,i[d],n)){o=!1;break}s=s.nextSibling}if(!o||s)return"production"==={NODE_ENV:"production"}||"undefined"==typeof console||A||(A=!0,console.warn("Parent: ",e),console.warn("Mismatching childNodes vs. VNodes: ",e.childNodes,i)),!1}else c(t,i,n);if(yt(r))for(var u in r)if(!H(u)){_(t,n);break}}return!0}function Y(e,t){return t.tag?0===t.tag.indexOf("vue-component")||t.tag.toLowerCase()===(e.tagName&&e.tagName.toLowerCase()):n(t.text)===e.data}var x,D,w={},T=e.modules,S=e.nodeOps;for(x=0;x<Ua.length;++x)for(w[Ua[x]]=[],D=0;D<T.length;++D)void 0!==T[D][Ua[x]]&&w[Ua[x]].push(T[D][Ua[x]]);var j=0,A=!1,H=r("attrs,style,class,staticClass,staticStyle,key");return function(e,n,a,r,i,s){
	if(!n)return void(e&&g(e));var d,u,l=!1,c=[];if(e){var _=yt(e.nodeType);if(!_&&vt(e,n))b(e,n,c,r);else{if(_){if(1===e.nodeType&&e.hasAttribute("server-rendered")&&(e.removeAttribute("server-rendered"),a=!0),a){if(k(e,n,c))return L(n,c,!0),e;"production"!=={NODE_ENV:"production"}&&zn("The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.")}e=t(e)}if(d=e.elm,u=S.parentNode(d),o(n,c,u,S.nextSibling(d)),n.parent){for(var m=n.parent;m;)m.elm=n.elm,m=m.parent;if(h(n))for(var f=0;f<w.create.length;++f)w.create[f]($a,n.parent)}null!==u?y(u,[e],0,0):yt(e.tag)&&g(e)}}else l=!0,o(n,c,i,s);return L(n,c,l),n.elm}}function Lt(e,t){(e.data.directives||t.data.directives)&&kt(e,t)}function kt(e,t){var n,a,r,i=e===$a,o=Yt(e.data.directives,e.context),s=Yt(t.data.directives,t.context),d=[],u=[];for(n in s)a=o[n],r=s[n],a?(r.oldValue=a.value,Dt(r,"update",t,e),r.def&&r.def.componentUpdated&&u.push(r)):(Dt(r,"bind",t,e),r.def&&r.def.inserted&&d.push(r));if(d.length){var l=function(){for(var n=0;n<d.length;n++)Dt(d[n],"inserted",t,e)};i?xe(t.data.hook||(t.data.hook={}),"insert",l,"dir-insert"):l()}if(u.length&&xe(t.data.hook||(t.data.hook={}),"postpatch",function(){for(var n=0;n<u.length;n++)Dt(u[n],"componentUpdated",t,e)},"dir-postpatch"),!i)for(n in o)s[n]||Dt(o[n],"unbind",e)}function Yt(e,t){var n=Object.create(null);if(!e)return n;var a,r;for(a=0;a<e.length;a++)r=e[a],r.modifiers||(r.modifiers=qa),n[xt(r)]=r,r.def=I(t.$options,"directives",r.name,!0);return n}function xt(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function Dt(e,t,n,a){var r=e.def&&e.def[t];r&&r(n.elm,e,n,a)}function wt(e,t){if(e.data.attrs||t.data.attrs){var n,a,r,i=t.elm,o=e.data.attrs||{},s=t.data.attrs||{};s.__ob__&&(s=t.data.attrs=c({},s));for(n in s)a=s[n],r=o[n],r!==a&&Tt(i,n,a);Pn&&s.value!==o.value&&Tt(i,"value",s.value);for(n in o)null==s[n]&&(Oa(n)?i.removeAttributeNS(Ca,Fa(n)):Ha(n)||i.removeAttribute(n))}}function Tt(e,t,n){Pa(t)?Wa(n)?e.removeAttribute(t):e.setAttribute(t,t):Ha(t)?e.setAttribute(t,Wa(n)||"false"===n?"false":"true"):Oa(t)?Wa(n)?e.removeAttributeNS(Ca,Fa(t)):e.setAttributeNS(Ca,t,n):Wa(n)?e.removeAttribute(t):e.setAttribute(t,n)}function St(e,t){var n=t.elm,a=t.data,r=e.data;if(a.staticClass||a.class||r&&(r.staticClass||r.class)){var i=Ke(t),o=n._transitionClasses;o&&(i=Qe(i,et(o))),i!==n._prevClass&&(n.setAttribute("class",i),n._prevClass=i)}}function jt(e,t,n,a){if(n){var r=t;t=function(n){At(e,t,a),1===arguments.length?r(n):r.apply(null,arguments)}}Ta.addEventListener(e,t,a)}function At(e,t,n){Ta.removeEventListener(e,t,n)}function Ht(e,t){if(e.data.on||t.data.on){var n=t.data.on||{},a=e.data.on||{};Ta=t.elm,De(n,a,jt,At,t.context)}}function Pt(e,t){if(e.data.domProps||t.data.domProps){var n,a,r=t.elm,i=e.data.domProps||{},o=t.data.domProps||{};o.__ob__&&(o=t.data.domProps=c({},o));for(n in i)null==o[n]&&(r[n]="");for(n in o)if(a=o[n],"textContent"!==n&&"innerHTML"!==n||(t.children&&(t.children.length=0),a!==i[n]))if("value"===n){r._value=a;var s=null==a?"":String(a);!r.composing&&(document.activeElement!==r&&r.value!==s||Ct(t,s))&&(r.value=s)}else r[n]=a}}function Ct(e,t){var n=e.elm.value,r=e.elm._vModifiers;return r&&r.number||"number"===e.elm.type?a(n)!==a(t):r&&r.trim?n.trim()!==t.trim():n!==t}function Ot(e){var t=Ft(e.style);return e.staticStyle?c(e.staticStyle,t):t}function Ft(e){return Array.isArray(e)?m(e):"string"==typeof e?er(e):e}function Wt(e,t){var n,a={};if(t)for(var r=e;r.child;)r=r.child._vnode,r.data&&(n=Ot(r.data))&&c(a,n);(n=Ot(e.data))&&c(a,n);for(var i=e;i=i.parent;)i.data&&(n=Ot(i.data))&&c(a,n);return a}function Et(e,t){var n=t.data,a=e.data;if(n.staticStyle||n.style||a.staticStyle||a.style){var r,i,o=t.elm,s=e.data.staticStyle,d=e.data.style||{},u=s||d,l=Ft(t.data.style)||{};t.data.style=l.__ob__?c({},l):l;var h=Wt(t,!0);for(i in u)null==h[i]&&ar(o,i,"");for(i in h)r=h[i],r!==u[i]&&ar(o,i,null==r?"":r)}}function It(e,t){if(t&&t.trim())if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+e.getAttribute("class")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function Rt(e,t){if(t&&t.trim())if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t);else{for(var n=" "+e.getAttribute("class")+" ",a=" "+t+" ";n.indexOf(a)>=0;)n=n.replace(a," ");e.setAttribute("class",n.trim())}}function zt(e){mr(function(){mr(e)})}function Nt(e,t){(e._transitionClasses||(e._transitionClasses=[])).push(t),It(e,t)}function Vt(e,t){e._transitionClasses&&i(e._transitionClasses,t),Rt(e,t)}function Bt(e,t,n){var a=$t(e,t),r=a.type,i=a.timeout,o=a.propCount;if(!r)return n();var s=r===dr?cr:_r,d=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++d>=o&&u()};setTimeout(function(){d<o&&u()},i+1),e.addEventListener(s,l)}function $t(e,t){var n,a=window.getComputedStyle(e),r=a[lr+"Delay"].split(", "),i=a[lr+"Duration"].split(", "),o=Ut(r,i),s=a[hr+"Delay"].split(", "),d=a[hr+"Duration"].split(", "),u=Ut(s,d),l=0,c=0;t===dr?o>0&&(n=dr,l=o,c=i.length):t===ur?u>0&&(n=ur,l=u,c=d.length):(l=Math.max(o,u),n=l>0?o>u?dr:ur:null,c=n?n===dr?i.length:d.length:0);var h=n===dr&&fr.test(a[lr+"Property"]);return{type:n,timeout:l,propCount:c,hasTransform:h}}function Ut(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Jt(t)+Jt(e[n])}))}function Jt(e){return 1e3*Number(e.slice(0,-1))}function qt(e,t){var n=e.elm;n._leaveCb&&(n._leaveCb.cancelled=!0,n._leaveCb());var a=Kt(e.data.transition);if(a&&!n._enterCb&&1===n.nodeType){for(var r=a.css,i=a.type,o=a.enterClass,s=a.enterActiveClass,d=a.appearClass,u=a.appearActiveClass,l=a.beforeEnter,c=a.enter,h=a.afterEnter,_=a.enterCancelled,m=a.beforeAppear,f=a.appear,p=a.afterAppear,g=a.appearCancelled,y=ba,v=ba.$vnode;v&&v.parent;)v=v.parent,y=v.context;var M=!y._isMounted||!e.isRootInsert;if(!M||f||""===f){var b=M?d:o,L=M?u:s,k=M?m||l:l,Y=M&&"function"==typeof f?f:c,x=M?p||h:h,D=M?g||_:_,w=r!==!1&&!Pn,T=Y&&(Y._length||Y.length)>1,S=n._enterCb=Zt(function(){w&&Vt(n,L),S.cancelled?(w&&Vt(n,b),D&&D(n)):x&&x(n),n._enterCb=null});e.data.show||xe(e.data.hook||(e.data.hook={}),"insert",function(){var t=n.parentNode,a=t&&t._pending&&t._pending[e.key];a&&a.context===e.context&&a.tag===e.tag&&a.elm._leaveCb&&a.elm._leaveCb(),Y&&Y(n,S)},"transition-insert"),k&&k(n),w&&(Nt(n,b),Nt(n,L),zt(function(){Vt(n,b),S.cancelled||T||Bt(n,i,S)})),e.data.show&&(t&&t(),Y&&Y(n,S)),w||T||S()}}}function Gt(e,t){function n(){p.cancelled||(e.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[e.key]=e),u&&u(a),m&&(Nt(a,s),Nt(a,d),zt(function(){Vt(a,s),p.cancelled||f||Bt(a,o,p)})),l&&l(a,p),m||f||p())}var a=e.elm;a._enterCb&&(a._enterCb.cancelled=!0,a._enterCb());var r=Kt(e.data.transition);if(!r)return t();if(!a._leaveCb&&1===a.nodeType){var i=r.css,o=r.type,s=r.leaveClass,d=r.leaveActiveClass,u=r.beforeLeave,l=r.leave,c=r.afterLeave,h=r.leaveCancelled,_=r.delayLeave,m=i!==!1&&!Pn,f=l&&(l._length||l.length)>1,p=a._leaveCb=Zt(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[e.key]=null),m&&Vt(a,d),p.cancelled?(m&&Vt(a,s),h&&h(a)):(t(),c&&c(a)),a._leaveCb=null});_?_(n):n()}}function Kt(e){if(e){if("object"==typeof e){var t={};return e.css!==!1&&c(t,pr(e.name||"v")),c(t,e),t}return"string"==typeof e?pr(e):void 0}}function Zt(e){var t=!1;return function(){t||(t=!0,e())}}function Xt(e,t){t.data.show||qt(t)}function Qt(e,t,n){var a=t.value,r=e.multiple;if(r&&!Array.isArray(a))return void("production"!=={NODE_ENV:"production"}&&zn('<select multiple v-model="'+t.expression+'"> expects an Array value for its binding, but got '+Object.prototype.toString.call(a).slice(8,-1),n));for(var i,o,s=0,d=e.options.length;s<d;s++)if(o=e.options[s],r)i=y(a,tn(o))>-1,o.selected!==i&&(o.selected=i);else if(g(tn(o),a))return void(e.selectedIndex!==s&&(e.selectedIndex=s));r||(e.selectedIndex=-1)}function en(e,t){for(var n=0,a=t.length;n<a;n++)if(g(tn(t[n]),e))return!1;return!0}function tn(e){return"_value"in e?e._value:e.value}function nn(e){e.target.composing=!0}function an(e){e.target.composing=!1,rn(e.target,"input")}function rn(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function on(e){return!e.child||e.data&&e.data.transition?e:on(e.child._vnode)}function sn(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?sn(Ae(t.children)):e}function dn(e){var t={},n=e.$options;for(var a in n.propsData)t[a]=e[a];var r=n._parentListeners;for(var i in r)t[vn(i)]=r[i].fn;return t}function un(e,t){return/\d-keep-alive$/.test(t.tag)?e("keep-alive"):null}function ln(e){for(;e=e.parent;)if(e.data.transition)return!0}function cn(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function hn(e){e.data.newPos=e.elm.getBoundingClientRect()}function _n(e){var t=e.data.pos,n=e.data.newPos,a=t.left-n.left,r=t.top-n.top;if(a||r){e.data.moved=!0;var i=e.elm.style;i.transform=i.WebkitTransform="translate("+a+"px,"+r+"px)",i.transitionDuration="0s"}}var mn,fn,pn=r("slot,component",!0),gn=Object.prototype.hasOwnProperty,yn=/-(\w)/g,vn=d(function(e){return e.replace(yn,function(e,t){return t?t.toUpperCase():""})}),Mn=d(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),bn=/([^-])([A-Z])/g,Ln=d(function(e){return e.replace(bn,"$1-$2").replace(bn,"$1-$2").toLowerCase()}),kn=Object.prototype.toString,Yn="[object Object]",xn=function(){return!1},Dn=function(e){return e},wn={optionMergeStrategies:Object.create(null),silent:!1,devtools:"production"!=={NODE_ENV:"production"},errorHandler:null,ignoredElements:null,keyCodes:Object.create(null),isReservedTag:xn,isUnknownElement:xn,getTagNamespace:f,parsePlatformTagName:Dn,mustUseProp:xn,_assetTypes:["component","directive","filter"],_lifecycleHooks:["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated"],_maxUpdateCount:100},Tn=/[^\w.$]/,Sn="__proto__"in{},jn="undefined"!=typeof window,An=jn&&window.navigator.userAgent.toLowerCase(),Hn=An&&/msie|trident/.test(An),Pn=An&&An.indexOf("msie 9.0")>0,Cn=An&&An.indexOf("edge/")>0,On=An&&An.indexOf("android")>0,Fn=An&&/iphone|ipad|ipod|ios/.test(An),Wn=function(){return void 0===mn&&(mn=!jn&&"undefined"!=typeof t&&"server"===t.process.env.VUE_ENV),mn},En=jn&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,In=function(){function e(){a=!1;var e=n.slice(0);n.length=0;for(var t=0;t<e.length;t++)e[t]()}var t,n=[],a=!1;if("undefined"!=typeof Promise&&L(Promise)){var r=Promise.resolve(),i=function(e){console.error(e)};t=function(){r.then(e).catch(i),Fn&&setTimeout(f)}}else if("undefined"==typeof MutationObserver||!L(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())t=function(){setTimeout(e,0)};else{var o=1,s=new MutationObserver(e),d=document.createTextNode(String(o));s.observe(d,{characterData:!0}),t=function(){o=(o+1)%2,d.data=String(o)}}return function(e,r){var i;if(n.push(function(){e&&e.call(r),i&&i(r)}),a||(a=!0,t()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){i=e})}}();fn="undefined"!=typeof Set&&L(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return this.set[e]===!0},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var Rn,zn=f;if("production"!=={NODE_ENV:"production"}){var Nn="undefined"!=typeof console;zn=function(e,t){Nn&&!wn.silent&&console.error("[Vue warn]: "+e+" "+(t?Vn(Rn(t)):""))},Rn=function(e){if(e.$root===e)return"root instance";var t=e._isVue?e.$options.name||e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options.__file?" at "+e.$options.__file:"")};var Vn=function(e){return"anonymous component"===e&&(e+=' - use the "name" option for better debugging messages.'),"\n(found in "+e+")"}}var Bn=0,$n=function(){this.id=Bn++,this.subs=[]};$n.prototype.addSub=function(e){this.subs.push(e)},$n.prototype.removeSub=function(e){i(this.subs,e)},$n.prototype.depend=function(){$n.target&&$n.target.addDep(this)},$n.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},$n.target=null;var Un=[],Jn=Array.prototype,qn=Object.create(Jn);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=Jn[e];M(qn,e,function(){for(var n=arguments,a=arguments.length,r=new Array(a);a--;)r[a]=n[a];var i,o=t.apply(this,r),s=this.__ob__;switch(e){case"push":i=r;break;case"unshift":i=r;break;case"splice":i=r.slice(2)}return i&&s.observeArray(i),s.dep.notify(),o})});var Gn=Object.getOwnPropertyNames(qn),Kn={shouldConvert:!0,isSettingProps:!1},Zn=function(e){if(this.value=e,this.dep=new $n,this.vmCount=0,M(e,"__ob__",this),Array.isArray(e)){var t=Sn?x:D;t(e,qn,Gn),this.observeArray(e)}else this.walk(e)};Zn.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)T(e,t[n],e[t[n]])},Zn.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)w(e[t])};var Xn=wn.optionMergeStrategies;"production"!=={NODE_ENV:"production"}&&(Xn.el=Xn.propsData=function(e,t,n,a){return n||zn('option "'+a+'" can only be used during instance creation with the `new` keyword.'),ea(e,t)}),Xn.data=function(e,t,n){return n?e||t?function(){var a="function"==typeof t?t.call(n):t,r="function"==typeof e?e.call(n):void 0;return a?H(a,r):r}:void 0:t?"function"!=typeof t?("production"!=={NODE_ENV:"production"}&&zn('The "data" option should be a function that returns a per-instance value in component definitions.',n),e):e?function(){return H(t.call(this),e.call(this))}:t:e},wn._lifecycleHooks.forEach(function(e){Xn[e]=P}),wn._assetTypes.forEach(function(e){Xn[e+"s"]=C}),Xn.watch=function(e,t){if(!t)return e;if(!e)return t;var n={};c(n,e);for(var a in t){var r=n[a],i=t[a];r&&!Array.isArray(r)&&(r=[r]),n[a]=r?r.concat(i):[i]}return n},Xn.props=Xn.methods=Xn.computed=function(e,t){if(!t)return e;if(!e)return t;var n=Object.create(null);return c(n,e),c(n,t),n};var Qn,ea=function(e,t){return void 0===t?e:t},ta=Object.freeze({defineReactive:T,_toString:n,toNumber:a,makeMap:r,isBuiltInTag:pn,remove:i,hasOwn:o,isPrimitive:s,cached:d,camelize:vn,capitalize:Mn,hyphenate:Ln,bind:u,toArray:l,extend:c,isObject:h,isPlainObject:_,toObject:m,noop:f,no:xn,identity:Dn,genStaticKeys:p,looseEqual:g,looseIndexOf:y,isReserved:v,def:M,parsePath:b,hasProto:Sn,inBrowser:jn,UA:An,isIE:Hn,isIE9:Pn,isEdge:Cn,isAndroid:On,isIOS:Fn,isServerRendering:Wn,devtools:En,nextTick:In,get _Set(){return fn},mergeOptions:E,resolveAsset:I,get warn(){return zn},get formatComponentName(){return Rn},validateProp:R});if("production"!=={NODE_ENV:"production"}){var na=r("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,require"),aa=function(e,t){zn('Property or method "'+t+'" is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option.',e)},ra="undefined"!=typeof Proxy&&Proxy.toString().match(/native code/);if(ra){var ia=r("stop,prevent,self,ctrl,shift,alt,meta");wn.keyCodes=new Proxy(wn.keyCodes,{set:function(e,t,n){return ia(t)?(zn("Avoid overwriting built-in modifier in config.keyCodes: ."+t),!1):(e[t]=n,!0)}})}var oa={has:function e(t,n){var e=n in t,a=na(n)||"_"===n.charAt(0);return e||a||aa(t,n),e||!a}},sa={get:function(e,t){return"string"!=typeof t||t in e||aa(e,t),e[t]}};Qn=function(e){if(ra){var t=e.$options,n=t.render&&t.render._withStripped?sa:oa;e._renderProxy=new Proxy(e,n)}else e._renderProxy=e}}var da=[],ua={},la={},ca=!1,ha=!1,_a=0,ma=0,fa=function(e,t,n,a){void 0===a&&(a={}),this.vm=e,e._watchers.push(this),this.deep=!!a.deep,this.user=!!a.user,this.lazy=!!a.lazy,this.sync=!!a.sync,this.expression=t.toString(),this.cb=n,this.id=++ma,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new fn,this.newDepIds=new fn,"function"==typeof t?this.getter=t:(this.getter=b(t),this.getter||(this.getter=function(){},"production"!=={NODE_ENV:"production"}&&zn('Failed watching path: "'+t+'" Watcher only accepts simple dot-delimited paths. For full control, use a function instead.',e))),this.value=this.lazy?void 0:this.get()};fa.prototype.get=function(){k(this);var e=this.getter.call(this.vm,this.vm);return this.deep&&G(e),Y(),this.cleanupDeps(),e},fa.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},fa.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var a=this.depIds;this.depIds=this.newDepIds,this.newDepIds=a,this.newDepIds.clear(),a=this.deps,this.deps=this.newDeps,this.newDeps=a,this.newDeps.length=0},fa.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():q(this)},fa.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||h(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){if(!wn.errorHandler)throw"production"!=={NODE_ENV:"production"}&&zn('Error in watcher "'+this.expression+'"',this.vm),e;wn.errorHandler.call(null,e,this.vm)}else this.cb.call(this.vm,e,t)}}},fa.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},fa.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},fa.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||this.vm._vForRemoving||i(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var pa=new fn,ga={key:1,ref:1,slot:1},ya={enumerable:!0,configurable:!0,get:f,set:f},va=function(e,t,n,a,r,i,o){this.tag=e,this.data=t,this.children=n,this.text=a,this.elm=r,this.ns=void 0,this.context=i,this.functionalContext=void 0,this.key=t&&t.key,this.componentOptions=o,this.child=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1},Ma=function(){var e=new va;return e.text="",e.isComment=!0,e},ba=null,La={init:pe,prepatch:ge,insert:ye,destroy:ve},ka=Object.keys(La),Ya=0;Re(Ve),ie(Ve),Ie(Ve),ce(Ve),Fe(Ve);var xa=[String,RegExp],Da={name:"keep-alive",abstract:!0,props:{include:xa,exclude:xa},created:function(){this.cache=Object.create(null)},render:function(){var e=Ae(this.$slots.default);if(e&&e.componentOptions){var t=e.componentOptions,n=t.Ctor.options.name||t.tag;if(n&&(this.include&&!qe(this.include,n)||this.exclude&&qe(this.exclude,n)))return e;var a=null==e.key?t.Ctor.cid+(t.tag?"::"+t.tag:""):e.key;this.cache[a]?e.child=this.cache[a].child:this.cache[a]=e,e.data.keepAlive=!0}return e},destroyed:function(){var e=this;for(var t in this.cache){var n=e.cache[t];he(n.child,"deactivated"),n.child.$destroy()}}},wa={KeepAlive:Da};Ge(Ve),Object.defineProperty(Ve.prototype,"$isServer",{get:Wn}),Ve.version="2.1.6";var Ta,Sa,ja=r("input,textarea,option,select"),Aa=function(e,t){return"value"===t&&ja(e)||"selected"===t&&"option"===e||"checked"===t&&"input"===e||"muted"===t&&"video"===e},Ha=r("contenteditable,draggable,spellcheck"),Pa=r("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Ca="http://www.w3.org/1999/xlink",Oa=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},Fa=function(e){return Oa(e)?e.slice(6,e.length):""},Wa=function(e){return null==e||e===!1},Ea={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML",xhtml:"http://www.w3.org/1999/xhtml"},Ia=r("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template"),Ra=r("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),za=function(e){return Ia(e)||Ra(e)},Na=Object.create(null),Va=Object.freeze({createElement:rt,createElementNS:it,createTextNode:ot,createComment:st,insertBefore:dt,removeChild:ut,appendChild:lt,parentNode:ct,nextSibling:ht,tagName:_t,setTextContent:mt,setAttribute:ft}),Ba={create:function(e,t){pt(t)},update:function(e,t){e.data.ref!==t.data.ref&&(pt(e,!0),pt(t))},destroy:function(e){pt(e,!0)}},$a=new va("",{},[]),Ua=["create","activate","update","remove","destroy"],Ja={create:Lt,update:Lt,destroy:function(e){Lt(e,$a)}},qa=Object.create(null),Ga=[Ba,Ja],Ka={create:wt,update:wt},Za={create:St,update:St},Xa={create:Ht,update:Ht},Qa={create:Pt,update:Pt},er=d(function(e){var t={},n=/;(?![^(]*\))/g,a=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(a);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}),tr=/^--/,nr=/\s*!important$/,ar=function(e,t,n){tr.test(t)?e.style.setProperty(t,n):nr.test(n)?e.style.setProperty(t,n.replace(nr,""),"important"):e.style[ir(t)]=n},rr=["Webkit","Moz","ms"],ir=d(function(e){if(Sa=Sa||document.createElement("div"),e=vn(e),"filter"!==e&&e in Sa.style)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<rr.length;n++){var a=rr[n]+t;if(a in Sa.style)return a}}),or={create:Et,update:Et},sr=jn&&!Pn,dr="transition",ur="animation",lr="transition",cr="transitionend",hr="animation",_r="animationend";sr&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(lr="WebkitTransition",cr="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(hr="WebkitAnimation",_r="webkitAnimationEnd"));var mr=jn&&window.requestAnimationFrame||setTimeout,fr=/\b(transform|all)(,|$)/,pr=d(function(e){return{enterClass:e+"-enter",leaveClass:e+"-leave",appearClass:e+"-enter",enterActiveClass:e+"-enter-active",leaveActiveClass:e+"-leave-active",appearActiveClass:e+"-enter-active"}}),gr=jn?{create:Xt,activate:Xt,remove:function(e,t){e.data.show?t():Gt(e,t)}}:{},yr=[Ka,Za,Xa,Qa,or,gr],vr=yr.concat(Ga),Mr=bt({nodeOps:Va,modules:vr}),br=/^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;Pn&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&rn(e,"input")});var Lr={inserted:function(e,t,n){if("production"!=={NODE_ENV:"production"}&&(br.test(n.tag)||zn("v-model is not supported on element type: <"+n.tag+">. If you are working with contenteditable, it's recommended to wrap a library dedicated for that purpose inside a custom component.",n.context)),"select"===n.tag){var a=function(){Qt(e,t,n.context)};a(),(Hn||Cn)&&setTimeout(a,0)}else"textarea"!==n.tag&&"text"!==e.type||(e._vModifiers=t.modifiers,t.modifiers.lazy||(On||(e.addEventListener("compositionstart",nn),e.addEventListener("compositionend",an)),Pn&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){Qt(e,t,n.context);var a=e.multiple?t.value.some(function(t){return en(t,e.options)}):t.value!==t.oldValue&&en(t.value,e.options);a&&rn(e,"change")}}},kr={bind:function(e,t,n){var a=t.value;n=on(n);var r=n.data&&n.data.transition,i=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;a&&r&&!Pn?(n.data.show=!0,qt(n,function(){e.style.display=i})):e.style.display=a?i:"none"},update:function(e,t,n){var a=t.value,r=t.oldValue;if(a!==r){n=on(n);var i=n.data&&n.data.transition;i&&!Pn?(n.data.show=!0,a?qt(n,function(){e.style.display=e.__vOriginalDisplay}):Gt(n,function(){e.style.display="none"})):e.style.display=a?e.__vOriginalDisplay:"none"}}},Yr={model:Lr,show:kr},xr={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String},Dr={name:"transition",props:xr,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(function(e){return e.tag}),n.length)){"production"!=={NODE_ENV:"production"}&&n.length>1&&zn("<transition> can only be used on a single element. Use <transition-group> for lists.",this.$parent);var a=this.mode;"production"!=={NODE_ENV:"production"}&&a&&"in-out"!==a&&"out-in"!==a&&zn("invalid <transition> mode: "+a,this.$parent);var r=n[0];if(ln(this.$vnode))return r;var i=sn(r);if(!i)return r;if(this._leaving)return un(e,r);var o=i.key=null==i.key||i.isStatic?"__v"+(i.tag+this._uid)+"__":i.key,s=(i.data||(i.data={})).transition=dn(this),d=this._vnode,u=sn(d);if(i.data.directives&&i.data.directives.some(function(e){return"show"===e.name})&&(i.data.show=!0),u&&u.data&&u.key!==o){var l=u.data.transition=c({},s);if("out-in"===a)return this._leaving=!0,xe(l,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()},o),un(e,r);if("in-out"===a){var h,_=function(){h()};xe(s,"afterEnter",_,o),xe(s,"enterCancelled",_,o),xe(l,"delayLeave",function(e){h=e},o)}}return r}}},wr=c({tag:String,moveClass:String},xr);delete wr.mode;var Tr={props:wr,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),a=this.prevChildren=this.children,r=this.$slots.default||[],i=this.children=[],o=dn(this),s=0;s<r.length;s++){var d=r[s];if(d.tag)if(null!=d.key&&0!==String(d.key).indexOf("__vlist"))i.push(d),n[d.key]=d,(d.data||(d.data={})).transition=o;else if("production"!=={NODE_ENV:"production"}){var u=d.componentOptions,l=u?u.Ctor.options.name||u.tag:d.tag;zn("<transition-group> children must be keyed: <"+l+">")}}if(a){for(var c=[],h=[],_=0;_<a.length;_++){var m=a[_];m.data.transition=o,m.data.pos=m.elm.getBoundingClientRect(),n[m.key]?c.push(m):h.push(m)}this.kept=e(t,null,c),this.removed=h}return e(t,null,i)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";if(e.length&&this.hasMove(e[0].elm,t)){e.forEach(cn),e.forEach(hn),e.forEach(_n);document.body.offsetHeight;e.forEach(function(e){if(e.data.moved){var n=e.elm,a=n.style;Nt(n,t),a.transform=a.WebkitTransform=a.transitionDuration="",n.addEventListener(cr,n._moveCb=function e(a){a&&!/transform$/.test(a.propertyName)||(n.removeEventListener(cr,e),n._moveCb=null,Vt(n,t))})}})}},methods:{hasMove:function(e,t){if(!sr)return!1;if(null!=this._hasMove)return this._hasMove;Nt(e,t);var n=$t(e);return Vt(e,t),this._hasMove=n.hasTransform}}},Sr={Transition:Dr,TransitionGroup:Tr};Ve.config.isUnknownElement=nt,Ve.config.isReservedTag=za,Ve.config.getTagNamespace=tt,Ve.config.mustUseProp=Aa,c(Ve.options.directives,Yr),c(Ve.options.components,Sr),Ve.prototype.__patch__=jn?Mr:f,Ve.prototype.$mount=function(e,t){return e=e&&jn?at(e):void 0,this._mount(e,t)},setTimeout(function(){wn.devtools&&(En?En.emit("init",Ve):"production"!=={NODE_ENV:"production"}&&jn&&!Cn&&/Chrome\/\d+/.test(window.navigator.userAgent)&&console.log("Download the Vue Devtools for a better development experience:\nhttps://github.com/vuejs/vue-devtools"))},0),e.exports=Ve}).call(t,function(){return this}())},function(e,t,n){var a=n(2),r=a.Symbol;e.exports=r},function(e,t,n){function a(e){return null==e?void 0===e?d:s:(e=Object(e),u&&u in e?i(e):o(e))}var r=n(10),i=n(318),o=n(350),s="[object Null]",d="[object Undefined]",u=r?r.toStringTag:void 0;e.exports=a},function(e,t){function n(e,t){var n=-1,a=e.length;for(t||(t=Array(a));++n<a;)t[n]=e[n];return t}e.exports=n},function(e,t,n){function a(e,t,n,a){var o=!n;n||(n={});for(var s=-1,d=t.length;++s<d;){var u=t[s],l=a?a(n[u],e[u],u,n,e):void 0;void 0===l&&(l=e[u]),o?i(n,u,l):r(n,u,l)}return n}var r=n(60),i=n(39);e.exports=a},function(e,t,n){function a(e){if("string"==typeof e||r(e))return e;var t=e+"";return"0"==t&&1/e==-i?"-0":t}var r=n(16),i=1/0;e.exports=a},function(e,t){function n(e,t){return e===t||e!==e&&t!==t}e.exports=n},function(e,t,n){function a(e){return"symbol"==typeof e||i(e)&&r(e)==o}var r=n(11),i=n(5),o="[object Symbol]";e.exports=a},function(e,t,n){function a(e){return o(e)?r(e):i(e)}var r=n(56),i=n(66),o=n(28);e.exports=a},function(e,t,n){function a(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var a=e[t];this.set(a[0],a[1])}}var r=n(335),i=n(336),o=n(337),s=n(338),d=n(339);a.prototype.clear=r,a.prototype.delete=i,a.prototype.get=o,a.prototype.has=s,a.prototype.set=d,e.exports=a},function(e,t,n){function a(e){var t=this.__data__=new r(e);this.size=t.size}var r=n(18),i=n(355),o=n(356),s=n(357),d=n(358),u=n(359);a.prototype.clear=i,a.prototype.delete=o,a.prototype.get=s,a.prototype.has=d,a.prototype.set=u,e.exports=a},function(e,t,n){function a(e,t){for(var n=e.length;n--;)if(r(e[n][0],t))return n;return-1}var r=n(15);e.exports=a},function(e,t,n){var a=n(4),r=Object.create,i=function(){function e(){}return function(t){if(!a(t))return{};if(r)return r(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();e.exports=i},function(e,t,n){function a(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=r(e.prototype),a=e.apply(n,t);return i(a)?a:n}}var r=n(21),i=n(4);e.exports=a},function(e,t,n){function a(e,t){var n=e.__data__;return r(t)?n["string"==typeof t?"string":"hash"]:n.map}var r=n(332);e.exports=a},function(e,t){function n(e,t){return t=null==t?a:t,!!t&&("number"==typeof e||r.test(e))&&e>-1&&e%1==0&&e<t}var a=9007199254740991,r=/^(?:0|[1-9]\d*)$/;e.exports=n},function(e,t,n){var a=n(8),r=a(Object,"create");e.exports=r},function(e,t){function n(e){return e}e.exports=n},function(e,t,n){var a=n(277),r=n(5),i=Object.prototype,o=i.hasOwnProperty,s=i.propertyIsEnumerable,d=a(function(){return arguments}())?a:function(e){return r(e)&&o.call(e,"callee")&&!s.call(e,"callee")};e.exports=d},function(e,t,n){function a(e){return null!=e&&i(e.length)&&!r(e)}var r=n(30),i=n(50);e.exports=a},function(e,t,n){(function(e){var a=n(2),r=n(383),i="object"==typeof t&&t&&!t.nodeType&&t,o=i&&"object"==typeof e&&e&&!e.nodeType&&e,s=o&&o.exports===i,d=s?a.Buffer:void 0,u=d?d.isBuffer:void 0,l=u||r;e.exports=l}).call(t,n(32)(e))},function(e,t,n){function a(e){if(!i(e))return!1;var t=r(e);return t==s||t==d||t==o||t==u}var r=n(11),i=n(4),o="[object AsyncFunction]",s="[object Function]",d="[object GeneratorFunction]",u="[object Proxy]";e.exports=a},function(e,t,n){function a(e){return o(e)?r(e,!0):i(e)}var r=n(56),i=n(284),o=n(28);e.exports=a},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t,n){function a(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=o,this.__views__=[]}var r=n(21),i=n(40),o=4294967295;a.prototype=r(i.prototype),a.prototype.constructor=a,e.exports=a},function(e,t,n){var a=n(8),r=n(2),i=a(r,"Map");e.exports=i},function(e,t,n){function a(e){var t=-1,n=null==e?0:e.length;
	for(this.clear();++t<n;){var a=e[t];this.set(a[0],a[1])}}var r=n(340),i=n(341),o=n(342),s=n(343),d=n(344);a.prototype.clear=r,a.prototype.delete=i,a.prototype.get=o,a.prototype.has=s,a.prototype.set=d,e.exports=a},function(e,t){function n(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}e.exports=n},function(e,t){function n(e,t){for(var n=-1,a=null==e?0:e.length;++n<a&&t(e[n],n,e)!==!1;);return e}e.exports=n},function(e,t){function n(e,t){for(var n=-1,a=t.length,r=e.length;++n<a;)e[r+n]=t[n];return e}e.exports=n},function(e,t,n){function a(e,t,n){"__proto__"==t&&r?r(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}var r=n(75);e.exports=a},function(e,t){function n(){}e.exports=n},function(e,t,n){function a(e){var t=new e.constructor(e.byteLength);return new r(t).set(new r(e)),t}var r=n(54);e.exports=a},function(e,t,n){function a(e,t,n,a,L,k,Y,x){var D=t&p;if(!D&&"function"!=typeof e)throw new TypeError(m);var w=a?a.length:0;if(w||(t&=~(v|M),a=L=void 0),Y=void 0===Y?Y:b(_(Y),0),x=void 0===x?x:_(x),w-=L?L.length:0,t&M){var T=a,S=L;a=L=void 0}var j=D?void 0:u(e),A=[e,t,n,a,L,T,S,k,Y,x];if(j&&l(A,j),e=A[0],t=A[1],n=A[2],a=A[3],L=A[4],x=A[9]=null==A[9]?D?0:e.length:b(A[9]-w,0),!x&&t&(g|y)&&(t&=~(g|y)),t&&t!=f)H=t==g||t==y?o(e,t,x):t!=v&&t!=(f|v)||L.length?s.apply(void 0,A):d(e,t,n,a);else var H=i(e,t,n);var P=j?r:c;return h(P(H,A),e,t)}var r=n(67),i=n(308),o=n(309),s=n(73),d=n(310),u=n(78),l=n(346),c=n(88),h=n(90),_=n(96),m="Expected a function",f=1,p=2,g=8,y=16,v=32,M=64,b=Math.max;e.exports=a},function(e,t,n){var a=n(47),r=a(Object.getPrototypeOf,Object);e.exports=r},function(e,t,n){var a=n(47),r=n(95),i=Object.getOwnPropertySymbols,o=i?a(i,Object):r;e.exports=o},function(e,t,n){function a(e,t){if(r(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!i(e))||(s.test(e)||!o.test(e)||null!=t&&e in Object(t))}var r=n(3),i=n(16),o=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,s=/^\w*$/;e.exports=a},function(e,t){function n(e){var t=e&&e.constructor,n="function"==typeof t&&t.prototype||a;return e===n}var a=Object.prototype;e.exports=n},function(e,t){function n(e,t){return function(n){return e(t(n))}}e.exports=n},function(e,t){function n(e,t){for(var n=-1,r=e.length,i=0,o=[];++n<r;){var s=e[n];s!==t&&s!==a||(e[n]=a,o[i++]=n)}return o}var a="__lodash_placeholder__";e.exports=n},function(e,t,n){var a=n(292),r=n(91),i=r(a);e.exports=i},function(e,t){function n(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=a}var a=9007199254740991;e.exports=n},function(e,t,n){var a=n(282),r=n(295),i=n(349),o=i&&i.isTypedArray,s=o?r(o):a;e.exports=s},function(e,t,n){e.exports={default:n(260),__esModule:!0}},function(e,t,n){function a(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=void 0}var r=n(21),i=n(40);a.prototype=r(i.prototype),a.prototype.constructor=a,e.exports=a},function(e,t,n){var a=n(2),r=a.Uint8Array;e.exports=r},function(e,t,n){var a=n(8),r=n(2),i=a(r,"WeakMap");e.exports=i},function(e,t,n){function a(e,t){var n=o(e),a=!n&&i(e),l=!n&&!a&&s(e),h=!n&&!a&&!l&&u(e),_=n||a||l||h,m=_?r(e.length,String):[],f=m.length;for(var p in e)!t&&!c.call(e,p)||_&&("length"==p||l&&("offset"==p||"parent"==p)||h&&("buffer"==p||"byteLength"==p||"byteOffset"==p)||d(p,f))||m.push(p);return m}var r=n(293),i=n(27),o=n(3),s=n(29),d=n(24),u=n(51),l=Object.prototype,c=l.hasOwnProperty;e.exports=a},function(e,t){function n(e,t){for(var n=-1,a=null==e?0:e.length,r=Array(a);++n<a;)r[n]=t(e[n],n,e);return r}e.exports=n},function(e,t){function n(e,t,n,a){var r=-1,i=null==e?0:e.length;for(a&&i&&(n=e[++r]);++r<i;)n=t(n,e[r],r,e);return n}e.exports=n},function(e,t,n){function a(e,t,n){(void 0===n||i(e[t],n))&&(void 0!==n||t in e)||r(e,t,n)}var r=n(39),i=n(15);e.exports=a},function(e,t,n){function a(e,t,n){var a=e[t];s.call(e,t)&&i(a,n)&&(void 0!==n||t in e)||r(e,t,n)}var r=n(39),i=n(15),o=Object.prototype,s=o.hasOwnProperty;e.exports=a},function(e,t,n){function a(e,t){return e&&r(t,i(t),e)}var r=n(13),i=n(17);e.exports=a},function(e,t,n){function a(e,t,n,w,T,S){var j,P=t&k,C=t&Y,F=t&x;if(n&&(j=T?n(e,w,T,S):n(e)),void 0!==j)return j;if(!b(e))return e;var W=v(e);if(W){if(j=p(e),!P)return l(e,j)}else{var E=f(e),I=E==A||E==H;if(M(e))return u(e,P);if(E==O||E==D||I&&!T){if(j=C||I?{}:y(e),!P)return C?h(e,d(j,e)):c(e,s(j,e))}else{if(!X[E])return T?e:{};j=g(e,E,a,P)}}S||(S=new r);var R=S.get(e);if(R)return R;S.set(e,j);var z=F?C?m:_:C?keysIn:L,N=W?void 0:z(e);return i(N||e,function(r,i){N&&(i=r,r=e[i]),o(j,i,a(r,t,n,i,e,S))}),j}var r=n(19),i=n(37),o=n(60),s=n(61),d=n(271),u=n(69),l=n(12),c=n(302),h=n(303),_=n(314),m=n(315),f=n(81),p=n(327),g=n(328),y=n(82),v=n(3),M=n(29),b=n(4),L=n(17),k=1,Y=2,x=4,D="[object Arguments]",w="[object Array]",T="[object Boolean]",S="[object Date]",j="[object Error]",A="[object Function]",H="[object GeneratorFunction]",P="[object Map]",C="[object Number]",O="[object Object]",F="[object RegExp]",W="[object Set]",E="[object String]",I="[object Symbol]",R="[object WeakMap]",z="[object ArrayBuffer]",N="[object DataView]",V="[object Float32Array]",B="[object Float64Array]",$="[object Int8Array]",U="[object Int16Array]",J="[object Int32Array]",q="[object Uint8Array]",G="[object Uint8ClampedArray]",K="[object Uint16Array]",Z="[object Uint32Array]",X={};X[D]=X[w]=X[z]=X[N]=X[T]=X[S]=X[V]=X[B]=X[$]=X[U]=X[J]=X[P]=X[C]=X[O]=X[F]=X[W]=X[E]=X[I]=X[q]=X[G]=X[K]=X[Z]=!0,X[j]=X[A]=X[R]=!1,e.exports=a},function(e,t,n){function a(e,t){t=r(t,e);for(var n=0,a=t.length;null!=e&&n<a;)e=e[i(t[n++])];return n&&n==a?e:void 0}var r=n(68),i=n(14);e.exports=a},function(e,t,n){function a(e,t,n){var a=t(e);return i(e)?a:r(a,n(e))}var r=n(38),i=n(3);e.exports=a},function(e,t,n){function a(e,t,n,s,d){return e===t||(null==e||null==t||!i(e)&&!o(t)?e!==e&&t!==t:r(e,t,n,s,a,d))}var r=n(278),i=n(4),o=n(5);e.exports=a},function(e,t,n){function a(e){if(!r(e))return i(e);var t=[];for(var n in Object(e))s.call(e,n)&&"constructor"!=n&&t.push(n);return t}var r=n(46),i=n(347),o=Object.prototype,s=o.hasOwnProperty;e.exports=a},function(e,t,n){var a=n(26),r=n(86),i=r?function(e,t){return r.set(e,t),e}:a;e.exports=i},function(e,t,n){function a(e,t){return r(e)?e:i(e,t)?[e]:o(s(e))}var r=n(3),i=n(45),o=n(92),s=n(97);e.exports=a},function(e,t,n){(function(e){function a(e,t){if(t)return e.slice();var n=e.length,a=u?u(n):new e.constructor(n);return e.copy(a),a}var r=n(2),i="object"==typeof t&&t&&!t.nodeType&&t,o=i&&"object"==typeof e&&e&&!e.nodeType&&e,s=o&&o.exports===i,d=s?r.Buffer:void 0,u=d?d.allocUnsafe:void 0;e.exports=a}).call(t,n(32)(e))},function(e,t,n){function a(e,t){var n=t?r(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}var r=n(41);e.exports=a},function(e,t){function n(e,t,n,r){for(var i=-1,o=e.length,s=n.length,d=-1,u=t.length,l=a(o-s,0),c=Array(u+l),h=!r;++d<u;)c[d]=t[d];for(;++i<s;)(h||i<o)&&(c[n[i]]=e[i]);for(;l--;)c[d++]=e[i++];return c}var a=Math.max;e.exports=n},function(e,t){function n(e,t,n,r){for(var i=-1,o=e.length,s=-1,d=n.length,u=-1,l=t.length,c=a(o-d,0),h=Array(c+l),_=!r;++i<c;)h[i]=e[i];for(var m=i;++u<l;)h[m+u]=t[u];for(;++s<d;)(_||i<o)&&(h[m+n[s]]=e[i++]);return h}var a=Math.max;e.exports=n},function(e,t,n){function a(e,t,n,v,M,b,L,k,Y,x){function D(){for(var _=arguments.length,m=Array(_),f=_;f--;)m[f]=arguments[f];if(j)var p=u(D),g=o(m,p);if(v&&(m=r(m,v,M,j)),b&&(m=i(m,b,L,j)),_-=g,j&&_<x){var y=c(m,p);return d(e,t,a,D.placeholder,n,m,y,k,Y,x-_)}var P=T?n:this,C=S?P[e]:e;return _=m.length,k?m=l(m,k):A&&_>1&&m.reverse(),w&&Y<_&&(m.length=Y),this&&this!==h&&this instanceof D&&(C=H||s(C)),C.apply(P,m)}var w=t&g,T=t&_,S=t&m,j=t&(f|p),A=t&y,H=S?void 0:s(e);return D}var r=n(71),i=n(72),o=n(305),s=n(22),d=n(74),u=n(79),l=n(352),c=n(48),h=n(2),_=1,m=2,f=8,p=16,g=128,y=512;e.exports=a},function(e,t,n){function a(e,t,n,a,_,m,f,p,g,y){var v=t&l,M=v?f:void 0,b=v?void 0:f,L=v?m:void 0,k=v?void 0:m;t|=v?c:h,t&=~(v?h:c),t&u||(t&=~(s|d));var Y=[e,t,_,L,M,k,b,p,g,y],x=n.apply(void 0,Y);return r(e)&&i(x,Y),x.placeholder=a,o(x,e,t)}var r=n(333),i=n(88),o=n(90),s=1,d=2,u=4,l=8,c=32,h=64;e.exports=a},function(e,t,n){var a=n(8),r=function(){try{var e=a(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=r},function(e,t,n){function a(e,t,n,a,u,l){var c=n&s,h=e.length,_=t.length;if(h!=_&&!(c&&_>h))return!1;var m=l.get(e);if(m&&l.get(t))return m==t;var f=-1,p=!0,g=n&d?new r:void 0;for(l.set(e,t),l.set(t,e);++f<h;){var y=e[f],v=t[f];if(a)var M=c?a(v,y,f,t,e,l):a(y,v,f,e,t,l);if(void 0!==M){if(M)continue;p=!1;break}if(g){if(!i(t,function(e,t){if(!o(g,t)&&(y===e||u(y,e,n,a,l)))return g.push(t)})){p=!1;break}}else if(y!==v&&!u(y,v,n,a,l)){p=!1;break}}return l.delete(e),l.delete(t),p}var r=n(266),i=n(270),o=n(296),s=1,d=2;e.exports=a},function(e,t){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(t,function(){return this}())},function(e,t,n){var a=n(86),r=n(380),i=a?function(e){return a.get(e)}:r;e.exports=i},function(e,t){function n(e){var t=e;return t.placeholder}e.exports=n},function(e,t,n){var a=n(38),r=n(43),i=n(44),o=n(95),s=Object.getOwnPropertySymbols,d=s?function(e){for(var t=[];e;)a(t,i(e)),e=r(e);return t}:o;e.exports=d},function(e,t,n){var a=n(262),r=n(34),i=n(264),o=n(265),s=n(55),d=n(11),u=n(93),l="[object Map]",c="[object Object]",h="[object Promise]",_="[object Set]",m="[object WeakMap]",f="[object DataView]",p=u(a),g=u(r),y=u(i),v=u(o),M=u(s),b=d;(a&&b(new a(new ArrayBuffer(1)))!=f||r&&b(new r)!=l||i&&b(i.resolve())!=h||o&&b(new o)!=_||s&&b(new s)!=m)&&(b=function(e){var t=d(e),n=t==c?e.constructor:void 0,a=n?u(n):"";if(a)switch(a){case p:return f;case g:return l;case y:return h;case v:return _;case M:return m}return t}),e.exports=b},function(e,t,n){function a(e){return"function"!=typeof e.constructor||o(e)?{}:r(i(e))}var r=n(21),i=n(43),o=n(46);e.exports=a},function(e,t,n){function a(e){return e===e&&!r(e)}var r=n(4);e.exports=a},function(e,t){function n(e){var t=-1,n=Array(e.size);return e.forEach(function(e,a){n[++t]=[a,e]}),n}e.exports=n},function(e,t){function n(e,t){return function(n){return null!=n&&(n[e]===t&&(void 0!==t||e in Object(n)))}}e.exports=n},function(e,t,n){var a=n(55),r=a&&new a;e.exports=r},function(e,t,n){function a(e,t,n){return t=i(void 0===t?e.length-1:t,0),function(){for(var a=arguments,o=-1,s=i(a.length-t,0),d=Array(s);++o<s;)d[o]=a[t+o];o=-1;for(var u=Array(t+1);++o<t;)u[o]=a[o];return u[t]=n(d),r(e,this,u)}}var r=n(36),i=Math.max;e.exports=a},function(e,t,n){var a=n(67),r=n(91),i=r(a);e.exports=i},function(e,t){function n(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}e.exports=n},function(e,t,n){function a(e,t,n){var a=t+"";return o(e,i(a,s(r(a),n)))}var r=n(320),i=n(329),o=n(49),s=n(361);e.exports=a},function(e,t){function n(e){var t=0,n=0;return function(){var o=i(),s=r-(o-n);if(n=o,s>0){if(++t>=a)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}var a=800,r=16,i=Date.now;e.exports=n},function(e,t,n){var a=n(345),r=/^\./,i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,o=/\\(\\)?/g,s=a(function(e){var t=[];return r.test(e)&&t.push(""),e.replace(i,function(e,n,a,r){t.push(a?r.replace(o,"$1"):n||e)}),t});e.exports=s},function(e,t){function n(e){if(null!=e){try{return r.call(e)}catch(e){}try{return e+""}catch(e){}}return""}var a=Function.prototype,r=a.toString;e.exports=n},function(e,t){e.exports={}},function(e,t){function n(){return[]}e.exports=n},function(e,t,n){function a(e){var t=r(e),n=t%1;return t===t?n?t-n:t:0}var r=n(384);e.exports=a},function(e,t,n){function a(e){return null==e?"":r(e)}var r=n(294);e.exports=a},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(e){return/^nm$/i.test(e)},meridiem:function(e,t,n){return e<12?n?"vm":"VM":n?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[Môre om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ar-dz",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"أح_إث_ثلا_أر_خم_جم_سب".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:0,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",0:"0"},n=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5},a={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},r=function(e){return function(t,r,i,o){var s=n(t),d=a[e][n(t)];return 2===s&&(d=d[r?0:1]),d.replace(/%d/i,t)}},i=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],o=e.defineLocale("ar-ly",{months:i,monthsShort:i,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(e){return"م"===e},meridiem:function(e,t,n){return e<12?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:r("s"),m:r("m"),mm:r("m"),h:r("h"),hh:r("h"),d:r("d"),dd:r("d"),M:r("M"),MM:r("M"),y:r("y"),yy:r("y")},preparse:function(e){return e.replace(/\u200f/g,"").replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},week:{dow:6,doy:12}});return o})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"},n={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},a=e.defineLocale("ar-sa",{months:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(e){return"م"===e},meridiem:function(e,t,n){return e<12?"ص":"م"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},preparse:function(e){return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(e){return n[e]}).replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ar-tn",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"},n={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},a=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5},r={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},i=function(e){return function(t,n,i,o){var s=a(t),d=r[e][a(t)];return 2===s&&(d=d[n?0:1]),d.replace(/%d/i,t)}},o=["كانون الثاني يناير","شباط فبراير","آذار مارس","نيسان أبريل","أيار مايو","حزيران يونيو","تموز يوليو","آب أغسطس","أيلول سبتمبر","تشرين الأول أكتوبر","تشرين الثاني نوفمبر","كانون الأول ديسمبر"],s=e.defineLocale("ar",{months:o,monthsShort:o,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(e){return"م"===e},meridiem:function(e,t,n){return e<12?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:i("s"),m:i("m"),mm:i("m"),h:i("h"),hh:i("h"),d:i("d"),dd:i("d"),M:i("M"),MM:i("M"),y:i("y"),yy:i("y")},preparse:function(e){return e.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(e){return n[e]}).replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},week:{dow:6,doy:12}});return s})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-üncü",4:"-üncü",100:"-üncü",6:"-ncı",9:"-uncu",10:"-uncu",30:"-uncu",60:"-ıncı",90:"-ıncı"},n=e.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),weekdaysShort:"Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),weekdaysMin:"Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[gələn həftə] dddd [saat] LT",lastDay:"[dünən] LT",lastWeek:"[keçən həftə] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s əvvəl",s:"birneçə saniyyə",m:"bir dəqiqə",mm:"%d dəqiqə",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(e){return/^(gündüz|axşam)$/.test(e)},meridiem:function(e,t,n){return e<4?"gecə":e<12?"səhər":e<17?"gündüz":"axşam"},ordinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(e){if(0===e)return e+"-ıncı";var n=e%10,a=e%100-n,r=e>=100?100:null;return e+(t[n]||t[a]||t[r])},week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t){var n=e.split("_");return t%10===1&&t%100!==11?n[0]:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?n[1]:n[2]}function n(e,n,a){var r={mm:n?"хвіліна_хвіліны_хвілін":"хвіліну_хвіліны_хвілін",hh:n?"гадзіна_гадзіны_гадзін":"гадзіну_гадзіны_гадзін",dd:"дзень_дні_дзён",MM:"месяц_месяцы_месяцаў",yy:"год_гады_гадоў"};return"m"===a?n?"хвіліна":"хвіліну":"h"===a?n?"гадзіна":"гадзіну":e+" "+t(r[a],+e)}var a=e.defineLocale("be",{months:{format:"студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),standalone:"студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")},monthsShort:"студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),weekdays:{format:"нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),standalone:"нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),isFormat:/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/},weekdaysShort:"нд_пн_ат_ср_чц_пт_сб".split("_"),weekdaysMin:"нд_пн_ат_ср_чц_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сёння ў] LT",nextDay:"[Заўтра ў] LT",lastDay:"[Учора ў] LT",nextWeek:function(){return"[У] dddd [ў] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[У мінулую] dddd [ў] LT";case 1:case 2:case 4:return"[У мінулы] dddd [ў] LT"}},sameElse:"L"},relativeTime:{future:"праз %s",past:"%s таму",s:"некалькі секунд",m:n,mm:n,h:n,hh:n,d:"дзень",dd:n,M:"месяц",MM:n,y:"год",yy:n},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(e){return/^(дня|вечара)$/.test(e)},meridiem:function(e,t,n){return e<4?"ночы":e<12?"раніцы":e<17?"дня":"вечара"},ordinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e%10!==2&&e%10!==3||e%100===12||e%100===13?e+"-ы":e+"-і";case"D":return e+"-га";default:return e}},week:{dow:1,doy:7}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(e){var t=e%10,n=e%100;return 0===e?e+"-ев":0===n?e+"-ен":n>10&&n<20?e+"-ти":1===t?e+"-ви":2===t?e+"-ри":7===t||8===t?e+"-ми":e+"-ти"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"},n={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"},a=e.defineLocale("bn",{months:"জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),monthsShort:"জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),weekdays:"রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),weekdaysShort:"রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),weekdaysMin:"রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),longDateFormat:{LT:"A h:mm সময়",LTS:"A h:mm:ss সময়",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm সময়",LLLL:"dddd, D MMMM YYYY, A h:mm সময়"},calendar:{sameDay:"[আজ] LT",nextDay:"[আগামীকাল] LT",nextWeek:"dddd, LT",lastDay:"[গতকাল] LT",lastWeek:"[গত] dddd, LT",sameElse:"L"},relativeTime:{future:"%s পরে",past:"%s আগে",s:"কয়েক সেকেন্ড",m:"এক মিনিট",mm:"%d মিনিট",h:"এক ঘন্টা",hh:"%d ঘন্টা",d:"এক দিন",dd:"%d দিন",M:"এক মাস",MM:"%d মাস",y:"এক বছর",yy:"%d বছর"},preparse:function(e){return e.replace(/[১২৩৪৫৬৭৮৯০]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/রাত|সকাল|দুপুর|বিকাল|রাত/,meridiemHour:function(e,t){return 12===e&&(e=0),"রাত"===t&&e>=4||"দুপুর"===t&&e<5||"বিকাল"===t?e+12:e},meridiem:function(e,t,n){return e<4?"রাত":e<10?"সকাল":e<17?"দুপুর":e<20?"বিকাল":"রাত"},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩",0:"༠"},n={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"},a=e.defineLocale("bo",{months:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),monthsShort:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),weekdays:"གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),weekdaysShort:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),weekdaysMin:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[དི་རིང] LT",nextDay:"[སང་ཉིན] LT",nextWeek:"[བདུན་ཕྲག་རྗེས་མ], LT",lastDay:"[ཁ་སང] LT",lastWeek:"[བདུན་ཕྲག་མཐའ་མ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ལ་",past:"%s སྔན་ལ",s:"ལམ་སང",m:"སྐར་མ་གཅིག",mm:"%d སྐར་མ",h:"ཆུ་ཚོད་གཅིག",hh:"%d ཆུ་ཚོད",d:"ཉིན་གཅིག",dd:"%d ཉིན་",M:"ཟླ་བ་གཅིག",MM:"%d ཟླ་བ",y:"ལོ་གཅིག",yy:"%d ལོ"},preparse:function(e){return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,meridiemHour:function(e,t){return 12===e&&(e=0),"མཚན་མོ"===t&&e>=4||"ཉིན་གུང"===t&&e<5||"དགོང་དག"===t?e+12:e},meridiem:function(e,t,n){return e<4?"མཚན་མོ":e<10?"ཞོགས་ཀས":e<17?"ཉིན་གུང":e<20?"དགོང་དག":"མཚན་མོ"},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n){var a={mm:"munutenn",MM:"miz",dd:"devezh"};return e+" "+r(a[n],e)}function n(e){switch(a(e)){case 1:case 3:case 4:case 5:case 9:return e+" bloaz";default:return e+" vloaz"}}function a(e){return e>9?a(e%10):e}function r(e,t){return 2===t?i(e):e}function i(e){var t={m:"v",b:"v",d:"z"};return void 0===t[e.charAt(0)]?e:t[e.charAt(0)]+e.substring(1)}var o=e.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:t,h:"un eur",hh:"%d eur",d:"un devezh",dd:t,M:"ur miz",MM:t,y:"ur bloaz",yy:n},ordinalParse:/\d{1,2}(añ|vet)/,ordinal:function(e){var t=1===e?"añ":"vet";return e+t},week:{dow:1,doy:4}});return o})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n){var a=e+" ";switch(n){case"m":return t?"jedna minuta":"jedne minute";case"mm":return a+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return t?"jedan sat":"jednog sata";case"hh":return a+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return a+=1===e?"dan":"dana";case"MM":return a+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return a+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}var n=e.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
	weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:t,mm:t,h:t,hh:t,d:"dan",dd:t,M:"mjesec",MM:t,y:"godinu",yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ca",{months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),monthsParseExact:!0,weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"d'aquí %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(e,t){var n=1===e?"r":2===e?"n":3===e?"r":4===e?"t":"è";return"w"!==t&&"W"!==t||(n="a"),e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e){return e>1&&e<5&&1!==~~(e/10)}function n(e,n,a,r){var i=e+" ";switch(a){case"s":return n||r?"pár sekund":"pár sekundami";case"m":return n?"minuta":r?"minutu":"minutou";case"mm":return n||r?i+(t(e)?"minuty":"minut"):i+"minutami";case"h":return n?"hodina":r?"hodinu":"hodinou";case"hh":return n||r?i+(t(e)?"hodiny":"hodin"):i+"hodinami";case"d":return n||r?"den":"dnem";case"dd":return n||r?i+(t(e)?"dny":"dní"):i+"dny";case"M":return n||r?"měsíc":"měsícem";case"MM":return n||r?i+(t(e)?"měsíce":"měsíců"):i+"měsíci";case"y":return n||r?"rok":"rokem";case"yy":return n||r?i+(t(e)?"roky":"let"):i+"lety"}}var a="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),r="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),i=e.defineLocale("cs",{months:a,monthsShort:r,monthsParse:function(e,t){var n,a=[];for(n=0;n<12;n++)a[n]=new RegExp("^"+e[n]+"$|^"+t[n]+"$","i");return a}(a,r),shortMonthsParse:function(e){var t,n=[];for(t=0;t<12;t++)n[t]=new RegExp("^"+e[t]+"$","i");return n}(r),longMonthsParse:function(e){var t,n=[];for(t=0;t<12;t++)n[t]=new RegExp("^"+e[t]+"$","i");return n}(a),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:n,m:n,mm:n,h:n,hh:n,d:n,dd:n,M:n,MM:n,y:n,yy:n},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("cv",{months:"кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),monthsShort:"кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кҫ_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",LLL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",LLLL:"dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ӗнер] LT [сехетре]",nextWeek:"[Ҫитес] dddd LT [сехетре]",lastWeek:"[Иртнӗ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(e){var t=/сехет$/i.exec(e)?"рен":/ҫул$/i.exec(e)?"тан":"ран";return e+t},past:"%s каялла",s:"пӗр-ик ҫеккунт",m:"пӗр минут",mm:"%d минут",h:"пӗр сехет",hh:"%d сехет",d:"пӗр кун",dd:"%d кун",M:"пӗр уйӑх",MM:"%d уйӑх",y:"пӗр ҫул",yy:"%d ҫул"},ordinalParse:/\d{1,2}-мӗш/,ordinal:"%d-мӗш",week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn ôl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(e){var t=e,n="",a=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return t>20?n=40===t||50===t||60===t||80===t||100===t?"fed":"ain":t>0&&(n=a[t]),e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return t?r[n][0]:r[n][1]}var n=e.defineLocale("de-at",{months:"Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:t,mm:"%d Minuten",h:t,hh:"%d Stunden",d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return t?r[n][0]:r[n][1]}var n=e.defineLocale("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:t,mm:"%d Minuten",h:t,hh:"%d Stunden",d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=["ޖެނުއަރީ","ފެބްރުއަރީ","މާރިޗު","އޭޕްރީލު","މޭ","ޖޫން","ޖުލައި","އޯގަސްޓު","ސެޕްޓެމްބަރު","އޮކްޓޯބަރު","ނޮވެމްބަރު","ޑިސެމްބަރު"],n=["އާދިއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],a=e.defineLocale("dv",{months:t,monthsShort:t,weekdays:n,weekdaysShort:n,weekdaysMin:"އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/މކ|މފ/,isPM:function(e){return"މފ"===e},meridiem:function(e,t,n){return e<12?"މކ":"މފ"},calendar:{sameDay:"[މިއަދު] LT",nextDay:"[މާދަމާ] LT",nextWeek:"dddd LT",lastDay:"[އިއްޔެ] LT",lastWeek:"[ފާއިތުވި] dddd LT",sameElse:"L"},relativeTime:{future:"ތެރޭގައި %s",past:"ކުރިން %s",s:"ސިކުންތުކޮޅެއް",m:"މިނިޓެއް",mm:"މިނިޓު %d",h:"ގަޑިއިރެއް",hh:"ގަޑިއިރު %d",d:"ދުވަހެއް",dd:"ދުވަސް %d",M:"މަހެއް",MM:"މަސް %d",y:"އަހަރެއް",yy:"އަހަރު %d"},preparse:function(e){return e.replace(/،/g,",")},postformat:function(e){return e.replace(/,/g,"،")},week:{dow:7,doy:12}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}var n=e.defineLocale("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(e,t){return/D/.test(t.substring(0,t.indexOf("MMMM")))?this._monthsGenitiveEl[e.month()]:this._monthsNominativeEl[e.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(e,t,n){return e>11?n?"μμ":"ΜΜ":n?"πμ":"ΠΜ"},isPM:function(e){return"μ"===(e+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[το προηγούμενο] dddd [{}] LT";default:return"[την προηγούμενη] dddd [{}] LT"}},sameElse:"L"},calendar:function(e,n){var a=this._calendarEl[e],r=n&&n.hours();return t(a)&&(a=a.apply(n)),a.replace("{}",r%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"λίγα δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinalParse:/\d{1,2}η/,ordinal:"%dη",week:{dow:1,doy:4}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-an de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(e){return"p"===e.charAt(0).toLowerCase()},meridiem:function(e,t,n){return e>11?n?"p.t.m.":"P.T.M.":n?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),n="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),a=e.defineLocale("es-do",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return/-MMM-/.test(a)?n[e.month()]:t[e.month()]},monthsParseExact:!0,weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY h:mm A",LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),n="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),a=e.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return/-MMM-/.test(a)?n[e.month()]:t[e.month()]},monthsParseExact:!0,weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[e+" minuti",e+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[e+" tunni",e+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],MM:[e+" kuu",e+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[e+" aasta",e+" aastat"]};return t?r[n][2]?r[n][2]:r[n][1]:a?r[n][0]:r[n][1]}var n=e.defineLocale("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:"%d päeva",M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),monthsParseExact:!0,weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"},n={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"},a=e.defineLocale("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(e){return/بعد از ظهر/.test(e)},meridiem:function(e,t,n){return e<12?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(e){return e.replace(/[۰-۹]/g,function(e){return n[e]}).replace(/،/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]}).replace(/,/g,"،")},ordinalParse:/\d{1,2}م/,ordinal:"%dم",week:{dow:6,doy:12}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,a,r){var i="";switch(a){case"s":return r?"muutaman sekunnin":"muutama sekunti";case"m":return r?"minuutin":"minuutti";case"mm":i=r?"minuutin":"minuuttia";break;case"h":return r?"tunnin":"tunti";case"hh":i=r?"tunnin":"tuntia";break;case"d":return r?"päivän":"päivä";case"dd":i=r?"päivän":"päivää";break;case"M":return r?"kuukauden":"kuukausi";case"MM":i=r?"kuukauden":"kuukautta";break;case"y":return r?"vuoden":"vuosi";case"yy":i=r?"vuoden":"vuotta"}return i=n(e,r)+" "+i}function n(e,t){return e<10?t?r[e]:a[e]:e}var a="nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),r=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",a[7],a[8],a[9]],i=e.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(e){return e+(1===e?"er":"e")}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("fr-ch",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",
	nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(e){return e+(1===e?"er":"e")},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(e){return e+(1===e?"er":"")},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t="jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),n="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),a=e.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(e,a){return/-MMM-/.test(a)?n[e.month()]:t[e.month()]},monthsParseExact:!0,weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[ôfrûne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien minút",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"],n=["Faoi","Gear","Màrt","Gibl","Cèit","Ògmh","Iuch","Lùn","Sult","Dàmh","Samh","Dùbh"],a=["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],r=["Did","Dil","Dim","Dic","Dia","Dih","Dis"],i=["Dò","Lu","Mà","Ci","Ar","Ha","Sa"],o=e.defineLocale("gd",{months:t,monthsShort:n,monthsParseExact:!0,weekdays:a,weekdaysShort:r,weekdaysMin:i,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-màireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-dè aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"mìos",MM:"%d mìosan",y:"bliadhna",yy:"%d bliadhna"},ordinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(e){var t=1===e?"d":e%10===2?"na":"mh";return e+t},week:{dow:1,doy:4}});return o})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("gl",{months:"xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),monthsShort:"xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),weekdaysShort:"dom._lun._mar._mér._xov._ven._sáb.".split("_"),weekdaysMin:"do_lu_ma_mé_xo_ve_sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(e){return 0===e.indexOf("un")?"n"+e:"en "+e},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY HH:mm",LLLL:"dddd, D [ב]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(e){return 2===e?"שעתיים":e+" שעות"},d:"יום",dd:function(e){return 2===e?"יומיים":e+" ימים"},M:"חודש",MM:function(e){return 2===e?"חודשיים":e+" חודשים"},y:"שנה",yy:function(e){return 2===e?"שנתיים":e%10===0&&10!==e?e+" שנה":e+" שנים"}},meridiemParse:/אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,isPM:function(e){return/^(אחה"צ|אחרי הצהריים|בערב)$/.test(e)},meridiem:function(e,t,n){return e<5?"לפנות בוקר":e<10?"בבוקר":e<12?n?'לפנה"צ':"לפני הצהריים":e<18?n?'אחה"צ':"אחרי הצהריים":"בערב"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},n={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},a=e.defineLocale("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",LTS:"A h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm बजे",LLLL:"dddd, D MMMM YYYY, A h:mm बजे"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(e,t){return 12===e&&(e=0),"रात"===t?e<4?e:e+12:"सुबह"===t?e:"दोपहर"===t?e>=10?e:e+12:"शाम"===t?e+12:void 0},meridiem:function(e,t,n){return e<4?"रात":e<10?"सुबह":e<17?"दोपहर":e<20?"शाम":"रात"},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n){var a=e+" ";switch(n){case"m":return t?"jedna minuta":"jedne minute";case"mm":return a+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return t?"jedan sat":"jednog sata";case"hh":return a+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return a+=1===e?"dan":"dana";case"MM":return a+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return a+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}var n=e.defineLocale("hr",{months:{format:"siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:t,mm:t,h:t,hh:t,d:"dan",dd:t,M:"mjesec",MM:t,y:"godinu",yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r=e;switch(n){case"s":return a||t?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(a||t?" perc":" perce");case"mm":return r+(a||t?" perc":" perce");case"h":return"egy"+(a||t?" óra":" órája");case"hh":return r+(a||t?" óra":" órája");case"d":return"egy"+(a||t?" nap":" napja");case"dd":return r+(a||t?" nap":" napja");case"M":return"egy"+(a||t?" hónap":" hónapja");case"MM":return r+(a||t?" hónap":" hónapja");case"y":return"egy"+(a||t?" év":" éve");case"yy":return r+(a||t?" év":" éve")}return""}function n(e){return(e?"":"[múlt] ")+"["+a[this.day()]+"] LT[-kor]"}var a="vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" "),r=e.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(e){return"u"===e.charAt(1).toLowerCase()},meridiem:function(e,t,n){return e<12?n===!0?"de":"DE":n===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return n.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return n.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return r})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("hy-am",{months:{format:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),standalone:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")},monthsShort:"հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),weekdays:"կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., HH:mm",LLLL:"dddd, D MMMM YYYY թ., HH:mm"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(e){return/^(ցերեկվա|երեկոյան)$/.test(e)},meridiem:function(e){return e<4?"գիշերվա":e<12?"առավոտվա":e<17?"ցերեկվա":"երեկոյան"},ordinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(e,t){switch(t){case"DDD":case"w":case"W":case"DDDo":return 1===e?e+"-ին":e+"-րդ";default:return e}},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"siang"===t?e>=11?e:e+12:"sore"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,n){return e<11?"pagi":e<15?"siang":e<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e){return e%100===11||e%10!==1}function n(e,n,a,r){var i=e+" ";switch(a){case"s":return n||r?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return n?"mínúta":"mínútu";case"mm":return t(e)?i+(n||r?"mínútur":"mínútum"):n?i+"mínúta":i+"mínútu";case"hh":return t(e)?i+(n||r?"klukkustundir":"klukkustundum"):i+"klukkustund";case"d":return n?"dagur":r?"dag":"degi";case"dd":return t(e)?n?i+"dagar":i+(r?"daga":"dögum"):n?i+"dagur":i+(r?"dag":"degi");case"M":return n?"mánuður":r?"mánuð":"mánuði";case"MM":return t(e)?n?i+"mánuðir":i+(r?"mánuði":"mánuðum"):n?i+"mánuður":i+(r?"mánuð":"mánuði");case"y":return n||r?"ár":"ári";case"yy":return t(e)?i+(n||r?"ár":"árum"):i+(n||r?"ár":"ári")}}var a=e.defineLocale("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:n,m:n,mm:n,h:"klukkustund",hh:n,d:n,dd:n,M:n,MM:n,y:n,yy:n},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(e){return(/^[0-9].+$/.test(e)?"tra":"in")+" "+e},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",LTS:"Ah時m分s秒",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah時m分",LLLL:"YYYY年M月D日Ah時m分 dddd"},meridiemParse:/午前|午後/i,isPM:function(e){return"午後"===e},meridiem:function(e,t,n){return e<12?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},ordinalParse:/\d{1,2}日/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";default:return e}},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(e,t){return 12===e&&(e=0),"enjing"===t?e:"siyang"===t?e>=11?e:e+12:"sonten"===t||"ndalu"===t?e+12:void 0},meridiem:function(e,t,n){return e<11?"enjing":e<15?"siyang":e<19?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ka",{months:{standalone:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),format:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:{standalone:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),format:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),isFormat:/(წინა|შემდეგ)/},weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(e){return/(წამი|წუთი|საათი|წელი)/.test(e)?e.replace(/ი$/,"ში"):e+"ში"},past:function(e){return/(წამი|წუთი|საათი|დღე|თვე)/.test(e)?e.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(e)?e.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(e){return 0===e?e:1===e?e+"-ლი":e<20||e<=100&&e%20===0||e%100===0?"მე-"+e:e+"-ე"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={0:"-ші",1:"-ші",2:"-ші",3:"-ші",4:"-ші",5:"-ші",6:"-шы",7:"-ші",8:"-ші",9:"-шы",10:"-шы",20:"-шы",30:"-шы",40:"-шы",50:"-ші",60:"-шы",70:"-ші",80:"-ші",90:"-шы",100:"-ші"},n=e.defineLocale("kk",{months:"қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),monthsShort:"қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),weekdays:"жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),weekdaysShort:"жек_дүй_сей_сәр_бей_жұм_сен".split("_"),weekdaysMin:"жк_дй_сй_ср_бй_жм_сн".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгін сағат] LT",nextDay:"[Ертең сағат] LT",nextWeek:"dddd [сағат] LT",lastDay:"[Кеше сағат] LT",lastWeek:"[Өткен аптаның] dddd [сағат] LT",sameElse:"L"},relativeTime:{future:"%s ішінде",past:"%s бұрын",s:"бірнеше секунд",m:"бір минут",mm:"%d минут",h:"бір сағат",hh:"%d сағат",d:"бір күн",dd:"%d күн",M:"бір ай",MM:"%d ай",y:"бір жыл",yy:"%d жыл"},ordinalParse:/\d{1,2}-(ші|шы)/,ordinal:function(e){var n=e%10,a=e>=100?100:null;return e+(t[e]||t[n]||t[a])},week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("km",{months:"មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),monthsShort:"មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[ថ្ងៃនេះ ម៉ោង] LT",nextDay:"[ស្អែក ម៉ោង] LT",nextWeek:"dddd [ម៉ោង] LT",lastDay:"[ម្សិលមិញ ម៉ោង] LT",lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",sameElse:"L"},relativeTime:{future:"%sទៀត",past:"%sមុន",s:"ប៉ុន្មានវិនាទី",m:"មួយនាទី",mm:"%d នាទី",h:"មួយម៉ោង",hh:"%d ម៉ោង",d:"មួយថ្ងៃ",dd:"%d ថ្ងៃ",M:"មួយខែ",MM:"%d ខែ",y:"មួយឆ្នាំ",yy:"%d ឆ្នាំ"},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 m분",LTS:"A h시 m분 s초",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 A h시 m분",LLLL:"YYYY년 MMMM D일 dddd A h시 m분"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇 초",ss:"%d초",m:"일분",mm:"%d분",h:"한 시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한 달",MM:"%d달",y:"일 년",yy:"%d년"},ordinalParse:/\d{1,2}일/,ordinal:"%d일",meridiemParse:/오전|오후/,isPM:function(e){return"오후"===e},meridiem:function(e,t,n){return e<12?"오전":"오후"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={0:"-чү",1:"-чи",2:"-чи",3:"-чү",4:"-чү",5:"-чи",6:"-чы",7:"-чи",8:"-чи",9:"-чу",10:"-чу",20:"-чы",30:"-чу",40:"-чы",50:"-чү",60:"-чы",70:"-чи",80:"-чи",90:"-чу",100:"-чү"},n=e.defineLocale("ky",{months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),monthsShort:"янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),weekdays:"Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),weekdaysShort:"Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),weekdaysMin:"Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгүн саат] LT",nextDay:"[Эртең саат] LT",nextWeek:"dddd [саат] LT",lastDay:"[Кече саат] LT",lastWeek:"[Өткен аптанын] dddd [күнү] [саат] LT",sameElse:"L"},relativeTime:{future:"%s ичинде",past:"%s мурун",s:"бирнече секунд",m:"бир мүнөт",mm:"%d мүнөт",h:"бир саат",hh:"%d саат",d:"бир күн",dd:"%d күн",M:"бир ай",MM:"%d ай",y:"бир жыл",yy:"%d жыл"},ordinalParse:/\d{1,2}-(чи|чы|чү|чу)/,ordinal:function(e){var n=e%10,a=e>=100?100:null;return e+(t[e]||t[n]||t[a])},week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return t?r[n][0]:r[n][1]}function n(e){var t=e.substr(0,e.indexOf(" "));return r(t)?"a "+e:"an "+e}function a(e){var t=e.substr(0,e.indexOf(" "));return r(t)?"viru "+e:"virun "+e}function r(e){if(e=parseInt(e,10),isNaN(e))return!1;if(e<0)return!0;if(e<10)return 4<=e&&e<=7;if(e<100){var t=e%10,n=e/10;return r(0===t?n:t)}if(e<1e4){for(;e>=10;)e/=10;return r(e)}return e/=1e3,r(e)}var i=e.defineLocale("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:n,past:a,s:"e puer Sekonnen",m:t,mm:"%d Minutten",h:t,hh:"%d Stonnen",d:t,dd:"%d Deeg",M:t,MM:"%d Méint",y:t,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("lo",{months:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),monthsShort:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),weekdays:"ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysShort:"ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysMin:"ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"ວັນdddd D MMMM YYYY HH:mm"},meridiemParse:/ຕອນເຊົ້າ|ຕອນແລງ/,isPM:function(e){return"ຕອນແລງ"===e},meridiem:function(e,t,n){return e<12?"ຕອນເຊົ້າ":"ຕອນແລງ"},calendar:{sameDay:"[ມື້ນີ້ເວລາ] LT",nextDay:"[ມື້ອື່ນເວລາ] LT",nextWeek:"[ວັນ]dddd[ໜ້າເວລາ] LT",lastDay:"[ມື້ວານນີ້ເວລາ] LT",lastWeek:"[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",sameElse:"L"},relativeTime:{future:"ອີກ %s",past:"%sຜ່ານມາ",s:"ບໍ່ເທົ່າໃດວິນາທີ",m:"1 ນາທີ",mm:"%d ນາທີ",h:"1 ຊົ່ວໂມງ",hh:"%d ຊົ່ວໂມງ",d:"1 ມື້",dd:"%d ມື້",M:"1 ເດືອນ",MM:"%d ເດືອນ",y:"1 ປີ",yy:"%d ປີ"},ordinalParse:/(ທີ່)\d{1,2}/,ordinal:function(e){return"ທີ່"+e}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){return t?"kelios sekundės":a?"kelių sekundžių":"kelias sekundes"}function n(e,t,n,a){return t?r(n)[0]:a?r(n)[1]:r(n)[2]}function a(e){return e%10===0||e>10&&e<20}function r(e){return o[e].split("_")}function i(e,t,i,o){var s=e+" ";return 1===e?s+n(e,t,i[0],o):t?s+(a(e)?r(i)[1]:r(i)[0]):o?s+r(i)[1]:s+(a(e)?r(i)[1]:r(i)[2])}var o={m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"},s=e.defineLocale("lt",{months:{format:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),isFormat:/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:t,m:n,mm:i,h:n,hh:i,d:n,dd:i,M:n,MM:i,y:n,yy:i},ordinalParse:/\d{1,2}-oji/,ordinal:function(e){return e+"-oji"},week:{dow:1,doy:4}});return s})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n){return n?t%10===1&&t%100!==11?e[2]:e[3]:t%10===1&&t%100!==11?e[0]:e[1]}function n(e,n,a){return e+" "+t(i[a],e,n)}function a(e,n,a){return t(i[a],e,n)}function r(e,t){return t?"dažas sekundes":"dažām sekundēm"}var i={m:"minūtes_minūtēm_minūte_minūtes".split("_"),mm:"minūtes_minūtēm_minūte_minūtes".split("_"),h:"stundas_stundām_stunda_stundas".split("_"),hh:"stundas_stundām_stunda_stundas".split("_"),d:"dienas_dienām_diena_dienas".split("_"),dd:"dienas_dienām_diena_dienas".split("_"),M:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),MM:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")},o=e.defineLocale("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",
	LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"pēc %s",past:"pirms %s",s:r,m:a,mm:n,h:a,hh:n,d:a,dd:n,M:a,MM:n,y:a,yy:n},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return o})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&e<=4?t[1]:t[2]},translate:function(e,n,a){var r=t.words[a];return 1===a.length?n?r[0]:r[1]:e+" "+t.correctGrammaticalCase(e,r)}},n=e.defineLocale("me",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var e=["[prošle] [nedjelje] [u] LT","[prošlog] [ponedjeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srijede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:t.translate,mm:t.translate,h:t.translate,hh:t.translate,d:"dan",dd:t.translate,M:"mjesec",MM:t.translate,y:"godinu",yy:t.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("mi",{months:"Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),monthsShort:"Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),monthsRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,weekdays:"Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),weekdaysShort:"Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),weekdaysMin:"Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [i] HH:mm",LLLL:"dddd, D MMMM YYYY [i] HH:mm"},calendar:{sameDay:"[i teie mahana, i] LT",nextDay:"[apopo i] LT",nextWeek:"dddd [i] LT",lastDay:"[inanahi i] LT",lastWeek:"dddd [whakamutunga i] LT",sameElse:"L"},relativeTime:{future:"i roto i %s",past:"%s i mua",s:"te hēkona ruarua",m:"he meneti",mm:"%d meneti",h:"te haora",hh:"%d haora",d:"he ra",dd:"%d ra",M:"he marama",MM:"%d marama",y:"he tau",yy:"%d tau"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"[Во] dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(e){var t=e%10,n=e%100;return 0===e?e+"-ев":0===n?e+"-ен":n>10&&n<20?e+"-ти":1===t?e+"-ви":2===t?e+"-ри":7===t||8===t?e+"-ми":e+"-ти"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),monthsParseExact:!0,weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",LTS:"A h:mm:ss -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -നു",LLLL:"dddd, D MMMM YYYY, A h:mm -നു"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,meridiemHour:function(e,t){return 12===e&&(e=0),"രാത്രി"===t&&e>=4||"ഉച്ച കഴിഞ്ഞ്"===t||"വൈകുന്നേരം"===t?e+12:e},meridiem:function(e,t,n){return e<4?"രാത്രി":e<12?"രാവിലെ":e<17?"ഉച്ച കഴിഞ്ഞ്":e<20?"വൈകുന്നേരം":"രാത്രി"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r="";if(t)switch(n){case"s":r="काही सेकंद";break;case"m":r="एक मिनिट";break;case"mm":r="%d मिनिटे";break;case"h":r="एक तास";break;case"hh":r="%d तास";break;case"d":r="एक दिवस";break;case"dd":r="%d दिवस";break;case"M":r="एक महिना";break;case"MM":r="%d महिने";break;case"y":r="एक वर्ष";break;case"yy":r="%d वर्षे"}else switch(n){case"s":r="काही सेकंदां";break;case"m":r="एका मिनिटा";break;case"mm":r="%d मिनिटां";break;case"h":r="एका तासा";break;case"hh":r="%d तासां";break;case"d":r="एका दिवसा";break;case"dd":r="%d दिवसां";break;case"M":r="एका महिन्या";break;case"MM":r="%d महिन्यां";break;case"y":r="एका वर्षा";break;case"yy":r="%d वर्षां"}return r.replace(/%d/i,e)}var n={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},a={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},r=e.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm वाजता",LLLL:"dddd, D MMMM YYYY, A h:mm वाजता"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%sमध्ये",past:"%sपूर्वी",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return a[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return n[e]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(e,t){return 12===e&&(e=0),"रात्री"===t?e<4?e:e+12:"सकाळी"===t?e:"दुपारी"===t?e>=10?e:e+12:"सायंकाळी"===t?e+12:void 0},meridiem:function(e,t,n){return e<4?"रात्री":e<10?"सकाळी":e<17?"दुपारी":e<20?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}});return r})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"tengahari"===t?e>=11?e:e+12:"petang"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,n){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"tengahari"===t?e>=11?e:e+12:"petang"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,n){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"၁",2:"၂",3:"၃",4:"၄",5:"၅",6:"၆",7:"၇",8:"၈",9:"၉",0:"၀"},n={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"},a=e.defineLocale("my",{months:"ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),monthsShort:"ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),weekdays:"တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),weekdaysShort:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),weekdaysMin:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ယနေ.] LT [မှာ]",nextDay:"[မနက်ဖြန်] LT [မှာ]",nextWeek:"dddd LT [မှာ]",lastDay:"[မနေ.က] LT [မှာ]",lastWeek:"[ပြီးခဲ့သော] dddd LT [မှာ]",sameElse:"L"},relativeTime:{future:"လာမည့် %s မှာ",past:"လွန်ခဲ့သော %s က",s:"စက္ကန်.အနည်းငယ်",m:"တစ်မိနစ်",mm:"%d မိနစ်",h:"တစ်နာရီ",hh:"%d နာရီ",d:"တစ်ရက်",dd:"%d ရက်",M:"တစ်လ",MM:"%d လ",y:"တစ်နှစ်",yy:"%d နှစ်"},preparse:function(e){return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},week:{dow:1,doy:4}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),monthsParseExact:!0,weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},n={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},a=e.defineLocale("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),monthsParseExact:!0,weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आ._सो._मं._बु._बि._शु._श.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"Aको h:mm बजे",LTS:"Aको h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, Aको h:mm बजे",LLLL:"dddd, D MMMM YYYY, Aको h:mm बजे"},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/राति|बिहान|दिउँसो|साँझ/,meridiemHour:function(e,t){return 12===e&&(e=0),"राति"===t?e<4?e:e+12:"बिहान"===t?e:"दिउँसो"===t?e>=10?e:e+12:"साँझ"===t?e+12:void 0},meridiem:function(e,t,n){return e<3?"राति":e<12?"बिहान":e<16?"दिउँसो":e<20?"साँझ":"राति"},calendar:{sameDay:"[आज] LT",nextDay:"[भोलि] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडि",s:"केही क्षण",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),n="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),a=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],r=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,i=e.defineLocale("nl-be",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,a){return/-MMM-/.test(a)?n[e.month()]:t[e.month()]},monthsRegex:r,monthsShortRegex:r,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:a,longMonthsParse:a,shortMonthsParse:a,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),n="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),a=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],r=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,i=e.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,a){return/-MMM-/.test(a)?n[e.month()]:t[e.month()]},monthsRegex:r,monthsShortRegex:r,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:a,longMonthsParse:a,shortMonthsParse:a,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregåande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månader",y:"eit år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"੧",2:"੨",3:"੩",4:"੪",5:"੫",6:"੬",7:"੭",8:"੮",9:"੯",0:"੦"},n={"੧":"1","੨":"2","੩":"3","੪":"4","੫":"5","੬":"6","੭":"7","੮":"8","੯":"9","੦":"0"},a=e.defineLocale("pa-in",{months:"ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),monthsShort:"ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),weekdays:"ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),weekdaysShort:"ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),weekdaysMin:"ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),longDateFormat:{LT:"A h:mm ਵਜੇ",LTS:"A h:mm:ss ਵਜੇ",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm ਵਜੇ",LLLL:"dddd, D MMMM YYYY, A h:mm ਵਜੇ"},calendar:{sameDay:"[ਅਜ] LT",nextDay:"[ਕਲ] LT",nextWeek:"dddd, LT",lastDay:"[ਕਲ] LT",lastWeek:"[ਪਿਛਲੇ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ਵਿੱਚ",past:"%s ਪਿਛਲੇ",s:"ਕੁਝ ਸਕਿੰਟ",m:"ਇਕ ਮਿੰਟ",mm:"%d ਮਿੰਟ",h:"ਇੱਕ ਘੰਟਾ",hh:"%d ਘੰਟੇ",d:"ਇੱਕ ਦਿਨ",dd:"%d ਦਿਨ",M:"ਇੱਕ ਮਹੀਨਾ",MM:"%d ਮਹੀਨੇ",y:"ਇੱਕ ਸਾਲ",yy:"%d ਸਾਲ"},preparse:function(e){return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,meridiemHour:function(e,t){return 12===e&&(e=0),"ਰਾਤ"===t?e<4?e:e+12:"ਸਵੇਰ"===t?e:"ਦੁਪਹਿਰ"===t?e>=10?e:e+12:"ਸ਼ਾਮ"===t?e+12:void 0},meridiem:function(e,t,n){return e<4?"ਰਾਤ":e<10?"ਸਵੇਰ":e<17?"ਦੁਪਹਿਰ":e<20?"ਸ਼ਾਮ":"ਰਾਤ"},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e){return e%10<5&&e%10>1&&~~(e/10)%10!==1}function n(e,n,a){var r=e+" ";switch(a){case"m":return n?"minuta":"minutę";case"mm":return r+(t(e)?"minuty":"minut");case"h":return n?"godzina":"godzinę";case"hh":return r+(t(e)?"godziny":"godzin");case"MM":return r+(t(e)?"miesiące":"miesięcy");case"yy":return r+(t(e)?"lata":"lat")}}var a="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),r="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),i=e.defineLocale("pl",{months:function(e,t){return""===t?"("+r[e.month()]+"|"+a[e.month()]+")":/D MMMM/.test(t)?r[e.month()]:a[e.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:n,mm:n,h:n,hh:n,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:n,y:"rok",yy:n},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [às] HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº"});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"há %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n){var a={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},r=" ";return(e%100>=20||e>=100&&e%100===0)&&(r=" de "),e+r+a[n]}var n=e.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:t,h:"o oră",hh:t,d:"o zi",dd:t,M:"o lună",MM:t,y:"un an",yy:t},week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t){var n=e.split("_");return t%10===1&&t%100!==11?n[0]:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?n[1]:n[2]}function n(e,n,a){var r={mm:n?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===a?n?"минута":"минуту":e+" "+t(r[a],+e)}var a=[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[йя]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i],r=e.defineLocale("ru",{months:{format:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),standalone:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")},monthsShort:{format:"янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),standalone:"янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")},weekdays:{standalone:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),format:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),isFormat:/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/},weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),monthsParse:a,longMonthsParse:a,shortMonthsParse:a,monthsRegex:/^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,monthsShortRegex:/^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,monthsStrictRegex:/^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,monthsShortStrictRegex:/^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В следующее] dddd [в] LT";case 1:case 2:case 4:return"[В следующий] dddd [в] LT";case 3:case 5:case 6:return"[В следующую] dddd [в] LT"}},lastWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:n,mm:n,h:"час",hh:n,d:"день",dd:n,M:"месяц",MM:n,y:"год",yy:n},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(e){return/^(дня|вечера)$/.test(e)},meridiem:function(e,t,n){return e<4?"ночи":e<12?"утра":e<17?"дня":"вечера"},ordinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":return e+"-й";case"D":return e+"-го";case"w":case"W":return e+"-я";default:return e}},week:{dow:1,doy:7}});return r})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("se",{months:"ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),monthsShort:"ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),weekdays:"sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),weekdaysShort:"sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s geažes",past:"maŋit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta mánnu",MM:"%d mánut",y:"okta jahki",yy:"%d jagit"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("si",{months:"ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),monthsShort:"ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),weekdays:"ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),weekdaysShort:"ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),weekdaysMin:"ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [වැනි] dddd, a h:mm:ss"},calendar:{sameDay:"[අද] LT[ට]",nextDay:"[හෙට] LT[ට]",nextWeek:"dddd LT[ට]",lastDay:"[ඊයේ] LT[ට]",lastWeek:"[පසුගිය] dddd LT[ට]",sameElse:"L"},relativeTime:{future:"%sකින්",past:"%sකට පෙර",s:"තත්පර කිහිපය",m:"මිනිත්තුව",mm:"මිනිත්තු %d",h:"පැය",hh:"පැය %d",d:"දිනය",dd:"දින %d",M:"මාසය",MM:"මාස %d",y:"වසර",yy:"වසර %d"},ordinalParse:/\d{1,2} වැනි/,ordinal:function(e){return e+" වැනි"},meridiemParse:/පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,isPM:function(e){return"ප.ව."===e||"පස් වරු"===e},meridiem:function(e,t,n){return e>11?n?"ප.ව.":"පස් වරු":n?"පෙ.ව.":"පෙර වරු"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e){
	return e>1&&e<5}function n(e,n,a,r){var i=e+" ";switch(a){case"s":return n||r?"pár sekúnd":"pár sekundami";case"m":return n?"minúta":r?"minútu":"minútou";case"mm":return n||r?i+(t(e)?"minúty":"minút"):i+"minútami";case"h":return n?"hodina":r?"hodinu":"hodinou";case"hh":return n||r?i+(t(e)?"hodiny":"hodín"):i+"hodinami";case"d":return n||r?"deň":"dňom";case"dd":return n||r?i+(t(e)?"dni":"dní"):i+"dňami";case"M":return n||r?"mesiac":"mesiacom";case"MM":return n||r?i+(t(e)?"mesiace":"mesiacov"):i+"mesiacmi";case"y":return n||r?"rok":"rokom";case"yy":return n||r?i+(t(e)?"roky":"rokov"):i+"rokmi"}}var a="január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),r="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),i=e.defineLocale("sk",{months:a,monthsShort:r,weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:n,m:n,mm:n,h:n,hh:n,d:n,dd:n,M:n,MM:n,y:n,yy:n},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r=e+" ";switch(n){case"s":return t||a?"nekaj sekund":"nekaj sekundami";case"m":return t?"ena minuta":"eno minuto";case"mm":return r+=1===e?t?"minuta":"minuto":2===e?t||a?"minuti":"minutama":e<5?t||a?"minute":"minutami":t||a?"minut":"minutami";case"h":return t?"ena ura":"eno uro";case"hh":return r+=1===e?t?"ura":"uro":2===e?t||a?"uri":"urama":e<5?t||a?"ure":"urami":t||a?"ur":"urami";case"d":return t||a?"en dan":"enim dnem";case"dd":return r+=1===e?t||a?"dan":"dnem":2===e?t||a?"dni":"dnevoma":t||a?"dni":"dnevi";case"M":return t||a?"en mesec":"enim mesecem";case"MM":return r+=1===e?t||a?"mesec":"mesecem":2===e?t||a?"meseca":"mesecema":e<5?t||a?"mesece":"meseci":t||a?"mesecev":"meseci";case"y":return t||a?"eno leto":"enim letom";case"yy":return r+=1===e?t||a?"leto":"letom":2===e?t||a?"leti":"letoma":e<5?t||a?"leta":"leti":t||a?"let":"leti"}}var n=e.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prejšnjo] [nedeljo] [ob] LT";case 3:return"[prejšnjo] [sredo] [ob] LT";case 6:return"[prejšnjo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"pred %s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),weekdaysParseExact:!0,meridiemParse:/PD|MD/,isPM:function(e){return"M"===e.charAt(0)},meridiem:function(e,t,n){return e<12?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Nesër në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s më parë",s:"disa sekonda",m:"një minutë",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={words:{m:["један минут","једне минуте"],mm:["минут","минуте","минута"],h:["један сат","једног сата"],hh:["сат","сата","сати"],dd:["дан","дана","дана"],MM:["месец","месеца","месеци"],yy:["година","године","година"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&e<=4?t[1]:t[2]},translate:function(e,n,a){var r=t.words[a];return 1===a.length?n?r[0]:r[1]:e+" "+t.correctGrammaticalCase(e,r)}},n=e.defineLocale("sr-cyrl",{months:"јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"),monthsShort:"јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"),monthsParseExact:!0,weekdays:"недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),weekdaysShort:"нед._пон._уто._сре._чет._пет._суб.".split("_"),weekdaysMin:"не_по_ут_ср_че_пе_су".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[данас у] LT",nextDay:"[сутра у] LT",nextWeek:function(){switch(this.day()){case 0:return"[у] [недељу] [у] LT";case 3:return"[у] [среду] [у] LT";case 6:return"[у] [суботу] [у] LT";case 1:case 2:case 4:case 5:return"[у] dddd [у] LT"}},lastDay:"[јуче у] LT",lastWeek:function(){var e=["[прошле] [недеље] [у] LT","[прошлог] [понедељка] [у] LT","[прошлог] [уторка] [у] LT","[прошле] [среде] [у] LT","[прошлог] [четвртка] [у] LT","[прошлог] [петка] [у] LT","[прошле] [суботе] [у] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"за %s",past:"пре %s",s:"неколико секунди",m:t.translate,mm:t.translate,h:t.translate,hh:t.translate,d:"дан",dd:t.translate,M:"месец",MM:t.translate,y:"годину",yy:t.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&e<=4?t[1]:t[2]},translate:function(e,n,a){var r=t.words[a];return 1===a.length?n?r[0]:r[1]:e+" "+t.correctGrammaticalCase(e,r)}},n=e.defineLocale("sr",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sre._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var e=["[prošle] [nedelje] [u] LT","[prošlog] [ponedeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:t.translate,mm:t.translate,h:t.translate,hh:t.translate,d:"dan",dd:t.translate,M:"mesec",MM:t.translate,y:"godinu",yy:t.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("ss",{months:"Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),monthsShort:"Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),weekdays:"Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),weekdaysShort:"Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),weekdaysMin:"Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Namuhla nga] LT",nextDay:"[Kusasa nga] LT",nextWeek:"dddd [nga] LT",lastDay:"[Itolo nga] LT",lastWeek:"dddd [leliphelile] [nga] LT",sameElse:"L"},relativeTime:{future:"nga %s",past:"wenteka nga %s",s:"emizuzwana lomcane",m:"umzuzu",mm:"%d emizuzu",h:"lihora",hh:"%d emahora",d:"lilanga",dd:"%d emalanga",M:"inyanga",MM:"%d tinyanga",y:"umnyaka",yy:"%d iminyaka"},meridiemParse:/ekuseni|emini|entsambama|ebusuku/,meridiem:function(e,t,n){return e<11?"ekuseni":e<15?"emini":e<19?"entsambama":"ebusuku"},meridiemHour:function(e,t){return 12===e&&(e=0),"ekuseni"===t?e:"emini"===t?e>=11?e:e+12:"entsambama"===t||"ebusuku"===t?0===e?0:e+12:void 0},ordinalParse:/\d{1,2}/,ordinal:"%d",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [kl.] HH:mm",LLLL:"dddd D MMMM YYYY [kl.] HH:mm",lll:"D MMM YYYY HH:mm",llll:"ddd D MMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"[På] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"e":1===t?"a":2===t?"a":"e";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"௧",2:"௨",3:"௩",4:"௪",5:"௫",6:"௬",7:"௭",8:"௮",9:"௯",0:"௦"},n={"௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","௦":"0"},a=e.defineLocale("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},ordinalParse:/\d{1,2}வது/,ordinal:function(e){return e+"வது"},preparse:function(e){return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g,function(e){return n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return t[e]})},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(e,t,n){return e<2?" யாமம்":e<6?" வைகறை":e<10?" காலை":e<14?" நண்பகல்":e<18?" எற்பாடு":e<22?" மாலை":" யாமம்"},meridiemHour:function(e,t){return 12===e&&(e=0),"யாமம்"===t?e<2?e:e+12:"வைகறை"===t||"காலை"===t?e:"நண்பகல்"===t&&e>=10?e:e+12},week:{dow:0,doy:6}});return a})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("te",{months:"జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),monthsShort:"జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),monthsParseExact:!0,weekdays:"ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),weekdaysShort:"ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),weekdaysMin:"ఆ_సో_మం_బు_గు_శు_శ".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[నేడు] LT",nextDay:"[రేపు] LT",nextWeek:"dddd, LT",lastDay:"[నిన్న] LT",lastWeek:"[గత] dddd, LT",sameElse:"L"},relativeTime:{future:"%s లో",past:"%s క్రితం",s:"కొన్ని క్షణాలు",m:"ఒక నిమిషం",mm:"%d నిమిషాలు",h:"ఒక గంట",hh:"%d గంటలు",d:"ఒక రోజు",dd:"%d రోజులు",M:"ఒక నెల",MM:"%d నెలలు",y:"ఒక సంవత్సరం",yy:"%d సంవత్సరాలు"},ordinalParse:/\d{1,2}వ/,ordinal:"%dవ",meridiemParse:/రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,meridiemHour:function(e,t){return 12===e&&(e=0),"రాత్రి"===t?e<4?e:e+12:"ఉదయం"===t?e:"మధ్యాహ్నం"===t?e>=10?e:e+12:"సాయంత్రం"===t?e+12:void 0},meridiem:function(e,t,n){return e<4?"రాత్రి":e<10?"ఉదయం":e<17?"మధ్యాహ్నం":e<20?"సాయంత్రం":"రాత్రి"},week:{dow:0,doy:6}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("tet",{months:"Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez".split("_"),weekdays:"Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu".split("_"),weekdaysShort:"Dom_Seg_Ters_Kua_Kint_Sext_Sab".split("_"),weekdaysMin:"Do_Seg_Te_Ku_Ki_Sex_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Ohin iha] LT",nextDay:"[Aban iha] LT",nextWeek:"dddd [iha] LT",lastDay:"[Horiseik iha] LT",lastWeek:"dddd [semana kotuk] [iha] LT",sameElse:"L"},relativeTime:{future:"iha %s",past:"%s liuba",s:"minutu balun",m:"minutu ida",mm:"minutus %d",h:"horas ida",hh:"horas %d",d:"loron ida",dd:"loron %d",M:"fulan ida",MM:"fulan %d",y:"tinan ida",yy:"tinan %d"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),monthsParseExact:!0,weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา H:mm",LLLL:"วันddddที่ D MMMM YYYY เวลา H:mm"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(e){return"หลังเที่ยง"===e},meridiem:function(e,t,n){return e<12?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"LT [ngayong araw]",nextDay:"[Bukas ng] LT",nextWeek:"LT [sa susunod na] dddd",lastDay:"LT [kahapon]",lastWeek:"LT [noong nakaraang] dddd",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e){var t=e;return t=e.indexOf("jaj")!==-1?t.slice(0,-3)+"leS":e.indexOf("jar")!==-1?t.slice(0,-3)+"waQ":e.indexOf("DIS")!==-1?t.slice(0,-3)+"nem":t+" pIq"}function n(e){var t=e;return t=e.indexOf("jaj")!==-1?t.slice(0,-3)+"Hu’":e.indexOf("jar")!==-1?t.slice(0,-3)+"wen":e.indexOf("DIS")!==-1?t.slice(0,-3)+"ben":t+" ret"}function a(e,t,n,a){var i=r(e);switch(n){case"mm":return i+" tup";case"hh":return i+" rep";case"dd":return i+" jaj";case"MM":return i+" jar";case"yy":return i+" DIS"}}function r(e){var t=Math.floor(e%1e3/100),n=Math.floor(e%100/10),a=e%10,r="";return t>0&&(r+=i[t]+"vatlh"),n>0&&(r+=(""!==r?" ":"")+i[n]+"maH"),a>0&&(r+=(""!==r?" ":"")+i[a]),""===r?"pagh":r}var i="pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_"),o=e.defineLocale("tlh",{months:"tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),monthsShort:"jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),monthsParseExact:!0,weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa’leS] LT",nextWeek:"LLL",lastDay:"[wa’Hu’] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:t,past:n,s:"puS lup",m:"wa’ tup",mm:a,h:"wa’ rep",hh:a,d:"wa’ jaj",dd:a,M:"wa’ jar",MM:a,y:"wa’ DIS",yy:a},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return o})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"},n=e.defineLocale("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(e){if(0===e)return e+"'ıncı";var n=e%10,a=e%100-n,r=e>=100?100:null;return e+(t[n]||t[a]||t[r])},week:{dow:1,doy:7}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t,n,a){var r={s:["viensas secunds","'iensas secunds"],m:["'n míut","'iens míut"],mm:[e+" míuts",""+e+" míuts"],h:["'n þora","'iensa þora"],hh:[e+" þoras",""+e+" þoras"],d:["'n ziua","'iensa ziua"],dd:[e+" ziuas",""+e+" ziuas"],M:["'n mes","'iens mes"],MM:[e+" mesen",""+e+" mesen"],y:["'n ar","'iens ar"],yy:[e+" ars",""+e+" ars"]};return a?r[n][0]:t?r[n][0]:r[n][1]}var n=e.defineLocale("tzl",{months:"Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),weekdaysShort:"Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),weekdaysMin:"Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiemParse:/d\'o|d\'a/i,isPM:function(e){return"d'o"===e.toLowerCase()},meridiem:function(e,t,n){return e>11?n?"d'o":"D'O":n?"d'a":"D'A"},calendar:{sameDay:"[oxhi à] LT",nextDay:"[demà à] LT",nextWeek:"dddd [à] LT",lastDay:"[ieiri à] LT",lastWeek:"[sür el] dddd [lasteu à] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return n})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("tzm-latn",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";function t(e,t){var n=e.split("_");return t%10===1&&t%100!==11?n[0]:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?n[1]:n[2]}function n(e,n,a){var r={mm:n?"хвилина_хвилини_хвилин":"хвилину_хвилини_хвилин",hh:n?"година_години_годин":"годину_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===a?n?"хвилина":"хвилину":"h"===a?n?"година":"годину":e+" "+t(r[a],+e)}function a(e,t){var n={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},a=/(\[[ВвУу]\]) ?dddd/.test(t)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(t)?"genitive":"nominative";return n[a][e.day()]}function r(e){return function(){return e+"о"+(11===this.hours()?"б":"")+"] LT"}}var i=e.defineLocale("uk",{months:{format:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),standalone:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")},monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:a,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:r("[Сьогодні "),nextDay:r("[Завтра "),lastDay:r("[Вчора "),nextWeek:r("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return r("[Минулої] dddd [").call(this);case 1:case 2:case 4:return r("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:n,mm:n,h:"годину",hh:n,d:"день",dd:n,M:"місяць",MM:n,y:"рік",yy:n},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(e){return/^(дня|вечора)$/.test(e)},meridiem:function(e,t,n){return e<4?"ночі":e<12?"ранку":e<17?"дня":"вечора"},ordinalParse:/\d{1,2}-(й|го)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e+"-й";case"D":return e+"-го";default:return e}},week:{dow:1,doy:7}});return i})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("uz",{months:"январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("vi",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),monthsParseExact:!0,weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysParseExact:!0,meridiemParse:/sa|ch/i,isPM:function(e){return/^ch$/i.test(e)},meridiem:function(e,t,n){return e<12?n?"sa":"SA":n?"ch":"CH"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY HH:mm",LLLL:"dddd, D MMMM [năm] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},ordinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("x-pseudo",{months:"J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),monthsShort:"J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),monthsParseExact:!0,weekdays:"S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),weekdaysShort:"S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),weekdaysMin:"S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[T~ódá~ý át] LT",nextDay:"[T~ómó~rró~w át] LT",nextWeek:"dddd [át] LT",lastDay:"[Ý~ést~érdá~ý át] LT",lastWeek:"[L~ást] dddd [át] LT",sameElse:"L"},relativeTime:{future:"í~ñ %s",past:"%s á~gó",s:"á ~féw ~sécó~ñds",m:"á ~míñ~úté",mm:"%d m~íñú~tés",h:"á~ñ hó~úr",hh:"%d h~óúrs",d:"á ~dáý",dd:"%d d~áýs",M:"á ~móñ~th",MM:"%d m~óñt~hs",y:"á ~ýéár",yy:"%d ý~éárs"},ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("yo",{months:"Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"),monthsShort:"Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"),weekdays:"Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"),weekdaysShort:"Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"),weekdaysMin:"Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"),longDateFormat:{LT:"h:mm A",
	LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Ònì ni] LT",nextDay:"[Ọ̀la ni] LT",nextWeek:"dddd [Ọsẹ̀ tón'bọ] [ni] LT",lastDay:"[Àna ni] LT",lastWeek:"dddd [Ọsẹ̀ tólọ́] [ni] LT",sameElse:"L"},relativeTime:{future:"ní %s",past:"%s kọjá",s:"ìsẹjú aayá die",m:"ìsẹjú kan",mm:"ìsẹjú %d",h:"wákati kan",hh:"wákati %d",d:"ọjọ́ kan",dd:"ọjọ́ %d",M:"osù kan",MM:"osù %d",y:"ọdún kan",yy:"ọdún %d"},ordinalParse:/ọjọ́\s\d{1,2}/,ordinal:"ọjọ́ %d",week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah点mm分",llll:"YYYY年MMMD日ddddAh点mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return 12===e&&(e=0),"凌晨"===t||"早上"===t||"上午"===t?e:"下午"===t||"晚上"===t?e+12:e>=11?e:e+12},meridiem:function(e,t,n){var a=100*e+t;return a<600?"凌晨":a<900?"早上":a<1130?"上午":a<1230?"中午":a<1800?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var t,n;return t=e().startOf("week"),n=this.diff(t,"days")>=7?"[下]":"[本]",0===this.minutes()?n+"dddAh点整":n+"dddAh点mm"},lastWeek:function(){var t,n;return t=e().startOf("week"),n=this.unix()<t.unix()?"[上]":"[本]",0===this.minutes()?n+"dddAh点整":n+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"周";default:return e}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("zh-hk",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah點mm分",LLLL:"YYYY年MMMD日ddddAh點mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah點mm分",llll:"YYYY年MMMD日ddddAh點mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return 12===e&&(e=0),"凌晨"===t||"早上"===t||"上午"===t?e:"中午"===t?e>=11?e:e+12:"下午"===t||"晚上"===t?e+12:void 0},meridiem:function(e,t,n){var a=100*e+t;return a<600?"凌晨":a<900?"早上":a<1130?"上午":a<1230?"中午":a<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"週";default:return e}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}});return t})},function(e,t,n){!function(e,t){t(n(1))}(this,function(e){"use strict";var t=e.defineLocale("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah點mm分",LLLL:"YYYY年MMMD日ddddAh點mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah點mm分",llll:"YYYY年MMMD日ddddAh點mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return 12===e&&(e=0),"凌晨"===t||"早上"===t||"上午"===t?e:"中午"===t?e>=11?e:e+12:"下午"===t||"晚上"===t?e+12:void 0},meridiem:function(e,t,n){var a=100*e+t;return a<600?"凌晨":a<900?"早上":a<1130?"上午":a<1230?"中午":a<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"週";default:return e}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}});return t})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"bar-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!1}}],xAxes:[{gridLines:{display:!1},categoryPercentage:.5,barPercentage:.2}]}}}},methods:{renderChart:function(e,t,n){var a=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:n||"bar",data:e,options:a}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"bubble-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!1}}],xAxes:[{gridLines:{display:!1},categoryPercentage:.5,barPercentage:.2}]}}}},methods:{renderChart:function(e,t){var n=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:"bubble",data:e,options:n}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"doughnut-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{}}},methods:{renderChart:function(e,t){var n=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:"doughnut",data:e,options:n}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"line-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!1}}],xAxes:[{gridLines:{display:!1}}]}}}},methods:{renderChart:function(e,t){var n=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:"line",data:e,options:n}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"pie-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{}}},methods:{renderChart:function(e,t){var n=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:"pie",data:e,options:n}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"polar-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{}}},methods:{renderChart:function(e,t){var n=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:"polarArea",data:e,options:n}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),o=n(7),s=a(o),d=n(6);t.default=i.default.extend({render:function(e){return e("div",[e("canvas",{attrs:{id:this.chartId,width:this.width,height:this.height},ref:"canvas"})])},props:{chartId:{default:"radar-chart",type:String},width:{default:400,type:Number},height:{default:400,type:Number}},data:function(){return{defaultOptions:{}}},methods:{renderChart:function(e,t){var n=(0,d.mergeOptions)(this.defaultOptions,t);this._chart=new s.default(this.$refs.canvas.getContext("2d"),{type:"radar",data:e,options:n}),this._chart.generateLegend()}},beforeDestroy:function(){this._chart.destroy()}})},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(214),i=a(r),o=n(215),s=a(o);t.default={reactiveData:i.default,reactiveProp:s.default}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var r=n(52),i=a(r);e.exports={data:function(){return{chartData:null}},watch:{chartData:{handler:function(e,t){if(t){var n=this._chart,a=e.datasets.map(function(e){return e.label}),r=t.datasets.map(function(e){return e.label});(0,i.default)(a)===(0,i.default)(r)?this.forceUpdate(e,n):this.forceRender()}}}},methods:{forceUpdate:function(e,t){e.datasets.forEach(function(e,n){t.data.datasets[n].data=e.data}),t.data.labels=e.labels,t.update()},forceRender:function(){this.renderChart(this.chartData,this.options)}}}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var r=n(52),i=a(r);e.exports={props:{chartData:{required:!0}},watch:{chartData:{handler:function(e,t){var n=this;t&&!function(){var a=n._chart,r=e.datasets.map(function(e){return e.label}),o=t.datasets.map(function(e){return e.label});(0,i.default)(r)===(0,i.default)(o)?(e.datasets.forEach(function(e,t){a.data.datasets[t].data=e.data}),a.data.labels=e.labels,a.update()):n.renderChart(n.chartData,n.options)}()}}}}},function(e,t){"use strict";e.exports=function(e){e.Bar=function(t,n){return n.type="bar",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){e.Bubble=function(t,n){return n.type="bubble",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){e.Doughnut=function(t,n){return n.type="doughnut",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){e.Line=function(t,n){return n.type="line",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){e.PolarArea=function(t,n){return n.type="polarArea",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){e.Radar=function(t,n){return n.type="radar",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){var t={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(){return""},label:function(e){return"("+e.xLabel+", "+e.yLabel+")"}}}};e.defaults.scatter=t,e.controllers.scatter=e.controllers.line,e.Scatter=function(t,n){return n.type="scatter",new e(t,n)}}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},e.controllers.bar=e.DatasetController.extend({dataElementType:e.elements.Rectangle,initialize:function(t,n){e.DatasetController.prototype.initialize.call(this,t,n),this.getMeta().bar=!0},getBarCount:function(){var e=this,n=0;return t.each(e.chart.data.datasets,function(t,a){var r=e.chart.getDatasetMeta(a);r.bar&&e.chart.isDatasetVisible(a)&&++n},e),n},update:function(e){var n=this;t.each(n.getMeta().data,function(t,a){n.updateElement(t,a,e)},n)},updateElement:function(e,n,a){var r=this,i=r.getMeta(),o=r.getScaleForId(i.xAxisID),s=r.getScaleForId(i.yAxisID),d=s.getBasePixel(),u=r.chart.options.elements.rectangle,l=e.custom||{},c=r.getDataset();e._xScale=o,e._yScale=s,e._datasetIndex=r.index,e._index=n;var h=r.getRuler(n);e._model={x:r.calculateBarX(n,r.index,h),y:a?d:r.calculateBarY(n,r.index),label:r.chart.data.labels[n],datasetLabel:c.label,base:a?d:r.calculateBarBase(r.index,n),width:r.calculateBarWidth(h),backgroundColor:l.backgroundColor?l.backgroundColor:t.getValueAtIndexOrDefault(c.backgroundColor,n,u.backgroundColor),borderSkipped:l.borderSkipped?l.borderSkipped:u.borderSkipped,borderColor:l.borderColor?l.borderColor:t.getValueAtIndexOrDefault(c.borderColor,n,u.borderColor),borderWidth:l.borderWidth?l.borderWidth:t.getValueAtIndexOrDefault(c.borderWidth,n,u.borderWidth)},e.pivot()},calculateBarBase:function(e,t){var n=this,a=n.getMeta(),r=n.getScaleForId(a.yAxisID),i=0;if(r.options.stacked){for(var o=n.chart,s=o.data.datasets,d=Number(s[e].data[t]),u=0;u<e;u++){var l=s[u],c=o.getDatasetMeta(u);if(c.bar&&c.yAxisID===r.id&&o.isDatasetVisible(u)){var h=Number(l.data[t]);i+=d<0?Math.min(h,0):Math.max(h,0)}}return r.getPixelForValue(i)}return r.getBasePixel()},getRuler:function(e){var t,n=this,a=n.getMeta(),r=n.getScaleForId(a.xAxisID),i=n.getBarCount();t="category"===r.options.type?r.getPixelForTick(e+1)-r.getPixelForTick(e):r.width/r.ticks.length;var o=t*r.options.categoryPercentage,s=(t-t*r.options.categoryPercentage)/2,d=o/i;if(r.ticks.length!==n.chart.data.labels.length){var u=r.ticks.length/n.chart.data.labels.length;d*=u}var l=d*r.options.barPercentage,c=d-d*r.options.barPercentage;return{datasetCount:i,tickWidth:t,categoryWidth:o,categorySpacing:s,fullBarWidth:d,barWidth:l,barSpacing:c}},calculateBarWidth:function(e){var t=this.getScaleForId(this.getMeta().xAxisID);return t.options.barThickness?t.options.barThickness:t.options.stacked?e.categoryWidth:e.barWidth},getBarIndex:function(e){var t,n,a=0;for(n=0;n<e;++n)t=this.chart.getDatasetMeta(n),t.bar&&this.chart.isDatasetVisible(n)&&++a;return a},calculateBarX:function(e,t,n){var a=this,r=a.getMeta(),i=a.getScaleForId(r.xAxisID),o=a.getBarIndex(t),s=i.getPixelForValue(null,e,t,a.chart.isCombo);return s-=a.chart.isCombo?n.tickWidth/2:0,i.options.stacked?s+n.categoryWidth/2+n.categorySpacing:s+n.barWidth/2+n.categorySpacing+n.barWidth*o+n.barSpacing/2+n.barSpacing*o},calculateBarY:function(e,t){var n=this,a=n.getMeta(),r=n.getScaleForId(a.yAxisID),i=Number(n.getDataset().data[e]);if(r.options.stacked){for(var o=0,s=0,d=0;d<t;d++){var u=n.chart.data.datasets[d],l=n.chart.getDatasetMeta(d);if(l.bar&&l.yAxisID===r.id&&n.chart.isDatasetVisible(d)){var c=Number(u.data[e]);c<0?s+=c||0:o+=c||0}}return i<0?r.getPixelForValue(s+i):r.getPixelForValue(o+i)}return r.getPixelForValue(i)},draw:function(e){var t,n,a=this,r=e||1,i=a.getMeta().data,o=a.getDataset();for(t=0,n=i.length;t<n;++t){var s=o.data[t];null===s||void 0===s||isNaN(s)||i[t].transition(r).draw()}},setHoverStyle:function(e){var n=this.chart.data.datasets[e._datasetIndex],a=e._index,r=e.custom||{},i=e._model;i.backgroundColor=r.hoverBackgroundColor?r.hoverBackgroundColor:t.getValueAtIndexOrDefault(n.hoverBackgroundColor,a,t.getHoverColor(i.backgroundColor)),i.borderColor=r.hoverBorderColor?r.hoverBorderColor:t.getValueAtIndexOrDefault(n.hoverBorderColor,a,t.getHoverColor(i.borderColor)),i.borderWidth=r.hoverBorderWidth?r.hoverBorderWidth:t.getValueAtIndexOrDefault(n.hoverBorderWidth,a,i.borderWidth)},removeHoverStyle:function(e){var n=this.chart.data.datasets[e._datasetIndex],a=e._index,r=e.custom||{},i=e._model,o=this.chart.options.elements.rectangle;i.backgroundColor=r.backgroundColor?r.backgroundColor:t.getValueAtIndexOrDefault(n.backgroundColor,a,o.backgroundColor),i.borderColor=r.borderColor?r.borderColor:t.getValueAtIndexOrDefault(n.borderColor,a,o.borderColor),i.borderWidth=r.borderWidth?r.borderWidth:t.getValueAtIndexOrDefault(n.borderWidth,a,o.borderWidth)}}),e.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(e,t){var n="";return e.length>0&&(e[0].yLabel?n=e[0].yLabel:t.labels.length>0&&e[0].index<t.labels.length&&(n=t.labels[e[0].index])),n},label:function(e,t){var n=t.datasets[e.datasetIndex].label||"";return n+": "+e.xLabel}}}},e.controllers.horizontalBar=e.controllers.bar.extend({updateElement:function(e,n,a){var r=this,i=r.getMeta(),o=r.getScaleForId(i.xAxisID),s=r.getScaleForId(i.yAxisID),d=o.getBasePixel(),u=e.custom||{},l=r.getDataset(),c=r.chart.options.elements.rectangle;e._xScale=o,e._yScale=s,e._datasetIndex=r.index,e._index=n;var h=r.getRuler(n);e._model={x:a?d:r.calculateBarX(n,r.index),y:r.calculateBarY(n,r.index,h),label:r.chart.data.labels[n],datasetLabel:l.label,base:a?d:r.calculateBarBase(r.index,n),height:r.calculateBarHeight(h),backgroundColor:u.backgroundColor?u.backgroundColor:t.getValueAtIndexOrDefault(l.backgroundColor,n,c.backgroundColor),borderSkipped:u.borderSkipped?u.borderSkipped:c.borderSkipped,borderColor:u.borderColor?u.borderColor:t.getValueAtIndexOrDefault(l.borderColor,n,c.borderColor),borderWidth:u.borderWidth?u.borderWidth:t.getValueAtIndexOrDefault(l.borderWidth,n,c.borderWidth)},e.draw=function(){function e(e){return d[(l+e)%4]}var t=this._chart.ctx,n=this._view,a=n.height/2,r=n.y-a,i=n.y+a,o=n.base-(n.base-n.x),s=n.borderWidth/2;n.borderWidth&&(r+=s,i-=s,o+=s),t.beginPath(),t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,t.lineWidth=n.borderWidth;var d=[[n.base,i],[n.base,r],[o,r],[o,i]],u=["bottom","left","top","right"],l=u.indexOf(n.borderSkipped,0);l===-1&&(l=0),t.moveTo.apply(t,e(0));for(var c=1;c<4;c++)t.lineTo.apply(t,e(c));t.fill(),n.borderWidth&&t.stroke()},e.pivot()},calculateBarBase:function(e,t){var n=this,a=n.getMeta(),r=n.getScaleForId(a.xAxisID),i=0;if(r.options.stacked){for(var o=n.chart,s=o.data.datasets,d=Number(s[e].data[t]),u=0;u<e;u++){var l=s[u],c=o.getDatasetMeta(u);if(c.bar&&c.xAxisID===r.id&&o.isDatasetVisible(u)){var h=Number(l.data[t]);i+=d<0?Math.min(h,0):Math.max(h,0)}}return r.getPixelForValue(i)}return r.getBasePixel()},getRuler:function(e){var t,n=this,a=n.getMeta(),r=n.getScaleForId(a.yAxisID),i=n.getBarCount();t="category"===r.options.type?r.getPixelForTick(e+1)-r.getPixelForTick(e):r.width/r.ticks.length;var o=t*r.options.categoryPercentage,s=(t-t*r.options.categoryPercentage)/2,d=o/i;if(r.ticks.length!==n.chart.data.labels.length){var u=r.ticks.length/n.chart.data.labels.length;d*=u}var l=d*r.options.barPercentage,c=d-d*r.options.barPercentage;return{datasetCount:i,tickHeight:t,categoryHeight:o,categorySpacing:s,fullBarHeight:d,barHeight:l,barSpacing:c}},calculateBarHeight:function(e){var t=this,n=t.getScaleForId(t.getMeta().yAxisID);return n.options.barThickness?n.options.barThickness:n.options.stacked?e.categoryHeight:e.barHeight},calculateBarX:function(e,t){var n=this,a=n.getMeta(),r=n.getScaleForId(a.xAxisID),i=Number(n.getDataset().data[e]);if(r.options.stacked){for(var o=0,s=0,d=0;d<t;d++){var u=n.chart.data.datasets[d],l=n.chart.getDatasetMeta(d);if(l.bar&&l.xAxisID===r.id&&n.chart.isDatasetVisible(d)){var c=Number(u.data[e]);c<0?s+=c||0:o+=c||0}}return i<0?r.getPixelForValue(s+i):r.getPixelForValue(o+i)}return r.getPixelForValue(i)},calculateBarY:function(e,t,n){var a=this,r=a.getMeta(),i=a.getScaleForId(r.yAxisID),o=a.getBarIndex(t),s=i.getPixelForValue(null,e,t,a.chart.isCombo);return s-=a.chart.isCombo?n.tickHeight/2:0,i.options.stacked?s+n.categoryHeight/2+n.categorySpacing:s+n.barHeight/2+n.categorySpacing+n.barHeight*o+n.barSpacing/2+n.barSpacing*o}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(e,t){var n=t.datasets[e.datasetIndex].label||"",a=t.datasets[e.datasetIndex].data[e.index];return n+": ("+e.xLabel+", "+e.yLabel+", "+a.r+")"}}}},e.controllers.bubble=e.DatasetController.extend({dataElementType:e.elements.Point,update:function(e){var n=this,a=n.getMeta(),r=a.data;t.each(r,function(t,a){n.updateElement(t,a,e)})},updateElement:function(n,a,r){var i=this,o=i.getMeta(),s=i.getScaleForId(o.xAxisID),d=i.getScaleForId(o.yAxisID),u=n.custom||{},l=i.getDataset(),c=l.data[a],h=i.chart.options.elements.point,_=i.index;t.extend(n,{_xScale:s,_yScale:d,_datasetIndex:_,_index:a,_model:{x:r?s.getPixelForDecimal(.5):s.getPixelForValue("object"==typeof c?c:NaN,a,_,i.chart.isCombo),y:r?d.getBasePixel():d.getPixelForValue(c,a,_),radius:r?0:u.radius?u.radius:i.getRadius(c),hitRadius:u.hitRadius?u.hitRadius:t.getValueAtIndexOrDefault(l.hitRadius,a,h.hitRadius)}}),e.DatasetController.prototype.removeHoverStyle.call(i,n,h);var m=n._model;m.skip=u.skip?u.skip:isNaN(m.x)||isNaN(m.y),n.pivot()},getRadius:function(e){return e.r||this.chart.options.elements.point.radius},setHoverStyle:function(n){var a=this;e.DatasetController.prototype.setHoverStyle.call(a,n);var r=a.chart.data.datasets[n._datasetIndex],i=n._index,o=n.custom||{},s=n._model;s.radius=o.hoverRadius?o.hoverRadius:t.getValueAtIndexOrDefault(r.hoverRadius,i,a.chart.options.elements.point.hoverRadius)+a.getRadius(r.data[i])},removeHoverStyle:function(t){var n=this;e.DatasetController.prototype.removeHoverStyle.call(n,t,n.chart.options.elements.point);var a=n.chart.data.datasets[t._datasetIndex].data[t._index],r=t.custom||{},i=t._model;i.radius=r.radius?r.radius:n.getRadius(a)}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n=e.defaults;n.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(e){var t=[];t.push('<ul class="'+e.id+'-legend">');var n=e.data,a=n.datasets,r=n.labels;if(a.length)for(var i=0;i<a[0].data.length;++i)t.push('<li><span style="background-color:'+a[0].backgroundColor[i]+'"></span>'),r[i]&&t.push(r[i]),t.push("</li>");return t.push("</ul>"),t.join("")},legend:{labels:{generateLabels:function(e){var n=e.data;return n.labels.length&&n.datasets.length?n.labels.map(function(a,r){var i=e.getDatasetMeta(0),o=n.datasets[0],s=i.data[r],d=s&&s.custom||{},u=t.getValueAtIndexOrDefault,l=e.options.elements.arc,c=d.backgroundColor?d.backgroundColor:u(o.backgroundColor,r,l.backgroundColor),h=d.borderColor?d.borderColor:u(o.borderColor,r,l.borderColor),_=d.borderWidth?d.borderWidth:u(o.borderWidth,r,l.borderWidth);return{text:a,fillStyle:c,strokeStyle:h,lineWidth:_,hidden:isNaN(o.data[r])||i.data[r].hidden,index:r}}):[]}},onClick:function(e,t){var n,a,r,i=t.index,o=this.chart;for(n=0,a=(o.data.datasets||[]).length;n<a;++n)r=o.getDatasetMeta(n),r.data[i]&&(r.data[i].hidden=!r.data[i].hidden);o.update()}},cutoutPercentage:50,rotation:Math.PI*-.5,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(e,n){var a=n.labels[e.index],r=": "+n.datasets[e.datasetIndex].data[e.index];return t.isArray(a)?(a=a.slice(),a[0]+=r):a+=r,a}}}},n.pie=t.clone(n.doughnut),t.extend(n.pie,{cutoutPercentage:0}),e.controllers.doughnut=e.controllers.pie=e.DatasetController.extend({dataElementType:e.elements.Arc,linkScales:t.noop,getRingIndex:function(e){for(var t=0,n=0;n<e;++n)this.chart.isDatasetVisible(n)&&++t;return t},update:function(e){var n=this,a=n.chart,r=a.chartArea,i=a.options,o=i.elements.arc,s=r.right-r.left-o.borderWidth,d=r.bottom-r.top-o.borderWidth,u=Math.min(s,d),l={x:0,y:0},c=n.getMeta(),h=i.cutoutPercentage,_=i.circumference;if(_<2*Math.PI){var m=i.rotation%(2*Math.PI);m+=2*Math.PI*(m>=Math.PI?-1:m<-Math.PI?1:0);var f=m+_,p={x:Math.cos(m),y:Math.sin(m)},g={x:Math.cos(f),y:Math.sin(f)},y=m<=0&&0<=f||m<=2*Math.PI&&2*Math.PI<=f,v=m<=.5*Math.PI&&.5*Math.PI<=f||m<=2.5*Math.PI&&2.5*Math.PI<=f,M=m<=-Math.PI&&-Math.PI<=f||m<=Math.PI&&Math.PI<=f,b=m<=.5*-Math.PI&&.5*-Math.PI<=f||m<=1.5*Math.PI&&1.5*Math.PI<=f,L=h/100,k={x:M?-1:Math.min(p.x*(p.x<0?1:L),g.x*(g.x<0?1:L)),y:b?-1:Math.min(p.y*(p.y<0?1:L),g.y*(g.y<0?1:L))},Y={x:y?1:Math.max(p.x*(p.x>0?1:L),g.x*(g.x>0?1:L)),y:v?1:Math.max(p.y*(p.y>0?1:L),g.y*(g.y>0?1:L))},x={width:.5*(Y.x-k.x),height:.5*(Y.y-k.y)};u=Math.min(s/x.width,d/x.height),l={x:(Y.x+k.x)*-.5,y:(Y.y+k.y)*-.5}}a.borderWidth=n.getMaxBorderWidth(c.data),a.outerRadius=Math.max((u-a.borderWidth)/2,0),a.innerRadius=Math.max(h?a.outerRadius/100*h:1,0),a.radiusLength=(a.outerRadius-a.innerRadius)/a.getVisibleDatasetCount(),a.offsetX=l.x*a.outerRadius,a.offsetY=l.y*a.outerRadius,c.total=n.calculateTotal(),n.outerRadius=a.outerRadius-a.radiusLength*n.getRingIndex(n.index),n.innerRadius=n.outerRadius-a.radiusLength,t.each(c.data,function(t,a){n.updateElement(t,a,e)})},updateElement:function(e,n,a){var r=this,i=r.chart,o=i.chartArea,s=i.options,d=s.animation,u=(o.left+o.right)/2,l=(o.top+o.bottom)/2,c=s.rotation,h=s.rotation,_=r.getDataset(),m=a&&d.animateRotate?0:e.hidden?0:r.calculateCircumference(_.data[n])*(s.circumference/(2*Math.PI)),f=a&&d.animateScale?0:r.innerRadius,p=a&&d.animateScale?0:r.outerRadius,g=t.getValueAtIndexOrDefault;t.extend(e,{_datasetIndex:r.index,_index:n,_model:{x:u+i.offsetX,y:l+i.offsetY,startAngle:c,endAngle:h,circumference:m,outerRadius:p,innerRadius:f,label:g(_.label,n,i.data.labels[n])}});var y=e._model;this.removeHoverStyle(e),a&&d.animateRotate||(0===n?y.startAngle=s.rotation:y.startAngle=r.getMeta().data[n-1]._model.endAngle,y.endAngle=y.startAngle+y.circumference),e.pivot()},removeHoverStyle:function(t){e.DatasetController.prototype.removeHoverStyle.call(this,t,this.chart.options.elements.arc)},calculateTotal:function(){var e,n=this.getDataset(),a=this.getMeta(),r=0;return t.each(a.data,function(t,a){e=n.data[a],isNaN(e)||t.hidden||(r+=Math.abs(e))}),r},calculateCircumference:function(e){var t=this.getMeta().total;return t>0&&!isNaN(e)?2*Math.PI*(e/t):0},getMaxBorderWidth:function(e){for(var t,n,a=0,r=this.index,i=e.length,o=0;o<i;o++)t=e[o]._model?e[o]._model.borderWidth:0,n=e[o]._chart?e[o]._chart.config.data.datasets[r].hoverBorderWidth:0,a=t>a?t:a,a=n>a?n:a;return a}})}},function(e,t){"use strict";e.exports=function(e){function t(e,t){return n.getValueOrDefault(e.showLine,t.showLines)}var n=e.helpers;e.defaults.line={showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},e.controllers.line=e.DatasetController.extend({datasetElementType:e.elements.Line,dataElementType:e.elements.Point,update:function(e){var a,r,i,o=this,s=o.getMeta(),d=s.dataset,u=s.data||[],l=o.chart.options,c=l.elements.line,h=o.getScaleForId(s.yAxisID),_=o.getDataset(),m=t(_,l);for(m&&(i=d.custom||{},void 0!==_.tension&&void 0===_.lineTension&&(_.lineTension=_.tension),d._scale=h,d._datasetIndex=o.index,d._children=u,d._model={spanGaps:_.spanGaps?_.spanGaps:l.spanGaps,tension:i.tension?i.tension:n.getValueOrDefault(_.lineTension,c.tension),backgroundColor:i.backgroundColor?i.backgroundColor:_.backgroundColor||c.backgroundColor,borderWidth:i.borderWidth?i.borderWidth:_.borderWidth||c.borderWidth,borderColor:i.borderColor?i.borderColor:_.borderColor||c.borderColor,borderCapStyle:i.borderCapStyle?i.borderCapStyle:_.borderCapStyle||c.borderCapStyle,borderDash:i.borderDash?i.borderDash:_.borderDash||c.borderDash,borderDashOffset:i.borderDashOffset?i.borderDashOffset:_.borderDashOffset||c.borderDashOffset,borderJoinStyle:i.borderJoinStyle?i.borderJoinStyle:_.borderJoinStyle||c.borderJoinStyle,fill:i.fill?i.fill:void 0!==_.fill?_.fill:c.fill,steppedLine:i.steppedLine?i.steppedLine:n.getValueOrDefault(_.steppedLine,c.stepped),cubicInterpolationMode:i.cubicInterpolationMode?i.cubicInterpolationMode:n.getValueOrDefault(_.cubicInterpolationMode,c.cubicInterpolationMode),scaleTop:h.top,scaleBottom:h.bottom,scaleZero:h.getBasePixel()},d.pivot()),a=0,r=u.length;a<r;++a)o.updateElement(u[a],a,e);for(m&&0!==d._model.tension&&o.updateBezierControlPoints(),a=0,r=u.length;a<r;++a)u[a].pivot()},getPointBackgroundColor:function(e,t){var a=this.chart.options.elements.point.backgroundColor,r=this.getDataset(),i=e.custom||{};return i.backgroundColor?a=i.backgroundColor:r.pointBackgroundColor?a=n.getValueAtIndexOrDefault(r.pointBackgroundColor,t,a):r.backgroundColor&&(a=r.backgroundColor),a},getPointBorderColor:function(e,t){var a=this.chart.options.elements.point.borderColor,r=this.getDataset(),i=e.custom||{};return i.borderColor?a=i.borderColor:r.pointBorderColor?a=n.getValueAtIndexOrDefault(r.pointBorderColor,t,a):r.borderColor&&(a=r.borderColor),a},getPointBorderWidth:function(e,t){var a=this.chart.options.elements.point.borderWidth,r=this.getDataset(),i=e.custom||{};return i.borderWidth?a=i.borderWidth:r.pointBorderWidth?a=n.getValueAtIndexOrDefault(r.pointBorderWidth,t,a):r.borderWidth&&(a=r.borderWidth),a},updateElement:function(e,t,a){var r,i,o=this,s=o.getMeta(),d=e.custom||{},u=o.getDataset(),l=o.index,c=u.data[t],h=o.getScaleForId(s.yAxisID),_=o.getScaleForId(s.xAxisID),m=o.chart.options.elements.point,f=o.chart.data.labels||[],p=1===f.length||1===u.data.length||o.chart.isCombo;void 0!==u.radius&&void 0===u.pointRadius&&(u.pointRadius=u.radius),void 0!==u.hitRadius&&void 0===u.pointHitRadius&&(u.pointHitRadius=u.hitRadius),r=_.getPixelForValue("object"==typeof c?c:NaN,t,l,p),i=a?h.getBasePixel():o.calculatePointY(c,t,l),e._xScale=_,e._yScale=h,e._datasetIndex=l,e._index=t,e._model={x:r,y:i,skip:d.skip||isNaN(r)||isNaN(i),radius:d.radius||n.getValueAtIndexOrDefault(u.pointRadius,t,m.radius),pointStyle:d.pointStyle||n.getValueAtIndexOrDefault(u.pointStyle,t,m.pointStyle),backgroundColor:o.getPointBackgroundColor(e,t),borderColor:o.getPointBorderColor(e,t),borderWidth:o.getPointBorderWidth(e,t),tension:s.dataset._model?s.dataset._model.tension:0,steppedLine:!!s.dataset._model&&s.dataset._model.steppedLine,hitRadius:d.hitRadius||n.getValueAtIndexOrDefault(u.pointHitRadius,t,m.hitRadius)}},calculatePointY:function(e,t,n){var a,r,i,o=this,s=o.chart,d=o.getMeta(),u=o.getScaleForId(d.yAxisID),l=0,c=0;if(u.options.stacked){for(a=0;a<n;a++)if(r=s.data.datasets[a],i=s.getDatasetMeta(a),"line"===i.type&&i.yAxisID===u.id&&s.isDatasetVisible(a)){var h=Number(u.getRightValue(r.data[t]));h<0?c+=h||0:l+=h||0}var _=Number(u.getRightValue(e));return _<0?u.getPixelForValue(c+_):u.getPixelForValue(l+_)}return u.getPixelForValue(e)},updateBezierControlPoints:function(){
	function e(e,t,n){return Math.max(Math.min(e,n),t)}var t,a,r,i,o,s=this,d=s.getMeta(),u=s.chart.chartArea,l=d.data||[];if(d.dataset._model.spanGaps&&(l=l.filter(function(e){return!e._model.skip})),"monotone"===d.dataset._model.cubicInterpolationMode)n.splineCurveMonotone(l);else for(t=0,a=l.length;t<a;++t)r=l[t],i=r._model,o=n.splineCurve(n.previousItem(l,t)._model,i,n.nextItem(l,t)._model,d.dataset._model.tension),i.controlPointPreviousX=o.previous.x,i.controlPointPreviousY=o.previous.y,i.controlPointNextX=o.next.x,i.controlPointNextY=o.next.y;if(s.chart.options.elements.line.capBezierPoints)for(t=0,a=l.length;t<a;++t)i=l[t]._model,i.controlPointPreviousX=e(i.controlPointPreviousX,u.left,u.right),i.controlPointPreviousY=e(i.controlPointPreviousY,u.top,u.bottom),i.controlPointNextX=e(i.controlPointNextX,u.left,u.right),i.controlPointNextY=e(i.controlPointNextY,u.top,u.bottom)},draw:function(e){var n,a,r=this,i=r.getMeta(),o=i.data||[],s=e||1;for(n=0,a=o.length;n<a;++n)o[n].transition(s);for(t(r.getDataset(),r.chart.options)&&i.dataset.transition(s).draw(),n=0,a=o.length;n<a;++n)o[n].draw()},setHoverStyle:function(e){var t=this.chart.data.datasets[e._datasetIndex],a=e._index,r=e.custom||{},i=e._model;i.radius=r.hoverRadius||n.getValueAtIndexOrDefault(t.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),i.backgroundColor=r.hoverBackgroundColor||n.getValueAtIndexOrDefault(t.pointHoverBackgroundColor,a,n.getHoverColor(i.backgroundColor)),i.borderColor=r.hoverBorderColor||n.getValueAtIndexOrDefault(t.pointHoverBorderColor,a,n.getHoverColor(i.borderColor)),i.borderWidth=r.hoverBorderWidth||n.getValueAtIndexOrDefault(t.pointHoverBorderWidth,a,i.borderWidth)},removeHoverStyle:function(e){var t=this,a=t.chart.data.datasets[e._datasetIndex],r=e._index,i=e.custom||{},o=e._model;void 0!==a.radius&&void 0===a.pointRadius&&(a.pointRadius=a.radius),o.radius=i.radius||n.getValueAtIndexOrDefault(a.pointRadius,r,t.chart.options.elements.point.radius),o.backgroundColor=t.getPointBackgroundColor(e,r),o.borderColor=t.getPointBorderColor(e,r),o.borderWidth=t.getPointBorderWidth(e,r)}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.polarArea={scale:{type:"radialLinear",lineArc:!0,ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,aspectRatio:1,legendCallback:function(e){var t=[];t.push('<ul class="'+e.id+'-legend">');var n=e.data,a=n.datasets,r=n.labels;if(a.length)for(var i=0;i<a[0].data.length;++i)t.push('<li><span style="background-color:'+a[0].backgroundColor[i]+'"></span>'),r[i]&&t.push(r[i]),t.push("</li>");return t.push("</ul>"),t.join("")},legend:{labels:{generateLabels:function(e){var n=e.data;return n.labels.length&&n.datasets.length?n.labels.map(function(a,r){var i=e.getDatasetMeta(0),o=n.datasets[0],s=i.data[r],d=s.custom||{},u=t.getValueAtIndexOrDefault,l=e.options.elements.arc,c=d.backgroundColor?d.backgroundColor:u(o.backgroundColor,r,l.backgroundColor),h=d.borderColor?d.borderColor:u(o.borderColor,r,l.borderColor),_=d.borderWidth?d.borderWidth:u(o.borderWidth,r,l.borderWidth);return{text:a,fillStyle:c,strokeStyle:h,lineWidth:_,hidden:isNaN(o.data[r])||i.data[r].hidden,index:r}}):[]}},onClick:function(e,t){var n,a,r,i=t.index,o=this.chart;for(n=0,a=(o.data.datasets||[]).length;n<a;++n)r=o.getDatasetMeta(n),r.data[i].hidden=!r.data[i].hidden;o.update()}},tooltips:{callbacks:{title:function(){return""},label:function(e,t){return t.labels[e.index]+": "+e.yLabel}}}},e.controllers.polarArea=e.DatasetController.extend({dataElementType:e.elements.Arc,linkScales:t.noop,update:function(e){var n=this,a=n.chart,r=a.chartArea,i=n.getMeta(),o=a.options,s=o.elements.arc,d=Math.min(r.right-r.left,r.bottom-r.top);a.outerRadius=Math.max((d-s.borderWidth/2)/2,0),a.innerRadius=Math.max(o.cutoutPercentage?a.outerRadius/100*o.cutoutPercentage:1,0),a.radiusLength=(a.outerRadius-a.innerRadius)/a.getVisibleDatasetCount(),n.outerRadius=a.outerRadius-a.radiusLength*n.index,n.innerRadius=n.outerRadius-a.radiusLength,i.count=n.countVisibleElements(),t.each(i.data,function(t,a){n.updateElement(t,a,e)})},updateElement:function(e,n,a){for(var r=this,i=r.chart,o=r.getDataset(),s=i.options,d=s.animation,u=i.scale,l=t.getValueAtIndexOrDefault,c=i.data.labels,h=r.calculateCircumference(o.data[n]),_=u.xCenter,m=u.yCenter,f=0,p=r.getMeta(),g=0;g<n;++g)isNaN(o.data[g])||p.data[g].hidden||++f;var y=s.startAngle,v=e.hidden?0:u.getDistanceFromCenterForValue(o.data[n]),M=y+h*f,b=M+(e.hidden?0:h),L=d.animateScale?0:u.getDistanceFromCenterForValue(o.data[n]);t.extend(e,{_datasetIndex:r.index,_index:n,_scale:u,_model:{x:_,y:m,innerRadius:0,outerRadius:a?L:v,startAngle:a&&d.animateRotate?y:M,endAngle:a&&d.animateRotate?y:b,label:l(c,n,c[n])}}),r.removeHoverStyle(e),e.pivot()},removeHoverStyle:function(t){e.DatasetController.prototype.removeHoverStyle.call(this,t,this.chart.options.elements.arc)},countVisibleElements:function(){var e=this.getDataset(),n=this.getMeta(),a=0;return t.each(n.data,function(t,n){isNaN(e.data[n])||t.hidden||a++}),a},calculateCircumference:function(e){var t=this.getMeta().count;return t>0&&!isNaN(e)?2*Math.PI/t:0}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.radar={aspectRatio:1,scale:{type:"radialLinear"},elements:{line:{tension:0}}},e.controllers.radar=e.DatasetController.extend({datasetElementType:e.elements.Line,dataElementType:e.elements.Point,linkScales:t.noop,update:function(e){var n=this,a=n.getMeta(),r=a.dataset,i=a.data,o=r.custom||{},s=n.getDataset(),d=n.chart.options.elements.line,u=n.chart.scale;void 0!==s.tension&&void 0===s.lineTension&&(s.lineTension=s.tension),t.extend(a.dataset,{_datasetIndex:n.index,_children:i,_loop:!0,_model:{tension:o.tension?o.tension:t.getValueOrDefault(s.lineTension,d.tension),backgroundColor:o.backgroundColor?o.backgroundColor:s.backgroundColor||d.backgroundColor,borderWidth:o.borderWidth?o.borderWidth:s.borderWidth||d.borderWidth,borderColor:o.borderColor?o.borderColor:s.borderColor||d.borderColor,fill:o.fill?o.fill:void 0!==s.fill?s.fill:d.fill,borderCapStyle:o.borderCapStyle?o.borderCapStyle:s.borderCapStyle||d.borderCapStyle,borderDash:o.borderDash?o.borderDash:s.borderDash||d.borderDash,borderDashOffset:o.borderDashOffset?o.borderDashOffset:s.borderDashOffset||d.borderDashOffset,borderJoinStyle:o.borderJoinStyle?o.borderJoinStyle:s.borderJoinStyle||d.borderJoinStyle,scaleTop:u.top,scaleBottom:u.bottom,scaleZero:u.getBasePosition()}}),a.dataset.pivot(),t.each(i,function(t,a){n.updateElement(t,a,e)},n),n.updateBezierControlPoints()},updateElement:function(e,n,a){var r=this,i=e.custom||{},o=r.getDataset(),s=r.chart.scale,d=r.chart.options.elements.point,u=s.getPointPositionForValue(n,o.data[n]);t.extend(e,{_datasetIndex:r.index,_index:n,_scale:s,_model:{x:a?s.xCenter:u.x,y:a?s.yCenter:u.y,tension:i.tension?i.tension:t.getValueOrDefault(o.tension,r.chart.options.elements.line.tension),radius:i.radius?i.radius:t.getValueAtIndexOrDefault(o.pointRadius,n,d.radius),backgroundColor:i.backgroundColor?i.backgroundColor:t.getValueAtIndexOrDefault(o.pointBackgroundColor,n,d.backgroundColor),borderColor:i.borderColor?i.borderColor:t.getValueAtIndexOrDefault(o.pointBorderColor,n,d.borderColor),borderWidth:i.borderWidth?i.borderWidth:t.getValueAtIndexOrDefault(o.pointBorderWidth,n,d.borderWidth),pointStyle:i.pointStyle?i.pointStyle:t.getValueAtIndexOrDefault(o.pointStyle,n,d.pointStyle),hitRadius:i.hitRadius?i.hitRadius:t.getValueAtIndexOrDefault(o.hitRadius,n,d.hitRadius)}}),e._model.skip=i.skip?i.skip:isNaN(e._model.x)||isNaN(e._model.y)},updateBezierControlPoints:function(){var e=this.chart.chartArea,n=this.getMeta();t.each(n.data,function(a,r){var i=a._model,o=t.splineCurve(t.previousItem(n.data,r,!0)._model,i,t.nextItem(n.data,r,!0)._model,i.tension);i.controlPointPreviousX=Math.max(Math.min(o.previous.x,e.right),e.left),i.controlPointPreviousY=Math.max(Math.min(o.previous.y,e.bottom),e.top),i.controlPointNextX=Math.max(Math.min(o.next.x,e.right),e.left),i.controlPointNextY=Math.max(Math.min(o.next.y,e.bottom),e.top),a.pivot()})},draw:function(e){var n=this.getMeta(),a=e||1;t.each(n.data,function(e){e.transition(a)}),n.dataset.transition(a).draw(),t.each(n.data,function(e){e.draw()})},setHoverStyle:function(e){var n=this.chart.data.datasets[e._datasetIndex],a=e.custom||{},r=e._index,i=e._model;i.radius=a.hoverRadius?a.hoverRadius:t.getValueAtIndexOrDefault(n.pointHoverRadius,r,this.chart.options.elements.point.hoverRadius),i.backgroundColor=a.hoverBackgroundColor?a.hoverBackgroundColor:t.getValueAtIndexOrDefault(n.pointHoverBackgroundColor,r,t.getHoverColor(i.backgroundColor)),i.borderColor=a.hoverBorderColor?a.hoverBorderColor:t.getValueAtIndexOrDefault(n.pointHoverBorderColor,r,t.getHoverColor(i.borderColor)),i.borderWidth=a.hoverBorderWidth?a.hoverBorderWidth:t.getValueAtIndexOrDefault(n.pointHoverBorderWidth,r,i.borderWidth)},removeHoverStyle:function(e){var n=this.chart.data.datasets[e._datasetIndex],a=e.custom||{},r=e._index,i=e._model,o=this.chart.options.elements.point;i.radius=a.radius?a.radius:t.getValueAtIndexOrDefault(n.radius,r,o.radius),i.backgroundColor=a.backgroundColor?a.backgroundColor:t.getValueAtIndexOrDefault(n.pointBackgroundColor,r,o.backgroundColor),i.borderColor=a.borderColor?a.borderColor:t.getValueAtIndexOrDefault(n.pointBorderColor,r,o.borderColor),i.borderWidth=a.borderWidth?a.borderWidth:t.getValueAtIndexOrDefault(n.pointBorderWidth,r,o.borderWidth)}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:t.noop,onComplete:t.noop},e.Animation=e.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),e.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(e,t,n,a){var r=this;a||(e.animating=!0);for(var i=0;i<r.animations.length;++i)if(r.animations[i].chartInstance===e)return void(r.animations[i].animationObject=t);r.animations.push({chartInstance:e,animationObject:t}),1===r.animations.length&&r.requestAnimationFrame()},cancelAnimation:function(e){var n=t.findIndex(this.animations,function(t){return t.chartInstance===e});n!==-1&&(this.animations.splice(n,1),e.animating=!1)},requestAnimationFrame:function(){var e=this;null===e.request&&(e.request=t.requestAnimFrame.call(window,function(){e.request=null,e.startDigest()}))},startDigest:function(){var e=this,t=Date.now(),n=0;e.dropFrames>1&&(n=Math.floor(e.dropFrames),e.dropFrames=e.dropFrames%1);for(var a=0;a<e.animations.length;)null===e.animations[a].animationObject.currentStep&&(e.animations[a].animationObject.currentStep=0),e.animations[a].animationObject.currentStep+=1+n,e.animations[a].animationObject.currentStep>e.animations[a].animationObject.numSteps&&(e.animations[a].animationObject.currentStep=e.animations[a].animationObject.numSteps),e.animations[a].animationObject.render(e.animations[a].chartInstance,e.animations[a].animationObject),e.animations[a].animationObject.onAnimationProgress&&e.animations[a].animationObject.onAnimationProgress.call&&e.animations[a].animationObject.onAnimationProgress.call(e.animations[a].chartInstance,e.animations[a]),e.animations[a].animationObject.currentStep===e.animations[a].animationObject.numSteps?(e.animations[a].animationObject.onAnimationComplete&&e.animations[a].animationObject.onAnimationComplete.call&&e.animations[a].animationObject.onAnimationComplete.call(e.animations[a].chartInstance,e.animations[a]),e.animations[a].chartInstance.animating=!1,e.animations.splice(a,1)):++a;var r=Date.now(),i=(r-t)/e.frameDuration;e.dropFrames+=i,e.animations.length>0&&e.requestAnimationFrame()}}}},function(e,t){"use strict";e.exports=function(e){var t=e.canvasHelpers={};t.drawPoint=function(e,t,n,a,r){var i,o,s,d,u,l;if("object"==typeof t&&(i=t.toString(),"[object HTMLImageElement]"===i||"[object HTMLCanvasElement]"===i))return void e.drawImage(t,a-t.width/2,r-t.height/2);if(!(isNaN(n)||n<=0)){switch(t){default:e.beginPath(),e.arc(a,r,n,0,2*Math.PI),e.closePath(),e.fill();break;case"triangle":e.beginPath(),o=3*n/Math.sqrt(3),u=o*Math.sqrt(3)/2,e.moveTo(a-o/2,r+u/3),e.lineTo(a+o/2,r+u/3),e.lineTo(a,r-2*u/3),e.closePath(),e.fill();break;case"rect":l=1/Math.SQRT2*n,e.beginPath(),e.fillRect(a-l,r-l,2*l,2*l),e.strokeRect(a-l,r-l,2*l,2*l);break;case"rectRot":l=1/Math.SQRT2*n,e.beginPath(),e.moveTo(a-l,r),e.lineTo(a,r+l),e.lineTo(a+l,r),e.lineTo(a,r-l),e.closePath(),e.fill();break;case"cross":e.beginPath(),e.moveTo(a,r+n),e.lineTo(a,r-n),e.moveTo(a-n,r),e.lineTo(a+n,r),e.closePath();break;case"crossRot":e.beginPath(),s=Math.cos(Math.PI/4)*n,d=Math.sin(Math.PI/4)*n,e.moveTo(a-s,r-d),e.lineTo(a+s,r+d),e.moveTo(a-s,r+d),e.lineTo(a+s,r-d),e.closePath();break;case"star":e.beginPath(),e.moveTo(a,r+n),e.lineTo(a,r-n),e.moveTo(a-n,r),e.lineTo(a+n,r),s=Math.cos(Math.PI/4)*n,d=Math.sin(Math.PI/4)*n,e.moveTo(a-s,r-d),e.lineTo(a+s,r+d),e.moveTo(a-s,r+d),e.lineTo(a+s,r-d),e.closePath();break;case"line":e.beginPath(),e.moveTo(a-n,r),e.lineTo(a+n,r),e.closePath();break;case"dash":e.beginPath(),e.moveTo(a,r),e.lineTo(a+n,r),e.closePath()}e.stroke()}}}},function(e,t){"use strict";e.exports=function(e){function t(e,t){var n=o.getStyle(e,t),a=n&&n.match(/(\d+)px/);return a?Number(a[1]):void 0}function n(e,n){var a=e.style,r=e.getAttribute("height"),i=e.getAttribute("width");if(e._chartjs={initial:{height:r,width:i,style:{display:a.display,height:a.height,width:a.width}}},a.display=a.display||"block",null===i||""===i){var o=t(e,"width");void 0!==o&&(e.width=o)}if(null===r||""===r)if(""===e.style.height)e.height=e.width/(n.options.aspectRatio||2);else{var s=t(e,"height");void 0!==o&&(e.height=s)}return e}function a(e){if(e._chartjs){var t=e._chartjs.initial;["height","width"].forEach(function(n){var a=t[n];void 0===a||null===a?e.removeAttribute(n):e.setAttribute(n,a)}),o.each(t.style||{},function(t,n){e.style[n]=t}),e.width=e.width,delete e._chartjs}}function r(e,t){if("string"==typeof e?e=document.getElementById(e):e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e instanceof HTMLCanvasElement){var a=e.getContext&&e.getContext("2d");if(a instanceof CanvasRenderingContext2D)return n(e,t),a}return null}function i(t){t=t||{};var n=t.data=t.data||{};return n.datasets=n.datasets||[],n.labels=n.labels||[],t.options=o.configMerge(e.defaults.global,e.defaults[t.type],t.options||{}),t}var o=e.helpers;e.types={},e.instances={},e.controllers={},e.Controller=function(t,n,a){var s=this;n=i(n);var d=r(t,n),u=d&&d.canvas,l=u&&u.height,c=u&&u.width;return a.ctx=d,a.canvas=u,a.config=n,a.width=c,a.height=l,a.aspectRatio=l?c/l:null,s.id=o.uid(),s.chart=a,s.config=n,s.options=n.options,s._bufferedRender=!1,e.instances[s.id]=s,Object.defineProperty(s,"data",{get:function(){return s.config.data}}),d&&u?(o.retinaScale(a),s.options.responsive&&(o.addResizeListener(u.parentNode,function(){s.resize()}),s.resize(!0)),s.initialize(),s):(console.error("Failed to create chart: can't acquire context from the given item"),s)},o.extend(e.Controller.prototype,{initialize:function(){var t=this;return e.plugins.notify("beforeInit",[t]),t.bindEvents(),t.ensureScalesHaveIDs(),t.buildOrUpdateControllers(),t.buildScales(),t.updateLayout(),t.resetElements(),t.initToolTip(),t.update(),e.plugins.notify("afterInit",[t]),t},clear:function(){return o.clear(this.chart),this},stop:function(){return e.animationService.cancelAnimation(this),this},resize:function(t){var n=this,a=n.chart,r=n.options,i=a.canvas,s=r.maintainAspectRatio&&a.aspectRatio||null,d=Math.floor(o.getMaximumWidth(i)),u=Math.floor(s?d/s:o.getMaximumHeight(i));if(a.width!==d||a.height!==u){i.width=a.width=d,i.height=a.height=u,i.style.width=d+"px",i.style.height=u+"px",o.retinaScale(a);var l={width:d,height:u};e.plugins.notify("resize",[n,l]),n.options.onResize&&n.options.onResize(n,l),t||(n.stop(),n.update(n.options.responsiveAnimationDuration))}},ensureScalesHaveIDs:function(){var e=this.options,t=e.scales||{},n=e.scale;o.each(t.xAxes,function(e,t){e.id=e.id||"x-axis-"+t}),o.each(t.yAxes,function(e,t){e.id=e.id||"y-axis-"+t}),n&&(n.id=n.id||"scale")},buildScales:function(){var t=this,n=t.options,a=t.scales={},r=[];n.scales&&(r=r.concat((n.scales.xAxes||[]).map(function(e){return{options:e,dtype:"category"}}),(n.scales.yAxes||[]).map(function(e){return{options:e,dtype:"linear"}}))),n.scale&&r.push({options:n.scale,dtype:"radialLinear",isDefault:!0}),o.each(r,function(n){var r=n.options,i=o.getValueOrDefault(r.type,n.dtype),s=e.scaleService.getScaleConstructor(i);if(s){var d=new s({id:r.id,options:r,ctx:t.chart.ctx,chart:t});a[d.id]=d,n.isDefault&&(t.scale=d)}}),e.scaleService.addScalesToLayout(this)},updateLayout:function(){e.layoutService.update(this,this.chart.width,this.chart.height)},buildOrUpdateControllers:function(){var t=this,n=[],a=[];if(o.each(t.data.datasets,function(r,i){var o=t.getDatasetMeta(i);o.type||(o.type=r.type||t.config.type),n.push(o.type),o.controller?o.controller.updateIndex(i):(o.controller=new e.controllers[o.type](t,i),a.push(o.controller))},t),n.length>1)for(var r=1;r<n.length;r++)if(n[r]!==n[r-1]){t.isCombo=!0;break}return a},resetElements:function(){var e=this;o.each(e.data.datasets,function(t,n){e.getDatasetMeta(n).controller.reset()},e)},reset:function(){this.resetElements(),this.tooltip.initialize()},update:function(t,n){var a=this;e.plugins.notify("beforeUpdate",[a]),a.tooltip._data=a.data;var r=a.buildOrUpdateControllers();o.each(a.data.datasets,function(e,t){a.getDatasetMeta(t).controller.buildOrUpdateElements()},a),e.layoutService.update(a,a.chart.width,a.chart.height),e.plugins.notify("afterScaleUpdate",[a]),o.each(r,function(e){e.reset()}),a.updateDatasets(),e.plugins.notify("afterUpdate",[a]),a._bufferedRender?a._bufferedRequest={lazy:n,duration:t}:a.render(t,n)},updateDatasets:function(){var t,n,a=this;if(e.plugins.notify("beforeDatasetsUpdate",[a])){for(t=0,n=a.data.datasets.length;t<n;++t)a.getDatasetMeta(t).controller.update();e.plugins.notify("afterDatasetsUpdate",[a])}},render:function(t,n){var a=this;e.plugins.notify("beforeRender",[a]);var r=a.options.animation;if(r&&("undefined"!=typeof t&&0!==t||"undefined"==typeof t&&0!==r.duration)){var i=new e.Animation;i.numSteps=(t||r.duration)/16.66,i.easing=r.easing,i.render=function(e,t){var n=o.easingEffects[t.easing],a=t.currentStep/t.numSteps,r=n(a);e.draw(r,a,t.currentStep)},i.onAnimationProgress=r.onProgress,i.onAnimationComplete=r.onComplete,e.animationService.addAnimation(a,i,t,n)}else a.draw(),r&&r.onComplete&&r.onComplete.call&&r.onComplete.call(a);return a},draw:function(t){var n=this,a=t||1;n.clear(),e.plugins.notify("beforeDraw",[n,a]),o.each(n.boxes,function(e){e.draw(n.chartArea)},n),n.scale&&n.scale.draw(),e.plugins.notify("beforeDatasetsDraw",[n,a]),o.each(n.data.datasets,function(e,a){n.isDatasetVisible(a)&&n.getDatasetMeta(a).controller.draw(t)},n,!0),e.plugins.notify("afterDatasetsDraw",[n,a]),n.tooltip.transition(a).draw(),e.plugins.notify("afterDraw",[n,a])},getElementAtEvent:function(t){return e.Interaction.modes.single(this,t)},getElementsAtEvent:function(t){return e.Interaction.modes.label(this,t,{intersect:!0})},getElementsAtXAxis:function(t){return e.Interaction.modes["x-axis"](this,t,{intersect:!0})},getElementsAtEventForMode:function(t,n,a){var r=e.Interaction.modes[n];return"function"==typeof r?r(this,t,a):[]},getDatasetAtEvent:function(t){return e.Interaction.modes.dataset(this,t)},getDatasetMeta:function(e){var t=this,n=t.data.datasets[e];n._meta||(n._meta={});var a=n._meta[t.id];return a||(a=n._meta[t.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),a},getVisibleDatasetCount:function(){for(var e=0,t=0,n=this.data.datasets.length;t<n;++t)this.isDatasetVisible(t)&&e++;return e},isDatasetVisible:function(e){var t=this.getDatasetMeta(e);return"boolean"==typeof t.hidden?!t.hidden:!this.data.datasets[e].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){var t,n,r,i=this,s=i.chart.canvas;for(i.stop(),n=0,r=i.data.datasets.length;n<r;++n)t=i.getDatasetMeta(n),t.controller&&(t.controller.destroy(),t.controller=null);s&&(o.unbindEvents(i,i.events),o.removeResizeListener(s.parentNode),o.clear(i.chart),a(s),i.chart.canvas=null,i.chart.ctx=null),e.plugins.notify("destroy",[i]),delete e.instances[i.id]},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)},initToolTip:function(){var t=this;t.tooltip=new e.Tooltip({_chart:t.chart,_chartInstance:t,_data:t.data,_options:t.options.tooltips},t),t.tooltip.initialize()},bindEvents:function(){var e=this;o.bindEvents(e,e.options.events,function(t){e.eventHandler(t)})},updateHoverStyle:function(e,t,n){var a,r,i,o=n?"setHoverStyle":"removeHoverStyle";for(r=0,i=e.length;r<i;++r)a=e[r],a&&this.getDatasetMeta(a._datasetIndex).controller[o](a)},eventHandler:function(e){var t=this,n=t.legend,a=t.tooltip,r=t.options.hover;t._bufferedRender=!0,t._bufferedRequest=null;var i=t.handleEvent(e);i|=n&&n.handleEvent(e),i|=a&&a.handleEvent(e);var o=t._bufferedRequest;return o?t.render(o.duration,o.lazy):i&&!t.animating&&(t.stop(),t.render(r.animationDuration,!0)),t._bufferedRender=!1,t._bufferedRequest=null,t},handleEvent:function(e){var t=this,n=t.options||{},a=n.hover,r=!1;return t.lastActive=t.lastActive||[],"mouseout"===e.type?t.active=[]:t.active=t.getElementsAtEventForMode(e,a.mode,a),a.onHover&&a.onHover.call(t,t.active),"mouseup"!==e.type&&"click"!==e.type||n.onClick&&n.onClick.call(t,e,t.active),t.lastActive.length&&t.updateHoverStyle(t.lastActive,a.mode,!1),t.active.length&&a.mode&&t.updateHoverStyle(t.active,a.mode,!0),r=!o.arrayEquals(t.active,t.lastActive),t.lastActive=t.active,r}})}},function(e,t){"use strict";e.exports=function(e){function t(e,t){return e._chartjs?void e._chartjs.listeners.push(t):(Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),void r.forEach(function(t){var n="onData"+t.charAt(0).toUpperCase()+t.slice(1),r=e[t];Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:function(){var t=Array.prototype.slice.call(arguments),i=r.apply(this,t);return a.each(e._chartjs.listeners,function(e){"function"==typeof e[n]&&e[n].apply(e,t)}),i}})}))}function n(e,t){var n=e._chartjs;if(n){var a=n.listeners,i=a.indexOf(t);i!==-1&&a.splice(i,1),a.length>0||(r.forEach(function(t){delete e[t]}),delete e._chartjs)}}var a=e.helpers,r=["push","pop","shift","splice","unshift"];e.DatasetController=function(e,t){this.initialize(e,t)},a.extend(e.DatasetController.prototype,{datasetElementType:null,dataElementType:null,initialize:function(e,t){var n=this;n.chart=e,n.index=t,n.linkScales(),n.addElements()},updateIndex:function(e){this.index=e},linkScales:function(){var e=this,t=e.getMeta(),n=e.getDataset();null===t.xAxisID&&(t.xAxisID=n.xAxisID||e.chart.options.scales.xAxes[0].id),null===t.yAxisID&&(t.yAxisID=n.yAxisID||e.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(e){return this.chart.scales[e]},reset:function(){this.update(!0)},destroy:function(){this._data&&n(this._data,this)},createMetaDataset:function(){var e=this,t=e.datasetElementType;return t&&new t({_chart:e.chart.chart,_datasetIndex:e.index})},createMetaData:function(e){var t=this,n=t.dataElementType;return n&&new n({_chart:t.chart.chart,_datasetIndex:t.index,_index:e})},addElements:function(){var e,t,n=this,a=n.getMeta(),r=n.getDataset().data||[],i=a.data;for(e=0,t=r.length;e<t;++e)i[e]=i[e]||n.createMetaData(e);a.dataset=a.dataset||n.createMetaDataset()},addElementAndReset:function(e){var t=this.createMetaData(e);this.getMeta().data.splice(e,0,t),this.updateElement(t,e,!0)},buildOrUpdateElements:function(){var e=this,a=e.getDataset(),r=a.data||(a.data=[]);e._data!==r&&(e._data&&n(e._data,e),t(r,e),e._data=r),e.resyncElements()},update:a.noop,draw:function(e){var t,n,a=e||1,r=this.getMeta().data;for(t=0,n=r.length;t<n;++t)r[t].transition(a).draw()},removeHoverStyle:function(e,t){var n=this.chart.data.datasets[e._datasetIndex],r=e._index,i=e.custom||{},o=a.getValueAtIndexOrDefault,s=e._model;s.backgroundColor=i.backgroundColor?i.backgroundColor:o(n.backgroundColor,r,t.backgroundColor),s.borderColor=i.borderColor?i.borderColor:o(n.borderColor,r,t.borderColor),s.borderWidth=i.borderWidth?i.borderWidth:o(n.borderWidth,r,t.borderWidth)},setHoverStyle:function(e){var t=this.chart.data.datasets[e._datasetIndex],n=e._index,r=e.custom||{},i=a.getValueAtIndexOrDefault,o=a.getHoverColor,s=e._model;s.backgroundColor=r.hoverBackgroundColor?r.hoverBackgroundColor:i(t.hoverBackgroundColor,n,o(s.backgroundColor)),s.borderColor=r.hoverBorderColor?r.hoverBorderColor:i(t.hoverBorderColor,n,o(s.borderColor)),s.borderWidth=r.hoverBorderWidth?r.hoverBorderWidth:i(t.hoverBorderWidth,n,s.borderWidth)},resyncElements:function(){var e=this,t=e.getMeta(),n=e.getDataset().data,a=t.data.length,r=n.length;r<a?t.data.splice(r,a-r):r>a&&e.insertElements(a,r-a)},insertElements:function(e,t){for(var n=0;n<t;++n)this.addElementAndReset(e+n)},onDataPush:function(){this.insertElements(this.getDataset().data.length-1,arguments.length)},onDataPop:function(){this.getMeta().data.pop()},onDataShift:function(){this.getMeta().data.shift()},onDataSplice:function(e,t){this.getMeta().data.splice(e,t),this.insertElements(e,arguments.length-2)},onDataUnshift:function(){this.insertElements(0,arguments.length)}}),e.DatasetController.extend=a.inherits}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.elements={},e.Element=function(e){t.extend(this,e),this.initialize.apply(this,arguments)},t.extend(e.Element.prototype,{initialize:function(){this.hidden=!1},pivot:function(){var e=this;return e._view||(e._view=t.clone(e._model)),e._start=t.clone(e._view),e},transition:function(e){var n=this;return n._view||(n._view=t.clone(n._model)),1===e?(n._view=n._model,n._start=null,n):(n._start||n.pivot(),t.each(n._model,function(a,r){if("_"===r[0]);else if(n._view.hasOwnProperty(r))if(a===n._view[r]);else if("string"==typeof a)try{var i=t.color(n._model[r]).mix(t.color(n._start[r]),e);n._view[r]=i.rgbString()}catch(e){n._view[r]=a}else if("number"==typeof a){var o=void 0!==n._start[r]&&isNaN(n._start[r])===!1?n._start[r]:0;n._view[r]=(n._model[r]-o)*e+o}else n._view[r]=a;else"number"!=typeof a||isNaN(n._view[r])?n._view[r]=a:n._view[r]=a*e},n),n)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return t.isNumber(this._model.x)&&t.isNumber(this._model.y)}}),e.Element.extend=t.inherits}},function(e,t,n){"use strict";var a=n(256);e.exports=function(e){function t(e,t,n){var a;return"string"==typeof e?(a=parseInt(e,10),e.indexOf("%")!==-1&&(a=a/100*t.parentNode[n])):a=e,a}function n(e){return void 0!==e&&null!==e&&"none"!==e}function r(e,a,r){var i=document.defaultView,o=e.parentNode,s=i.getComputedStyle(e)[a],d=i.getComputedStyle(o)[a],u=n(s),l=n(d),c=Number.POSITIVE_INFINITY;return u||l?Math.min(u?t(s,e,r):c,l?t(d,o,r):c):"none"}var i=e.helpers={};i.each=function(e,t,n,a){var r,o;if(i.isArray(e))if(o=e.length,a)for(r=o-1;r>=0;r--)t.call(n,e[r],r);else for(r=0;r<o;r++)t.call(n,e[r],r);else if("object"==typeof e){var s=Object.keys(e);for(o=s.length,r=0;r<o;r++)t.call(n,e[s[r]],s[r])}},i.clone=function(e){var t={};return i.each(e,function(e,n){i.isArray(e)?t[n]=e.slice(0):"object"==typeof e&&null!==e?t[n]=i.clone(e):t[n]=e}),t},i.extend=function(e){for(var t=function(t,n){e[n]=t},n=1,a=arguments.length;n<a;n++)i.each(arguments[n],t);return e},i.configMerge=function(t){var n=i.clone(t);return i.each(Array.prototype.slice.call(arguments,1),function(t){i.each(t,function(t,a){var r=n.hasOwnProperty(a),o=r?n[a]:{};"scales"===a?n[a]=i.scaleMerge(o,t):"scale"===a?n[a]=i.configMerge(o,e.scaleService.getScaleDefaults(t.type),t):!r||"object"!=typeof o||i.isArray(o)||null===o||"object"!=typeof t||i.isArray(t)?n[a]=t:n[a]=i.configMerge(o,t)})}),n},i.scaleMerge=function(t,n){var a=i.clone(t);return i.each(n,function(t,n){"xAxes"===n||"yAxes"===n?a.hasOwnProperty(n)?i.each(t,function(t,r){var o=i.getValueOrDefault(t.type,"xAxes"===n?"category":"linear"),s=e.scaleService.getScaleDefaults(o);r>=a[n].length||!a[n][r].type?a[n].push(i.configMerge(s,t)):t.type&&t.type!==a[n][r].type?a[n][r]=i.configMerge(a[n][r],s,t):a[n][r]=i.configMerge(a[n][r],t)}):(a[n]=[],i.each(t,function(t){var r=i.getValueOrDefault(t.type,"xAxes"===n?"category":"linear");a[n].push(i.configMerge(e.scaleService.getScaleDefaults(r),t))})):a.hasOwnProperty(n)&&"object"==typeof a[n]&&null!==a[n]&&"object"==typeof t?a[n]=i.configMerge(a[n],t):a[n]=t}),a},i.getValueAtIndexOrDefault=function(e,t,n){return void 0===e||null===e?n:i.isArray(e)?t<e.length?e[t]:n:e},i.getValueOrDefault=function(e,t){return void 0===e?t:e},i.indexOf=Array.prototype.indexOf?function(e,t){return e.indexOf(t)}:function(e,t){for(var n=0,a=e.length;n<a;++n)if(e[n]===t)return n;return-1},i.where=function(e,t){if(i.isArray(e)&&Array.prototype.filter)return e.filter(t);var n=[];return i.each(e,function(e){t(e)&&n.push(e)}),n},i.findIndex=Array.prototype.findIndex?function(e,t,n){return e.findIndex(t,n)}:function(e,t,n){n=void 0===n?e:n;for(var a=0,r=e.length;a<r;++a)if(t.call(n,e[a],a,e))return a;return-1},i.findNextWhere=function(e,t,n){void 0!==n&&null!==n||(n=-1);for(var a=n+1;a<e.length;a++){var r=e[a];if(t(r))return r}},i.findPreviousWhere=function(e,t,n){void 0!==n&&null!==n||(n=e.length);for(var a=n-1;a>=0;a--){var r=e[a];if(t(r))return r}},i.inherits=function(e){var t=this,n=e&&e.hasOwnProperty("constructor")?e.constructor:function(){return t.apply(this,arguments)},a=function(){this.constructor=n};return a.prototype=t.prototype,n.prototype=new a,n.extend=i.inherits,e&&i.extend(n.prototype,e),n.__super__=t.prototype,n},i.noop=function(){},i.uid=function(){var e=0;return function(){return e++}}(),i.isNumber=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},i.almostEquals=function(e,t,n){return Math.abs(e-t)<n},i.max=function(e){return e.reduce(function(e,t){return isNaN(t)?e:Math.max(e,t)},Number.NEGATIVE_INFINITY)},i.min=function(e){return e.reduce(function(e,t){return isNaN(t)?e:Math.min(e,t)},Number.POSITIVE_INFINITY)},i.sign=Math.sign?function(e){return Math.sign(e)}:function(e){return e=+e,0===e||isNaN(e)?e:e>0?1:-1},i.log10=Math.log10?function(e){return Math.log10(e)}:function(e){return Math.log(e)/Math.LN10},i.toRadians=function(e){return e*(Math.PI/180)},i.toDegrees=function(e){return e*(180/Math.PI)},i.getAngleFromPoint=function(e,t){var n=t.x-e.x,a=t.y-e.y,r=Math.sqrt(n*n+a*a),i=Math.atan2(a,n);return i<-.5*Math.PI&&(i+=2*Math.PI),{angle:i,distance:r}},i.distanceBetweenPoints=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},i.aliasPixel=function(e){return e%2===0?0:.5},i.splineCurve=function(e,t,n,a){var r=e.skip?t:e,i=t,o=n.skip?t:n,s=Math.sqrt(Math.pow(i.x-r.x,2)+Math.pow(i.y-r.y,2)),d=Math.sqrt(Math.pow(o.x-i.x,2)+Math.pow(o.y-i.y,2)),u=s/(s+d),l=d/(s+d);u=isNaN(u)?0:u,l=isNaN(l)?0:l;var c=a*u,h=a*l;return{previous:{x:i.x-c*(o.x-r.x),y:i.y-c*(o.y-r.y)},next:{x:i.x+h*(o.x-r.x),y:i.y+h*(o.y-r.y)}}},i.EPSILON=Number.EPSILON||1e-14,i.splineCurveMonotone=function(e){var t,n,a,r,o=(e||[]).map(function(e){return{model:e._model,deltaK:0,mK:0}}),s=o.length;for(t=0;t<s;++t)a=o[t],a.model.skip||(n=t>0?o[t-1]:null,r=t<s-1?o[t+1]:null,r&&!r.model.skip&&(a.deltaK=(r.model.y-a.model.y)/(r.model.x-a.model.x)),!n||n.model.skip?a.mK=a.deltaK:!r||r.model.skip?a.mK=n.deltaK:this.sign(n.deltaK)!==this.sign(a.deltaK)?a.mK=0:a.mK=(n.deltaK+a.deltaK)/2);var d,u,l,c;for(t=0;t<s-1;++t)a=o[t],r=o[t+1],a.model.skip||r.model.skip||(i.almostEquals(a.deltaK,0,this.EPSILON)?a.mK=r.mK=0:(d=a.mK/a.deltaK,u=r.mK/a.deltaK,c=Math.pow(d,2)+Math.pow(u,2),c<=9||(l=3/Math.sqrt(c),a.mK=d*l*a.deltaK,r.mK=u*l*a.deltaK)));var h;for(t=0;t<s;++t)a=o[t],
	a.model.skip||(n=t>0?o[t-1]:null,r=t<s-1?o[t+1]:null,n&&!n.model.skip&&(h=(a.model.x-n.model.x)/3,a.model.controlPointPreviousX=a.model.x-h,a.model.controlPointPreviousY=a.model.y-h*a.mK),r&&!r.model.skip&&(h=(r.model.x-a.model.x)/3,a.model.controlPointNextX=a.model.x+h,a.model.controlPointNextY=a.model.y+h*a.mK))},i.nextItem=function(e,t,n){return n?t>=e.length-1?e[0]:e[t+1]:t>=e.length-1?e[e.length-1]:e[t+1]},i.previousItem=function(e,t,n){return n?t<=0?e[e.length-1]:e[t-1]:t<=0?e[0]:e[t-1]},i.niceNum=function(e,t){var n,a=Math.floor(i.log10(e)),r=e/Math.pow(10,a);return n=t?r<1.5?1:r<3?2:r<7?5:10:r<=1?1:r<=2?2:r<=5?5:10,n*Math.pow(10,a)};var o=i.easingEffects={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return-1*e*(e-2)},easeInOutQuad:function(e){return(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1)},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return 1*((e=e/1-1)*e*e+1)},easeInOutCubic:function(e){return(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2)},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return-1*((e=e/1-1)*e*e*e-1)},easeInOutQuart:function(e){return(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2)},easeInQuint:function(e){return 1*(e/=1)*e*e*e*e},easeOutQuint:function(e){return 1*((e=e/1-1)*e*e*e*e+1)},easeInOutQuint:function(e){return(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2)},easeInSine:function(e){return-1*Math.cos(e/1*(Math.PI/2))+1},easeOutSine:function(e){return 1*Math.sin(e/1*(Math.PI/2))},easeInOutSine:function(e){return-.5*(Math.cos(Math.PI*e/1)-1)},easeInExpo:function(e){return 0===e?1:1*Math.pow(2,10*(e/1-1))},easeOutExpo:function(e){return 1===e?1:1*(-Math.pow(2,-10*e/1)+1)},easeInOutExpo:function(e){return 0===e?0:1===e?1:(e/=.5)<1?.5*Math.pow(2,10*(e-1)):.5*(-Math.pow(2,-10*--e)+2)},easeInCirc:function(e){return e>=1?e:-1*(Math.sqrt(1-(e/=1)*e)-1)},easeOutCirc:function(e){return 1*Math.sqrt(1-(e=e/1-1)*e)},easeInOutCirc:function(e){return(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)},easeInElastic:function(e){var t=1.70158,n=0,a=1;return 0===e?0:1===(e/=1)?1:(n||(n=.3),a<Math.abs(1)?(a=1,t=n/4):t=n/(2*Math.PI)*Math.asin(1/a),-(a*Math.pow(2,10*(e-=1))*Math.sin((1*e-t)*(2*Math.PI)/n)))},easeOutElastic:function(e){var t=1.70158,n=0,a=1;return 0===e?0:1===(e/=1)?1:(n||(n=.3),a<Math.abs(1)?(a=1,t=n/4):t=n/(2*Math.PI)*Math.asin(1/a),a*Math.pow(2,-10*e)*Math.sin((1*e-t)*(2*Math.PI)/n)+1)},easeInOutElastic:function(e){var t=1.70158,n=0,a=1;return 0===e?0:2===(e/=.5)?1:(n||(n=1*(.3*1.5)),a<Math.abs(1)?(a=1,t=n/4):t=n/(2*Math.PI)*Math.asin(1/a),e<1?-.5*(a*Math.pow(2,10*(e-=1))*Math.sin((1*e-t)*(2*Math.PI)/n)):a*Math.pow(2,-10*(e-=1))*Math.sin((1*e-t)*(2*Math.PI)/n)*.5+1)},easeInBack:function(e){var t=1.70158;return 1*(e/=1)*e*((t+1)*e-t)},easeOutBack:function(e){var t=1.70158;return 1*((e=e/1-1)*e*((t+1)*e+t)+1)},easeInOutBack:function(e){var t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:function(e){return 1-o.easeOutBounce(1-e)},easeOutBounce:function(e){return(e/=1)<1/2.75?1*(7.5625*e*e):e<2/2.75?1*(7.5625*(e-=1.5/2.75)*e+.75):e<2.5/2.75?1*(7.5625*(e-=2.25/2.75)*e+.9375):1*(7.5625*(e-=2.625/2.75)*e+.984375)},easeInOutBounce:function(e){return e<.5?.5*o.easeInBounce(2*e):.5*o.easeOutBounce(2*e-1)+.5}};i.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)}}(),i.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(e){return window.clearTimeout(e,1e3/60)}}(),i.getRelativePosition=function(e,t){var n,a,r=e.originalEvent||e,o=e.currentTarget||e.srcElement,s=o.getBoundingClientRect(),d=r.touches;d&&d.length>0?(n=d[0].clientX,a=d[0].clientY):(n=r.clientX,a=r.clientY);var u=parseFloat(i.getStyle(o,"padding-left")),l=parseFloat(i.getStyle(o,"padding-top")),c=parseFloat(i.getStyle(o,"padding-right")),h=parseFloat(i.getStyle(o,"padding-bottom")),_=s.right-s.left-u-c,m=s.bottom-s.top-l-h;return n=Math.round((n-s.left-u)/_*o.width/t.currentDevicePixelRatio),a=Math.round((a-s.top-l)/m*o.height/t.currentDevicePixelRatio),{x:n,y:a}},i.addEvent=function(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n},i.removeEvent=function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=i.noop},i.bindEvents=function(e,t,n){var a=e.events=e.events||{};i.each(t,function(t){a[t]=function(){n.apply(e,arguments)},i.addEvent(e.chart.canvas,t,a[t])})},i.unbindEvents=function(e,t){var n=e.chart.canvas;i.each(t,function(e,t){i.removeEvent(n,t,e)})},i.getConstraintWidth=function(e){return r(e,"max-width","clientWidth")},i.getConstraintHeight=function(e){return r(e,"max-height","clientHeight")},i.getMaximumWidth=function(e){var t=e.parentNode,n=parseInt(i.getStyle(t,"padding-left"),10),a=parseInt(i.getStyle(t,"padding-right"),10),r=t.clientWidth-n-a,o=i.getConstraintWidth(e);return isNaN(o)?r:Math.min(r,o)},i.getMaximumHeight=function(e){var t=e.parentNode,n=parseInt(i.getStyle(t,"padding-top"),10),a=parseInt(i.getStyle(t,"padding-bottom"),10),r=t.clientHeight-n-a,o=i.getConstraintHeight(e);return isNaN(o)?r:Math.min(r,o)},i.getStyle=function(e,t){return e.currentStyle?e.currentStyle[t]:document.defaultView.getComputedStyle(e,null).getPropertyValue(t)},i.retinaScale=function(e){var t=e.currentDevicePixelRatio=window.devicePixelRatio||1;if(1!==t){var n=e.canvas,a=e.height,r=e.width;n.height=a*t,n.width=r*t,e.ctx.scale(t,t),n.style.height=a+"px",n.style.width=r+"px"}},i.clear=function(e){e.ctx.clearRect(0,0,e.width,e.height)},i.fontString=function(e,t,n){return t+" "+e+"px "+n},i.longestText=function(e,t,n,a){a=a||{};var r=a.data=a.data||{},o=a.garbageCollect=a.garbageCollect||[];a.font!==t&&(r=a.data={},o=a.garbageCollect=[],a.font=t),e.font=t;var s=0;i.each(n,function(t){void 0!==t&&null!==t&&i.isArray(t)!==!0?s=i.measureText(e,r,o,s,t):i.isArray(t)&&i.each(t,function(t){void 0===t||null===t||i.isArray(t)||(s=i.measureText(e,r,o,s,t))})});var d=o.length/2;if(d>n.length){for(var u=0;u<d;u++)delete r[o[u]];o.splice(0,d)}return s},i.measureText=function(e,t,n,a,r){var i=t[r];return i||(i=t[r]=e.measureText(r).width,n.push(r)),i>a&&(a=i),a},i.numberOfLabelLines=function(e){var t=1;return i.each(e,function(e){i.isArray(e)&&e.length>t&&(t=e.length)}),t},i.drawRoundedRectangle=function(e,t,n,a,r,i){e.beginPath(),e.moveTo(t+i,n),e.lineTo(t+a-i,n),e.quadraticCurveTo(t+a,n,t+a,n+i),e.lineTo(t+a,n+r-i),e.quadraticCurveTo(t+a,n+r,t+a-i,n+r),e.lineTo(t+i,n+r),e.quadraticCurveTo(t,n+r,t,n+r-i),e.lineTo(t,n+i),e.quadraticCurveTo(t,n,t+i,n),e.closePath()},i.color=function(t){return a?a(t instanceof CanvasGradient?e.defaults.global.defaultColor:t):(console.error("Color.js not found!"),t)},i.addResizeListener=function(e,t){var n=document.createElement("iframe");n.className="chartjs-hidden-iframe",n.style.cssText="display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;",n.tabIndex=-1;var a=e._chartjs={resizer:n,ticking:!1},r=function(){a.ticking||(a.ticking=!0,i.requestAnimFrame.call(window,function(){if(a.resizer)return a.ticking=!1,t()}))};i.addEvent(n,"load",function(){i.addEvent(n.contentWindow||n,"resize",r),r()}),e.insertBefore(n,e.firstChild)},i.removeResizeListener=function(e){if(e&&e._chartjs){var t=e._chartjs.resizer;t&&(t.parentNode.removeChild(t),e._chartjs.resizer=null),delete e._chartjs}},i.isArray=Array.isArray?function(e){return Array.isArray(e)}:function(e){return"[object Array]"===Object.prototype.toString.call(e)},i.arrayEquals=function(e,t){var n,a,r,o;if(!e||!t||e.length!==t.length)return!1;for(n=0,a=e.length;n<a;++n)if(r=e[n],o=t[n],r instanceof Array&&o instanceof Array){if(!i.arrayEquals(r,o))return!1}else if(r!==o)return!1;return!0},i.callCallback=function(e,t,n){e&&"function"==typeof e.call&&e.apply(n,t)},i.getHoverColor=function(e){return e instanceof CanvasPattern?e:i.color(e).saturate(.5).darken(.1).rgbString()}}},function(e,t){"use strict";e.exports=function(e){function t(e,t){var n,a,r,i,o,s=e.data.datasets;for(a=0,i=s.length;a<i;++a)if(e.isDatasetVisible(a))for(n=e.getDatasetMeta(a),r=0,o=n.data.length;r<o;++r){var d=n.data[r];d._view.skip||t(d)}}function n(e,n){var a=[];return t(e,function(e){e.inRange(n.x,n.y)&&a.push(e)}),a}function a(e,n,a,r){var o=Number.POSITIVE_INFINITY,s=[];return r||(r=i.distanceBetweenPoints),t(e,function(e){if(!a||e.inRange(n.x,n.y)){var t=e.getCenterPoint(),i=r(n,t);i<o?(s=[e],o=i):i===o&&s.push(e)}}),s}function r(e,t,r){var o=i.getRelativePosition(t,e.chart),s=function(e,t){return Math.abs(e.x-t.x)},d=r.intersect?n(e,o):a(e,o,!1,s),u=[];return d.length?(e.data.datasets.forEach(function(t,n){if(e.isDatasetVisible(n)){var a=e.getDatasetMeta(n),r=a.data[d[0]._index];r&&!r._view.skip&&u.push(r)}}),u):[]}var i=e.helpers;e.Interaction={modes:{single:function(e,n){var a=i.getRelativePosition(n,e.chart),r=[];return t(e,function(e){if(e.inRange(a.x,a.y))return r.push(e),r}),r.slice(0,1)},label:r,index:r,dataset:function(e,t,r){var o=i.getRelativePosition(t,e.chart),s=r.intersect?n(e,o):a(e,o,!1);return s.length>0&&(s=e.getDatasetMeta(s[0]._datasetIndex).data),s},"x-axis":function(e,t){return r(e,t,!0)},point:function(e,t){var a=i.getRelativePosition(t,e.chart);return n(e,a)},nearest:function(e,t,n){var r=i.getRelativePosition(t,e.chart),o=a(e,r,n.intersect);return o.length>1&&o.sort(function(e,t){var n=e.getArea(),a=t.getArea(),r=n-a;return 0===r&&(r=e._datasetIndex-t._datasetIndex),r}),o.slice(0,1)},x:function(e,n,a){var r=i.getRelativePosition(n,e.chart),o=[],s=!1;return t(e,function(e){e.inXRange(r.x)&&o.push(e),e.inRange(r.x,r.y)&&(s=!0)}),a.intersect&&!s&&(o=[]),o},y:function(e,n,a){var r=i.getRelativePosition(n,e.chart),o=[],s=!1;return t(e,function(e){e.inYRange(r.y)&&o.push(e),e.inRange(r.x,r.y)&&(s=!0)}),a.intersect&&!s&&(o=[]),o}}}}},function(e,t){"use strict";e.exports=function(){var e=function(t,n){return this.controller=new e.Controller(t,n,this),this.controller};return e.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"nearest",intersect:!0,animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},legendCallback:function(e){var t=[];t.push('<ul class="'+e.id+'-legend">');for(var n=0;n<e.data.datasets.length;n++)t.push('<li><span style="background-color:'+e.data.datasets[n].backgroundColor+'"></span>'),e.data.datasets[n].label&&t.push(e.data.datasets[n].label),t.push("</li>");return t.push("</ul>"),t.join("")}}},e.Chart=e,e}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.layoutService={defaults:{},addBox:function(e,t){e.boxes||(e.boxes=[]),e.boxes.push(t)},removeBox:function(e,t){e.boxes&&e.boxes.splice(e.boxes.indexOf(t),1)},update:function(e,n,a){function r(e){var t,n=e.isHorizontal();n?(t=e.update(e.options.fullWidth?v:x,Y),D-=t.height):(t=e.update(k,L),x-=t.width),w.push({horizontal:n,minSize:t,box:e})}function i(e){var n=t.findNextWhere(w,function(t){return t.box===e});if(n)if(e.isHorizontal()){var a={left:T,right:S,top:0,bottom:0};e.update(e.options.fullWidth?v:x,M/2,a)}else e.update(n.minSize.width,D)}function o(e){var n=t.findNextWhere(w,function(t){return t.box===e}),a={left:0,right:0,top:j,bottom:A};n&&e.update(n.minSize.width,D,a)}function s(e){e.isHorizontal()?(e.left=e.options.fullWidth?l:T,e.right=e.options.fullWidth?n-c:T+x,e.top=O,e.bottom=O+e.height,O=e.bottom):(e.left=C,e.right=C+e.width,e.top=j,e.bottom=j+D,C=e.right)}if(e){var d=e.options.layout,u=d?d.padding:null,l=0,c=0,h=0,_=0;isNaN(u)?(l=u.left||0,c=u.right||0,h=u.top||0,_=u.bottom||0):(l=u,c=u,h=u,_=u);var m=t.where(e.boxes,function(e){return"left"===e.options.position}),f=t.where(e.boxes,function(e){return"right"===e.options.position}),p=t.where(e.boxes,function(e){return"top"===e.options.position}),g=t.where(e.boxes,function(e){return"bottom"===e.options.position}),y=t.where(e.boxes,function(e){return"chartArea"===e.options.position});p.sort(function(e,t){return(t.options.fullWidth?1:0)-(e.options.fullWidth?1:0)}),g.sort(function(e,t){return(e.options.fullWidth?1:0)-(t.options.fullWidth?1:0)});var v=n-l-c,M=a-h-_,b=v/2,L=M/2,k=(n-b)/(m.length+f.length),Y=(a-L)/(p.length+g.length),x=v,D=M,w=[];t.each(m.concat(f,p,g),r);var T=l,S=c,j=h,A=_;t.each(m.concat(f),i),t.each(m,function(e){T+=e.width}),t.each(f,function(e){S+=e.width}),t.each(p.concat(g),i),t.each(p,function(e){j+=e.height}),t.each(g,function(e){A+=e.height}),t.each(m.concat(f),o),T=l,S=c,j=h,A=_,t.each(m,function(e){T+=e.width}),t.each(f,function(e){S+=e.width}),t.each(p,function(e){j+=e.height}),t.each(g,function(e){A+=e.height});var H=a-j-A,P=n-T-S;P===x&&H===D||(t.each(m,function(e){e.height=H}),t.each(f,function(e){e.height=H}),t.each(p,function(e){e.options.fullWidth||(e.width=P)}),t.each(g,function(e){e.options.fullWidth||(e.width=P)}),D=H,x=P);var C=l,O=h;t.each(m.concat(p),s),C+=x,O+=D,t.each(f,s),t.each(g,s),e.chartArea={left:T,top:j,right:T+x,bottom:j+D},t.each(y,function(t){t.left=e.chartArea.left,t.top=e.chartArea.top,t.right=e.chartArea.right,t.bottom=e.chartArea.bottom,t.update(x,D)})}}}}},function(e,t){"use strict";e.exports=function(e){function t(e,t){return e.usePointStyle?t*Math.SQRT2:e.boxWidth}var n=e.helpers,a=n.noop;e.defaults.global.legend={display:!0,position:"top",fullWidth:!0,reverse:!1,onClick:function(e,t){var n=t.datasetIndex,a=this.chart,r=a.getDatasetMeta(n);r.hidden=null===r.hidden?!a.data.datasets[n].hidden:null,a.update()},onHover:null,labels:{boxWidth:40,padding:10,generateLabels:function(e){var t=e.data;return n.isArray(t.datasets)?t.datasets.map(function(t,a){return{text:t.label,fillStyle:n.isArray(t.backgroundColor)?t.backgroundColor[0]:t.backgroundColor,hidden:!e.isDatasetVisible(a),lineCap:t.borderCapStyle,lineDash:t.borderDash,lineDashOffset:t.borderDashOffset,lineJoin:t.borderJoinStyle,lineWidth:t.borderWidth,strokeStyle:t.borderColor,pointStyle:t.pointStyle,datasetIndex:a}},this):[]}}},e.Legend=e.Element.extend({initialize:function(e){n.extend(this,e),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:a,update:function(e,t,n){var a=this;return a.beforeUpdate(),a.maxWidth=e,a.maxHeight=t,a.margins=n,a.beforeSetDimensions(),a.setDimensions(),a.afterSetDimensions(),a.beforeBuildLabels(),a.buildLabels(),a.afterBuildLabels(),a.beforeFit(),a.fit(),a.afterFit(),a.afterUpdate(),a.minSize},afterUpdate:a,beforeSetDimensions:a,setDimensions:function(){var e=this;e.isHorizontal()?(e.width=e.maxWidth,e.left=0,e.right=e.width):(e.height=e.maxHeight,e.top=0,e.bottom=e.height),e.paddingLeft=0,e.paddingTop=0,e.paddingRight=0,e.paddingBottom=0,e.minSize={width:0,height:0}},afterSetDimensions:a,beforeBuildLabels:a,buildLabels:function(){var e=this;e.legendItems=e.options.labels.generateLabels.call(e,e.chart),e.options.reverse&&e.legendItems.reverse()},afterBuildLabels:a,beforeFit:a,fit:function(){var a=this,r=a.options,i=r.labels,o=r.display,s=a.ctx,d=e.defaults.global,u=n.getValueOrDefault,l=u(i.fontSize,d.defaultFontSize),c=u(i.fontStyle,d.defaultFontStyle),h=u(i.fontFamily,d.defaultFontFamily),_=n.fontString(l,c,h),m=a.legendHitBoxes=[],f=a.minSize,p=a.isHorizontal();if(p?(f.width=a.maxWidth,f.height=o?10:0):(f.width=o?10:0,f.height=a.maxHeight),o)if(s.font=_,p){var g=a.lineWidths=[0],y=a.legendItems.length?l+i.padding:0;s.textAlign="left",s.textBaseline="top",n.each(a.legendItems,function(e,n){var r=t(i,l),o=r+l/2+s.measureText(e.text).width;g[g.length-1]+o+i.padding>=a.width&&(y+=l+i.padding,g[g.length]=a.left),m[n]={left:0,top:0,width:o,height:l},g[g.length-1]+=o+i.padding}),f.height+=y}else{var v=i.padding,M=a.columnWidths=[],b=i.padding,L=0,k=0,Y=l+v;n.each(a.legendItems,function(e,n){var a=t(i,l),r=a+l/2+s.measureText(e.text).width;k+Y>f.height&&(b+=L+i.padding,M.push(L),L=0,k=0),L=Math.max(L,r),k+=Y,m[n]={left:0,top:0,width:r,height:l}}),b+=L,M.push(L),f.width+=b}a.width=f.width,a.height=f.height},afterFit:a,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var a=this,r=a.options,i=r.labels,o=e.defaults.global,s=o.elements.line,d=a.width,u=a.lineWidths;if(r.display){var l,c=a.ctx,h=n.getValueOrDefault,_=h(i.fontColor,o.defaultFontColor),m=h(i.fontSize,o.defaultFontSize),f=h(i.fontStyle,o.defaultFontStyle),p=h(i.fontFamily,o.defaultFontFamily),g=n.fontString(m,f,p);c.textAlign="left",c.textBaseline="top",c.lineWidth=.5,c.strokeStyle=_,c.fillStyle=_,c.font=g;var y=t(i,m),v=a.legendHitBoxes,M=function(t,n,a){if(!(isNaN(y)||y<=0)){c.save(),c.fillStyle=h(a.fillStyle,o.defaultColor),c.lineCap=h(a.lineCap,s.borderCapStyle),c.lineDashOffset=h(a.lineDashOffset,s.borderDashOffset),c.lineJoin=h(a.lineJoin,s.borderJoinStyle),c.lineWidth=h(a.lineWidth,s.borderWidth),c.strokeStyle=h(a.strokeStyle,o.defaultColor);var i=0===h(a.lineWidth,s.borderWidth);if(c.setLineDash&&c.setLineDash(h(a.lineDash,s.borderDash)),r.labels&&r.labels.usePointStyle){var d=m*Math.SQRT2/2,u=d/Math.SQRT2,l=t+u,_=n+u;e.canvasHelpers.drawPoint(c,a.pointStyle,d,l,_)}else i||c.strokeRect(t,n,y,m),c.fillRect(t,n,y,m);c.restore()}},b=function(e,t,n,a){c.fillText(n.text,y+m/2+e,t),n.hidden&&(c.beginPath(),c.lineWidth=2,c.moveTo(y+m/2+e,t+m/2),c.lineTo(y+m/2+e+a,t+m/2),c.stroke())},L=a.isHorizontal();l=L?{x:a.left+(d-u[0])/2,y:a.top+i.padding,line:0}:{x:a.left+i.padding,y:a.top+i.padding,line:0};var k=m+i.padding;n.each(a.legendItems,function(e,t){var n=c.measureText(e.text).width,r=y+m/2+n,o=l.x,s=l.y;L?o+r>=d&&(s=l.y+=k,l.line++,o=l.x=a.left+(d-u[l.line])/2):s+k>a.bottom&&(o=l.x=o+a.columnWidths[l.line]+i.padding,s=l.y=a.top,l.line++),M(o,s,e),v[t].left=o,v[t].top=s,b(o,s,e,n),L?l.x+=r+i.padding:l.y+=k})}},handleEvent:function(e){var t=this,a=t.options,r="mouseup"===e.type?"click":e.type,i=!1;if("mousemove"===r){if(!a.onHover)return}else{if("click"!==r)return;if(!a.onClick)return}var o=n.getRelativePosition(e,t.chart.chart),s=o.x,d=o.y;if(s>=t.left&&s<=t.right&&d>=t.top&&d<=t.bottom)for(var u=t.legendHitBoxes,l=0;l<u.length;++l){var c=u[l];if(s>=c.left&&s<=c.left+c.width&&d>=c.top&&d<=c.top+c.height){if("click"===r){a.onClick.call(t,e,t.legendItems[l]),i=!0;break}if("mousemove"===r){a.onHover.call(t,e,t.legendItems[l]),i=!0;break}}}return i}}),e.plugins.register({beforeInit:function(t){var n=t.options,a=n.legend;a&&(t.legend=new e.Legend({ctx:t.chart.ctx,options:a,chart:t}),e.layoutService.addBox(t,t.legend))}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers.noop;e.plugins={_plugins:[],register:function(e){var t=this._plugins;[].concat(e).forEach(function(e){t.indexOf(e)===-1&&t.push(e)})},unregister:function(e){var t=this._plugins;[].concat(e).forEach(function(e){var n=t.indexOf(e);n!==-1&&t.splice(n,1)})},clear:function(){this._plugins=[]},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(e,t){var n,a,r=this._plugins,i=r.length;for(n=0;n<i;++n)if(a=r[n],"function"==typeof a[e]&&a[e].apply(a,t||[])===!1)return!1;return!0}},e.PluginBase=e.Element.extend({beforeInit:t,afterInit:t,beforeUpdate:t,afterUpdate:t,beforeDraw:t,afterDraw:t,destroy:t}),e.pluginService=e.plugins}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.scale={display:!0,position:"left",gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",offsetGridLines:!1,borderDash:[],borderDashOffset:0},scaleLabel:{labelString:"",display:!1},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:10,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:e.Ticks.formatters.values}},e.Scale=e.Element.extend({beforeUpdate:function(){t.callCallback(this.options.beforeUpdate,[this])},update:function(e,n,a){var r=this;return r.beforeUpdate(),r.maxWidth=e,r.maxHeight=n,r.margins=t.extend({left:0,right:0,top:0,bottom:0},a),r.beforeSetDimensions(),r.setDimensions(),r.afterSetDimensions(),r.beforeDataLimits(),r.determineDataLimits(),r.afterDataLimits(),r.beforeBuildTicks(),r.buildTicks(),r.afterBuildTicks(),r.beforeTickToLabelConversion(),r.convertTicksToLabels(),r.afterTickToLabelConversion(),r.beforeCalculateTickRotation(),r.calculateTickRotation(),r.afterCalculateTickRotation(),r.beforeFit(),r.fit(),r.afterFit(),r.afterUpdate(),r.minSize},afterUpdate:function(){t.callCallback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){t.callCallback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var e=this;e.isHorizontal()?(e.width=e.maxWidth,e.left=0,e.right=e.width):(e.height=e.maxHeight,e.top=0,e.bottom=e.height),e.paddingLeft=0,e.paddingTop=0,e.paddingRight=0,e.paddingBottom=0},afterSetDimensions:function(){t.callCallback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){t.callCallback(this.options.beforeDataLimits,[this])},determineDataLimits:t.noop,afterDataLimits:function(){t.callCallback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){t.callCallback(this.options.beforeBuildTicks,[this])},buildTicks:t.noop,afterBuildTicks:function(){t.callCallback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){t.callCallback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var e=this,t=e.options.ticks;e.ticks=e.ticks.map(t.userCallback||t.callback)},afterTickToLabelConversion:function(){t.callCallback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){t.callCallback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var n=this,a=n.ctx,r=e.defaults.global,i=n.options.ticks,o=t.getValueOrDefault(i.fontSize,r.defaultFontSize),s=t.getValueOrDefault(i.fontStyle,r.defaultFontStyle),d=t.getValueOrDefault(i.fontFamily,r.defaultFontFamily),u=t.fontString(o,s,d);a.font=u;var l,c=a.measureText(n.ticks[0]).width,h=a.measureText(n.ticks[n.ticks.length-1]).width;if(n.labelRotation=i.minRotation||0,n.paddingRight=0,n.paddingLeft=0,n.options.display&&n.isHorizontal()){n.paddingRight=h/2+3,n.paddingLeft=c/2+3,n.longestTextCache||(n.longestTextCache={});for(var _,m,f=t.longestText(a,u,n.ticks,n.longestTextCache),p=f,g=n.getPixelForTick(1)-n.getPixelForTick(0)-6;p>g&&n.labelRotation<i.maxRotation;){if(_=Math.cos(t.toRadians(n.labelRotation)),m=Math.sin(t.toRadians(n.labelRotation)),l=_*c,l+o/2>n.yLabelWidth&&(n.paddingLeft=l+o/2),n.paddingRight=o/2,m*f>n.maxHeight){n.labelRotation--;break}n.labelRotation++,p=_*f}}n.margins&&(n.paddingLeft=Math.max(n.paddingLeft-n.margins.left,0),n.paddingRight=Math.max(n.paddingRight-n.margins.right,0))},afterCalculateTickRotation:function(){t.callCallback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){t.callCallback(this.options.beforeFit,[this])},fit:function(){var n=this,a=n.minSize={width:0,height:0},r=n.options,i=e.defaults.global,o=r.ticks,s=r.scaleLabel,d=r.gridLines,u=r.display,l=n.isHorizontal(),c=t.getValueOrDefault(o.fontSize,i.defaultFontSize),h=t.getValueOrDefault(o.fontStyle,i.defaultFontStyle),_=t.getValueOrDefault(o.fontFamily,i.defaultFontFamily),m=t.fontString(c,h,_),f=t.getValueOrDefault(s.fontSize,i.defaultFontSize),p=r.gridLines.tickMarkLength;if(l?a.width=n.isFullWidth()?n.maxWidth-n.margins.left-n.margins.right:n.maxWidth:a.width=u&&d.drawTicks?p:0,l?a.height=u&&d.drawTicks?p:0:a.height=n.maxHeight,s.display&&u&&(l?a.height+=1.5*f:a.width+=1.5*f),o.display&&u){n.longestTextCache||(n.longestTextCache={});var g=t.longestText(n.ctx,m,n.ticks,n.longestTextCache),y=t.numberOfLabelLines(n.ticks),v=.5*c;if(l){n.longestLabelWidth=g;var M=Math.sin(t.toRadians(n.labelRotation))*n.longestLabelWidth+c*y+v*y;a.height=Math.min(n.maxHeight,a.height+M),n.ctx.font=m;var b=n.ctx.measureText(n.ticks[0]).width,L=n.ctx.measureText(n.ticks[n.ticks.length-1]).width,k=Math.cos(t.toRadians(n.labelRotation)),Y=Math.sin(t.toRadians(n.labelRotation));n.paddingLeft=0!==n.labelRotation?k*b+3:b/2+3,n.paddingRight=0!==n.labelRotation?Y*(c/2)+3:L/2+3}else{var x=n.maxWidth-a.width,D=o.mirror;D?g=0:g+=n.options.ticks.padding,g<x?a.width+=g:a.width=n.maxWidth,n.paddingTop=c/2,n.paddingBottom=c/2}}n.margins&&(n.paddingLeft=Math.max(n.paddingLeft-n.margins.left,0),n.paddingTop=Math.max(n.paddingTop-n.margins.top,0),n.paddingRight=Math.max(n.paddingRight-n.margins.right,0),n.paddingBottom=Math.max(n.paddingBottom-n.margins.bottom,0)),n.width=a.width,n.height=a.height},afterFit:function(){t.callCallback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function(e){return null===e||"undefined"==typeof e?NaN:"number"!=typeof e||isFinite(e)?"object"==typeof e?e instanceof Date||e.isValid?e:this.getRightValue(this.isHorizontal()?e.x:e.y):e:NaN},getLabelForIndex:t.noop,getPixelForValue:t.noop,getValueForPixel:t.noop,getPixelForTick:function(e,t){var n=this;if(n.isHorizontal()){var a=n.width-(n.paddingLeft+n.paddingRight),r=a/Math.max(n.ticks.length-(n.options.gridLines.offsetGridLines?0:1),1),i=r*e+n.paddingLeft;t&&(i+=r/2);var o=n.left+Math.round(i);return o+=n.isFullWidth()?n.margins.left:0}var s=n.height-(n.paddingTop+n.paddingBottom);return n.top+e*(s/(n.ticks.length-1))},getPixelForDecimal:function(e){var t=this;if(t.isHorizontal()){var n=t.width-(t.paddingLeft+t.paddingRight),a=n*e+t.paddingLeft,r=t.left+Math.round(a);return r+=t.isFullWidth()?t.margins.left:0}return t.top+e*t.height},getBasePixel:function(){var e=this,t=e.min,n=e.max;return e.getPixelForValue(e.beginAtZero?0:t<0&&n<0?n:t>0&&n>0?t:0)},draw:function(n){var a=this,r=a.options;if(r.display){var i,o,s=a.ctx,d=e.defaults.global,u=r.ticks,l=r.gridLines,c=r.scaleLabel,h=0!==a.labelRotation,_=u.autoSkip,m=a.isHorizontal();u.maxTicksLimit&&(o=u.maxTicksLimit);var f=t.getValueOrDefault(u.fontColor,d.defaultFontColor),p=t.getValueOrDefault(u.fontSize,d.defaultFontSize),g=t.getValueOrDefault(u.fontStyle,d.defaultFontStyle),y=t.getValueOrDefault(u.fontFamily,d.defaultFontFamily),v=t.fontString(p,g,y),M=l.tickMarkLength,b=t.getValueOrDefault(l.borderDash,d.borderDash),L=t.getValueOrDefault(l.borderDashOffset,d.borderDashOffset),k=t.getValueOrDefault(c.fontColor,d.defaultFontColor),Y=t.getValueOrDefault(c.fontSize,d.defaultFontSize),x=t.getValueOrDefault(c.fontStyle,d.defaultFontStyle),D=t.getValueOrDefault(c.fontFamily,d.defaultFontFamily),w=t.fontString(Y,x,D),T=t.toRadians(a.labelRotation),S=Math.cos(T),j=a.longestLabelWidth*S;s.fillStyle=f;var A=[];if(m){if(i=!1,h&&(j/=2),(j+u.autoSkipPadding)*a.ticks.length>a.width-(a.paddingLeft+a.paddingRight)&&(i=1+Math.floor((j+u.autoSkipPadding)*a.ticks.length/(a.width-(a.paddingLeft+a.paddingRight)))),o&&a.ticks.length>o)for(;!i||a.ticks.length/(i||1)>o;)i||(i=1),i+=1;_||(i=!1)}var H="right"===r.position?a.left:a.right-M,P="right"===r.position?a.left+M:a.right,C="bottom"===r.position?a.top:a.bottom-M,O="bottom"===r.position?a.top+M:a.bottom;if(t.each(a.ticks,function(e,o){if(void 0!==e&&null!==e){var s=a.ticks.length===o+1,d=i>1&&o%i>0||o%i===0&&o+i>=a.ticks.length;if((!d||s)&&void 0!==e&&null!==e){var c,_;o===("undefined"!=typeof a.zeroLineIndex?a.zeroLineIndex:0)?(c=l.zeroLineWidth,_=l.zeroLineColor):(c=t.getValueAtIndexOrDefault(l.lineWidth,o),_=t.getValueAtIndexOrDefault(l.color,o));var f,p,g,y,v,k,Y,x,D,w,S="middle",j="middle";if(m){h||(j="top"===r.position?"bottom":"top"),S=h?"right":"center";var F=a.getPixelForTick(o)+t.aliasPixel(c);D=a.getPixelForTick(o,l.offsetGridLines)+u.labelOffset,w=h?a.top+12:"top"===r.position?a.bottom-M:a.top+M,f=g=v=Y=F,p=C,y=O,k=n.top,x=n.bottom}else{"left"===r.position?u.mirror?(D=a.right+u.padding,S="left"):(D=a.right-u.padding,S="right"):u.mirror?(D=a.left-u.padding,S="right"):(D=a.left+u.padding,S="left");var W=a.getPixelForTick(o);W+=t.aliasPixel(c),w=a.getPixelForTick(o,l.offsetGridLines),f=H,g=P,v=n.left,Y=n.right,p=y=k=x=W}A.push({tx1:f,ty1:p,tx2:g,ty2:y,x1:v,y1:k,x2:Y,y2:x,labelX:D,labelY:w,glWidth:c,glColor:_,glBorderDash:b,glBorderDashOffset:L,rotation:-1*T,label:e,textBaseline:j,textAlign:S})}}}),t.each(A,function(e){if(l.display&&(s.save(),s.lineWidth=e.glWidth,s.strokeStyle=e.glColor,s.setLineDash&&(s.setLineDash(e.glBorderDash),s.lineDashOffset=e.glBorderDashOffset),s.beginPath(),l.drawTicks&&(s.moveTo(e.tx1,e.ty1),s.lineTo(e.tx2,e.ty2)),l.drawOnChartArea&&(s.moveTo(e.x1,e.y1),s.lineTo(e.x2,e.y2)),s.stroke(),s.restore()),u.display){s.save(),s.translate(e.labelX,e.labelY),s.rotate(e.rotation),s.font=v,s.textBaseline=e.textBaseline,s.textAlign=e.textAlign;var n=e.label;if(t.isArray(n))for(var a=0,r=-(n.length-1)*p*.75;a<n.length;++a)s.fillText(""+n[a],0,r),r+=1.5*p;else s.fillText(n,0,0);s.restore()}}),c.display){var F,W,E=0;if(m)F=a.left+(a.right-a.left)/2,W="bottom"===r.position?a.bottom-Y/2:a.top+Y/2;else{var I="left"===r.position;F=I?a.left+Y/2:a.right-Y/2,W=a.top+(a.bottom-a.top)/2,E=I?-.5*Math.PI:.5*Math.PI}s.save(),s.translate(F,W),s.rotate(E),s.textAlign="center",s.textBaseline="middle",s.fillStyle=k,s.font=w,s.fillText(c.labelString,0,0),s.restore()}if(l.drawBorder){s.lineWidth=t.getValueAtIndexOrDefault(l.lineWidth,0),s.strokeStyle=t.getValueAtIndexOrDefault(l.color,0);var R=a.left,z=a.right,N=a.top,V=a.bottom,B=t.aliasPixel(s.lineWidth);m?(N=V="top"===r.position?a.bottom:a.top,N+=B,V+=B):(R=z="left"===r.position?a.right:a.left,R+=B,z+=B),s.beginPath(),s.moveTo(R,N),s.lineTo(z,V),s.stroke()}}}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.scaleService={constructors:{},defaults:{},registerScaleType:function(e,n,a){this.constructors[e]=n,this.defaults[e]=t.clone(a)},getScaleConstructor:function(e){return this.constructors.hasOwnProperty(e)?this.constructors[e]:void 0},getScaleDefaults:function(n){return this.defaults.hasOwnProperty(n)?t.scaleMerge(e.defaults.scale,this.defaults[n]):{}},updateScaleDefaults:function(e,n){var a=this.defaults;a.hasOwnProperty(e)&&(a[e]=t.extend(a[e],n))},addScalesToLayout:function(n){t.each(n.scales,function(t){e.layoutService.addBox(n,t)})}}}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.Ticks={generators:{linear:function(e,n){var a,r=[];if(e.stepSize&&e.stepSize>0)a=e.stepSize;else{var i=t.niceNum(n.max-n.min,!1);a=t.niceNum(i/(e.maxTicks-1),!0)}var o=Math.floor(n.min/a)*a,s=Math.ceil(n.max/a)*a;if(e.min&&e.max&&e.stepSize){var d=(e.max-e.min)%e.stepSize===0;d&&(o=e.min,s=e.max)}var u=(s-o)/a;u=t.almostEquals(u,Math.round(u),a/1e3)?Math.round(u):Math.ceil(u),r.push(void 0!==e.min?e.min:o);for(var l=1;l<u;++l)r.push(o+l*a);return r.push(void 0!==e.max?e.max:s),r},logarithmic:function(e,n){for(var a=[],r=t.getValueOrDefault,i=r(e.min,Math.pow(10,Math.floor(t.log10(n.min))));i<n.max;){a.push(i);var o,s;0===i?(o=Math.floor(t.log10(n.minNotZero)),s=Math.round(n.minNotZero/Math.pow(10,o))):(o=Math.floor(t.log10(i)),s=Math.floor(i/Math.pow(10,o))+1),10===s&&(s=1,++o),i=s*Math.pow(10,o)}var d=r(e.max,i);return a.push(d),a}},formatters:{values:function(e){return t.isArray(e)?e:""+e},linear:function(e,n,a){var r=a.length>3?a[2]-a[1]:a[1]-a[0];Math.abs(r)>1&&e!==Math.floor(e)&&(r=e-Math.floor(e));var i=t.log10(Math.abs(r)),o="";if(0!==e){var s=-1*Math.floor(i);s=Math.max(Math.min(s,20),0),o=e.toFixed(s)}else o="0";return o},logarithmic:function(e,n,a){var r=e/Math.pow(10,Math.floor(t.log10(e)));return 0===e?"0":1===r||2===r||5===r||0===n||n===a.length-1?e.toExponential():"";
	}}}}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.global.title={display:!1,position:"top",fullWidth:!0,fontStyle:"bold",padding:10,text:""};var n=t.noop;e.Title=e.Element.extend({initialize:function(n){var a=this;t.extend(a,n),a.options=t.configMerge(e.defaults.global.title,n.options),a.legendHitBoxes=[]},beforeUpdate:function(){var n=this.chart.options;n&&n.title&&(this.options=t.configMerge(e.defaults.global.title,n.title))},update:function(e,t,n){var a=this;return a.beforeUpdate(),a.maxWidth=e,a.maxHeight=t,a.margins=n,a.beforeSetDimensions(),a.setDimensions(),a.afterSetDimensions(),a.beforeBuildLabels(),a.buildLabels(),a.afterBuildLabels(),a.beforeFit(),a.fit(),a.afterFit(),a.afterUpdate(),a.minSize},afterUpdate:n,beforeSetDimensions:n,setDimensions:function(){var e=this;e.isHorizontal()?(e.width=e.maxWidth,e.left=0,e.right=e.width):(e.height=e.maxHeight,e.top=0,e.bottom=e.height),e.paddingLeft=0,e.paddingTop=0,e.paddingRight=0,e.paddingBottom=0,e.minSize={width:0,height:0}},afterSetDimensions:n,beforeBuildLabels:n,buildLabels:n,afterBuildLabels:n,beforeFit:n,fit:function(){var n=this,a=t.getValueOrDefault,r=n.options,i=e.defaults.global,o=r.display,s=a(r.fontSize,i.defaultFontSize),d=n.minSize;n.isHorizontal()?(d.width=n.maxWidth,d.height=o?s+2*r.padding:0):(d.width=o?s+2*r.padding:0,d.height=n.maxHeight),n.width=d.width,n.height=d.height},afterFit:n,isHorizontal:function(){var e=this.options.position;return"top"===e||"bottom"===e},draw:function(){var n=this,a=n.ctx,r=t.getValueOrDefault,i=n.options,o=e.defaults.global;if(i.display){var s,d,u,l=r(i.fontSize,o.defaultFontSize),c=r(i.fontStyle,o.defaultFontStyle),h=r(i.fontFamily,o.defaultFontFamily),_=t.fontString(l,c,h),m=0,f=n.top,p=n.left,g=n.bottom,y=n.right;a.fillStyle=r(i.fontColor,o.defaultFontColor),a.font=_,n.isHorizontal()?(s=p+(y-p)/2,d=f+(g-f)/2,u=y-p):(s="left"===i.position?p+l/2:y-l/2,d=f+(g-f)/2,u=g-f,m=Math.PI*("left"===i.position?-.5:.5)),a.save(),a.translate(s,d),a.rotate(m),a.textAlign="center",a.textBaseline="middle",a.fillText(i.text,0,0,u),a.restore()}}}),e.plugins.register({beforeInit:function(t){var n=t.options,a=n.title;a&&(t.titleBlock=new e.Title({ctx:t.chart.ctx,options:a,chart:t}),e.layoutService.addBox(t,t.titleBlock))}})}},function(e,t){"use strict";e.exports=function(e){function t(e,t){var n=d.color(e);return n.alpha(t*n.alpha()).rgbaString()}function n(e,t){return t&&(d.isArray(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function a(e){var t=e._xScale,n=e._yScale||e._scale,a=e._index,r=e._datasetIndex;return{xLabel:t?t.getLabelForIndex(a,r):"",yLabel:n?n.getLabelForIndex(a,r):"",index:a,datasetIndex:r,x:e._model.x,y:e._model.y}}function r(t){var n=e.defaults.global,a=d.getValueOrDefault;return{xPadding:t.xPadding,yPadding:t.yPadding,xAlign:t.xAlign,yAlign:t.yAlign,bodyFontColor:t.bodyFontColor,_bodyFontFamily:a(t.bodyFontFamily,n.defaultFontFamily),_bodyFontStyle:a(t.bodyFontStyle,n.defaultFontStyle),_bodyAlign:t.bodyAlign,bodyFontSize:a(t.bodyFontSize,n.defaultFontSize),bodySpacing:t.bodySpacing,titleFontColor:t.titleFontColor,_titleFontFamily:a(t.titleFontFamily,n.defaultFontFamily),_titleFontStyle:a(t.titleFontStyle,n.defaultFontStyle),titleFontSize:a(t.titleFontSize,n.defaultFontSize),_titleAlign:t.titleAlign,titleSpacing:t.titleSpacing,titleMarginBottom:t.titleMarginBottom,footerFontColor:t.footerFontColor,_footerFontFamily:a(t.footerFontFamily,n.defaultFontFamily),_footerFontStyle:a(t.footerFontStyle,n.defaultFontStyle),footerFontSize:a(t.footerFontSize,n.defaultFontSize),_footerAlign:t.footerAlign,footerSpacing:t.footerSpacing,footerMarginTop:t.footerMarginTop,caretSize:t.caretSize,cornerRadius:t.cornerRadius,backgroundColor:t.backgroundColor,opacity:0,legendColorBackground:t.multiKeyBackground,displayColors:t.displayColors}}function i(e,t){var n=e._chart.ctx,a=2*t.yPadding,r=0,i=t.body,o=i.reduce(function(e,t){return e+t.before.length+t.lines.length+t.after.length},0);o+=t.beforeBody.length+t.afterBody.length;var s=t.title.length,u=t.footer.length,l=t.titleFontSize,c=t.bodyFontSize,h=t.footerFontSize;a+=s*l,a+=s?(s-1)*t.titleSpacing:0,a+=s?t.titleMarginBottom:0,a+=o*c,a+=o?(o-1)*t.bodySpacing:0,a+=u?t.footerMarginTop:0,a+=u*h,a+=u?(u-1)*t.footerSpacing:0;var _=0,m=function(e){r=Math.max(r,n.measureText(e).width+_)};return n.font=d.fontString(l,t._titleFontStyle,t._titleFontFamily),d.each(t.title,m),n.font=d.fontString(c,t._bodyFontStyle,t._bodyFontFamily),d.each(t.beforeBody.concat(t.afterBody),m),_=t.displayColors?c+2:0,d.each(i,function(e){d.each(e.before,m),d.each(e.lines,m),d.each(e.after,m)}),_=0,n.font=d.fontString(h,t._footerFontStyle,t._footerFontFamily),d.each(t.footer,m),r+=2*t.xPadding,{width:r,height:a}}function o(e,t){var n=e._model,a=e._chart,r=e._chartInstance.chartArea,i="center",o="center";n.y<t.height?o="top":n.y>a.height-t.height&&(o="bottom");var s,d,u,l,c,h=(r.left+r.right)/2,_=(r.top+r.bottom)/2;"center"===o?(s=function(e){return e<=h},d=function(e){return e>h}):(s=function(e){return e<=t.width/2},d=function(e){return e>=a.width-t.width/2}),u=function(e){return e+t.width>a.width},l=function(e){return e-t.width<0},c=function(e){return e<=_?"top":"bottom"},s(n.x)?(i="left",u(n.x)&&(i="center",o=c(n.y))):d(n.x)&&(i="right",l(n.x)&&(i="center",o=c(n.y)));var m=e._options;return{xAlign:m.xAlign?m.xAlign:i,yAlign:m.yAlign?m.yAlign:o}}function s(e,t,n){var a=e.x,r=e.y,i=e.caretSize,o=e.caretPadding,s=e.cornerRadius,d=n.xAlign,u=n.yAlign,l=i+o,c=s+o;return"right"===d?a-=t.width:"center"===d&&(a-=t.width/2),"top"===u?r+=l:r-="bottom"===u?t.height+l:t.height/2,"center"===u?"left"===d?a+=l:"right"===d&&(a-=l):"left"===d?a-=c:"right"===d&&(a+=c),{x:a,y:r}}var d=e.helpers;e.defaults.global.tooltips={enabled:!0,custom:null,mode:"nearest",position:"average",intersect:!0,backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",displayColors:!0,callbacks:{beforeTitle:d.noop,title:function(e,t){var n="",a=t.labels,r=a?a.length:0;if(e.length>0){var i=e[0];i.xLabel?n=i.xLabel:r>0&&i.index<r&&(n=a[i.index])}return n},afterTitle:d.noop,beforeBody:d.noop,beforeLabel:d.noop,label:function(e,t){var n=t.datasets[e.datasetIndex].label||"";return n+": "+e.yLabel},labelColor:function(e,t){var n=t.getDatasetMeta(e.datasetIndex),a=n.data[e.index],r=a._view;return{borderColor:r.borderColor,backgroundColor:r.backgroundColor}},afterLabel:d.noop,afterBody:d.noop,beforeFooter:d.noop,footer:d.noop,afterFooter:d.noop}},e.Tooltip=e.Element.extend({initialize:function(){this._model=r(this._options)},getTitle:function(){var e=this,t=e._options,a=t.callbacks,r=a.beforeTitle.apply(e,arguments),i=a.title.apply(e,arguments),o=a.afterTitle.apply(e,arguments),s=[];return s=n(s,r),s=n(s,i),s=n(s,o)},getBeforeBody:function(){var e=this._options.callbacks.beforeBody.apply(this,arguments);return d.isArray(e)?e:void 0!==e?[e]:[]},getBody:function(e,t){var a=this,r=a._options.callbacks,i=[];return d.each(e,function(e){var o={before:[],lines:[],after:[]};n(o.before,r.beforeLabel.call(a,e,t)),n(o.lines,r.label.call(a,e,t)),n(o.after,r.afterLabel.call(a,e,t)),i.push(o)}),i},getAfterBody:function(){var e=this._options.callbacks.afterBody.apply(this,arguments);return d.isArray(e)?e:void 0!==e?[e]:[]},getFooter:function(){var e=this,t=e._options.callbacks,a=t.beforeFooter.apply(e,arguments),r=t.footer.apply(e,arguments),i=t.afterFooter.apply(e,arguments),o=[];return o=n(o,a),o=n(o,r),o=n(o,i)},update:function(t){var n,u,l=this,c=l._options,h=l._model,_=l._model=r(c),m=l._active,f=l._data,p=l._chartInstance,g={xAlign:h.xAlign,yAlign:h.yAlign},y={x:h.x,y:h.y},v={width:h.width,height:h.height},M={x:h.caretX,y:h.caretY};if(m.length){_.opacity=1;var b=[];M=e.Tooltip.positioners[c.position](m,l._eventPosition);var L=[];for(n=0,u=m.length;n<u;++n)L.push(a(m[n]));c.filter&&(L=L.filter(function(e){return c.filter(e,f)})),c.itemSort&&(L=L.sort(function(e,t){return c.itemSort(e,t,f)})),d.each(L,function(e){b.push(c.callbacks.labelColor.call(l,e,p))}),_.title=l.getTitle(L,f),_.beforeBody=l.getBeforeBody(L,f),_.body=l.getBody(L,f),_.afterBody=l.getAfterBody(L,f),_.footer=l.getFooter(L,f),_.x=Math.round(M.x),_.y=Math.round(M.y),_.caretPadding=d.getValueOrDefault(M.padding,2),_.labelColors=b,_.dataPoints=L,v=i(this,_),g=o(this,v),y=s(_,v,g)}else _.opacity=0;return _.xAlign=g.xAlign,_.yAlign=g.yAlign,_.x=y.x,_.y=y.y,_.width=v.width,_.height=v.height,_.caretX=M.x,_.caretY=M.y,l._model=_,t&&c.custom&&c.custom.call(l,_),l},drawCaret:function(e,n,a){var r,i,o,s,d,u,l=this._view,c=this._chart.ctx,h=l.caretSize,_=l.cornerRadius,m=l.xAlign,f=l.yAlign,p=e.x,g=e.y,y=n.width,v=n.height;"center"===f?("left"===m?(r=p,i=r-h,o=r):(r=p+y,i=r+h,o=r),d=g+v/2,s=d-h,u=d+h):("left"===m?(r=p+_,i=r+h,o=i+h):"right"===m?(r=p+y-_,i=r-h,o=i-h):(i=p+y/2,r=i-h,o=i+h),"top"===f?(s=g,d=s-h,u=s):(s=g+v,d=s+h,u=s)),c.fillStyle=t(l.backgroundColor,a),c.beginPath(),c.moveTo(r,s),c.lineTo(i,d),c.lineTo(o,u),c.closePath(),c.fill()},drawTitle:function(e,n,a,r){var i=n.title;if(i.length){a.textAlign=n._titleAlign,a.textBaseline="top";var o=n.titleFontSize,s=n.titleSpacing;a.fillStyle=t(n.titleFontColor,r),a.font=d.fontString(o,n._titleFontStyle,n._titleFontFamily);var u,l;for(u=0,l=i.length;u<l;++u)a.fillText(i[u],e.x,e.y),e.y+=o+s,u+1===i.length&&(e.y+=n.titleMarginBottom-s)}},drawBody:function(e,n,a,r){var i=n.bodyFontSize,o=n.bodySpacing,s=n.body;a.textAlign=n._bodyAlign,a.textBaseline="top";var u=t(n.bodyFontColor,r);a.fillStyle=u,a.font=d.fontString(i,n._bodyFontStyle,n._bodyFontFamily);var l=0,c=function(t){a.fillText(t,e.x+l,e.y),e.y+=i+o};d.each(n.beforeBody,c);var h=n.displayColors;l=h?i+2:0,d.each(s,function(o,s){d.each(o.before,c),d.each(o.lines,function(o){h&&(a.fillStyle=t(n.legendColorBackground,r),a.fillRect(e.x,e.y,i,i),a.strokeStyle=t(n.labelColors[s].borderColor,r),a.strokeRect(e.x,e.y,i,i),a.fillStyle=t(n.labelColors[s].backgroundColor,r),a.fillRect(e.x+1,e.y+1,i-2,i-2),a.fillStyle=u),c(o)}),d.each(o.after,c)}),l=0,d.each(n.afterBody,c),e.y-=o},drawFooter:function(e,n,a,r){var i=n.footer;i.length&&(e.y+=n.footerMarginTop,a.textAlign=n._footerAlign,a.textBaseline="top",a.fillStyle=t(n.footerFontColor,r),a.font=d.fontString(n.footerFontSize,n._footerFontStyle,n._footerFontFamily),d.each(i,function(t){a.fillText(t,e.x,e.y),e.y+=n.footerFontSize+n.footerSpacing}))},drawBackground:function(e,n,a,r,i){a.fillStyle=t(n.backgroundColor,i),d.drawRoundedRectangle(a,e.x,e.y,r.width,r.height,n.cornerRadius),a.fill()},draw:function(){var e=this._chart.ctx,t=this._view;if(0!==t.opacity){var n={width:t.width,height:t.height},a={x:t.x,y:t.y},r=Math.abs(t.opacity<.001)?0:t.opacity;this._options.enabled&&(this.drawBackground(a,t,e,n,r),this.drawCaret(a,n,r),a.x+=t.xPadding,a.y+=t.yPadding,this.drawTitle(a,t,e,r),this.drawBody(a,t,e,r),this.drawFooter(a,t,e,r))}},handleEvent:function(e){var t=this,n=t._options,a=!1;if(t._lastActive=t._lastActive||[],"mouseout"===e.type?t._active=[]:t._active=t._chartInstance.getElementsAtEventForMode(e,n.mode,n),a=!d.arrayEquals(t._active,t._lastActive),t._lastActive=t._active,n.enabled||n.custom){t._eventPosition=d.getRelativePosition(e,t._chart);var r=t._model;t.update(!0),t.pivot(),a|=r.x!==t._model.x||r.y!==t._model.y}return a}}),e.Tooltip.positioners={average:function(e){if(!e.length)return!1;var t,n,a=0,r=0,i=0;for(t=0,n=e.length;t<n;++t){var o=e[t];if(o&&o.hasValue()){var s=o.tooltipPosition();a+=s.x,r+=s.y,++i}}return{x:Math.round(a/i),y:Math.round(r/i)}},nearest:function(e,t){var n,a,r,i=t.x,o=t.y,s=Number.POSITIVE_INFINITY;for(a=0,r=e.length;a<r;++a){var u=e[a];if(u&&u.hasValue()){var l=u.getCenterPoint(),c=d.distanceBetweenPoints(t,l);c<s&&(s=c,n=u)}}if(n){var h=n.tooltipPosition();i=h.x,o=h.y}return{x:i,y:o}}}}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n=e.defaults.global;n.elements.arc={backgroundColor:n.defaultColor,borderColor:"#fff",borderWidth:2},e.elements.Arc=e.Element.extend({inLabelRange:function(e){var t=this._view;return!!t&&Math.pow(e-t.x,2)<Math.pow(t.radius+t.hoverRadius,2)},inRange:function(e,n){var a=this._view;if(a){for(var r=t.getAngleFromPoint(a,{x:e,y:n}),i=r.angle,o=r.distance,s=a.startAngle,d=a.endAngle;d<s;)d+=2*Math.PI;for(;i>d;)i-=2*Math.PI;for(;i<s;)i+=2*Math.PI;var u=i>=s&&i<=d,l=o>=a.innerRadius&&o<=a.outerRadius;return u&&l}return!1},getCenterPoint:function(){var e=this._view,t=(e.startAngle+e.endAngle)/2,n=(e.innerRadius+e.outerRadius)/2;return{x:e.x+Math.cos(t)*n,y:e.y+Math.sin(t)*n}},getArea:function(){var e=this._view;return Math.PI*((e.endAngle-e.startAngle)/(2*Math.PI))*(Math.pow(e.outerRadius,2)-Math.pow(e.innerRadius,2))},tooltipPosition:function(){var e=this._view,t=e.startAngle+(e.endAngle-e.startAngle)/2,n=(e.outerRadius-e.innerRadius)/2+e.innerRadius;return{x:e.x+Math.cos(t)*n,y:e.y+Math.sin(t)*n}},draw:function(){var e=this._chart.ctx,t=this._view,n=t.startAngle,a=t.endAngle;e.beginPath(),e.arc(t.x,t.y,t.outerRadius,n,a),e.arc(t.x,t.y,t.innerRadius,a,n,!0),e.closePath(),e.strokeStyle=t.borderColor,e.lineWidth=t.borderWidth,e.fillStyle=t.backgroundColor,e.fill(),e.lineJoin="bevel",t.borderWidth&&e.stroke()}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n=e.defaults.global;e.defaults.global.elements.line={tension:.4,backgroundColor:n.defaultColor,borderWidth:3,borderColor:n.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",capBezierPoints:!0,fill:!0},e.elements.Line=e.Element.extend({draw:function(){function e(e,t){var n=t._view;t._view.steppedLine===!0?(d.lineTo(n.x,e._view.y),d.lineTo(n.x,n.y)):0===t._view.tension?d.lineTo(n.x,n.y):d.bezierCurveTo(e._view.controlPointNextX,e._view.controlPointNextY,n.controlPointPreviousX,n.controlPointPreviousY,n.x,n.y)}var a=this,r=a._view,i=r.spanGaps,o=r.scaleZero,s=a._loop;s||("top"===r.fill?o=r.scaleTop:"bottom"===r.fill&&(o=r.scaleBottom));var d=a._chart.ctx;d.save();var u=a._children.slice(),l=-1;s&&u.length&&u.push(u[0]);var c,h,_,m;if(u.length&&r.fill){for(d.beginPath(),c=0;c<u.length;++c)h=u[c],_=t.previousItem(u,c),m=h._view,0===c?(s?d.moveTo(o.x,o.y):d.moveTo(m.x,o),m.skip||(l=c,d.lineTo(m.x,m.y))):(_=l===-1?_:u[l],m.skip?i||l!==c-1||(s?d.lineTo(o.x,o.y):d.lineTo(_._view.x,o)):(l!==c-1?i&&l!==-1?e(_,h):s?d.lineTo(m.x,m.y):(d.lineTo(m.x,o),d.lineTo(m.x,m.y)):e(_,h),l=c));s||l===-1||d.lineTo(u[l]._view.x,o),d.fillStyle=r.backgroundColor||n.defaultColor,d.closePath(),d.fill()}var f=n.elements.line;for(d.lineCap=r.borderCapStyle||f.borderCapStyle,d.setLineDash&&d.setLineDash(r.borderDash||f.borderDash),d.lineDashOffset=r.borderDashOffset||f.borderDashOffset,d.lineJoin=r.borderJoinStyle||f.borderJoinStyle,d.lineWidth=r.borderWidth||f.borderWidth,d.strokeStyle=r.borderColor||n.defaultColor,d.beginPath(),l=-1,c=0;c<u.length;++c)h=u[c],_=t.previousItem(u,c),m=h._view,0===c?m.skip||(d.moveTo(m.x,m.y),l=c):(_=l===-1?_:u[l],m.skip||(l!==c-1&&!i||l===-1?d.moveTo(m.x,m.y):e(_,h),l=c));d.stroke(),d.restore()}})}},function(e,t){"use strict";e.exports=function(e){function t(e){var t=this._view;return!!t&&Math.pow(e-t.x,2)<Math.pow(t.radius+t.hitRadius,2)}function n(e){var t=this._view;return!!t&&Math.pow(e-t.y,2)<Math.pow(t.radius+t.hitRadius,2)}var a=e.helpers,r=e.defaults.global,i=r.defaultColor;r.elements.point={radius:3,pointStyle:"circle",backgroundColor:i,borderWidth:1,borderColor:i,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},e.elements.Point=e.Element.extend({inRange:function(e,t){var n=this._view;return!!n&&Math.pow(e-n.x,2)+Math.pow(t-n.y,2)<Math.pow(n.hitRadius+n.radius,2)},inLabelRange:t,inXRange:t,inYRange:n,getCenterPoint:function(){var e=this._view;return{x:e.x,y:e.y}},getArea:function(){return Math.PI*Math.pow(this._view.radius,2)},tooltipPosition:function(){var e=this._view;return{x:e.x,y:e.y,padding:e.radius+e.borderWidth}},draw:function(){var t=this._view,n=this._chart.ctx,o=t.pointStyle,s=t.radius,d=t.x,u=t.y;t.skip||(n.strokeStyle=t.borderColor||i,n.lineWidth=a.getValueOrDefault(t.borderWidth,r.elements.point.borderWidth),n.fillStyle=t.backgroundColor||i,e.canvasHelpers.drawPoint(n,o,s,d,u))}})}},function(e,t){"use strict";e.exports=function(e){function t(e){return void 0!==e._view.width}function n(e){var n,a,r,i,o=e._view;if(t(e)){var s=o.width/2;n=o.x-s,a=o.x+s,r=Math.min(o.y,o.base),i=Math.max(o.y,o.base)}else{var d=o.height/2;n=Math.min(o.x,o.base),a=Math.max(o.x,o.base),r=o.y-d,i=o.y+d}return{left:n,top:r,right:a,bottom:i}}var a=e.defaults.global;a.elements.rectangle={backgroundColor:a.defaultColor,borderWidth:0,borderColor:a.defaultColor,borderSkipped:"bottom"},e.elements.Rectangle=e.Element.extend({draw:function(){function e(e){return d[(l+e)%4]}var t=this._chart.ctx,n=this._view,a=n.width/2,r=n.x-a,i=n.x+a,o=n.base-(n.base-n.y),s=n.borderWidth/2;n.borderWidth&&(r+=s,i-=s,o+=s),t.beginPath(),t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,t.lineWidth=n.borderWidth;var d=[[r,n.base],[r,o],[i,o],[i,n.base]],u=["bottom","left","top","right"],l=u.indexOf(n.borderSkipped,0);l===-1&&(l=0);var c=e(0);t.moveTo(c[0],c[1]);for(var h=1;h<4;h++)c=e(h),t.lineTo(c[0],c[1]);t.fill(),n.borderWidth&&t.stroke()},height:function(){var e=this._view;return e.base-e.y},inRange:function(e,t){var a=!1;if(this._view){var r=n(this);a=e>=r.left&&e<=r.right&&t>=r.top&&t<=r.bottom}return a},inLabelRange:function(e,a){var r=this;if(!r._view)return!1;var i=!1,o=n(r);return i=t(r)?e>=o.left&&e<=o.right:a>=o.top&&a<=o.bottom},inXRange:function(e){var t=n(this);return e>=t.left&&e<=t.right},inYRange:function(e){var t=n(this);return e>=t.top&&e<=t.bottom},getCenterPoint:function(){var e,n,a=this._view;return t(this)?(e=a.x,n=(a.y+a.base)/2):(e=(a.x+a.base)/2,n=a.y),{x:e,y:n}},getArea:function(){var e=this._view;return e.width*Math.abs(e.y-e.base)},tooltipPosition:function(){var e=this._view;return{x:e.x,y:e.y}}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n={position:"bottom"},a=e.Scale.extend({getLabels:function(){var e=this.chart.data;return(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels},determineDataLimits:function(){var e=this,n=e.getLabels();e.minIndex=0,e.maxIndex=n.length-1;var a;void 0!==e.options.ticks.min&&(a=t.indexOf(n,e.options.ticks.min),e.minIndex=a!==-1?a:e.minIndex),void 0!==e.options.ticks.max&&(a=t.indexOf(n,e.options.ticks.max),e.maxIndex=a!==-1?a:e.maxIndex),e.min=n[e.minIndex],e.max=n[e.maxIndex]},buildTicks:function(){var e=this,t=e.getLabels();e.ticks=0===e.minIndex&&e.maxIndex===t.length-1?t:t.slice(e.minIndex,e.maxIndex+1)},getLabelForIndex:function(e,t){var n=this,a=n.chart.data,r=n.isHorizontal();return a.xLabels&&r||a.yLabels&&!r?n.getRightValue(a.datasets[t].data[e]):n.ticks[e]},getPixelForValue:function(e,t,n,a){var r=this,i=Math.max(r.maxIndex+1-r.minIndex-(r.options.gridLines.offsetGridLines?0:1),1);if(void 0!==e&&isNaN(t)){var o=r.getLabels(),s=o.indexOf(e);t=s!==-1?s:t}if(r.isHorizontal()){var d=r.width-(r.paddingLeft+r.paddingRight),u=d/i,l=u*(t-r.minIndex)+r.paddingLeft;return(r.options.gridLines.offsetGridLines&&a||r.maxIndex===r.minIndex&&a)&&(l+=u/2),r.left+Math.round(l)}var c=r.height-(r.paddingTop+r.paddingBottom),h=c/i,_=h*(t-r.minIndex)+r.paddingTop;return r.options.gridLines.offsetGridLines&&a&&(_+=h/2),r.top+Math.round(_)},getPixelForTick:function(e,t){return this.getPixelForValue(this.ticks[e],e+this.minIndex,null,t)},getValueForPixel:function(e){var t,n=this,a=Math.max(n.ticks.length-(n.options.gridLines.offsetGridLines?0:1),1),r=n.isHorizontal(),i=r?n.width-(n.paddingLeft+n.paddingRight):n.height-(n.paddingTop+n.paddingBottom),o=i/a;return e-=r?n.left:n.top,n.options.gridLines.offsetGridLines&&(e-=o/2),e-=r?n.paddingLeft:n.paddingTop,t=e<=0?0:Math.round(e/o)},getBasePixel:function(){return this.bottom}});e.scaleService.registerScaleType("category",a,n)}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n={position:"left",ticks:{callback:e.Ticks.formatters.linear}},a=e.LinearScaleBase.extend({determineDataLimits:function(){function e(e){return s?e.xAxisID===n.id:e.yAxisID===n.id}var n=this,a=n.options,r=n.chart,i=r.data,o=i.datasets,s=n.isHorizontal();if(n.min=null,n.max=null,a.stacked){var d={};t.each(o,function(i,o){var s=r.getDatasetMeta(o);void 0===d[s.type]&&(d[s.type]={positiveValues:[],negativeValues:[]});var u=d[s.type].positiveValues,l=d[s.type].negativeValues;r.isDatasetVisible(o)&&e(s)&&t.each(i.data,function(e,t){var r=+n.getRightValue(e);isNaN(r)||s.data[t].hidden||(u[t]=u[t]||0,l[t]=l[t]||0,a.relativePoints?u[t]=100:r<0?l[t]+=r:u[t]+=r)})}),t.each(d,function(e){var a=e.positiveValues.concat(e.negativeValues),r=t.min(a),i=t.max(a);n.min=null===n.min?r:Math.min(n.min,r),n.max=null===n.max?i:Math.max(n.max,i)})}else t.each(o,function(a,i){var o=r.getDatasetMeta(i);r.isDatasetVisible(i)&&e(o)&&t.each(a.data,function(e,t){var a=+n.getRightValue(e);isNaN(a)||o.data[t].hidden||(null===n.min?n.min=a:a<n.min&&(n.min=a),null===n.max?n.max=a:a>n.max&&(n.max=a))})});this.handleTickRangeOptions()},getTickLimit:function(){var n,a=this,r=a.options.ticks;if(a.isHorizontal())n=Math.min(r.maxTicksLimit?r.maxTicksLimit:11,Math.ceil(a.width/50));else{var i=t.getValueOrDefault(r.fontSize,e.defaults.global.defaultFontSize);n=Math.min(r.maxTicksLimit?r.maxTicksLimit:11,Math.ceil(a.height/(2*i)))}return n},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(e,t){return+this.getRightValue(this.chart.data.datasets[t].data[e])},getPixelForValue:function(e){var t,n,a=this,r=a.paddingLeft,i=a.paddingBottom,o=a.start,s=+a.getRightValue(e),d=a.end-o;return a.isHorizontal()?(n=a.width-(r+a.paddingRight),t=a.left+n/d*(s-o),Math.round(t+r)):(n=a.height-(a.paddingTop+i),t=a.bottom-i-n/d*(s-o),Math.round(t))},getValueForPixel:function(e){var t=this,n=t.isHorizontal(),a=t.paddingLeft,r=t.paddingBottom,i=n?t.width-(a+t.paddingRight):t.height-(t.paddingTop+r),o=(n?e-t.left-a:t.bottom-r-e)/i;return t.start+(t.end-t.start)*o},getPixelForTick:function(e){return this.getPixelForValue(this.ticksAsNumbers[e])}});e.scaleService.registerScaleType("linear",a,n)}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n=t.noop;e.LinearScaleBase=e.Scale.extend({handleTickRangeOptions:function(){var e=this,n=e.options,a=n.ticks;if(a.beginAtZero){var r=t.sign(e.min),i=t.sign(e.max);r<0&&i<0?e.max=0:r>0&&i>0&&(e.min=0)}void 0!==a.min?e.min=a.min:void 0!==a.suggestedMin&&(e.min=Math.min(e.min,a.suggestedMin)),void 0!==a.max?e.max=a.max:void 0!==a.suggestedMax&&(e.max=Math.max(e.max,a.suggestedMax)),e.min===e.max&&(e.max++,a.beginAtZero||e.min--)},getTickLimit:n,handleDirectionalChanges:n,buildTicks:function(){var n=this,a=n.options,r=a.ticks,i=n.getTickLimit();i=Math.max(2,i);var o={maxTicks:i,min:r.min,max:r.max,stepSize:t.getValueOrDefault(r.fixedStepSize,r.stepSize)},s=n.ticks=e.Ticks.generators.linear(o,n);n.handleDirectionalChanges(),n.max=t.max(s),n.min=t.min(s),r.reverse?(s.reverse(),n.start=n.max,n.end=n.min):(n.start=n.min,n.end=n.max)},convertTicksToLabels:function(){var t=this;t.ticksAsNumbers=t.ticks.slice(),t.zeroLineIndex=t.ticks.indexOf(0),e.Scale.prototype.convertTicksToLabels.call(t)}})}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n={position:"left",ticks:{callback:e.Ticks.formatters.logarithmic}},a=e.Scale.extend({determineDataLimits:function(){function e(e){return u?e.xAxisID===n.id:e.yAxisID===n.id}var n=this,a=n.options,r=a.ticks,i=n.chart,o=i.data,s=o.datasets,d=t.getValueOrDefault,u=n.isHorizontal();if(n.min=null,n.max=null,n.minNotZero=null,a.stacked){var l={};t.each(s,function(r,o){var s=i.getDatasetMeta(o);i.isDatasetVisible(o)&&e(s)&&(void 0===l[s.type]&&(l[s.type]=[]),t.each(r.data,function(e,t){var r=l[s.type],i=+n.getRightValue(e);isNaN(i)||s.data[t].hidden||(r[t]=r[t]||0,a.relativePoints?r[t]=100:r[t]+=i)}))}),t.each(l,function(e){var a=t.min(e),r=t.max(e);n.min=null===n.min?a:Math.min(n.min,a),n.max=null===n.max?r:Math.max(n.max,r)})}else t.each(s,function(a,r){var o=i.getDatasetMeta(r);i.isDatasetVisible(r)&&e(o)&&t.each(a.data,function(e,t){var a=+n.getRightValue(e);isNaN(a)||o.data[t].hidden||(null===n.min?n.min=a:a<n.min&&(n.min=a),null===n.max?n.max=a:a>n.max&&(n.max=a),0!==a&&(null===n.minNotZero||a<n.minNotZero)&&(n.minNotZero=a))})});n.min=d(r.min,n.min),n.max=d(r.max,n.max),n.min===n.max&&(0!==n.min&&null!==n.min?(n.min=Math.pow(10,Math.floor(t.log10(n.min))-1),n.max=Math.pow(10,Math.floor(t.log10(n.max))+1)):(n.min=1,n.max=10))},buildTicks:function(){var n=this,a=n.options,r=a.ticks,i={min:r.min,max:r.max},o=n.ticks=e.Ticks.generators.logarithmic(i,n);n.isHorizontal()||o.reverse(),n.max=t.max(o),n.min=t.min(o),r.reverse?(o.reverse(),n.start=n.max,n.end=n.min):(n.start=n.min,n.end=n.max)},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),e.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(e,t){return+this.getRightValue(this.chart.data.datasets[t].data[e])},getPixelForTick:function(e){return this.getPixelForValue(this.tickValues[e])},getPixelForValue:function(e){var n,a,r,i=this,o=i.start,s=+i.getRightValue(e),d=i.paddingTop,u=i.paddingBottom,l=i.paddingLeft,c=i.options,h=c.ticks;return i.isHorizontal()?(r=t.log10(i.end)-t.log10(o),0===s?a=i.left+l:(n=i.width-(l+i.paddingRight),a=i.left+n/r*(t.log10(s)-t.log10(o)),a+=l)):(n=i.height-(d+u),0!==o||h.reverse?0===i.end&&h.reverse?(r=t.log10(i.start)-t.log10(i.minNotZero),a=s===i.end?i.top+d:s===i.minNotZero?i.top+d+.02*n:i.top+d+.02*n+.98*n/r*(t.log10(s)-t.log10(i.minNotZero))):(r=t.log10(i.end)-t.log10(o),n=i.height-(d+u),a=i.bottom-u-n/r*(t.log10(s)-t.log10(o))):(r=t.log10(i.end)-t.log10(i.minNotZero),a=s===o?i.bottom-u:s===i.minNotZero?i.bottom-u-.02*n:i.bottom-u-.02*n-.98*n/r*(t.log10(s)-t.log10(i.minNotZero)))),a},getValueForPixel:function(e){var n,a,r=this,i=t.log10(r.end)-t.log10(r.start);return r.isHorizontal()?(a=r.width-(r.paddingLeft+r.paddingRight),n=r.start*Math.pow(10,(e-r.left-r.paddingLeft)*i/a)):(a=r.height-(r.paddingTop+r.paddingBottom),n=Math.pow(10,(r.bottom-r.paddingBottom-e)*i/a)/r.start),n}});e.scaleService.registerScaleType("logarithmic",a,n)}},function(e,t){"use strict";e.exports=function(e){var t=e.helpers,n=e.defaults.global,a={display:!0,animate:!0,lineArc:!1,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2,callback:e.Ticks.formatters.linear},pointLabels:{fontSize:10,callback:function(e){return e}}},r=e.LinearScaleBase.extend({getValueCount:function(){return this.chart.data.labels.length},setDimensions:function(){var e=this,a=e.options,r=a.ticks;e.width=e.maxWidth,e.height=e.maxHeight,e.xCenter=Math.round(e.width/2),e.yCenter=Math.round(e.height/2);var i=t.min([e.height,e.width]),o=t.getValueOrDefault(r.fontSize,n.defaultFontSize);e.drawingArea=a.display?i/2-(o/2+r.backdropPaddingY):i/2},determineDataLimits:function(){var e=this,n=e.chart;e.min=null,e.max=null,t.each(n.data.datasets,function(a,r){if(n.isDatasetVisible(r)){var i=n.getDatasetMeta(r);t.each(a.data,function(t,n){var a=+e.getRightValue(t);isNaN(a)||i.data[n].hidden||(null===e.min?e.min=a:a<e.min&&(e.min=a),null===e.max?e.max=a:a>e.max&&(e.max=a))})}}),e.handleTickRangeOptions()},getTickLimit:function(){var e=this.options.ticks,a=t.getValueOrDefault(e.fontSize,n.defaultFontSize);return Math.min(e.maxTicksLimit?e.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*a)))},convertTicksToLabels:function(){var t=this;e.LinearScaleBase.prototype.convertTicksToLabels.call(t),t.pointLabels=t.chart.data.labels.map(t.options.pointLabels.callback,t)},getLabelForIndex:function(e,t){return+this.getRightValue(this.chart.data.datasets[t].data[e])},fit:function(){var e,a,r,i,o,s,d,u,l,c,h,_,m=this.options.pointLabels,f=t.getValueOrDefault(m.fontSize,n.defaultFontSize),p=t.getValueOrDefault(m.fontStyle,n.defaultFontStyle),g=t.getValueOrDefault(m.fontFamily,n.defaultFontFamily),y=t.fontString(f,p,g),v=t.min([this.height/2-f-5,this.width/2]),M=this.width,b=0;for(this.ctx.font=y,a=0;a<this.getValueCount();a++){e=this.getPointPosition(a,v),r=this.ctx.measureText(this.pointLabels[a]?this.pointLabels[a]:"").width+5;var L=this.getIndexAngle(a)+Math.PI/2,k=360*L/(2*Math.PI)%360;0===k||180===k?(i=r/2,e.x+i>M&&(M=e.x+i,o=a),e.x-i<b&&(b=e.x-i,d=a)):k<180?e.x+r>M&&(M=e.x+r,o=a):e.x-r<b&&(b=e.x-r,d=a)}l=b,c=Math.ceil(M-this.width),s=this.getIndexAngle(o),u=this.getIndexAngle(d),h=c/Math.sin(s+Math.PI/2),_=l/Math.sin(u+Math.PI/2),h=t.isNumber(h)?h:0,_=t.isNumber(_)?_:0,this.drawingArea=Math.round(v-(_+h)/2),this.setCenterPoint(_,h)},setCenterPoint:function(e,t){var n=this,a=n.width-t-n.drawingArea,r=e+n.drawingArea;n.xCenter=Math.round((r+a)/2+n.left),n.yCenter=Math.round(n.height/2+n.top)},getIndexAngle:function(e){var t=2*Math.PI/this.getValueCount(),n=this.chart.options&&this.chart.options.startAngle?this.chart.options.startAngle:0,a=n*Math.PI*2/360;return e*t-Math.PI/2+a},getDistanceFromCenterForValue:function(e){var t=this;if(null===e)return 0;var n=t.drawingArea/(t.max-t.min);return t.options.reverse?(t.max-e)*n:(e-t.min)*n},getPointPosition:function(e,t){var n=this,a=n.getIndexAngle(e);return{x:Math.round(Math.cos(a)*t)+n.xCenter,y:Math.round(Math.sin(a)*t)+n.yCenter}},getPointPositionForValue:function(e,t){return this.getPointPosition(e,this.getDistanceFromCenterForValue(t))},getBasePosition:function(){var e=this,t=e.min,n=e.max;return e.getPointPositionForValue(0,e.beginAtZero?0:t<0&&n<0?n:t>0&&n>0?t:0)},draw:function(){var e=this,a=e.options,r=a.gridLines,i=a.ticks,o=a.angleLines,s=a.pointLabels,d=t.getValueOrDefault;if(a.display){var u=e.ctx,l=d(i.fontSize,n.defaultFontSize),c=d(i.fontStyle,n.defaultFontStyle),h=d(i.fontFamily,n.defaultFontFamily),_=t.fontString(l,c,h);if(t.each(e.ticks,function(o,s){if(s>0||a.reverse){var c=e.getDistanceFromCenterForValue(e.ticksAsNumbers[s]),h=e.yCenter-c;if(r.display&&0!==s)if(u.strokeStyle=t.getValueAtIndexOrDefault(r.color,s-1),u.lineWidth=t.getValueAtIndexOrDefault(r.lineWidth,s-1),a.lineArc)u.beginPath(),u.arc(e.xCenter,e.yCenter,c,0,2*Math.PI),u.closePath(),u.stroke();else{u.beginPath();for(var m=0;m<e.getValueCount();m++){var f=e.getPointPosition(m,c);0===m?u.moveTo(f.x,f.y):u.lineTo(f.x,f.y)}u.closePath(),u.stroke()}if(i.display){var p=d(i.fontColor,n.defaultFontColor);if(u.font=_,i.showLabelBackdrop){var g=u.measureText(o).width;u.fillStyle=i.backdropColor,u.fillRect(e.xCenter-g/2-i.backdropPaddingX,h-l/2-i.backdropPaddingY,g+2*i.backdropPaddingX,l+2*i.backdropPaddingY)}u.textAlign="center",u.textBaseline="middle",u.fillStyle=p,u.fillText(o,e.xCenter,h)}}}),!a.lineArc){u.lineWidth=o.lineWidth,u.strokeStyle=o.color;for(var m=e.getDistanceFromCenterForValue(a.reverse?e.min:e.max),f=d(s.fontSize,n.defaultFontSize),p=d(s.fontStyle,n.defaultFontStyle),g=d(s.fontFamily,n.defaultFontFamily),y=t.fontString(f,p,g),v=e.getValueCount()-1;v>=0;v--){if(o.display){var M=e.getPointPosition(v,m);u.beginPath(),u.moveTo(e.xCenter,e.yCenter),u.lineTo(M.x,M.y),u.stroke(),u.closePath()}var b=e.getPointPosition(v,m+5),L=d(s.fontColor,n.defaultFontColor);u.font=y,u.fillStyle=L;var k=e.pointLabels,Y=this.getIndexAngle(v)+Math.PI/2,x=360*Y/(2*Math.PI)%360;0===x||180===x?u.textAlign="center":x<180?u.textAlign="left":u.textAlign="right",90===x||270===x?u.textBaseline="middle":x>270||x<90?u.textBaseline="bottom":u.textBaseline="top",u.fillText(k[v]?k[v]:"",b.x,b.y)}}}}});e.scaleService.registerScaleType("radialLinear",r,a)}},function(e,t,n){"use strict";var a=n(1);a="function"==typeof a?a:window.moment,e.exports=function(e){var t=e.helpers,n={units:[{name:"millisecond",steps:[1,2,5,10,20,50,100,250,500]},{name:"second",steps:[1,2,5,10,30]},{name:"minute",steps:[1,2,5,10,30]
	},{name:"hour",steps:[1,2,3,6,12]},{name:"day",steps:[1,2,5]},{name:"week",maxStep:4},{name:"month",maxStep:3},{name:"quarter",maxStep:4},{name:"year",maxStep:!1}]},r={position:"bottom",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm:ss a",hour:"MMM D, hA",day:"ll",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1}},i=e.Scale.extend({initialize:function(){if(!a)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");e.Scale.prototype.initialize.call(this)},getLabelMoment:function(e,t){return null===e||null===t?null:"undefined"!=typeof this.labelMoments[e]?this.labelMoments[e][t]:null},getLabelDiff:function(e,t){var n=this;return null===e||null===t?null:(void 0===n.labelDiffs&&n.buildLabelDiffs(),"undefined"!=typeof n.labelDiffs[e]?n.labelDiffs[e][t]:null)},getMomentStartOf:function(e){var t=this;return"week"===t.options.time.unit&&t.options.time.isoWeekday!==!1?e.clone().startOf("isoWeek").isoWeekday(t.options.time.isoWeekday):e.clone().startOf(t.tickUnit)},determineDataLimits:function(){var e=this;e.labelMoments=[];var n=[];e.chart.data.labels&&e.chart.data.labels.length>0?(t.each(e.chart.data.labels,function(t){var a=e.parseTime(t);a.isValid()&&(e.options.time.round&&a.startOf(e.options.time.round),n.push(a))},e),e.firstTick=a.min.call(e,n),e.lastTick=a.max.call(e,n)):(e.firstTick=null,e.lastTick=null),t.each(e.chart.data.datasets,function(r,i){var o=[],s=e.chart.isDatasetVisible(i);"object"==typeof r.data[0]&&null!==r.data[0]?t.each(r.data,function(t){var n=e.parseTime(e.getRightValue(t));n.isValid()&&(e.options.time.round&&n.startOf(e.options.time.round),o.push(n),s&&(e.firstTick=null!==e.firstTick?a.min(e.firstTick,n):n,e.lastTick=null!==e.lastTick?a.max(e.lastTick,n):n))},e):o=n,e.labelMoments.push(o)},e),e.options.time.min&&(e.firstTick=e.parseTime(e.options.time.min)),e.options.time.max&&(e.lastTick=e.parseTime(e.options.time.max)),e.firstTick=(e.firstTick||a()).clone(),e.lastTick=(e.lastTick||a()).clone()},buildLabelDiffs:function(){var e=this;e.labelDiffs=[];var n=[];e.chart.data.labels&&e.chart.data.labels.length>0&&t.each(e.chart.data.labels,function(t){var a=e.parseTime(t);a.isValid()&&(e.options.time.round&&a.startOf(e.options.time.round),n.push(a.diff(e.firstTick,e.tickUnit,!0)))},e),t.each(e.chart.data.datasets,function(a){var r=[];"object"==typeof a.data[0]&&null!==a.data[0]?t.each(a.data,function(t){var n=e.parseTime(e.getRightValue(t));n.isValid()&&(e.options.time.round&&n.startOf(e.options.time.round),r.push(n.diff(e.firstTick,e.tickUnit,!0)))},e):r=n,e.labelDiffs.push(r)},e)},buildTicks:function(){var a=this;a.ctx.save();var r=t.getValueOrDefault(a.options.ticks.fontSize,e.defaults.global.defaultFontSize),i=t.getValueOrDefault(a.options.ticks.fontStyle,e.defaults.global.defaultFontStyle),o=t.getValueOrDefault(a.options.ticks.fontFamily,e.defaults.global.defaultFontFamily),s=t.fontString(r,i,o);if(a.ctx.font=s,a.ticks=[],a.unitScale=1,a.scaleSizeInUnits=0,a.options.time.unit)a.tickUnit=a.options.time.unit||"day",a.displayFormat=a.options.time.displayFormats[a.tickUnit],a.scaleSizeInUnits=a.lastTick.diff(a.firstTick,a.tickUnit,!0),a.unitScale=t.getValueOrDefault(a.options.time.unitStepSize,1);else{var d=a.isHorizontal()?a.width-(a.paddingLeft+a.paddingRight):a.height-(a.paddingTop+a.paddingBottom),u=a.tickFormatFunction(a.firstTick,0,[]),l=a.ctx.measureText(u).width,c=Math.cos(t.toRadians(a.options.ticks.maxRotation)),h=Math.sin(t.toRadians(a.options.ticks.maxRotation));l=l*c+r*h;var _=d/l;a.tickUnit=a.options.time.minUnit,a.scaleSizeInUnits=a.lastTick.diff(a.firstTick,a.tickUnit,!0),a.displayFormat=a.options.time.displayFormats[a.tickUnit];for(var m=0,f=n.units[m];m<n.units.length;){if(a.unitScale=1,t.isArray(f.steps)&&Math.ceil(a.scaleSizeInUnits/_)<t.max(f.steps)){for(var p=0;p<f.steps.length;++p)if(f.steps[p]>=Math.ceil(a.scaleSizeInUnits/_)){a.unitScale=t.getValueOrDefault(a.options.time.unitStepSize,f.steps[p]);break}break}if(f.maxStep===!1||Math.ceil(a.scaleSizeInUnits/_)<f.maxStep){a.unitScale=t.getValueOrDefault(a.options.time.unitStepSize,Math.ceil(a.scaleSizeInUnits/_));break}++m,f=n.units[m],a.tickUnit=f.name;var g=a.firstTick.diff(a.getMomentStartOf(a.firstTick),a.tickUnit,!0),y=a.getMomentStartOf(a.lastTick.clone().add(1,a.tickUnit)).diff(a.lastTick,a.tickUnit,!0);a.scaleSizeInUnits=a.lastTick.diff(a.firstTick,a.tickUnit,!0)+g+y,a.displayFormat=a.options.time.displayFormats[f.name]}}var v;if(a.options.time.min?v=a.getMomentStartOf(a.firstTick):(a.firstTick=a.getMomentStartOf(a.firstTick),v=a.firstTick),!a.options.time.max){var M=a.getMomentStartOf(a.lastTick),b=M.diff(a.lastTick,a.tickUnit,!0);b<0?a.lastTick=a.getMomentStartOf(a.lastTick.add(1,a.tickUnit)):b>=0&&(a.lastTick=M),a.scaleSizeInUnits=a.lastTick.diff(a.firstTick,a.tickUnit,!0)}a.options.time.displayFormat&&(a.displayFormat=a.options.time.displayFormat),a.ticks.push(a.firstTick.clone());for(var L=1;L<=a.scaleSizeInUnits;++L){var k=v.clone().add(L,a.tickUnit);if(a.options.time.max&&k.diff(a.lastTick,a.tickUnit,!0)>=0)break;L%a.unitScale===0&&a.ticks.push(k)}var Y=a.ticks[a.ticks.length-1].diff(a.lastTick,a.tickUnit);0===Y&&0!==a.scaleSizeInUnits||(a.options.time.max?(a.ticks.push(a.lastTick.clone()),a.scaleSizeInUnits=a.lastTick.diff(a.ticks[0],a.tickUnit,!0)):(a.ticks.push(a.lastTick.clone()),a.scaleSizeInUnits=a.lastTick.diff(a.firstTick,a.tickUnit,!0))),a.ctx.restore(),a.labelDiffs=void 0},getLabelForIndex:function(e,t){var n=this,a=n.chart.data.labels&&e<n.chart.data.labels.length?n.chart.data.labels[e]:"";return"object"==typeof n.chart.data.datasets[t].data[0]&&(a=n.getRightValue(n.chart.data.datasets[t].data[e])),n.options.time.tooltipFormat&&(a=n.parseTime(a).format(n.options.time.tooltipFormat)),a},tickFormatFunction:function(e,n,a){var r=e.format(this.displayFormat),i=this.options.ticks,o=t.getValueOrDefault(i.callback,i.userCallback);return o?o(r,n,a):r},convertTicksToLabels:function(){var e=this;e.tickMoments=e.ticks,e.ticks=e.ticks.map(e.tickFormatFunction,e)},getPixelForValue:function(e,t,n){var a=this,r=null;if(void 0!==t&&void 0!==n&&(r=a.getLabelDiff(n,t)),null===r&&(e&&e.isValid||(e=a.parseTime(a.getRightValue(e))),e&&e.isValid&&e.isValid()&&(r=e.diff(a.firstTick,a.tickUnit,!0))),null!==r){var i=0!==r?r/a.scaleSizeInUnits:r;if(a.isHorizontal()){var o=a.width-(a.paddingLeft+a.paddingRight),s=o*i+a.paddingLeft;return a.left+Math.round(s)}var d=a.height-(a.paddingTop+a.paddingBottom),u=d*i+a.paddingTop;return a.top+Math.round(u)}},getPixelForTick:function(e){return this.getPixelForValue(this.tickMoments[e],null,null)},getValueForPixel:function(e){var t=this,n=t.isHorizontal()?t.width-(t.paddingLeft+t.paddingRight):t.height-(t.paddingTop+t.paddingBottom),r=(e-(t.isHorizontal()?t.left+t.paddingLeft:t.top+t.paddingTop))/n;return r*=t.scaleSizeInUnits,t.firstTick.clone().add(a.duration(r,t.tickUnit).asSeconds(),"seconds")},parseTime:function(e){var t=this;return"string"==typeof t.options.time.parser?a(e,t.options.time.parser):"function"==typeof t.options.time.parser?t.options.time.parser(e):"function"==typeof e.getMonth||"number"==typeof e?a(e):e.isValid&&e.isValid()?e:"string"!=typeof t.options.time.format&&t.options.time.format.call?(console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"),t.options.time.format(e)):a(e,t.options.time.format)}});e.scaleService.registerScaleType("time",i,r)}},function(e,t,n){function a(e){if(e){var t=/^#([a-fA-F0-9]{3})$/,n=/^#([a-fA-F0-9]{6})$/,a=/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,r=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,i=/(\w+)/,o=[0,0,0],s=1,d=e.match(t);if(d){d=d[1];for(var u=0;u<o.length;u++)o[u]=parseInt(d[u]+d[u],16)}else if(d=e.match(n)){d=d[1];for(var u=0;u<o.length;u++)o[u]=parseInt(d.slice(2*u,2*u+2),16)}else if(d=e.match(a)){for(var u=0;u<o.length;u++)o[u]=parseInt(d[u+1]);s=parseFloat(d[4])}else if(d=e.match(r)){for(var u=0;u<o.length;u++)o[u]=Math.round(2.55*parseFloat(d[u+1]));s=parseFloat(d[4])}else if(d=e.match(i)){if("transparent"==d[1])return[0,0,0,0];if(o=M[d[1]],!o)return}for(var u=0;u<o.length;u++)o[u]=y(o[u],0,255);return s=s||0==s?y(s,0,1):1,o[3]=s,o}}function r(e){if(e){var t=/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,n=e.match(t);if(n){var a=parseFloat(n[4]),r=y(parseInt(n[1]),0,360),i=y(parseFloat(n[2]),0,100),o=y(parseFloat(n[3]),0,100),s=y(isNaN(a)?1:a,0,1);return[r,i,o,s]}}}function i(e){if(e){var t=/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,n=e.match(t);if(n){var a=parseFloat(n[4]),r=y(parseInt(n[1]),0,360),i=y(parseFloat(n[2]),0,100),o=y(parseFloat(n[3]),0,100),s=y(isNaN(a)?1:a,0,1);return[r,i,o,s]}}}function o(e){var t=a(e);return t&&t.slice(0,3)}function s(e){var t=r(e);return t&&t.slice(0,3)}function d(e){var t=a(e);return t?t[3]:(t=r(e))?t[3]:(t=i(e))?t[3]:void 0}function u(e){return"#"+v(e[0])+v(e[1])+v(e[2])}function l(e,t){return t<1||e[3]&&e[3]<1?c(e,t):"rgb("+e[0]+", "+e[1]+", "+e[2]+")"}function c(e,t){return void 0===t&&(t=void 0!==e[3]?e[3]:1),"rgba("+e[0]+", "+e[1]+", "+e[2]+", "+t+")"}function h(e,t){if(t<1||e[3]&&e[3]<1)return _(e,t);var n=Math.round(e[0]/255*100),a=Math.round(e[1]/255*100),r=Math.round(e[2]/255*100);return"rgb("+n+"%, "+a+"%, "+r+"%)"}function _(e,t){var n=Math.round(e[0]/255*100),a=Math.round(e[1]/255*100),r=Math.round(e[2]/255*100);return"rgba("+n+"%, "+a+"%, "+r+"%, "+(t||e[3]||1)+")"}function m(e,t){return t<1||e[3]&&e[3]<1?f(e,t):"hsl("+e[0]+", "+e[1]+"%, "+e[2]+"%)"}function f(e,t){return void 0===t&&(t=void 0!==e[3]?e[3]:1),"hsla("+e[0]+", "+e[1]+"%, "+e[2]+"%, "+t+")"}function p(e,t){return void 0===t&&(t=void 0!==e[3]?e[3]:1),"hwb("+e[0]+", "+e[1]+"%, "+e[2]+"%"+(void 0!==t&&1!==t?", "+t:"")+")"}function g(e){return b[e.slice(0,3)]}function y(e,t,n){return Math.min(Math.max(t,e),n)}function v(e){var t=e.toString(16).toUpperCase();return t.length<2?"0"+t:t}var M=n(259);e.exports={getRgba:a,getHsla:r,getRgb:o,getHsl:s,getHwb:i,getAlpha:d,hexString:u,rgbString:l,rgbaString:c,percentString:h,percentaString:_,hslString:m,hslaString:f,hwbString:p,keyword:g};var b={};for(var L in M)b[M[L]]=L},function(e,t,n){var a=n(258),r=n(255),i=function(e){if(e instanceof i)return e;if(!(this instanceof i))return new i(e);this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1};var t;if("string"==typeof e)if(t=r.getRgba(e))this.setValues("rgb",t);else if(t=r.getHsla(e))this.setValues("hsl",t);else{if(!(t=r.getHwb(e)))throw new Error('Unable to parse color from string "'+e+'"');this.setValues("hwb",t)}else if("object"==typeof e)if(t=e,void 0!==t.r||void 0!==t.red)this.setValues("rgb",t);else if(void 0!==t.l||void 0!==t.lightness)this.setValues("hsl",t);else if(void 0!==t.v||void 0!==t.value)this.setValues("hsv",t);else if(void 0!==t.w||void 0!==t.whiteness)this.setValues("hwb",t);else{if(void 0===t.c&&void 0===t.cyan)throw new Error("Unable to parse color from object "+JSON.stringify(e));this.setValues("cmyk",t)}};i.prototype={rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var e=this.values;return 1!==e.alpha?e.hwb.concat([e.alpha]):e.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var e=this.values;return e.rgb.concat([e.alpha])},hslaArray:function(){var e=this.values;return e.hsl.concat([e.alpha])},alpha:function(e){return void 0===e?this.values.alpha:(this.setValues("alpha",e),this)},red:function(e){return this.setChannel("rgb",0,e)},green:function(e){return this.setChannel("rgb",1,e)},blue:function(e){return this.setChannel("rgb",2,e)},hue:function(e){return e&&(e%=360,e=e<0?360+e:e),this.setChannel("hsl",0,e)},saturation:function(e){return this.setChannel("hsl",1,e)},lightness:function(e){return this.setChannel("hsl",2,e)},saturationv:function(e){return this.setChannel("hsv",1,e)},whiteness:function(e){return this.setChannel("hwb",1,e)},blackness:function(e){return this.setChannel("hwb",2,e)},value:function(e){return this.setChannel("hsv",2,e)},cyan:function(e){return this.setChannel("cmyk",0,e)},magenta:function(e){return this.setChannel("cmyk",1,e)},yellow:function(e){return this.setChannel("cmyk",2,e)},black:function(e){return this.setChannel("cmyk",3,e)},hexString:function(){return r.hexString(this.values.rgb)},rgbString:function(){return r.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return r.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return r.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return r.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return r.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return r.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return r.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var e=this.values.rgb;return e[0]<<16|e[1]<<8|e[2]},luminosity:function(){for(var e=this.values.rgb,t=[],n=0;n<e.length;n++){var a=e[n]/255;t[n]=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4)}return.2126*t[0]+.7152*t[1]+.0722*t[2]},contrast:function(e){var t=this.luminosity(),n=e.luminosity();return t>n?(t+.05)/(n+.05):(n+.05)/(t+.05)},level:function(e){var t=this.contrast(e);return t>=7.1?"AAA":t>=4.5?"AA":""},dark:function(){var e=this.values.rgb,t=(299*e[0]+587*e[1]+114*e[2])/1e3;return t<128},light:function(){return!this.dark()},negate:function(){for(var e=[],t=0;t<3;t++)e[t]=255-this.values.rgb[t];return this.setValues("rgb",e),this},lighten:function(e){var t=this.values.hsl;return t[2]+=t[2]*e,this.setValues("hsl",t),this},darken:function(e){var t=this.values.hsl;return t[2]-=t[2]*e,this.setValues("hsl",t),this},saturate:function(e){var t=this.values.hsl;return t[1]+=t[1]*e,this.setValues("hsl",t),this},desaturate:function(e){var t=this.values.hsl;return t[1]-=t[1]*e,this.setValues("hsl",t),this},whiten:function(e){var t=this.values.hwb;return t[1]+=t[1]*e,this.setValues("hwb",t),this},blacken:function(e){var t=this.values.hwb;return t[2]+=t[2]*e,this.setValues("hwb",t),this},greyscale:function(){var e=this.values.rgb,t=.3*e[0]+.59*e[1]+.11*e[2];return this.setValues("rgb",[t,t,t]),this},clearer:function(e){var t=this.values.alpha;return this.setValues("alpha",t-t*e),this},opaquer:function(e){var t=this.values.alpha;return this.setValues("alpha",t+t*e),this},rotate:function(e){var t=this.values.hsl,n=(t[0]+e)%360;return t[0]=n<0?360+n:n,this.setValues("hsl",t),this},mix:function(e,t){var n=this,a=e,r=void 0===t?.5:t,i=2*r-1,o=n.alpha()-a.alpha(),s=((i*o===-1?i:(i+o)/(1+i*o))+1)/2,d=1-s;return this.rgb(s*n.red()+d*a.red(),s*n.green()+d*a.green(),s*n.blue()+d*a.blue()).alpha(n.alpha()*r+a.alpha()*(1-r))},toJSON:function(){return this.rgb()},clone:function(){var e,t,n=new i,a=this.values,r=n.values;for(var o in a)a.hasOwnProperty(o)&&(e=a[o],t={}.toString.call(e),"[object Array]"===t?r[o]=e.slice(0):"[object Number]"===t?r[o]=e:console.error("unexpected color value:",e));return n}},i.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},i.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},i.prototype.getValues=function(e){for(var t=this.values,n={},a=0;a<e.length;a++)n[e.charAt(a)]=t[e][a];return 1!==t.alpha&&(n.a=t.alpha),n},i.prototype.setValues=function(e,t){var n,r=this.values,i=this.spaces,o=this.maxes,s=1;if("alpha"===e)s=t;else if(t.length)r[e]=t.slice(0,e.length),s=t[e.length];else if(void 0!==t[e.charAt(0)]){for(n=0;n<e.length;n++)r[e][n]=t[e.charAt(n)];s=t.a}else if(void 0!==t[i[e][0]]){var d=i[e];for(n=0;n<e.length;n++)r[e][n]=t[d[n]];s=t.alpha}if(r.alpha=Math.max(0,Math.min(1,void 0===s?r.alpha:s)),"alpha"===e)return!1;var u;for(n=0;n<e.length;n++)u=Math.max(0,Math.min(o[e][n],r[e][n])),r[e][n]=Math.round(u);for(var l in i)l!==e&&(r[l]=a[e][l](r[e]));return!0},i.prototype.setSpace=function(e,t){var n=t[0];return void 0===n?this.getValues(e):("number"==typeof n&&(n=Array.prototype.slice.call(t)),this.setValues(e,n),this)},i.prototype.setChannel=function(e,t,n){var a=this.values[e];return void 0===n?a[t]:n===a[t]?this:(a[t]=n,this.setValues(e,a),this)},"undefined"!=typeof window&&(window.Color=i),e.exports=i},function(e,t){function n(e){var t,n,a,r=e[0]/255,i=e[1]/255,o=e[2]/255,s=Math.min(r,i,o),d=Math.max(r,i,o),u=d-s;return d==s?t=0:r==d?t=(i-o)/u:i==d?t=2+(o-r)/u:o==d&&(t=4+(r-i)/u),t=Math.min(60*t,360),t<0&&(t+=360),a=(s+d)/2,n=d==s?0:a<=.5?u/(d+s):u/(2-d-s),[t,100*n,100*a]}function a(e){var t,n,a,r=e[0],i=e[1],o=e[2],s=Math.min(r,i,o),d=Math.max(r,i,o),u=d-s;return n=0==d?0:u/d*1e3/10,d==s?t=0:r==d?t=(i-o)/u:i==d?t=2+(o-r)/u:o==d&&(t=4+(r-i)/u),t=Math.min(60*t,360),t<0&&(t+=360),a=d/255*1e3/10,[t,n,a]}function i(e){var t=e[0],a=e[1],r=e[2],i=n(e)[0],o=1/255*Math.min(t,Math.min(a,r)),r=1-1/255*Math.max(t,Math.max(a,r));return[i,100*o,100*r]}function o(e){var t,n,a,r,i=e[0]/255,o=e[1]/255,s=e[2]/255;return r=Math.min(1-i,1-o,1-s),t=(1-i-r)/(1-r)||0,n=(1-o-r)/(1-r)||0,a=(1-s-r)/(1-r)||0,[100*t,100*n,100*a,100*r]}function s(e){return K[JSON.stringify(e)]}function d(e){var t=e[0]/255,n=e[1]/255,a=e[2]/255;t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92;var r=.4124*t+.3576*n+.1805*a,i=.2126*t+.7152*n+.0722*a,o=.0193*t+.1192*n+.9505*a;return[100*r,100*i,100*o]}function u(e){var t,n,a,r=d(e),i=r[0],o=r[1],s=r[2];return i/=95.047,o/=100,s/=108.883,i=i>.008856?Math.pow(i,1/3):7.787*i+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,t=116*o-16,n=500*(i-o),a=200*(o-s),[t,n,a]}function l(e){return W(u(e))}function c(e){var t,n,a,r,i,o=e[0]/360,s=e[1]/100,d=e[2]/100;if(0==s)return i=255*d,[i,i,i];n=d<.5?d*(1+s):d+s-d*s,t=2*d-n,r=[0,0,0];for(var u=0;u<3;u++)a=o+1/3*-(u-1),a<0&&a++,a>1&&a--,i=6*a<1?t+6*(n-t)*a:2*a<1?n:3*a<2?t+(n-t)*(2/3-a)*6:t,r[u]=255*i;return r}function h(e){var t,n,a=e[0],r=e[1]/100,i=e[2]/100;return 0===i?[0,0,0]:(i*=2,r*=i<=1?i:2-i,n=(i+r)/2,t=2*r/(i+r),[a,100*t,100*n])}function _(e){return i(c(e))}function m(e){return o(c(e))}function f(e){return s(c(e))}function p(e){var t=e[0]/60,n=e[1]/100,a=e[2]/100,r=Math.floor(t)%6,i=t-Math.floor(t),o=255*a*(1-n),s=255*a*(1-n*i),d=255*a*(1-n*(1-i)),a=255*a;switch(r){case 0:return[a,d,o];case 1:return[s,a,o];case 2:return[o,a,d];case 3:return[o,s,a];case 4:return[d,o,a];case 5:return[a,o,s]}}function y(e){var t,n,a=e[0],r=e[1]/100,i=e[2]/100;return n=(2-r)*i,t=r*i,t/=n<=1?n:2-n,t=t||0,n/=2,[a,100*t,100*n]}function v(e){return i(p(e))}function M(e){return o(p(e))}function L(e){return s(p(e))}function k(e){var t,n,a,i,o=e[0]/360,s=e[1]/100,d=e[2]/100,u=s+d;switch(u>1&&(s/=u,d/=u),t=Math.floor(6*o),n=1-d,a=6*o-t,0!=(1&t)&&(a=1-a),i=s+a*(n-s),t){default:case 6:case 0:r=n,g=i,b=s;break;case 1:r=i,g=n,b=s;break;case 2:r=s,g=n,b=i;break;case 3:r=s,g=i,b=n;break;case 4:r=i,g=s,b=n;break;case 5:r=n,g=s,b=i}return[255*r,255*g,255*b]}function Y(e){return n(k(e))}function x(e){return a(k(e))}function D(e){return o(k(e))}function w(e){return s(k(e))}function T(e){var t,n,a,r=e[0]/100,i=e[1]/100,o=e[2]/100,s=e[3]/100;return t=1-Math.min(1,r*(1-s)+s),n=1-Math.min(1,i*(1-s)+s),a=1-Math.min(1,o*(1-s)+s),[255*t,255*n,255*a]}function S(e){return n(T(e))}function j(e){return a(T(e))}function A(e){return i(T(e))}function H(e){return s(T(e))}function P(e){var t,n,a,r=e[0]/100,i=e[1]/100,o=e[2]/100;return t=3.2406*r+i*-1.5372+o*-.4986,n=r*-.9689+1.8758*i+.0415*o,a=.0557*r+i*-.204+1.057*o,t=t>.0031308?1.055*Math.pow(t,1/2.4)-.055:t*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a*=12.92,t=Math.min(Math.max(0,t),1),n=Math.min(Math.max(0,n),1),a=Math.min(Math.max(0,a),1),[255*t,255*n,255*a]}function C(e){var t,n,a,r=e[0],i=e[1],o=e[2];return r/=95.047,i/=100,o/=108.883,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,i=i>.008856?Math.pow(i,1/3):7.787*i+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,t=116*i-16,n=500*(r-i),a=200*(i-o),[t,n,a]}function O(e){return W(C(e))}function F(e){var t,n,a,r,i=e[0],o=e[1],s=e[2];return i<=8?(n=100*i/903.3,r=7.787*(n/100)+16/116):(n=100*Math.pow((i+16)/116,3),r=Math.pow(n/100,1/3)),t=t/95.047<=.008856?t=95.047*(o/500+r-16/116)/7.787:95.047*Math.pow(o/500+r,3),a=a/108.883<=.008859?a=108.883*(r-s/200-16/116)/7.787:108.883*Math.pow(r-s/200,3),[t,n,a]}function W(e){var t,n,a,r=e[0],i=e[1],o=e[2];return t=Math.atan2(o,i),n=360*t/2/Math.PI,n<0&&(n+=360),a=Math.sqrt(i*i+o*o),[r,a,n]}function E(e){return P(F(e))}function I(e){var t,n,a,r=e[0],i=e[1],o=e[2];return a=o/360*2*Math.PI,t=i*Math.cos(a),n=i*Math.sin(a),[r,t,n]}function R(e){return F(I(e))}function z(e){return E(I(e))}function N(e){return G[e]}function V(e){return n(N(e))}function B(e){return a(N(e))}function $(e){return i(N(e))}function U(e){return o(N(e))}function J(e){return u(N(e))}function q(e){return d(N(e))}e.exports={rgb2hsl:n,rgb2hsv:a,rgb2hwb:i,rgb2cmyk:o,rgb2keyword:s,rgb2xyz:d,rgb2lab:u,rgb2lch:l,hsl2rgb:c,hsl2hsv:h,hsl2hwb:_,hsl2cmyk:m,hsl2keyword:f,hsv2rgb:p,hsv2hsl:y,hsv2hwb:v,hsv2cmyk:M,hsv2keyword:L,hwb2rgb:k,hwb2hsl:Y,hwb2hsv:x,hwb2cmyk:D,hwb2keyword:w,cmyk2rgb:T,cmyk2hsl:S,cmyk2hsv:j,cmyk2hwb:A,cmyk2keyword:H,keyword2rgb:N,keyword2hsl:V,keyword2hsv:B,keyword2hwb:$,keyword2cmyk:U,keyword2lab:J,keyword2xyz:q,xyz2rgb:P,xyz2lab:C,xyz2lch:O,lab2xyz:F,lab2rgb:E,lab2lch:W,lch2lab:I,lch2xyz:R,lch2rgb:z};var G={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},K={};for(var Z in G)K[JSON.stringify(G[Z])]=Z},function(e,t,n){var a=n(257),r=function(){return new u};for(var i in a){r[i+"Raw"]=function(e){return function(t){return"number"==typeof t&&(t=Array.prototype.slice.call(arguments)),a[e](t)}}(i);var o=/(\w+)2(\w+)/.exec(i),s=o[1],d=o[2];r[s]=r[s]||{},r[s][d]=r[i]=function(e){return function(t){"number"==typeof t&&(t=Array.prototype.slice.call(arguments));var n=a[e](t);if("string"==typeof n||void 0===n)return n;for(var r=0;r<n.length;r++)n[r]=Math.round(n[r]);return n}}(i)}var u=function(){this.convs={}};u.prototype.routeSpace=function(e,t){var n=t[0];return void 0===n?this.getValues(e):("number"==typeof n&&(n=Array.prototype.slice.call(t)),this.setValues(e,n))},u.prototype.setValues=function(e,t){return this.space=e,this.convs={},this.convs[e]=t,this},u.prototype.getValues=function(e){var t=this.convs[e];if(!t){var n=this.space,a=this.convs[n];t=r[n][e](a),this.convs[e]=t}return t},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(e){u.prototype[e]=function(t){return this.routeSpace(e,arguments)}}),e.exports=r},function(e,t){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},function(e,t,n){var a=n(261),r=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){var a=n(8),r=n(2),i=a(r,"DataView");e.exports=i},function(e,t,n){function a(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var a=e[t];this.set(a[0],a[1])}}var r=n(322),i=n(323),o=n(324),s=n(325),d=n(326);a.prototype.clear=r,a.prototype.delete=i,a.prototype.get=o,a.prototype.has=s,a.prototype.set=d,e.exports=a},function(e,t,n){var a=n(8),r=n(2),i=a(r,"Promise");e.exports=i},function(e,t,n){var a=n(8),r=n(2),i=a(r,"Set");e.exports=i},function(e,t,n){function a(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}var r=n(35),i=n(353),o=n(354);a.prototype.add=a.prototype.push=i,a.prototype.has=o,e.exports=a},function(e,t){function n(e,t){return e.set(t[0],t[1]),e}e.exports=n},function(e,t){function n(e,t){return e.add(t),e}e.exports=n},function(e,t,n){function a(e,t){var n=null==e?0:e.length;return!!n&&r(e,t,0)>-1}var r=n(276);e.exports=a},function(e,t){function n(e,t){for(var n=-1,a=null==e?0:e.length;++n<a;)if(t(e[n],n,e))return!0;return!1}e.exports=n},function(e,t,n){function a(e,t){return e&&r(t,i(t),e)}var r=n(13),i=n(31);e.exports=a},function(e,t){function n(e,t,n,a){for(var r=e.length,i=n+(a?1:-1);a?i--:++i<r;)if(t(e[i],i,e))return i;return-1}e.exports=n},function(e,t,n){function a(e,t,n,o,s){var d=-1,u=e.length;for(n||(n=i),s||(s=[]);++d<u;){var l=e[d];t>0&&n(l)?t>1?a(l,t-1,n,o,s):r(s,l):o||(s[s.length]=l)}return s}var r=n(38),i=n(330);e.exports=a},function(e,t,n){var a=n(307),r=a();e.exports=r},function(e,t){function n(e,t){return null!=e&&t in Object(e)}e.exports=n},function(e,t,n){function a(e,t,n){
	return t===t?o(e,t,n):r(e,i,n)}var r=n(272),i=n(280),o=n(360);e.exports=a},function(e,t,n){function a(e){return i(e)&&r(e)==o}var r=n(11),i=n(5),o="[object Arguments]";e.exports=a},function(e,t,n){function a(e,t,n,a,p,y){var v=u(e),M=u(t),b=m,L=m;v||(b=d(e),b=b==_?f:b),M||(L=d(t),L=L==_?f:L);var k=b==f,Y=L==f,x=b==L;if(x&&l(e)){if(!l(t))return!1;v=!0,k=!1}if(x&&!k)return y||(y=new r),v||c(e)?i(e,t,n,a,p,y):o(e,t,b,n,a,p,y);if(!(n&h)){var D=k&&g.call(e,"__wrapped__"),w=Y&&g.call(t,"__wrapped__");if(D||w){var T=D?e.value():e,S=w?t.value():t;return y||(y=new r),p(T,S,n,a,y)}}return!!x&&(y||(y=new r),s(e,t,n,a,p,y))}var r=n(19),i=n(76),o=n(311),s=n(312),d=n(81),u=n(3),l=n(29),c=n(51),h=1,_="[object Arguments]",m="[object Array]",f="[object Object]",p=Object.prototype,g=p.hasOwnProperty;e.exports=a},function(e,t,n){function a(e,t,n,a){var d=n.length,u=d,l=!a;if(null==e)return!u;for(e=Object(e);d--;){var c=n[d];if(l&&c[2]?c[1]!==e[c[0]]:!(c[0]in e))return!1}for(;++d<u;){c=n[d];var h=c[0],_=e[h],m=c[1];if(l&&c[2]){if(void 0===_&&!(h in e))return!1}else{var f=new r;if(a)var p=a(_,m,h,e,t,f);if(!(void 0===p?i(m,_,o|s,a,f):p))return!1}}return!0}var r=n(19),i=n(65),o=1,s=2;e.exports=a},function(e,t){function n(e){return e!==e}e.exports=n},function(e,t,n){function a(e){if(!o(e)||i(e))return!1;var t=r(e)?m:u;return t.test(s(e))}var r=n(30),i=n(334),o=n(4),s=n(93),d=/[\\^$.*+?()[\]{}|]/g,u=/^\[object .+?Constructor\]$/,l=Function.prototype,c=Object.prototype,h=l.toString,_=c.hasOwnProperty,m=RegExp("^"+h.call(_).replace(d,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=a},function(e,t,n){function a(e){return o(e)&&i(e.length)&&!!A[r(e)]}var r=n(11),i=n(50),o=n(5),s="[object Arguments]",d="[object Array]",u="[object Boolean]",l="[object Date]",c="[object Error]",h="[object Function]",_="[object Map]",m="[object Number]",f="[object Object]",p="[object RegExp]",g="[object Set]",y="[object String]",v="[object WeakMap]",M="[object ArrayBuffer]",b="[object DataView]",L="[object Float32Array]",k="[object Float64Array]",Y="[object Int8Array]",x="[object Int16Array]",D="[object Int32Array]",w="[object Uint8Array]",T="[object Uint8ClampedArray]",S="[object Uint16Array]",j="[object Uint32Array]",A={};A[L]=A[k]=A[Y]=A[x]=A[D]=A[w]=A[T]=A[S]=A[j]=!0,A[s]=A[d]=A[M]=A[u]=A[b]=A[l]=A[c]=A[h]=A[_]=A[m]=A[f]=A[p]=A[g]=A[y]=A[v]=!1,e.exports=a},function(e,t,n){function a(e){return"function"==typeof e?e:null==e?o:"object"==typeof e?s(e)?i(e[0],e[1]):r(e):d(e)}var r=n(285),i=n(286),o=n(26),s=n(3),d=n(381);e.exports=a},function(e,t,n){function a(e){if(!r(e))return o(e);var t=i(e),n=[];for(var a in e)("constructor"!=a||!t&&d.call(e,a))&&n.push(a);return n}var r=n(4),i=n(46),o=n(348),s=Object.prototype,d=s.hasOwnProperty;e.exports=a},function(e,t,n){function a(e){var t=i(e);return 1==t.length&&t[0][2]?o(t[0][0],t[0][1]):function(n){return n===e||r(n,e,t)}}var r=n(279),i=n(317),o=n(85);e.exports=a},function(e,t,n){function a(e,t){return s(e)&&d(t)?u(l(e),t):function(n){var a=i(n,e);return void 0===a&&a===t?o(n,e):r(t,a,c|h)}}var r=n(65),i=n(373),o=n(374),s=n(45),d=n(83),u=n(85),l=n(14),c=1,h=2;e.exports=a},function(e,t,n){function a(e,t,n,l,c){e!==t&&o(t,function(o,u){if(d(o))c||(c=new r),s(e,t,u,n,a,l,c);else{var h=l?l(e[u],o,u+"",e,t,c):void 0;void 0===h&&(h=o),i(e,u,h)}},u)}var r=n(19),i=n(59),o=n(274),s=n(288),d=n(4),u=n(31);e.exports=a},function(e,t,n){function a(e,t,n,a,y,v,M){var b=e[n],L=t[n],k=M.get(L);if(k)return void r(e,n,k);var Y=v?v(b,L,n+"",e,t,M):void 0,x=void 0===Y;if(x){var D=l(L),w=!D&&h(L),T=!D&&!w&&p(L);Y=L,D||w||T?l(b)?Y=b:c(b)?Y=s(b):w?(x=!1,Y=i(L,!0)):T?(x=!1,Y=o(L,!0)):Y=[]:f(L)||u(L)?(Y=b,u(b)?Y=g(b):(!m(b)||a&&_(b))&&(Y=d(L))):x=!1}x&&(M.set(L,Y),y(Y,L,a,v,M),M.delete(L)),r(e,n,Y)}var r=n(59),i=n(69),o=n(70),s=n(12),d=n(82),u=n(27),l=n(3),c=n(375),h=n(29),_=n(30),m=n(4),f=n(376),p=n(51),g=n(387);e.exports=a},function(e,t){function n(e){return function(t){return null==t?void 0:t[e]}}e.exports=n},function(e,t,n){function a(e){return function(t){return r(t,e)}}var r=n(63);e.exports=a},function(e,t,n){function a(e,t){return o(i(e,t,r),e+"")}var r=n(26),i=n(87),o=n(49);e.exports=a},function(e,t,n){var a=n(365),r=n(75),i=n(26),o=r?function(e,t){return r(e,"toString",{configurable:!0,enumerable:!1,value:a(t),writable:!0})}:i;e.exports=o},function(e,t){function n(e,t){for(var n=-1,a=Array(e);++n<e;)a[n]=t(n);return a}e.exports=n},function(e,t,n){function a(e){if("string"==typeof e)return e;if(o(e))return i(e,a)+"";if(s(e))return l?l.call(e):"";var t=e+"";return"0"==t&&1/e==-d?"-0":t}var r=n(10),i=n(57),o=n(3),s=n(16),d=1/0,u=r?r.prototype:void 0,l=u?u.toString:void 0;e.exports=a},function(e,t){function n(e){return function(t){return e(t)}}e.exports=n},function(e,t){function n(e,t){return e.has(t)}e.exports=n},function(e,t,n){function a(e,t){var n=t?r(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var r=n(41);e.exports=a},function(e,t,n){function a(e,t,n){var a=t?n(o(e),s):o(e);return i(a,r,new e.constructor)}var r=n(267),i=n(58),o=n(84),s=1;e.exports=a},function(e,t){function n(e){var t=new e.constructor(e.source,a.exec(e));return t.lastIndex=e.lastIndex,t}var a=/\w*$/;e.exports=n},function(e,t,n){function a(e,t,n){var a=t?n(o(e),s):o(e);return i(a,r,new e.constructor)}var r=n(268),i=n(58),o=n(89),s=1;e.exports=a},function(e,t,n){function a(e){return o?Object(o.call(e)):{}}var r=n(10),i=r?r.prototype:void 0,o=i?i.valueOf:void 0;e.exports=a},function(e,t,n){function a(e,t){return r(e,i(e),t)}var r=n(13),i=n(44);e.exports=a},function(e,t,n){function a(e,t){return r(e,i(e),t)}var r=n(13),i=n(80);e.exports=a},function(e,t,n){var a=n(2),r=a["__core-js_shared__"];e.exports=r},function(e,t){function n(e,t){for(var n=e.length,a=0;n--;)e[n]===t&&++a;return a}e.exports=n},function(e,t,n){function a(e){return r(function(t,n){var a=-1,r=n.length,o=r>1?n[r-1]:void 0,s=r>2?n[2]:void 0;for(o=e.length>3&&"function"==typeof o?(r--,o):void 0,s&&i(n[0],n[1],s)&&(o=r<3?void 0:o,r=1),t=Object(t);++a<r;){var d=n[a];d&&e(t,d,a,o)}return t})}var r=n(291),i=n(331);e.exports=a},function(e,t){function n(e){return function(t,n,a){for(var r=-1,i=Object(t),o=a(t),s=o.length;s--;){var d=o[e?s:++r];if(n(i[d],d,i)===!1)break}return t}}e.exports=n},function(e,t,n){function a(e,t,n){function a(){var t=this&&this!==i&&this instanceof a?d:e;return t.apply(s?n:this,arguments)}var s=t&o,d=r(e);return a}var r=n(22),i=n(2),o=1;e.exports=a},function(e,t,n){function a(e,t,n){function a(){for(var i=arguments.length,h=Array(i),_=i,m=d(a);_--;)h[_]=arguments[_];var f=i<3&&h[0]!==m&&h[i-1]!==m?[]:u(h,m);if(i-=f.length,i<n)return s(e,t,o,a.placeholder,void 0,h,f,void 0,void 0,n-i);var p=this&&this!==l&&this instanceof a?c:e;return r(p,this,h)}var c=i(e);return a}var r=n(36),i=n(22),o=n(73),s=n(74),d=n(79),u=n(48),l=n(2);e.exports=a},function(e,t,n){function a(e,t,n,a){function d(){for(var t=-1,i=arguments.length,s=-1,c=a.length,h=Array(c+i),_=this&&this!==o&&this instanceof d?l:e;++s<c;)h[s]=a[s];for(;i--;)h[s++]=arguments[++t];return r(_,u?n:this,h)}var u=t&s,l=i(e);return d}var r=n(36),i=n(22),o=n(2),s=1;e.exports=a},function(e,t,n){function a(e,t,n,a,r,k,x){switch(n){case L:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case b:return!(e.byteLength!=t.byteLength||!k(new i(e),new i(t)));case h:case _:case p:return o(+e,+t);case m:return e.name==t.name&&e.message==t.message;case g:case v:return e==t+"";case f:var D=d;case y:var w=a&l;if(D||(D=u),e.size!=t.size&&!w)return!1;var T=x.get(e);if(T)return T==t;a|=c,x.set(e,t);var S=s(D(e),D(t),a,r,k,x);return x.delete(e),S;case M:if(Y)return Y.call(e)==Y.call(t)}return!1}var r=n(10),i=n(54),o=n(15),s=n(76),d=n(84),u=n(89),l=1,c=2,h="[object Boolean]",_="[object Date]",m="[object Error]",f="[object Map]",p="[object Number]",g="[object RegExp]",y="[object Set]",v="[object String]",M="[object Symbol]",b="[object ArrayBuffer]",L="[object DataView]",k=r?r.prototype:void 0,Y=k?k.valueOf:void 0;e.exports=a},function(e,t,n){function a(e,t,n,a,o,d){var u=n&i,l=r(e),c=l.length,h=r(t),_=h.length;if(c!=_&&!u)return!1;for(var m=c;m--;){var f=l[m];if(!(u?f in t:s.call(t,f)))return!1}var p=d.get(e);if(p&&d.get(t))return p==t;var g=!0;d.set(e,t),d.set(t,e);for(var y=u;++m<c;){f=l[m];var v=e[f],M=t[f];if(a)var b=u?a(M,v,f,t,e,d):a(v,M,f,e,t,d);if(!(void 0===b?v===M||o(v,M,n,a,d):b)){g=!1;break}y||(y="constructor"==f)}if(g&&!y){var L=e.constructor,k=t.constructor;L!=k&&"constructor"in e&&"constructor"in t&&!("function"==typeof L&&L instanceof L&&"function"==typeof k&&k instanceof k)&&(g=!1)}return d.delete(e),d.delete(t),g}var r=n(17),i=1,o=Object.prototype,s=o.hasOwnProperty;e.exports=a},function(e,t,n){function a(e){return o(i(e,void 0,r),e+"")}var r=n(367),i=n(87),o=n(49);e.exports=a},function(e,t,n){function a(e){return r(e,o,i)}var r=n(64),i=n(44),o=n(17);e.exports=a},function(e,t,n){function a(e){return r(e,o,i)}var r=n(64),i=n(80),o=n(31);e.exports=a},function(e,t,n){function a(e){for(var t=e.name+"",n=r[t],a=o.call(r,t)?n.length:0;a--;){var i=n[a],s=i.func;if(null==s||s==e)return i.name}return t}var r=n(351),i=Object.prototype,o=i.hasOwnProperty;e.exports=a},function(e,t,n){function a(e){for(var t=i(e),n=t.length;n--;){var a=t[n],o=e[a];t[n]=[a,o,r(o)]}return t}var r=n(83),i=n(17);e.exports=a},function(e,t,n){function a(e){var t=o.call(e,d),n=e[d];try{e[d]=void 0;var a=!0}catch(e){}var r=s.call(e);return a&&(t?e[d]=n:delete e[d]),r}var r=n(10),i=Object.prototype,o=i.hasOwnProperty,s=i.toString,d=r?r.toStringTag:void 0;e.exports=a},function(e,t){function n(e,t){return null==e?void 0:e[t]}e.exports=n},function(e,t){function n(e){var t=e.match(a);return t?t[1].split(r):[]}var a=/\{\n\/\* \[wrapped with (.+)\] \*/,r=/,? & /;e.exports=n},function(e,t,n){function a(e,t,n){t=r(t,e);for(var a=-1,l=t.length,c=!1;++a<l;){var h=u(t[a]);if(!(c=null!=e&&n(e,h)))break;e=e[h]}return c||++a!=l?c:(l=null==e?0:e.length,!!l&&d(l)&&s(h,l)&&(o(e)||i(e)))}var r=n(68),i=n(27),o=n(3),s=n(24),d=n(50),u=n(14);e.exports=a},function(e,t,n){function a(){this.__data__=r?r(null):{},this.size=0}var r=n(25);e.exports=a},function(e,t){function n(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}e.exports=n},function(e,t,n){function a(e){var t=this.__data__;if(r){var n=t[e];return n===i?void 0:n}return s.call(t,e)?t[e]:void 0}var r=n(25),i="__lodash_hash_undefined__",o=Object.prototype,s=o.hasOwnProperty;e.exports=a},function(e,t,n){function a(e){var t=this.__data__;return r?void 0!==t[e]:o.call(t,e)}var r=n(25),i=Object.prototype,o=i.hasOwnProperty;e.exports=a},function(e,t,n){function a(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=r&&void 0===t?i:t,this}var r=n(25),i="__lodash_hash_undefined__";e.exports=a},function(e,t){function n(e){var t=e.length,n=e.constructor(t);return t&&"string"==typeof e[0]&&r.call(e,"index")&&(n.index=e.index,n.input=e.input),n}var a=Object.prototype,r=a.hasOwnProperty;e.exports=n},function(e,t,n){function a(e,t,n,a){var j=e.constructor;switch(t){case v:return r(e);case c:case h:return new j(+e);case M:return i(e,a);case b:case L:case k:case Y:case x:case D:case w:case T:case S:return l(e,a);case _:return o(e,a,n);case m:case g:return new j(e);case f:return s(e);case p:return d(e,a,n);case y:return u(e)}}var r=n(41),i=n(297),o=n(298),s=n(299),d=n(300),u=n(301),l=n(70),c="[object Boolean]",h="[object Date]",_="[object Map]",m="[object Number]",f="[object RegExp]",p="[object Set]",g="[object String]",y="[object Symbol]",v="[object ArrayBuffer]",M="[object DataView]",b="[object Float32Array]",L="[object Float64Array]",k="[object Int8Array]",Y="[object Int16Array]",x="[object Int32Array]",D="[object Uint8Array]",w="[object Uint8ClampedArray]",T="[object Uint16Array]",S="[object Uint32Array]";e.exports=a},function(e,t){function n(e,t){var n=t.length;if(!n)return e;var r=n-1;return t[r]=(n>1?"& ":"")+t[r],t=t.join(n>2?", ":" "),e.replace(a,"{\n/* [wrapped with "+t+"] */\n")}var a=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;e.exports=n},function(e,t,n){function a(e){return o(e)||i(e)||!!(s&&e&&e[s])}var r=n(10),i=n(27),o=n(3),s=r?r.isConcatSpreadable:void 0;e.exports=a},function(e,t,n){function a(e,t,n){if(!s(n))return!1;var a=typeof t;return!!("number"==a?i(n)&&o(t,n.length):"string"==a&&t in n)&&r(n[t],e)}var r=n(15),i=n(28),o=n(24),s=n(4);e.exports=a},function(e,t){function n(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}e.exports=n},function(e,t,n){function a(e){var t=o(e),n=s[t];if("function"!=typeof n||!(t in r.prototype))return!1;if(e===n)return!0;var a=i(n);return!!a&&e===a[0]}var r=n(33),i=n(78),o=n(316),s=n(388);e.exports=a},function(e,t,n){function a(e){return!!i&&i in e}var r=n(304),i=function(){var e=/[^.]+$/.exec(r&&r.keys&&r.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();e.exports=a},function(e,t){function n(){this.__data__=[],this.size=0}e.exports=n},function(e,t,n){function a(e){var t=this.__data__,n=r(t,e);if(n<0)return!1;var a=t.length-1;return n==a?t.pop():o.call(t,n,1),--this.size,!0}var r=n(20),i=Array.prototype,o=i.splice;e.exports=a},function(e,t,n){function a(e){var t=this.__data__,n=r(t,e);return n<0?void 0:t[n][1]}var r=n(20);e.exports=a},function(e,t,n){function a(e){return r(this.__data__,e)>-1}var r=n(20);e.exports=a},function(e,t,n){function a(e,t){var n=this.__data__,a=r(n,e);return a<0?(++this.size,n.push([e,t])):n[a][1]=t,this}var r=n(20);e.exports=a},function(e,t,n){function a(){this.size=0,this.__data__={hash:new r,map:new(o||i),string:new r}}var r=n(263),i=n(18),o=n(34);e.exports=a},function(e,t,n){function a(e){var t=r(this,e).delete(e);return this.size-=t?1:0,t}var r=n(23);e.exports=a},function(e,t,n){function a(e){return r(this,e).get(e)}var r=n(23);e.exports=a},function(e,t,n){function a(e){return r(this,e).has(e)}var r=n(23);e.exports=a},function(e,t,n){function a(e,t){var n=r(this,e),a=n.size;return n.set(e,t),this.size+=n.size==a?0:1,this}var r=n(23);e.exports=a},function(e,t,n){function a(e){var t=r(e,function(e){return n.size===i&&n.clear(),e}),n=t.cache;return t}var r=n(378),i=500;e.exports=a},function(e,t,n){function a(e,t){var n=e[1],a=t[1],f=n|a,p=f<(d|u|h),g=a==h&&n==c||a==h&&n==_&&e[7].length<=t[8]||a==(h|_)&&t[7].length<=t[8]&&n==c;if(!p&&!g)return e;a&d&&(e[2]=t[2],f|=n&d?0:l);var y=t[3];if(y){var v=e[3];e[3]=v?r(v,y,t[4]):y,e[4]=v?o(e[3],s):t[4]}return y=t[5],y&&(v=e[5],e[5]=v?i(v,y,t[6]):y,e[6]=v?o(e[5],s):t[6]),y=t[7],y&&(e[7]=y),a&h&&(e[8]=null==e[8]?t[8]:m(e[8],t[8])),null==e[9]&&(e[9]=t[9]),e[0]=t[0],e[1]=f,e}var r=n(71),i=n(72),o=n(48),s="__lodash_placeholder__",d=1,u=2,l=4,c=8,h=128,_=256,m=Math.min;e.exports=a},function(e,t,n){var a=n(47),r=a(Object.keys,Object);e.exports=r},function(e,t){function n(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}e.exports=n},function(e,t,n){(function(e){var a=n(77),r="object"==typeof t&&t&&!t.nodeType&&t,i=r&&"object"==typeof e&&e&&!e.nodeType&&e,o=i&&i.exports===r,s=o&&a.process,d=function(){try{return s&&s.binding&&s.binding("util")}catch(e){}}();e.exports=d}).call(t,n(32)(e))},function(e,t){function n(e){return r.call(e)}var a=Object.prototype,r=a.toString;e.exports=n},function(e,t){var n={};e.exports=n},function(e,t,n){function a(e,t){for(var n=e.length,a=o(t.length,n),s=r(e);a--;){var d=t[a];e[a]=i(d,n)?s[d]:void 0}return e}var r=n(12),i=n(24),o=Math.min;e.exports=a},function(e,t){function n(e){return this.__data__.set(e,a),this}var a="__lodash_hash_undefined__";e.exports=n},function(e,t){function n(e){return this.__data__.has(e)}e.exports=n},function(e,t,n){function a(){this.__data__=new r,this.size=0}var r=n(18);e.exports=a},function(e,t){function n(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}e.exports=n},function(e,t){function n(e){return this.__data__.get(e)}e.exports=n},function(e,t){function n(e){return this.__data__.has(e)}e.exports=n},function(e,t,n){function a(e,t){var n=this.__data__;if(n instanceof r){var a=n.__data__;if(!i||a.length<s-1)return a.push([e,t]),this.size=++n.size,this;n=this.__data__=new o(a)}return n.set(e,t),this.size=n.size,this}var r=n(18),i=n(34),o=n(35),s=200;e.exports=a},function(e,t){function n(e,t,n){for(var a=n-1,r=e.length;++a<r;)if(e[a]===t)return a;return-1}e.exports=n},function(e,t,n){function a(e,t){return r(f,function(n){var a="_."+n[0];t&n[1]&&!i(e,a)&&e.push(a)}),e.sort()}var r=n(37),i=n(269),o=1,s=2,d=8,u=16,l=32,c=64,h=128,_=256,m=512,f=[["ary",h],["bind",o],["bindKey",s],["curry",d],["curryRight",u],["flip",m],["partial",l],["partialRight",c],["rearg",_]];e.exports=a},function(e,t,n){function a(e){if(e instanceof r)return e.clone();var t=new i(e.__wrapped__,e.__chain__);return t.__actions__=o(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t}var r=n(33),i=n(53),o=n(12);e.exports=a},function(e,t,n){function a(e,t,n){return t=n?void 0:t,t=e&&null==t?e.length:t,r(e,i,void 0,void 0,void 0,void 0,t)}var r=n(42),i=128;e.exports=a},function(e,t,n){function a(e){return r(e,i)}var r=n(62),i=4;e.exports=a},function(e,t){function n(e){return function(){return e}}e.exports=n},function(e,t,n){function a(e,t,n){t=n?void 0:t;var o=r(e,i,void 0,void 0,void 0,void 0,void 0,t);return o.placeholder=a.placeholder,o}var r=n(42),i=8;a.placeholder={},e.exports=a},function(e,t,n){function a(e){var t=null==e?0:e.length;return t?r(e,1):[]}var r=n(273);e.exports=a},function(e,t,n){function a(e,t){return 2==t?function(t,n){return e.apply(void 0,arguments)}:function(t){return e.apply(void 0,arguments)}}function r(e,t){return 2==t?function(t,n){return e(t,n)}:function(t){return e(t)}}function i(e){for(var t=e?e.length:0,n=Array(t);t--;)n[t]=e[t];return n}function o(e){return function(t){return e({},t)}}function s(e,t){return function(){for(var n=arguments.length,a=Array(n);n--;)a[n]=arguments[n];var r=a[t],i=a.length-1,o=a.slice(0,t);return r&&h.apply(o,r),t!=i&&h.apply(o,a.slice(t+1)),e.apply(this,o)}}function d(e,t){return function(){var n=arguments.length;if(n){for(var a=Array(n);n--;)a[n]=arguments[n];var r=a[0]=t.apply(void 0,a);return e.apply(void 0,a),r}}}function u(e,t,n,h){function _(e,t){if(w.cap){var n=l.iterateeRearg[e];if(n)return b(t,n);var a=!x&&l.iterateeAry[e];if(a)return M(t,a)}return t}function m(e,t,n){return T||w.curry&&n>1?W(t,n):t}function f(e,t,n){if(w.fixed&&(S||!l.skipFixed[e])){var a=l.methodSpread[e],r=a&&a.start;return void 0===r?C(t,n):s(t,r)}return t}function p(e,t,n){return w.rearg&&n>1&&(j||!l.skipRearg[e])?N(t,l.methodRearg[e]||l.aryRearg[n]):t}function g(e,t){t=B(t);for(var n=-1,a=t.length,r=a-1,i=F(Object(e)),o=i;null!=o&&++n<a;){var s=t[n],d=o[s];null!=d&&(o[t[n]]=F(n==r?d:Object(d))),o=o[s]}return i}function y(e){return J.runInContext.convert(e)(void 0)}function v(e,t){var n=l.aliasToReal[e]||e,a=l.remap[n]||n,r=h;return function(e){var i=x?H:P,o=x?H[a]:t,s=O(O({},r),e);return u(i,n,o,s)}}function M(e,t){return L(e,function(e){return"function"==typeof e?r(e,t):e})}function b(e,t){return L(e,function(e){var n=t.length;return a(N(r(e,n),t),n)})}function L(e,t){return function(){var n=arguments.length;if(!n)return e();for(var a=Array(n);n--;)a[n]=arguments[n];var r=w.rearg?0:n-1;return a[r]=t(a[r]),e.apply(void 0,a)}}function k(e,t){var n,a=l.aliasToReal[e]||e,r=t,s=U[a];return s?r=s(t):w.immutable&&(l.mutate.array[a]?r=d(t,i):l.mutate.object[a]?r=d(t,o(t)):l.mutate.set[a]&&(r=d(t,g))),E($,function(e){return E(l.aryMethod[e],function(t){if(a==t){var i=l.methodSpread[a],o=i&&i.afterRearg;return n=o?f(a,p(a,r,e),e):p(a,f(a,r,e),e),n=_(a,n),n=m(a,n,e),!1}}),!n}),n||(n=r),n==t&&(n=T?W(n,1):function(){return t.apply(this,arguments)}),n.convert=v(a,t),l.placeholder[a]&&(Y=!0,n.placeholder=t.placeholder=A),n}var Y,x="function"==typeof t,D=t===Object(t);if(D&&(h=n,n=t,t=void 0),null==n)throw new TypeError;h||(h={});var w={cap:!("cap"in h)||h.cap,curry:!("curry"in h)||h.curry,fixed:!("fixed"in h)||h.fixed,immutable:!("immutable"in h)||h.immutable,rearg:!("rearg"in h)||h.rearg},T="curry"in h&&h.curry,S="fixed"in h&&h.fixed,j="rearg"in h&&h.rearg,A=x?n:c,H=x?n.runInContext():void 0,P=x?n:{ary:e.ary,assign:e.assign,clone:e.clone,curry:e.curry,forEach:e.forEach,isArray:e.isArray,isFunction:e.isFunction,iteratee:e.iteratee,keys:e.keys,rearg:e.rearg,toInteger:e.toInteger,toPath:e.toPath},C=P.ary,O=P.assign,F=P.clone,W=P.curry,E=P.forEach,I=P.isArray,R=P.isFunction,z=P.keys,N=P.rearg,V=P.toInteger,B=P.toPath,$=z(l.aryMethod),U={castArray:function(e){return function(){var t=arguments[0];return I(t)?e(i(t)):e.apply(void 0,arguments)}},iteratee:function(e){return function(){var t=arguments[0],n=arguments[1],a=e(t,n),i=a.length;return w.cap&&"number"==typeof n?(n=n>2?n-2:1,i&&i<=n?a:r(a,n)):a}},mixin:function(e){return function(t){var n=this;if(!R(n))return e(n,Object(t));var a=[];return E(z(t),function(e){R(t[e])&&a.push([e,n.prototype[e]])}),e(n,Object(t)),E(a,function(e){var t=e[1];R(t)?n.prototype[e[0]]=t:delete n.prototype[e[0]]}),n}},nthArg:function(e){return function(t){var n=t<0?1:V(t)+1;return W(e(t),n)}},rearg:function(e){return function(t,n){var a=n?n.length:0;return W(e(t,n),a)}},runInContext:function(t){return function(n){return u(e,t(n),h)}}};if(!D)return k(t,n);var J=n,q=[];return E($,function(e){E(l.aryMethod[e],function(e){var t=J[l.remap[e]||e];t&&q.push([e,k(e,t)])})}),E(z(J),function(e){var t=J[e];if("function"==typeof t){for(var n=q.length;n--;)if(q[n][0]==e)return;t.convert=v(e,t),q.push([e,t])}}),E(q,function(e){J[e[0]]=e[1]}),J.convert=y,Y&&(J.placeholder=A),E(z(J),function(e){E(l.realToAlias[e]||[],function(t){J[t]=J[e]})}),J}var l=n(369),c=n(94),h=Array.prototype.push;e.exports=u},function(e,t){t.aliasToReal={each:"forEach",eachRight:"forEachRight",entries:"toPairs",entriesIn:"toPairsIn",extend:"assignIn",extendAll:"assignInAll",extendAllWith:"assignInAllWith",extendWith:"assignInWith",first:"head",conforms:"conformsTo",matches:"isMatch",property:"get",__:"placeholder",F:"stubFalse",T:"stubTrue",all:"every",allPass:"overEvery",always:"constant",any:"some",anyPass:"overSome",apply:"spread",assoc:"set",assocPath:"set",complement:"negate",compose:"flowRight",contains:"includes",dissoc:"unset",dissocPath:"unset",dropLast:"dropRight",dropLastWhile:"dropRightWhile",equals:"isEqual",identical:"eq",indexBy:"keyBy",init:"initial",invertObj:"invert",juxt:"over",omitAll:"omit",nAry:"ary",path:"get",pathEq:"matchesProperty",pathOr:"getOr",paths:"at",pickAll:"pick",pipe:"flow",pluck:"map",prop:"get",propEq:"matchesProperty",propOr:"getOr",props:"at",symmetricDifference:"xor",symmetricDifferenceBy:"xorBy",symmetricDifferenceWith:"xorWith",takeLast:"takeRight",takeLastWhile:"takeRightWhile",unapply:"rest",unnest:"flatten",useWith:"overArgs",where:"conformsTo",whereEq:"isMatch",zipObj:"zipObject"},t.aryMethod={1:["assignAll","assignInAll","attempt","castArray","ceil","create","curry","curryRight","defaultsAll","defaultsDeepAll","floor","flow","flowRight","fromPairs","invert","iteratee","memoize","method","mergeAll","methodOf","mixin","nthArg","over","overEvery","overSome","rest","reverse","round","runInContext","spread","template","trim","trimEnd","trimStart","uniqueId","words","zipAll"],2:["add","after","ary","assign","assignAllWith","assignIn","assignInAllWith","at","before","bind","bindAll","bindKey","chunk","cloneDeepWith","cloneWith","concat","conformsTo","countBy","curryN","curryRightN","debounce","defaults","defaultsDeep","defaultTo","delay","difference","divide","drop","dropRight","dropRightWhile","dropWhile","endsWith","eq","every","filter","find","findIndex","findKey","findLast","findLastIndex","findLastKey","flatMap","flatMapDeep","flattenDepth","forEach","forEachRight","forIn","forInRight","forOwn","forOwnRight","get","groupBy","gt","gte","has","hasIn","includes","indexOf","intersection","invertBy","invoke","invokeMap","isEqual","isMatch","join","keyBy","lastIndexOf","lt","lte","map","mapKeys","mapValues","matchesProperty","maxBy","meanBy","merge","mergeAllWith","minBy","multiply","nth","omit","omitBy","overArgs","pad","padEnd","padStart","parseInt","partial","partialRight","partition","pick","pickBy","propertyOf","pull","pullAll","pullAt","random","range","rangeRight","rearg","reject","remove","repeat","restFrom","result","sampleSize","some","sortBy","sortedIndex","sortedIndexOf","sortedLastIndex","sortedLastIndexOf","sortedUniqBy","split","spreadFrom","startsWith","subtract","sumBy","take","takeRight","takeRightWhile","takeWhile","tap","throttle","thru","times","trimChars","trimCharsEnd","trimCharsStart","truncate","union","uniqBy","uniqWith","unset","unzipWith","without","wrap","xor","zip","zipObject","zipObjectDeep"],3:["assignInWith","assignWith","clamp","differenceBy","differenceWith","findFrom","findIndexFrom","findLastFrom","findLastIndexFrom","getOr","includesFrom","indexOfFrom","inRange","intersectionBy","intersectionWith","invokeArgs","invokeArgsMap","isEqualWith","isMatchWith","flatMapDepth","lastIndexOfFrom","mergeWith","orderBy","padChars","padCharsEnd","padCharsStart","pullAllBy","pullAllWith","rangeStep","rangeStepRight","reduce","reduceRight","replace","set","slice","sortedIndexBy","sortedLastIndexBy","transform","unionBy","unionWith","update","xorBy","xorWith","zipWith"],4:["fill","setWith","updateWith"]},t.aryRearg={2:[1,0],3:[2,0,1],4:[3,2,0,1]},t.iterateeAry={dropRightWhile:1,dropWhile:1,every:1,filter:1,find:1,findFrom:1,findIndex:1,findIndexFrom:1,findKey:1,findLast:1,findLastFrom:1,findLastIndex:1,findLastIndexFrom:1,findLastKey:1,flatMap:1,flatMapDeep:1,flatMapDepth:1,forEach:1,forEachRight:1,forIn:1,forInRight:1,forOwn:1,forOwnRight:1,map:1,mapKeys:1,mapValues:1,partition:1,reduce:2,reduceRight:2,reject:1,remove:1,some:1,takeRightWhile:1,takeWhile:1,times:1,transform:2},t.iterateeRearg={mapKeys:[1]},t.methodRearg={assignInAllWith:[1,0],assignInWith:[1,2,0],assignAllWith:[1,0],assignWith:[1,2,0],differenceBy:[1,2,0],differenceWith:[1,2,0],getOr:[2,1,0],intersectionBy:[1,2,0],intersectionWith:[1,2,0],isEqualWith:[1,2,0],isMatchWith:[2,1,0],mergeAllWith:[1,0],mergeWith:[1,2,0],padChars:[2,1,0],padCharsEnd:[2,1,0],padCharsStart:[2,1,0],pullAllBy:[2,1,0],pullAllWith:[2,1,0],rangeStep:[1,2,0],rangeStepRight:[1,2,0],setWith:[3,1,2,0],sortedIndexBy:[2,1,0],sortedLastIndexBy:[2,1,0],unionBy:[1,2,0],unionWith:[1,2,0],updateWith:[3,1,2,0],xorBy:[1,2,0],xorWith:[1,2,0],zipWith:[1,2,0]},t.methodSpread={assignAll:{start:0},assignAllWith:{start:0},assignInAll:{start:0},assignInAllWith:{start:0},defaultsAll:{start:0},defaultsDeepAll:{start:0},invokeArgs:{start:2},invokeArgsMap:{start:2},mergeAll:{start:0},mergeAllWith:{start:0},partial:{start:1},partialRight:{start:1},without:{start:1},zipAll:{start:0}},t.mutate={array:{fill:!0,pull:!0,pullAll:!0,pullAllBy:!0,pullAllWith:!0,pullAt:!0,remove:!0,reverse:!0},object:{assign:!0,assignAll:!0,assignAllWith:!0,assignIn:!0,assignInAll:!0,assignInAllWith:!0,assignInWith:!0,assignWith:!0,defaults:!0,defaultsAll:!0,defaultsDeep:!0,defaultsDeepAll:!0,merge:!0,mergeAll:!0,mergeAllWith:!0,mergeWith:!0},set:{set:!0,setWith:!0,unset:!0,update:!0,updateWith:!0}},t.placeholder={bind:!0,bindKey:!0,curry:!0,curryRight:!0,partial:!0,partialRight:!0},t.realToAlias=function(){var e=Object.prototype.hasOwnProperty,n=t.aliasToReal,a={};for(var r in n){var i=n[r];e.call(a,i)?a[i].push(r):a[i]=[r]}return a}(),t.remap={assignAll:"assign",assignAllWith:"assignWith",assignInAll:"assignIn",assignInAllWith:"assignInWith",curryN:"curry",curryRightN:"curryRight",defaultsAll:"defaults",defaultsDeepAll:"defaultsDeep",findFrom:"find",findIndexFrom:"findIndex",findLastFrom:"findLast",findLastIndexFrom:"findLastIndex",getOr:"get",includesFrom:"includes",indexOfFrom:"indexOf",invokeArgs:"invoke",invokeArgsMap:"invokeMap",lastIndexOfFrom:"lastIndexOf",mergeAll:"merge",mergeAllWith:"mergeWith",padChars:"pad",padCharsEnd:"padEnd",padCharsStart:"padStart",propertyOf:"get",rangeStep:"range",rangeStepRight:"rangeRight",restFrom:"rest",spreadFrom:"spread",trimChars:"trim",trimCharsEnd:"trimEnd",trimCharsStart:"trimStart",zipAll:"zip"},t.skipFixed={castArray:!0,flow:!0,flowRight:!0,iteratee:!0,mixin:!0,rearg:!0,runInContext:!0},t.skipRearg={add:!0,assign:!0,assignIn:!0,bind:!0,bindKey:!0,concat:!0,difference:!0,divide:!0,eq:!0,gt:!0,gte:!0,isEqual:!0,lt:!0,lte:!0,matchesProperty:!0,merge:!0,multiply:!0,overArgs:!0,partial:!0,partialRight:!0,propertyOf:!0,random:!0,range:!0,rangeRight:!0,subtract:!0,zip:!0,zipObject:!0,zipObjectDeep:!0}},function(e,t,n){e.exports={ary:n(363),assign:n(61),clone:n(364),curry:n(366),forEach:n(37),isArray:n(3),isFunction:n(30),iteratee:n(377),keys:n(66),rearg:n(382),toInteger:n(96),toPath:n(386)}},function(e,t,n){function a(e,t,n){return r(i,e,t,n)}var r=n(368),i=n(370);e.exports=a},function(e,t,n){var a=n(371),r=a("merge",n(379));r.placeholder=n(94),e.exports=r},function(e,t,n){function a(e,t,n){var a=null==e?void 0:r(e,t);return void 0===a?n:a}var r=n(63);e.exports=a},function(e,t,n){function a(e,t){return null!=e&&i(e,t,r)}var r=n(275),i=n(321);e.exports=a},function(e,t,n){function a(e){return i(e)&&r(e)}var r=n(28),i=n(5);e.exports=a},function(e,t,n){function a(e){if(!o(e)||r(e)!=s)return!1;var t=i(e);if(null===t)return!0;var n=c.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&l.call(n)==h}var r=n(11),i=n(43),o=n(5),s="[object Object]",d=Function.prototype,u=Object.prototype,l=d.toString,c=u.hasOwnProperty,h=l.call(Object);e.exports=a},function(e,t,n){function a(e){return i("function"==typeof e?e:r(e,o))}var r=n(62),i=n(283),o=1;e.exports=a},function(e,t,n){function a(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(i);var n=function(){var a=arguments,r=t?t.apply(this,a):a[0],i=n.cache;if(i.has(r))return i.get(r);var o=e.apply(this,a);return n.cache=i.set(r,o)||i,o};return n.cache=new(a.Cache||r),n}var r=n(35),i="Expected a function";a.Cache=r,e.exports=a},function(e,t,n){var a=n(287),r=n(306),i=r(function(e,t,n){a(e,t,n)});e.exports=i},function(e,t){function n(){}e.exports=n},function(e,t,n){function a(e){return o(e)?r(s(e)):i(e)}var r=n(289),i=n(290),o=n(45),s=n(14);e.exports=a},function(e,t,n){var a=n(42),r=n(313),i=256,o=r(function(e,t){return a(e,i,void 0,void 0,void 0,t)});e.exports=o},function(e,t){function n(){return!1}e.exports=n},function(e,t,n){function a(e){if(!e)return 0===e?e:0;if(e=r(e),e===i||e===-i){var t=e<0?-1:1;return t*o}return e===e?e:0}var r=n(385),i=1/0,o=1.7976931348623157e308;e.exports=a},function(e,t,n){function a(e){if("number"==typeof e)return e;if(i(e))return o;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(s,"");var n=u.test(e);return n||l.test(e)?c(e.slice(2),n?2:8):d.test(e)?o:+e}var r=n(4),i=n(16),o=NaN,s=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,l=/^0o[0-7]+$/i,c=parseInt;e.exports=a},function(e,t,n){function a(e){return o(e)?r(e,u):s(e)?[e]:i(d(l(e)))}var r=n(57),i=n(12),o=n(3),s=n(16),d=n(92),u=n(14),l=n(97);e.exports=a},function(e,t,n){function a(e){return r(e,i(e))}var r=n(13),i=n(31);e.exports=a},function(e,t,n){function a(e){if(d(e)&&!s(e)&&!(e instanceof r)){if(e instanceof i)return e;if(c.call(e,"__wrapped__"))return u(e)}return new i(e)}var r=n(33),i=n(53),o=n(40),s=n(3),d=n(5),u=n(362),l=Object.prototype,c=l.hasOwnProperty;a.prototype=o.prototype,a.prototype.constructor=a,e.exports=a},function(e,t,n){function a(e){return n(r(e))}function r(e){return i[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var i={"./af":98,"./af.js":98,"./ar":104,"./ar-dz":99,"./ar-dz.js":99,"./ar-ly":100,"./ar-ly.js":100,"./ar-ma":101,"./ar-ma.js":101,"./ar-sa":102,"./ar-sa.js":102,"./ar-tn":103,"./ar-tn.js":103,"./ar.js":104,"./az":105,"./az.js":105,"./be":106,"./be.js":106,"./bg":107,"./bg.js":107,"./bn":108,"./bn.js":108,"./bo":109,"./bo.js":109,"./br":110,"./br.js":110,"./bs":111,"./bs.js":111,"./ca":112,"./ca.js":112,"./cs":113,"./cs.js":113,"./cv":114,"./cv.js":114,"./cy":115,
	"./cy.js":115,"./da":116,"./da.js":116,"./de":118,"./de-at":117,"./de-at.js":117,"./de.js":118,"./dv":119,"./dv.js":119,"./el":120,"./el.js":120,"./en-au":121,"./en-au.js":121,"./en-ca":122,"./en-ca.js":122,"./en-gb":123,"./en-gb.js":123,"./en-ie":124,"./en-ie.js":124,"./en-nz":125,"./en-nz.js":125,"./eo":126,"./eo.js":126,"./es":128,"./es-do":127,"./es-do.js":127,"./es.js":128,"./et":129,"./et.js":129,"./eu":130,"./eu.js":130,"./fa":131,"./fa.js":131,"./fi":132,"./fi.js":132,"./fo":133,"./fo.js":133,"./fr":136,"./fr-ca":134,"./fr-ca.js":134,"./fr-ch":135,"./fr-ch.js":135,"./fr.js":136,"./fy":137,"./fy.js":137,"./gd":138,"./gd.js":138,"./gl":139,"./gl.js":139,"./he":140,"./he.js":140,"./hi":141,"./hi.js":141,"./hr":142,"./hr.js":142,"./hu":143,"./hu.js":143,"./hy-am":144,"./hy-am.js":144,"./id":145,"./id.js":145,"./is":146,"./is.js":146,"./it":147,"./it.js":147,"./ja":148,"./ja.js":148,"./jv":149,"./jv.js":149,"./ka":150,"./ka.js":150,"./kk":151,"./kk.js":151,"./km":152,"./km.js":152,"./ko":153,"./ko.js":153,"./ky":154,"./ky.js":154,"./lb":155,"./lb.js":155,"./lo":156,"./lo.js":156,"./lt":157,"./lt.js":157,"./lv":158,"./lv.js":158,"./me":159,"./me.js":159,"./mi":160,"./mi.js":160,"./mk":161,"./mk.js":161,"./ml":162,"./ml.js":162,"./mr":163,"./mr.js":163,"./ms":165,"./ms-my":164,"./ms-my.js":164,"./ms.js":165,"./my":166,"./my.js":166,"./nb":167,"./nb.js":167,"./ne":168,"./ne.js":168,"./nl":170,"./nl-be":169,"./nl-be.js":169,"./nl.js":170,"./nn":171,"./nn.js":171,"./pa-in":172,"./pa-in.js":172,"./pl":173,"./pl.js":173,"./pt":175,"./pt-br":174,"./pt-br.js":174,"./pt.js":175,"./ro":176,"./ro.js":176,"./ru":177,"./ru.js":177,"./se":178,"./se.js":178,"./si":179,"./si.js":179,"./sk":180,"./sk.js":180,"./sl":181,"./sl.js":181,"./sq":182,"./sq.js":182,"./sr":184,"./sr-cyrl":183,"./sr-cyrl.js":183,"./sr.js":184,"./ss":185,"./ss.js":185,"./sv":186,"./sv.js":186,"./sw":187,"./sw.js":187,"./ta":188,"./ta.js":188,"./te":189,"./te.js":189,"./tet":190,"./tet.js":190,"./th":191,"./th.js":191,"./tl-ph":192,"./tl-ph.js":192,"./tlh":193,"./tlh.js":193,"./tr":194,"./tr.js":194,"./tzl":195,"./tzl.js":195,"./tzm":197,"./tzm-latn":196,"./tzm-latn.js":196,"./tzm.js":197,"./uk":198,"./uk.js":198,"./uz":199,"./uz.js":199,"./vi":200,"./vi.js":200,"./x-pseudo":201,"./x-pseudo.js":201,"./yo":202,"./yo.js":202,"./zh-cn":203,"./zh-cn.js":203,"./zh-hk":204,"./zh-hk.js":204,"./zh-tw":205,"./zh-tw.js":205};a.keys=function(){return Object.keys(i)},a.resolve=r,e.exports=a,a.id=389}])});
	//# sourceMappingURL=vue-chartjs.js.map

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['stock'],
	  template: '<li> \
	              <a v-on:click="viewDetails">{{ stock.name }} is worth ${{stock.price}}.00 and you own {{ stock.amount }} shares. Growth rate: {{stock.growth}}%.</a> \
	              <button v-on:click="buy">Buy</button> \
	              <button v-on:click="sell">Sell</button> \
	              <button v-on:click="viewDetails">Details</button> \
	            </li>',
	  methods: {
	    buy: function buy() {
	      if (this.$parent.money > this.stock.price) {
	        this.$parent.money -= this.stock.price;
	        this.stock.amount += 1;
	      }
	    },
	    sell: function sell() {
	      if (this.stock.amount > 0 && this.stock.price > 0) {
	        this.$parent.money += this.stock.price;
	        this.stock.amount -= 1;
	      }
	    },
	    viewDetails: function viewDetails() {
	      return this.$parent.updateLineChart(this.stock.historic_prices);
	    }
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['netWorth'],
	  template: '<span> Net worth: ${{netWorth}}</span>',
	  created: function created() {
	    this.getNetWorth();
	  },
	  methods: {
	    getNetWorth: function getNetWorth() {

	      var stockValue = 0;
	      var stocksArray = this.$parent.stocks;
	      for (var i = 0; i < stocksArray.length; i++) {
	        stockValue += stocksArray[i].price * stocksArray[i].amount;
	      }

	      this.$parent.netWorth = this.$parent.money + stockValue - this.$parent.loaned;
	    }
	  }
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['id'],
	  template: '<form v-on:submit.prevent="sendMessage"> \
	              <input v-model="message" /> \
	              <button>Send Message</button> \
	            </form>',
	  created: function created() {
	    console.log("created");
	    console.log(this);
	  },
	  methods: {
	    sendMessage: function sendMessage() {
	      console.log(this);
	      this.$parent.messages.push({ content: this.message, sender: this.id });
	    }
	  },
	  data: function data() {
	    return {
	      message: this.message,
	      sender: this.id
	    };
	  }
	};

/***/ }
/******/ ]);