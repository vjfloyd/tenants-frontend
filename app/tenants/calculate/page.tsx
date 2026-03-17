import {Metadata} from 'next';
import {BillForm} from '@/components/BillForm';

export const metadata : Metadata = {

}

export default function Calculate() {

    return (
        <>
            <div className="max-w-2xl mx-auto p-6">
                <BillForm/>
            </div>
        </>
    );
}