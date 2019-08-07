/**
 * @flow
 * @relayHash f43a0b2aa2d5ad6746c32c7839bd9a71
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Item$ref = any;
export type ItemContainerQueryVariables = {||};
export type ItemContainerQueryResponse = {|
  +foodLibrary: ?{|
    +foodsConnection: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +$fragmentRefs: Item$ref
      |}>
    |}
  |}
|};
export type ItemContainerQuery = {|
  variables: ItemContainerQueryVariables,
  response: ItemContainerQueryResponse,
|};
*/


/*
query ItemContainerQuery {
  foodLibrary {
    foodsConnection {
      edges {
        ...Item
      }
    }
    id
  }
}

fragment Item on FoodEdge {
  node {
    id
    name
    type
    expiry
    cover
    keywords
    days
    create
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
  "name": "ItemContainerQuery",
  "id": null,
  "text": "query ItemContainerQuery {\n  foodLibrary {\n    foodsConnection {\n      edges {\n        ...Item\n      }\n    }\n    id\n  }\n}\n\nfragment Item on FoodEdge {\n  node {\n    id\n    name\n    type\n    expiry\n    cover\n    keywords\n    days\n    create\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ItemContainerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "foodLibrary",
        "storageKey": null,
        "args": null,
        "concreteType": "FoodsLibrary",
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
                    "name": "Item",
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
    "name": "ItemContainerQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "foodLibrary",
        "storageKey": null,
        "args": null,
        "concreteType": "FoodsLibrary",
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
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "create",
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
(node/*: any*/).hash = '8d6f1b1c3114b8f243785b8a35430471';
module.exports = node;
