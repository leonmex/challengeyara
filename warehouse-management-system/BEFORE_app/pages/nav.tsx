import Navbar from './Components/navbar';
import { auth } from './auth';
import { getServerSession } from 'next-auth';

import NextAuth from "next-auth";

export default async function Nav() {
  const session = await getServerSession(auth);
  return <Navbar  user={{}}/>;
}
