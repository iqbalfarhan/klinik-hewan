import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';

const EditUser = ({ user }: { user: User }) => {
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Settings',
                    href: '/',
                },
                {
                    title: 'User',
                    href: route('user.index'),
                },
                {
                    title: user.name,
                    href: route('user.show', user.id),
                },
                {
                    title: 'edit',
                    href: route('user.edit', user.id),
                },
            ]}
        >
            {JSON.stringify(user)}
        </AppLayout>
    );
};

export default EditUser;
