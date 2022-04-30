import { ApolloCLient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: process.env.GraphCMS_ContentAPI,
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${process.env.GraphCMS_MutationToken}`,
		},
	};
});

const client = new ApolloCLient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// post request
export const postUserData = async ({
	surname,
	givenName,
	middleInitial,
	currentEmail,
	curentLocation,
	programCompleted,
	isCurrentlyWorking,
	company,
	workPosition,
	graduationDate,
	birthDate,
}) => {
	const response = await client.mutate({
		mutation: gql`
            mutation GenerateAlumni {
                createAlumniList(
                    data: { 
                        surname: "${surname}", 
                        givenName: "${givenName}", 
                        middleInitial: "${middleInitial}", 
                        slug: "", 
                        currentEmail: "testuser@mail.com", 
                        currentLocation: "Caloocan City", 
                        programCompleted: "BS Computer Science", 
                        isCurrentlyWorking: false, 
                        company: "", 
                        workPosition: "", 
                        graduationDate: "1999-10-23", 
                        isVerified: false, 
                        birthDate: "1999-10-23"
                    }
                ) {
                    id
                }
            }
        `,
		variables: {
			data,
		},
	});

	return response;
};
