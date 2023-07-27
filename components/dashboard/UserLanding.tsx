import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import ItemsCard from '../cards/dashboard-cards/ItemsCard';
import React from 'react';

type Props = {
    user: User
}

function Landing(props: Props) {
    const router = useRouter();
  
    return (
        <section>
            <div className="py-8 px-8">
                <h1 className="text-2xl font-bold mb-4">Welcome, {props.user.email}</h1>
            </div>
        </section>
  )
}

export default Landing