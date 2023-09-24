import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";

async function Product({ params }: { params: { id: number } }) {
  const supabase = createServerComponentClient({ cookies });

  const { error, data }: any = await supabase.from("products").select().eq("product_id", params.id).limit(1).single();
  return (
    <div>
      <div>{data?.title}</div>
      <div>{data?.description}</div>
      <div>{data?.number_of_votes}</div>
      <div>{data?.average_grade}</div>
      <div>{data?.date_added}</div>
      <Image src={data?.image_url} alt="d" width={200} height={100} />
    </div>
  );
}

export default Product;
