import { Link, useNavigate } from 'react-router-dom';
import { useState, useId } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { medusa } from '../../../lib/medusa-provider';
import { ArrowDownLeftMini, Plus } from '@medusajs/icons';
import { Button } from '@medusajs/ui';
import { Input } from '@medusajs/ui';

const Register = () => {
  const navigate = useNavigate();
  const queryCustomer = useQueryClient();

  const [form, setForm] = useState({
    id: useId(),
    fName: "",
    lName: "",
    email: "",
    password: "",
    companyName: "",
    website: "",
    cartProduct: [],
    card: "",
    notes: [],
  });

  const newCustomerMutation = useMutation({
    mutationFn: async (newCustomer: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Call the Medusa admin API to create a new customer
      const response = await medusa.admin.customers.create({
        email: newCustomer.email,
        first_name: newCustomer.fName,
        last_name: newCustomer.lName,
        password: newCustomer.password,
      });
      // Return the newly created customer data
      return response.customer;
    },
    onSuccess: () => {
      // Invalidate the customer query to refresh the data
      queryCustomer.invalidateQueries({ queryKey: ["customer"] });
      navigate("/select-customer");
    },
  });

  if (newCustomerMutation.isSuccess) return <h1>Loading...</h1>;
  if (newCustomerMutation.isError) return <pre>{JSON.stringify(newCustomerMutation.error)}</pre>;

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function registerCustomer(e: any) {
    e.preventDefault();
    if (!form.fName || !form.lName || !form.email || !form.password) {
      alert("You need to add all Mandatory Fields");
    } else {
      newCustomerMutation.mutate(form);
    }
  }

  return (
    <>
      <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
        <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
          <ArrowDownLeftMini className="mr-[5px]" /> Go Back
        </Link>
        <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={"/select-customer"}>
          Existing Customer <Plus className="ml-[5px]" />
        </Link>
      </nav>
      <header className="p-[15px] self-start border">
        <p className="text-[15px] text-gray-400">Add New Customer</p>
      </header>
      <main>
        <div className='flex flex-col flex-nowrap justify-center items-center'>
          <form onSubmit={registerCustomer}>
            <div className='flex flex-col flex-nowrap justify-center items-center mt-[25px] gap-[10px]'>
              <h2>Mandatory Fields</h2>
              <Input className="h-[60px] w-[370px]" type="text" placeholder="First Name" value={form.fName} onChange={handleChange} name="fName" />
              <Input className="h-[60px] w-[370px]" type="text" placeholder="Last Name" value={form.lName} onChange={handleChange} name="lName" />
              <Input className="h-[60px] w-[370px]" type="email" placeholder="Email" value={form.email} onChange={handleChange} name="email" />
              <Input className="h-[60px] w-[370px]" type="text" placeholder="Password" value={form.password} onChange={handleChange} name="password" />
            </div>
            <div className='flex flex-col flex-nowrap justify-center items-center mt-[25px] gap-[10px]'>
              <h2>Custom Fields</h2>
              <Input className="h-[60px] w-[370px]" type="text" placeholder="Company Name" value={form.companyName} onChange={handleChange} name="companyName" />
              <Input className="h-[60px] w-[370px]" type="text" placeholder="Website" value={form.website} onChange={handleChange} name="website" />
            </div>
            <Button disabled={newCustomerMutation.isSuccess} className='mt-[20px] h-[60px] w-[370px]' type='submit'>
              {newCustomerMutation.isSuccess ? "Loading..." : "Save Customer"}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};
export default Register;