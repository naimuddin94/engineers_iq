/* eslint-disable prettier/prettier */
import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody } from "@nextui-org/card";

export default function CardSkeleton() {
  return (
    <Card className="mb-6 px-2 relative overflow-hidden">
      <CardBody>
        <div className="flex items-center mb-2">
          <Skeleton className="rounded-full mr-2">
            <div className="w-8 h-8 bg-default-200 rounded-full" />
          </Skeleton>
          <Skeleton className="w-1/5 rounded-lg">
            <div className="h-4 w-full bg-default-200 rounded-lg" />
          </Skeleton>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-grow pr-0 md:pr-4">
            <Skeleton className="w-full rounded-lg">
              <div className="h-12 w-full bg-default-200 rounded-lg" />
            </Skeleton>
            <div className="flex flex-wrap text-default-400 items-center gap-2 mt-4">
              <Skeleton className="w-44 rounded-lg">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-24 rounded-lg">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-16 rounded-lg">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
            </div>
            <div className="flex flex-wrap text-default-400 items-center gap-2 mt-4">
              <Skeleton className="w-36 rounded-lg">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-36 rounded-lg">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-36 rounded-lg">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
            </div>
          </div>
          <div className="w-full md:w-64 h-40 md:h-32 mt-4 md:mt-0">
            <Skeleton className="w-full rounded-lg">
              <div className="h-[9.5rem] md:h-28 w-full bg-default-200 rounded-lg" />
            </Skeleton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
