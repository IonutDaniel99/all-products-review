import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import { Star } from "lucide-react";
import moment from "moment";

async function Product({ params }: { params: { id: number } }) {
  const supabase = createServerComponentClient({ cookies });

  const { error: prodError, data: prodData }: any = await supabase.from("products").select().eq("product_id", params.id).limit(1).single();
  // First, fetch comments for the specified product_id
  const getComments = async () => {
    let comments;
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select()
      .eq("product_id", params.id);

    if (commentsError) return { comments, commentsError }

    const userIDs = commentsData.map((comment) => comment.user_id);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select(`role,raw_user_meta_data,profile_name,id`)
      .in("id", userIDs);

    if (userError) {
      console.error("Error fetching user details:", userError.message);
    } else {
      comments = commentsData.map((comment) => {
        const userDetail = userData.find((user) => user.id === comment.user_id);
        return { ...comment, ...userDetail };
      });
    }
    return { comments, commentsError, userError }
  }

  const { comments, commentsError, userError } = await getComments()

  console.log(comments)
  const generateStars = () => {
    const stars: Array<any> = []
    for (var index = 0; index < prodData.average_grade; index++) {
      if (index < Math.floor(prodData.average_grade)) {
        stars.push(<Star key={index} strokeWidth={0} size={16} className='fill-primary' />)
      }
    }
    for (var index = stars.length; index < 10; index++) {
      stars.push(<Star key={index} strokeWidth={0} size={16} fill='#ccc' />)
    }
    return stars
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex w-full gap-10">
        <Image
          src={prodData.image_url}
          alt={'placeholder logo'}
          width={900}
          height={300}
          sizes="(min-width: 1200px) 1120px, calc(93.18vw + 20px)"
          className='h-full w-1/2 rounded-md'
          priority={false}

        />
        <div className="w-1/2">
          <div className="font-bold text-3xl">{prodData?.title}</div>
          <div>{prodData?.description}</div>
          <div className="flex items-center gap-4">
            <div className="flex">{generateStars()}</div>
            <p className="font-bold text-xl">{prodData?.average_grade}</p>
            <p className="text-sm">Out of 10</p></div>
          {/* <div>{prodData?.number_of_votes}</div> */}
          {/* <div>{prodData?.date_added}</div> */}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <input placeholder="add comment" className="border w-full h-16 rounded-lg mb-20" />
        <div className="flex gap-10 w-full flex-col">
          {comments?.map((val, index) => {
            return <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border-secondary border-[1px] rounded-lg bg-background shadow w-full" key={index}>
              <div className="relative flex gap-4">
                <img src={val.raw_user_meta_data.avatar_url || "https://picsum.photos/id/29/200"} className="relative rounded-lg -top-8 -mb-4 bg-foreground border h-20 w-20" alt="" loading="lazy" />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden font-semibold">{val.raw_user_meta_data.name || "Anonymous"}</p>
                  </div>
                  <p className="text-foreground text-sm">{moment(val.date_added).format('LLLL')}</p>
                </div>
              </div>
              <p className="-mt-4 text-foreground">{val.text}</p>
            </div>
          })}
        </div>

      </div>
    </div>
  );
}

export default Product;
