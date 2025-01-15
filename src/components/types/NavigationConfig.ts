import { ReactElement } from "react";

type NavigationConfig = {
    [key: string]: {
        label: string;
        link: string;
        showInput: boolean;
        icon?: ReactElement;
    };
};
export default NavigationConfig;