import { commitMutation, graphql } from "react-relay";
import environment from "../../Environment";

const mutation = graphql`
  mutation UploadMutation($input: createFoodMutationInput!) {
    createFood(input: $input) {
		result {
			result
			name
		}
    }
  }
`;

export const UploadMutation = (name, type, expiry, keywords, cover) =>
	new Promise((resolve, reject) => {
	  const variables = {
		input: {
		  name,
		  type,
		  expiry,
		  keywords,
		  cover
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