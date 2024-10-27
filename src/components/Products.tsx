export default function Product(props: any) {
  const { title, id, uniqueId } = props;

  return (
    <div className="product-card" onClick={() => props.selectProduct(id, uniqueId)}>
      <p>{title}</p>
    </div>
  );
};

