/**
 * @flow
 * @relayHash 8e436996f81d8d776df4a9ee3ee5b6a0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Foods$ref = any;
export type HomeExpiryQueryVariables = {||};
export type HomeExpiryQueryResponse = {|
  +expiry: ?{|
    +foodsConnection: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +$fragmentRefs: Foods$ref
      |}>
    |}
  |}
|};
export type HomeExpiryQuery = {|
  variables: HomeExpiryQueryVariables,
  response: HomeExpiryQueryResponse,
|};
*/


/*
query HomeExpiryQuery {
  expiry {
    foodsConnection {
      edges {
        ...Foods
      }
    }
    id
  }
}

fragment Foods on FoodEdge {
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "HomeExpiryQuery",
  "id": null,
  "text": "query HomeExpiryQuery {\n  expiry {\n    foodsConnection {\n      edges {\n        ...Foods\n      }\n    }\n    id\n  }\n}\n\nfragment Foods on FoodEdge {\n  node {\n    id\n    name\n    type\n    expiry\n    cover\n    keywords\n    days\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "HomeExpiryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "expiry",
        "storageKey": null,
        "args": null,
        "concreteType": "ExpiryLibrary",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "foodsConnection",
            "storageKey": null,
            "args": null,
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
                    "name": "Foods",
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
    "name": "HomeExpiryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "expiry",
        "storageKey": null,
        "args": null,
        "concreteType": "ExpiryLibrary",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "foodsConnection",
            "storageKey": null,
            "args": null,
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
                      v0,
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
          v0
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0a964331d0262bf6aee721df510033df';
module.exports = node;
