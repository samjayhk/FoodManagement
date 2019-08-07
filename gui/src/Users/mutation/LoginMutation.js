import { commitMutation, graphql } from "react-relay";
import environment from "../../Environment";

const mutation = graphql`
  mutation LoginMutation($input: loginMutationInput!) {
    login(input: $input) {
		result {
			 id
			 result
			 token
		}
    }
  }
`;

export const LoginMutation = (mobile, password) =>
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
				if (response.login.result.result != 'false') {
					localStorage.setItem('food-token', response.login.result.token)
					return resolve(response);
				} else {
					return resolve(response);
				}
			},
			onError: err => console.log('Failed to login. Please try again.')
		  });
	});