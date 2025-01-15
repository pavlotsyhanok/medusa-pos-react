import { Container, Text } from "@medusajs/ui";

export default function Products(props: any) {
    const { title, id, uniqueId, image, price, className, classNameImage, description } = props;

    return (
        <Container
            onClick={() => props.selectProduct(id, uniqueId)}
            className={className}>
            <img src={image} alt={title} className={classNameImage} />
            <div className="flex flex-col justify-start items-start h-[120px]">
                <Text className="text-lg mb-[10px] mt-[10px]">{title}</Text>
                <Text size="small">{description}</Text>
                <Text size="small" className="mt-[14px] self-start" family="mono">Price: {price} CAD</Text>
            </div>
        </Container>
    );
}