import { getAuth } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import firebaseApp from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import _ApolloClient from '../apolloClient';
import { gql } from '@apollo/client';
import { motion } from 'framer-motion';
import { CgSpinner } from 'react-icons/cg';
import { getAlumniList } from '../pages/api/alumniList';

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

	const fetchData = async (e) => {
		try {
			const response = await fetch('/api/alumniList');
			const { alumniLists } = await response.json();

			// filter the data to only include the user's data
			const localData = alumniLists.filter(
				(user) => user.currentEmail === auth_user.email
			);
			setUserData(localData[0]);
			setHasUserData(true);
		} catch (error) {
			console.log(error);
		}
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
