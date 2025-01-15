export default function NavigationRaw(props: any) {
    const { first, second, third } = props;
    return (
        <div className="p-[15px] border-b">
            <p className="text-[14px] text-gray-500">{first} {second} {third}
            </p>
        </div>
    )
}