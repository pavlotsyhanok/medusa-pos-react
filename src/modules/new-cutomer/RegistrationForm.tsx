import { useState } from 'react';
import type { NewCustomer } from '@/lib/hooks/new-customer/types/NewCustomer';
import { useNavigate } from '@tanstack/react-router';
import { Input, Button } from "@medusajs/ui";
import { useQueryClient } from '@tanstack/react-query';
import newCustomerProvider from '@/lib/hooks/new-customer/NewCustomerProvider';

export default function RegistrationForm() {

    const queryCustomer = useQueryClient();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { updateCustomer } = newCustomerProvider();

    const [form, setForm] = useState<NewCustomer>({
        first_name: "",
        last_name: "",
        email: "",
        company_name: "",
        metadata: {
            website: ""
        },
    });

    function handleChange(e: any) {
        const { name, value } = e.target;
        setForm((prevValue) => {
            const keys = name.split('.');
            if (keys.length > 1) {
                return {
                    ...prevValue,
                    [keys[0]]: {
                        ...prevValue[keys[0] as keyof NewCustomer] as Record<string, unknown>,
                        [keys[1]]: value,
                    },
                };
            }
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    const registerCustomer = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        if (!form.first_name || !form.last_name || !form.email) {
            alert("You need to fill in all Mandatory Fields");
        } else {
            try {
                await updateCustomer(form);
                console.log("success!");
                // Invalidate the customer query to refresh the data
                queryCustomer.invalidateQueries({ queryKey: ["customer"] });
                navigate({ to: "/customers" });
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <form onSubmit={registerCustomer}>
            <div className='flex flex-col flex-nowrap justify-center items-center mt-[25px] gap-[10px]'>
                <h2>Mandatory Fields</h2>
                <Input className="h-[60px] w-[370px]" type="text" placeholder="First Name" value={form.first_name} onChange={handleChange} name="first_name" />
                <Input className="h-[60px] w-[370px]" type="text" placeholder="Last Name" value={form.last_name} onChange={handleChange} name="last_name" />
                <Input className="h-[60px] w-[370px]" type="email" placeholder="Email" value={form.email} onChange={handleChange} name="email" />
            </div>
            <div className='flex flex-col flex-nowrap justify-center items-center mt-[25px] gap-[10px]'>
                <h2>Custom Fields</h2>
                <Input className="h-[60px] w-[370px]" type="text" placeholder="Company Name" value={form.company_name} onChange={handleChange} name="company_name" />
                <Input className="h-[60px] w-[370px]" type="text" placeholder="Website" value={form.metadata.website} onChange={handleChange} name="metadata.website" />
            </div>
            <Button disabled={false} className='mt-[20px] h-[60px] w-[370px]' type='submit'>
                {isLoading ? "Loading..." : "Save Customer"}
            </Button>
        </form>
    );
}
