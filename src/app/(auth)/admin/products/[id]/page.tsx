import EditProduct from "@/components/EditProduct";
import Navbar from "@/components/shared/Navbar";
import { getProductById } from "@/lib/actions/product.action";
import { SearchParamProductIdProps } from "@/types";

const Page = async ({ params: { id } }: SearchParamProductIdProps) => {
  const response = await getProductById(id);
  const product = response?.product;

  if (response && response.statusCode === 404) {
    return {
      notFound: true,
    };
  }

  
  return (
    <>
      <Navbar />
      <EditProduct product={product} />
    </>
  );
};

export default Page;
