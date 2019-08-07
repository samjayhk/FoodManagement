/**
 * @flow
 * @relayHash bbc4fbf561afcbda145f8452c04b3f2c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Food$ref = any;
export type LastExpiryQueryVariables = {||};
export type LastExpiryQueryResponse = {|
  +expiry: ?{|
    +foodsConnection: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +$fragmentRefs: Food$ref
      |}>
    |}
  |}
|};
export type LastExpiryQuery = {|
  variables: LastExpiryQueryVariables,
  response: LastExpiryQueryResponse,
|};
*/


/*
query LastExpiryQuery {
  expiry {
    foodsConnection {
      edges {
        ...Food
      }
    }
    id
  }
}

fragment Food on FoodEdge {
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
  "name": "LastExpiryQuery",
  "id": null,
  "text": "query LastExpiryQuery {\n  expiry {\n    foodsConnection {\n      edges {\n        ...Food\n      }\n    }\n    id\n  }\n}\n\nfragment Food on FoodEdge {\n  node {\n    id\n    name\n    type\n    expiry\n    cover\n    keywords\n    days\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LastExpiryQuery",
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
                    "name": "Food",
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
    "name": "LastExpiryQuery",
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
(node/*: any*/).hash = '83bb8accd09fa3889c5f31c0e5c7ee53';
module.exports = node;
