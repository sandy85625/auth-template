import { User } from 'firebase/auth';
import React from 'react';
import UserLanding from '../collections/UserLanding';

type Props = {
    user: User
}

function Landing(props: Props) {
  
    return (
        <section className="min-h-full bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 text-white">
            <div className="py-8 px-4 sm:px-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Welcome, {props.user.email}</h1>
            </div>
            <div>
                <UserLanding />
            </div>
        </section>
  )
}

export default Landing