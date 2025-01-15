import { Container } from "@medusajs/ui"
import { useState, useEffect } from "react";

export default function (props: any) {
    const { email, first_name, last_name } = props;

    return (
        <Container className="flex flex-row justify-between items-center cursor-pointer mb-[10px]">
            <div className="flex flex-col justify-start">
                <h2 className="text-[15px] leading-[18.15px] font-semibold text-start mb-[5px]">{first_name} {last_name}
                </h2>
                <p className="text-[12px] leading-[14.52px] font-normal text-start">{email}
                </p>
            </div>
        </Container>
    )
}