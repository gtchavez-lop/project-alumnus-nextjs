import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './_Supabase';

const AlumniListContext = createContext();

export const AlumniListContextWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [alumniList, setAlumniList] = useState([]);

  const fetchData = async (e) => {
    const { data, error } = await supabase
      .from('Alumni List')
      .select('*')
      .eq('isVerified', true)
      .order('surname', { ascending: true })
      .limit(20);
    setAlumniList(data);
    setLoaded(true);
  };

  useEffect((e) => {
    fetchData();
  }, []);

  let sharedState = {
    alumniListLoaded: loaded,
    alumniList,
  };

  return (
    <AlumniListContext.Provider value={sharedState}>
      {children}
    </AlumniListContext.Provider>
  );
};

export const useAlumniListContext = (e) => {
  return useContext(AlumniListContext);
};
