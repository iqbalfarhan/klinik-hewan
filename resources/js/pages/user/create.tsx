import AppLayout from '@/layouts/app-layout';

const CreateUser = () => {
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
                    title: 'create',
                    href: route('user.create'),
                },
            ]}
        >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A id distinctio hic? Deserunt harum dolor delectus voluptates consectetur
            cupiditate illo quidem placeat quae! Veniam dolorem quibusdam laudantium fugit id officia.
        </AppLayout>
    );
};

export default CreateUser;
