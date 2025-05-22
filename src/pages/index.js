// app/page.js

import { redirect } from 'next/navigation';

export default function Home() {
  // This is a server component, so redirect works here
  redirect('/dashboard'); // or /auth/login if login page exists
}
