import { Container } from "@medusajs/ui";

export default function Product(props: any) {
  const { title, id, uniqueId, image, price, className, classNameImage } = props;

  return (
    <Container
      onClick={() => props.selectProduct(id, uniqueId)}
      className={className}>
      <img src={image} alt={title} className={classNameImage} />
      <div className="flex flex-col justify-evenly items-start">
        <p className="text-lg mb-[10px]">{title}</p>
        <p className="text-sm">CA{price}</p>
      </div>
    </Container>
  );
};

