/**
 * @flow
 * @relayHash e65835513d2d9039124e88d1e7ff60d2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type User$ref = any;
export type UsersQueryVariables = {||};
export type UsersQueryResponse = {|
  +userLibrary: ?{|
    +usersConnection: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +$fragmentRefs: User$ref
      |}>
    |}
  |}
|};
export type UsersQuery = {|
  variables: UsersQueryVariables,
  response: UsersQueryResponse,
|};
*/


/*
query UsersQuery {
  userLibrary {
    usersConnection {
      edges {
        ...User
      }
    }
    id
  }
}

fragment User on UserEdge {
  node {
    id
    mobile
    reg
    last
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
  "name": "UsersQuery",
  "id": null,
  "text": "query UsersQuery {\n  userLibrary {\n    usersConnection {\n      edges {\n        ...User\n      }\n    }\n    id\n  }\n}\n\nfragment User on UserEdge {\n  node {\n    id\n    mobile\n    reg\n    last\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "UsersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userLibrary",
        "storageKey": null,
        "args": null,
        "concreteType": "UsersLibrary",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "usersConnection",
            "storageKey": null,
            "args": null,
            "concreteType": "UserConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "UserEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "User",
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
    "name": "UsersQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userLibrary",
        "storageKey": null,
        "args": null,
        "concreteType": "UsersLibrary",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "usersConnection",
            "storageKey": null,
            "args": null,
            "concreteType": "UserConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "UserEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      v0,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "mobile",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "reg",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "last",
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
(node/*: any*/).hash = '21684f4070de6fea93732242df54335d';
module.exports = node;
