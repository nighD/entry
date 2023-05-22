'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import {
  SessionResponse
} from "@/app/types";

import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface CardProps {
  data: SessionResponse;
};

const Card: React.FC<CardProps> = ({
  data,
}) => {

  const dateRange = useMemo(() => {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, []);

  return (
    <div
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover
              h-full
              w-full
              transition
            "
            src={data.program[0].thumbnail_img_url}
            alt="Listing"
          />
        </div>
        <div className="font-bold">
          {data.program[0].display_title}
        </div>
        <div className="font-light text-neutral-500">
          {dateRange}
        </div>
      </div>
    </div>
   );
}

export default Card;