"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Ampersand, ChevronLeft, ChevronRight, Divide, Filter, Minus, Search, Slash, Star } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "@/_components/ui/separator";
import { Button } from "@/_components/ui/button";
import { type ProductsSearchParams } from "@/_types/ProductsSearchParamsType";
import { checkObjectErrors, isInArray, toFirstUppercase } from "@/_lib/utils";
import { useRouter } from "next/navigation";

const reviews_array = Array.from({ length: 10 }, (_, i) => i + 1);
const comments_array = [10, 25, 50, 100, 250, 500, 1000];
const date_values: Record<string, number> = {
  last_hour: 1,
  last_day: 24,
  last_7days: 168,
  last_30days: 720,
  anytime: 0,
};
const date_values_raw: Record<number, string> = {
  1: "Last hour",
  24: "Last day",
  168: "Last 7 days",
  720: "Last 30 days",
  0: "Anytime",
};

function ProductsFilters({ searchParams }: ProductsSearchParams) {
  const router = useRouter();

  const selectedDate = searchParams?.from || 0;
  const starsNumber = searchParams?.stars_number || 10;
  const starsDiff = searchParams?.stars_diff || "under";
  const commentsNumber = searchParams?.comments_number || 500;
  const commentsDiff = searchParams?.comments_diff || "under";
  const productsOrder = searchParams?.order_by || "asc";
  const productPerPage = searchParams?.items_per_page || 10;

  const [handleStarDiffIcon, setHandleStarDiffIcon] = useState("under");
  const [handleCommsDiffIcon, setHandleCommsDiffIcon] = useState("under");

  useEffect(() => {
    const querySplit = window.location.href.split("?")[1];
    const url = new URLSearchParams(querySplit);
    const date_error = url.has("from") ? isInArray(Number(selectedDate), [0, 1, 24, 168, 720]) : true;
    const stars_error = url.has("stars_number") ? isInArray(Number(starsNumber), reviews_array) : true;
    const stars_diff_error = url.has("stars_diff") ? isInArray(starsDiff, ["under", "over"]) : true;
    const comments_number_error = url.has("comments_number") ? isInArray(Number(commentsNumber), comments_array) : true;
    const comments_diff_error = url.has("comments_diff") ? isInArray(commentsDiff, ["under", "over"]) : true;
    const products_orderBy_error = url.has("order_by") ? isInArray(productsOrder, ["asc", "desc"]) : true;
    const products_perPage_error = url.has("items_per_page") ? isInArray(Number(productPerPage), [10, 25, 50]) : true;

    const objectOfAll = {
      date_error,
      stars_error,
      stars_diff_error,
      comments_number_error,
      comments_diff_error,
      products_orderBy_error,
      products_perPage_error,
    };

    checkObjectErrors(objectOfAll);
  }, [commentsDiff, commentsNumber, productPerPage, productsOrder, selectedDate, starsDiff, starsNumber]);

  const handleDateValueFilter = (value: string) => {
    const _selectedDate = date_values[value];
    handleURLparams("from", _selectedDate);
  };

  const handleStarsDiff = (value: "over" | "under") => {
    handleURLparams("stars_diff", value);
    setHandleStarDiffIcon(value);
  };

  const handleStarsNumber = (value: number) => {
    handleURLparams("stars_number", value);
  };

  const handleCommentsDiff = (value: "over" | "under") => {
    handleURLparams("comments_diff", value);
    setHandleCommsDiffIcon(value);
  };

  const handleCommentNumber = (value: string) => {
    handleURLparams("comments_number", value);
  };

  const handleProductOrder = (value: "asc" | "desc") => {
    handleURLparams("order_by", value);
  };
  const handleProductsPerPage = (value: string) => {
    handleURLparams("items_per_page", value);
  };

  const handleURLparams = (params: string, newValue: any) => {
    // Get the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Set the 'order' parameter to the new value
    searchParams.set(params, newValue);

    // Create a new URL with the updated search parameters
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

    // Use history.pushState to update the URL without a page reload
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleRefresh = () => {
    const href = window.location.href;
    router.replace(href);
    router.refresh();
  };

  return (
    <div className="gap-4 xl:border-2 border-border bg-background justify-start rounded-md flex flex-col items-start px-2 py-4 w-full font-medium">
      <div className="flex items-center">
        <p className="text-sm ml-2 mr-4 font-semibold">From</p>
        <Select onValueChange={(value) => handleDateValueFilter(value)}>
          <SelectTrigger className="w-40 h-8" icon={null}>
            <SelectValue placeholder={date_values_raw[selectedDate]} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_hour">Last hour</SelectItem>
            <SelectItem value="last_day">Last day</SelectItem>
            <SelectItem value="last_7days">Last 7 days</SelectItem>
            <SelectItem value="last_30days">Last 30 days</SelectItem>
            <SelectItem value="anytime">Anytime</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className="flex items-center">
        <p className="text-sm ml-2 mr-4 font-semibold">Stars</p>
        <Select onValueChange={(value: "over" | "under") => handleStarsDiff(value)}>
          <SelectTrigger className="w-20 h-8 flex">
            <SelectValue placeholder={toFirstUppercase(starsDiff)} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under">Under</SelectItem>
            <SelectItem value="over">Over</SelectItem>
          </SelectContent>
        </Select>
        {handleStarDiffIcon === "over" && <ChevronRight size={20} strokeWidth={1.25} />}
        {handleStarDiffIcon === "under" && <ChevronLeft size={20} strokeWidth={1.25} />}
        <Select onValueChange={(value) => handleStarsNumber(Number(value))}>
          <SelectTrigger className="w-16 h-8 flex" icon={<Star size={20} strokeWidth={1.25} className="pl-1" />}>
            <SelectValue placeholder={starsNumber} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            {reviews_array.map((value, index) => {
              return (
                <SelectItem key={index} value={`${value}`}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className="flex items-center">
        <p className="text-sm ml-2 mr-4 font-semibold">Comments</p>
        <Select onValueChange={(value: "over" | "under") => handleCommentsDiff(value)}>
          <SelectTrigger className="w-20 h-8 flex">
            <SelectValue placeholder={toFirstUppercase(commentsDiff)} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under">Under</SelectItem>
            <SelectItem value="over">Over</SelectItem>
          </SelectContent>
        </Select>
        {handleCommsDiffIcon === "over" && <ChevronRight size={20} strokeWidth={1.25} />}
        {handleCommsDiffIcon === "under" && <ChevronLeft size={20} strokeWidth={1.25} />}
        <Select onValueChange={(value) => handleCommentNumber(value)}>
          <SelectTrigger className="w-16 h-8 flex">
            <SelectValue placeholder={commentsNumber} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            {comments_array.map((value, index) => {
              return (
                <SelectItem key={index} value={`${value}`}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className="flex items-center">
        <p className="text-sm ml-2 mr-4 font-semibold">Order</p>
        <Select onValueChange={(value: "asc" | "desc") => handleProductOrder(value)}>
          <SelectTrigger className="w-32 h-8" icon={null}>
            <SelectValue placeholder={productsOrder === "asc" ? "Ascending" : "Descending"} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className="flex items-center">
        <p className="text-sm ml-2 mr-4 font-semibold">Items Per Page</p>
        <Select onValueChange={(value) => handleProductsPerPage(value)}>
          <SelectTrigger className="w-32 h-8" icon={null}>
            <SelectValue placeholder={productPerPage} className="h-6" />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50].map((value, index) => {
              return (
                <SelectItem key={index} value={`${value}`}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className="flex items-center w-full justify-end pr-2">
        <Button
          onClick={() => handleRefresh()}
          variant="outline"
          size="icon"
          className="border-border shadow flex w-28 px-4 gap-3 flex-row bg-background hover:bg-secondary"
        >
          <p className="font-semibold">Filter</p>
          <Filter size={22} className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ProductsFilters;
