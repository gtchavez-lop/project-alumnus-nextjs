import { getAuth } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import firebaseApp from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import _ApolloClient from '../apolloClient';
import { gql } from '@apollo/client';
import { motion } from 'framer-motion';
import { CgSpinner } from 'react-icons/cg';

export const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

const UserDataProvider = ({ children }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [userData, setUserData] = useState({});
	const [hasUserData, setHasUserData] = useState(false);
	const [auth_user, auth_loading, auth_error] = useAuthState(
		getAuth(firebaseApp)
	);

	const values = {
		userData,
		setUserData,
		auth_user,
		auth_loading,
		auth_error,
		hasUserData,
	};

	const fetchQuery = gql`
		{
			alumniLists {
				id
				surname
				givenName
				middleInitial
				alumniDisplayPhoto {
					url
				}
				birthDate
				createdAt
				slug
				currentEmail
				currentLocation
				programCompleted
				graduationDate
				isCurrentlyWorking
				company
				workPosition
				merchCart {
					merchName
					merchImage {
						id
					}
					merchPrice
				}
			}
		}
	`;

	const fetchData = async (e) => {
		const { data } = await _ApolloClient.query({
			query: fetchQuery,
		});

		// filter the data to only include the user's data
		const localData = data.alumniLists.filter(
			(user) => user.currentEmail === auth_user.email
		);
		setUserData(localData[0]);
		setHasUserData(true);
	};

	useEffect(() => {
		if (auth_user) {
			fetchData();
		}
		setIsLoaded(true);
	}, [auth_user]);

	return (
		<UserDataContext.Provider value={values}>
			{isLoaded ? (
				children
			) : (
				<div className="flex h-screen w-screen flex-col items-center justify-center bg-base-100">
					<p className="mb-5 text-lg font-bold">Please Standby</p>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ ease: 'linear', repeat: Infinity, duration: 1 }}>
						<CgSpinner size={50} />
					</motion.div>
				</div>
			)}
		</UserDataContext.Provider>
	);
};

export default UserDataProvider;
