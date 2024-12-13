import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownLeftMini } from '@medusajs/icons';
import { Container } from '@medusajs/ui';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
        <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
          <ArrowDownLeftMini className="mr-[5px]" /> Go Back
        </Link>
      </nav>
      <header className="p-[15px] self-start border-b border-b-[rgba(206,206,206,1)]">
        <p className="text-[15px] text-gray-400">Select the type of Customer</p>
      </header>
      <nav className='flex flex-col flex-nowrap justify-center items-center '>
        <ul className='flex flex-col flex-nowrap justify-center items-center gap-[10px] mt-[25px]'>
          <Container className="h-[60px] w-[370px] flex flex-row flex-nowrap justify-center items-center cursor-pointer">
            <Link to="/select-customer"><li>Existing Customer</li></Link>
          </Container>
          <Container className="h-[60px] w-[370px] flex flex-row flex-nowrap justify-center items-center cursor-pointer">
            <Link to="/register-customer"><li>New Customer</li></Link>
          </Container>
        </ul>
      </nav>
    </>
  );
};
export default Layout;
