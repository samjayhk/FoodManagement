/**
 * @flow
 * @relayHash f45b671598a73b1d84183d5b83a152c2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type removeFoodMutationInput = {
  id?: ?string,
  clientMutationId?: ?string,
};
export type RemoveFoodMutationVariables = {|
  input: removeFoodMutationInput
|};
export type RemoveFoodMutationResponse = {|
  +removeFood: ?{|
    +result: ?{|
      +result: ?string
    |}
  |}
|};
export type RemoveFoodMutation = {|
  variables: RemoveFoodMutationVariables,
  response: RemoveFoodMutationResponse,
|};
*/


/*
mutation RemoveFoodMutation(
  $input: removeFoodMutationInput!
) {
  removeFood(input: $input) {
    result {
      result
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "removeFoodMutationInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "removeFoodMutationInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "result",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "RemoveFoodMutation",
  "id": null,
  "text": "mutation RemoveFoodMutation(\n  $input: removeFoodMutationInput!\n) {\n  removeFood(input: $input) {\n    result {\n      result\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RemoveFoodMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "removeFood",
        "storageKey": null,
        "args": v1,
        "concreteType": "removeFoodMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "result",
            "storageKey": null,
            "args": null,
            "concreteType": "FoodType",
            "plural": false,
            "selections": [
              v2
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RemoveFoodMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "removeFood",
        "storageKey": null,
        "args": v1,
        "concreteType": "removeFoodMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "result",
            "storageKey": null,
            "args": null,
            "concreteType": "FoodType",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '98ae85dc46ecc973d8b680a416c427e8';
module.exports = node;
