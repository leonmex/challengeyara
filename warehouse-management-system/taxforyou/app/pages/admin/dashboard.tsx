// pages/admin/dashboard.tsx
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
    const { data: session } = useSession();

    if (!session) {
        return <p>You must be logged in to access this page.</p>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome {session.user?.name}, manage your site here.</p>
        </div>
    );
}
