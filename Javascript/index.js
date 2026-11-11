// QUESTION 1.
function deepEqual(objA, objB) {
  // 1. Check if both are strictly equal (handles primitives and same object reference)
  if (objA === objB) {
    return true;
  }

  // 2. Check if either is null or not an object (typeof null is 'object')
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  // 3. Get keys of both objects
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 4. Check if the number of keys matches
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 5. Recursively check every key and value
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}


// QUESTION 2.
function diffObjects(oldObj, newObj) {
  const added = {};
  const removed = {};
  const changed = {};

  // Find added and changed keys
  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      if (!(key in oldObj)) {
        added[key] = newObj[key];
      } else if (oldObj[key] !== newObj[key]) {
        changed[key] = {
          oldValue: oldObj[key],
          newValue: newObj[key]
        };
      }
    }
  }

  // Find removed keys
  for (const key in oldObj) {
    if (Object.prototype.hasOwnProperty.call(oldObj, key)) {
      if (!(key in newObj)) {
        removed[key] = oldObj[key];
      }
    }
  }

  return { added, removed, changed };
}

// QUESTION 3.
function deepFreeze(object) {
  // Retrieve property names defined on the object
  const propNames = Reflect.ownKeys(object);

  // Freeze nested properties before freezing the object itself
  for (const name of propNames) {
    const value = object[name];
    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

// QUESTION 4.
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    get value() {
      return count;
    }
  };
}


// 5.
function validateSchema(obj, schema) {
  const errors = [];

  for (const [key, rules] of Object.entries(schema)) {
    const value = obj[key];

    // 1. Check if a required field is missing
    if (rules.required && (value === undefined || value === null || value === "")) {
      errors.push(`${key} is required.`);
      continue;
    }

    // 2. Skip type checking if the optional field was not provided
    if (value === undefined || value === null) {
      continue;
    }

    // 3. Check if the value's type matches the schema
    if (rules.type && typeof value !== rules.type) {
      errors.push(`${key} must be of type ${rules.type}, got ${typeof value}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

