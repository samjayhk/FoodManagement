import { commitMutation, graphql } from "react-relay";
import environment from "../../Environment";

const mutation = graphql`
  mutation RemoveFoodMutation($input: removeFoodMutationInput!) {
  removeFood(input: $input) {
    result {
      result
    }
  }
} 
`;

export const RemoveFoodMutation = (id) =>
	new Promise((resolve, reject) => {
		  const variables = {
			input: {
			  id
			}
		  };
		  commitMutation(environment, {
			mutation,
			variables,
			onCompleted: (response, errors) => {
				return resolve(response)
			},
			onError: err => console.log('Failed to login. Please try again.')
		  });
	});