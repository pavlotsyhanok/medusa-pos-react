import { Container, Text, Prompt, Input } from "@medusajs/ui";
import { useState, useEffect } from "react";
import useProductQuery from "@/lib/hooks/products/ProductProvider";

export default function ProductSearchPrompt({ selectProduct }: { selectProduct: any }) {
    const { isLoading, isError, productsList, error } = useProductQuery();
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (productsList) {
            const searchLower = search.toLowerCase();
            const filtered = productsList.filter((product: any) => {
                return (
                    product.title.toLowerCase().includes(searchLower) ||
                    (product.description &&
                        product.description.toLowerCase().includes(searchLower)) ||
                    (product.variants?.[0]?.prices?.[0]?.amount
                        ?.toString()
                        .includes(searchLower))
                );
            });
            setFilteredProducts(filtered);
        }
    }, [search, productsList]);

    return (
        <Prompt open={open} onOpenChange={setOpen}>
            <Prompt.Trigger asChild>
                <Input
                    className="w-full text-black rounded-[100px] pl-[35px]"
                    placeholder="Search..."
                    type="search"
                    onChange={() => {
                        setOpen(true);
                    }}
                />
            </Prompt.Trigger>

            <Prompt.Content className="flex flex-col max-w-[700px] p-4 gap-[15px]" aria-describedby="product-search-description">
                <Prompt.Title>
                    <Text className="font-bold">Product Search</Text>
                </Prompt.Title>
                <Text id="product-search-description" className="sr-only">
                    Use the search input to find products by title, description, or price.
                </Text>
                <Input
                    className="w-full text-black rounded-[100px] pl-[35px] mt-[15px]"
                    placeholder="Search..."
                    id="search-input"
                    type="search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setOpen(true);
                    }}
                />
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : isError ? (
                    <Text>Error: {error?.message || "An error occurred"}</Text>
                ) : filteredProducts.length === 0 ? (
                    <Text>No products found.</Text>
                ) : (
                    filteredProducts.map((product: any) => (
                        <Container
                            key={product.id}
                            className="p-2 hover:cursor-pointer h-[110px] flex flex-raw gap-[10px] scroll-x-hiden"
                            onClick={() => {
                                selectProduct(product.id);
                                setOpen(false);
                            }}
                        >
                            <img src={product.thumbnail} alt={product.title} className="w-[90px]" />
                            <div className="flex flex-col gap-[5px]">
                                <Text className="font-bold">{product.title}</Text>
                                <Text size="small">{product.description}</Text>
                                <Text size="small">
                                    Price: {product.variants?.[0]?.prices?.[0]?.amount} CAD
                                </Text>
                            </div>
                        </Container>
                    ))
                )}
                <Prompt.Footer className="mt-4 flex justify-center">
                    <Prompt.Cancel
                        className="w-[70px]"
                        onClick={() => setOpen(false)}>
                        Close
                    </Prompt.Cancel>
                </Prompt.Footer>
            </Prompt.Content>
        </Prompt>
    );
}
