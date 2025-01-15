import NavigationRaw from "@/components/NavigationRaw";
import RadioGroupComponent from "./components/RadioGroupComponent";

const CheckoutLayout = () => {
    return (
        <>
            <NavigationRaw first={"Store → "} second={"Browse Catalog → "} third={"Checkout section → "} />
            <nav className="flex flex-col flex-nowrap justify-center items-center gap-[40px]">
                <RadioGroupComponent />
            </nav>
        </>
    );
};

export default CheckoutLayout;