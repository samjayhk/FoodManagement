/**
 * @flow
 * @relayHash 0da67931aaf10efc17be93f1bced2910
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type createFoodMutationInput = {
  name?: ?string,
  type?: ?string,
  expiry?: ?string,
  keywords?: ?string,
  cover?: ?string,
  clientMutationId?: ?string,
};
export type UploadMutationVariables = {|
  input: createFoodMutationInput
|};
export type UploadMutationResponse = {|
  +createFood: ?{|
    +result: ?{|
      +result: ?string,
      +name: ?string,
    |}
  |}
|};
export type UploadMutation = {|
  variables: UploadMutationVariables,
  response: UploadMutationResponse,
|};
*/


/*
mutation UploadMutation(
  $input: createFoodMutationInput!
) {
  createFood(input: $input) {
    result {
      result
      name
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
    "type": "createFoodMutationInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "createFoodMutationInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "result",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "UploadMutation",
  "id": null,
  "text": "mutation UploadMutation(\n  $input: createFoodMutationInput!\n) {\n  createFood(input: $input) {\n    result {\n      result\n      name\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "UploadMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createFood",
        "storageKey": null,
        "args": v1,
        "concreteType": "createFoodMutationPayload",
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
              v3
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UploadMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createFood",
        "storageKey": null,
        "args": v1,
        "concreteType": "createFoodMutationPayload",
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
              v3,
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
(node/*: any*/).hash = '945dbab9a48d61ab73a1cff71bc1065b';
module.exports = node;
