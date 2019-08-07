/**
 * @flow
 * @relayHash 714271af886af7d10fc847c970baa226
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FoodDetails$ref = any;
export type DetailsQueryVariables = {|
  id: string
|};
export type DetailsQueryResponse = {|
  +selectFood: ?{|
    +foodsConnection: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +$fragmentRefs: FoodDetails$ref
      |}>
    |}
  |}
|};
export type DetailsQuery = {|
  variables: DetailsQueryVariables,
  response: DetailsQueryResponse,
|};
*/


/*
query DetailsQuery(
  $id: String!
) {
  selectFood {
    foodsConnection(id: $id) {
      edges {
        ...FoodDetails
      }
    }
    id
  }
}

fragment FoodDetails on FoodEdge {
  node {
    id
    name
    type
    expiry
    cover
    keywords
    days
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "DetailsQuery",
  "id": null,
  "text": "query DetailsQuery(\n  $id: String!\n) {\n  selectFood {\n    foodsConnection(id: $id) {\n      edges {\n        ...FoodDetails\n      }\n    }\n    id\n  }\n}\n\nfragment FoodDetails on FoodEdge {\n  node {\n    id\n    name\n    type\n    expiry\n    cover\n    keywords\n    days\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "DetailsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "selectFood",
        "storageKey": null,
        "args": null,
        "concreteType": "SelectLibrary",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "foodsConnection",
            "storageKey": null,
            "args": v1,
            "concreteType": "FoodConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FoodEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "FoodDetails",
                    "args": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DetailsQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "selectFood",
        "storageKey": null,
        "args": null,
        "concreteType": "SelectLibrary",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "foodsConnection",
            "storageKey": null,
            "args": v1,
            "concreteType": "FoodConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FoodEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FoodType",
                    "plural": false,
                    "selections": [
                      v2,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "type",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "expiry",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cover",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "keywords",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "days",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a866c22e8a854528e2fd357ef404bf40';
module.exports = node;
