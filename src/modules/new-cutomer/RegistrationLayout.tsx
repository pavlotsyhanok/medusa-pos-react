import NavigationRaw from '../../components/NavigationRaw';
import RegistrationForm from './RegistrationForm';

const RegistrationLayout = () => {

    return (
        <>
            <NavigationRaw first={"New customer → "} />
            <main>
                <div className='flex flex-col flex-nowrap justify-center items-center'>
                    <RegistrationForm />
                </div>
            </main>
        </>
    );
};
export default RegistrationLayout;