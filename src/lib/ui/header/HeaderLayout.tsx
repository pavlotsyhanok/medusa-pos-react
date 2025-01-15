import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import HeaderAvatar from "./components/HeaderAvatar";
import { PencilSquareSolid, ArrowDownLeftMini, User, PlusMini } from "@medusajs/icons";
import { Input } from "@medusajs/ui"
import { Link, useLocation } from "@tanstack/react-router";
import NavigationConfig from "@/components/types/NavigationConfig";

const navigationConfig: NavigationConfig = {
    "/orderNote": {
        label: "Back to Catalog",
        link: "/catalog",
        showInput: true,
        icon: <ArrowDownLeftMini className="mx-[5px]" />,

    },
    "/catalog": {
        label: "Order Note",
        link: "/orderNote",
        showInput: true,
        icon: <PencilSquareSolid className="mx-[5px]" />
    },
    "/new-customer": {
        label: "Existing Customers",
        link: "/customers",
        showInput: false,
        icon: <User className="mx-[5px]" />
    },
    "/customers": {
        label: "New Customer",
        link: "/new-customer",
        showInput: true,
        icon: <PlusMini className="w-[20px]" />
    },
    "/orders": {
        label: "Go Back",
        link: "..",
        showInput: true,
        icon: <ArrowDownLeftMini className="mr-[5px]" />
    },
    "/stripe-terminals": {
        label: "Go Back",
        link: "..",
        showInput: true,
        icon: <ArrowDownLeftMini className="mr-[5px]" />
    },
    "/checkout": {
        label: "Go Back",
        link: "..",
        showInput: false,
        icon: <ArrowDownLeftMini className="mr-[5px]" />
    },
    "/payment-section": {
        label: "Go Back",
        link: "..",
        showInput: false,
        icon: <ArrowDownLeftMini className="mr-[5px]" />
    },
    // Add more configurations as needed
};

export default function CataLogHeaderLayout() {
    const { user, userLoading } = useAuthQuery();
    const location = useLocation();

    if (userLoading) {
        return <div />;
    }

    if (!user) {
        return null;
    }

    const currentPath = Object.keys(navigationConfig).find(path => location.pathname.includes(path));
    const navigation = currentPath ? navigationConfig[currentPath] : null;

    return (
        <div className="flex justify-between items-center">
            <HeaderAvatar user={user} />
            {navigation && (
                <>
                    {navigation.showInput && (
                        <div className="relative w-[550px] mx-[10px] min-w-[160px]">
                            <Input
                                className="w-full text-black rounded-[100px] pl-[35px]"
                                placeholder="Search..."
                                id="search-input"
                                type="search"
                            // onChange={searchEngine} 
                            // value={search}
                            />
                        </div>
                    )}
                    <Link to={navigation.link} className="flex flex-row justify-center items-center gap-[5px]">
                        <div className=" flex flex-row justify-center items-center gap-[5px] text-[14px]">
                            {navigation.label} {navigation.icon}
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
}