import React from 'react';
import { useSession } from '../src/contexts/sessions/UseSessionHook';
import Account from '../components/auth/Account';

export default function Settings() {

const session = useSession();
  return (
    <Account session={session} />
  );
}