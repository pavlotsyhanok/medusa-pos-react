import { Container, Text, Prompt, Button } from "@medusajs/ui";

export default function Products(props: any) {
    const { title, id, uniqueId, image, price, className, classNameImage, description, prompt } = props;

    return (
        prompt ? (
            <Prompt>
                <Prompt.Trigger asChild>
                    <Container
                        className={className}>
                        <img src={image} alt={title} className={classNameImage} />
                        <div className="flex flex-col justify-between items-start h-[100px]">
                            <Text className="text-lg mb-[10px] mt-[10px]">{title}</Text>
                            <Text size="small" className="mt-[14px] self-start" family="mono">
                                Price: {price} CAD
                            </Text>
                        </div>
                    </Container>
                </Prompt.Trigger>
                <Prompt.Content className="flex flex-col max-w-[700px]">
                    <div className="flex flex-row gap-1 ">
                        <Prompt.Header className="">
                            <img src={image} alt={title} className="w-[590px] h-[350px]" />
                            <Prompt.Description className="font-mono text-center mt-[5px]">
                                {title}
                            </Prompt.Description>
                        </Prompt.Header>
                        <Prompt.Header>
                            <Prompt.Title>
                                < Text className="font-bold self-start" family="mono">
                                    Product Overview:
                                </Text>
                            </Prompt.Title>
                            <Prompt.Description className="font-mono">
                                {description}
                            </Prompt.Description>
                            <Prompt.Title>
                                < Text size="small" className="font-bold mt-[14px] self-start" family="mono">
                                    Product Price:
                                </Text>
                            </Prompt.Title>
                            <Prompt.Description className="text-m">
                                CA${price}
                            </Prompt.Description>
                        </Prompt.Header>
                    </div>
                    <Prompt.Footer className="mt-4 flex justify-center">
                        <Prompt.Cancel className="w-[70px]">Cancel</Prompt.Cancel>
                        <Prompt.Action className="w-[70px]" onClick={() => props.selectProduct(id, uniqueId)}>
                            Add
                        </Prompt.Action>
                    </Prompt.Footer>
                </Prompt.Content>
            </Prompt>
        ) : (
            <Container
                className={className}>
                <img src={image} alt={title} className={classNameImage} />
                <div className="flex flex-col justify-start items-start h-[120px]">
                    <Text className="text-lg mb-[10px] mt-[10px]">{title}</Text>
                    <Text size="small">{description}</Text>
                    <div className="flex flex-row justify-end items-end gap-9">
                        <Text size="small" className="mt-[14px] self-start" family="mono">Price: {price} CAD</Text>
                    </div>
                </div>
            </Container >)
    )
}