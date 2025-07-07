import AppLayout from '@/layouts/app-layout';
import { Customer } from '@/types';

const CustomerDetail = ({ customer }: { customer: Customer }) => {
    return (
        <AppLayout>
            <ul>
                {customer.pets?.map((pet) => (
                    <li key={pet.id}>
                        {pet.name} si{pet.category?.name}
                    </li>
                ))}
            </ul>
        </AppLayout>
    );
};

export default CustomerDetail;
