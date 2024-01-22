import React, { useState, useEffect } from 'react';
import { profile } from "../services/user.service";
import Register from './Register';

interface Account {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  town: string;
  postalCode: string;
  streetName: string;
  houseNumber: string;
}

const Profile: React.FC = () => {

  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const result = await profile();
        setAccount(result);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Register account={account} />
  );
};

export default Profile;
