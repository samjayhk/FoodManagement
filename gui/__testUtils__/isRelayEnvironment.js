'use strict';

function isRelayEnvironment(environment: mixed): boolean {
  return (
    typeof environment === 'object' &&
    environment !== null &&
   
	typeof environment.check === 'function' &&
    typeof environment.lookup === 'function' &&
    typeof environment.retain === 'function' &&
    typeof environment.sendQuery === 'function' &&
    typeof environment.execute === 'function' &&
    typeof environment.subscribe === 'function'
  );
}

module.exports = isRelayEnvironment;