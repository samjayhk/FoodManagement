import { commitMutation, graphql } from "react-relay";
import environment from "../../Environment";

const mutation = graphql`
  mutation RegisterMutation($input: registerMutationInput!) {
    registration(input: $input) {
		result {
			 result
		}
    }
  }
`;

export const RegisterMutation = (mobile, password) =>
	new Promise((resolve, reject) => {
		  const variables = {
			input: {
			  mobile,
			  password
			}
		  };
		  
		 commitMutation(environment, {
			mutation,
			variables,
			onCompleted: (response, errors) => {
				return resolve(response);
			},
			onError: err => console.log('Failed registration. Please try again.')
		  });
	});
