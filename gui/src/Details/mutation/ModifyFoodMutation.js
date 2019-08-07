import { commitMutation, graphql } from "react-relay";
import environment from "../../Environment";

const mutation = graphql`
  mutation ModifyFoodMutation($input: modifyFoodMutationInput!) {
    modifyFood(input: $input) {
		result {
			result
		}
    }
  }
`;

export const ModifyFoodMutation = (id, name, type, expiry, keywords) =>
	new Promise((resolve, reject) => {
		  const variables = {
			input: {
			  id,
			  name,
			  type,
			  expiry,
			  keywords
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