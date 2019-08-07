/**
 * @flow
 * @relayHash f503ec327736252e05e5ea58e2097f03
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type modifyFoodMutationInput = {
  id?: ?string,
  name?: ?string,
  type?: ?string,
  expiry?: ?string,
  keywords?: ?string,
  clientMutationId?: ?string,
};
export type ModifyFoodMutationVariables = {|
  input: modifyFoodMutationInput
|};
export type ModifyFoodMutationResponse = {|
  +modifyFood: ?{|
    +result: ?{|
      +result: ?string
    |}
  |}
|};
export type ModifyFoodMutation = {|
  variables: ModifyFoodMutationVariables,
  response: ModifyFoodMutationResponse,
|};
*/


/*
mutation ModifyFoodMutation(
  $input: modifyFoodMutationInput!
) {
  modifyFood(input: $input) {
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
    "type": "modifyFoodMutationInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "modifyFoodMutationInput!"
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
  "name": "ModifyFoodMutation",
  "id": null,
  "text": "mutation ModifyFoodMutation(\n  $input: modifyFoodMutationInput!\n) {\n  modifyFood(input: $input) {\n    result {\n      result\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ModifyFoodMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "modifyFood",
        "storageKey": null,
        "args": v1,
        "concreteType": "modifyFoodMutationPayload",
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
    "name": "ModifyFoodMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "modifyFood",
        "storageKey": null,
        "args": v1,
        "concreteType": "modifyFoodMutationPayload",
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
(node/*: any*/).hash = 'f17426f2ecd023cd9ea942206488e735';
module.exports = node;
