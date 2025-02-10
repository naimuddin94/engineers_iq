/* eslint-disable prettier/prettier */
"use client";

import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export const AnalyticsSkeleton = () => {
  return (
    <div className="">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((_, index) => (
          <Card key={index}>
            <CardBody>
              <Skeleton className="w-3/4 rounded-lg">
                <div className="h-8 w-full bg-default-200 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-1/2 rounded-lg mt-2">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Views Summary Card */}
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-6 w-full bg-default-200 rounded-lg" />
          </Skeleton>
        </CardHeader>
        <Divider />
        <CardBody>
          <Skeleton className="w-full rounded-lg">
            <div className="h-48 w-full bg-default-200 rounded-lg" />
          </Skeleton>
        </CardBody>
      </Card>

      {/* Claps and Comments Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="w-1/4 rounded-lg">
                <div className="h-6 w-full bg-default-200 rounded-lg" />
              </Skeleton>
            </CardHeader>
            <Divider />
            <CardBody>
              <Skeleton className="w-full rounded-lg">
                <div className="h-48 w-full bg-default-200 rounded-lg" />
              </Skeleton>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Bottom Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((_, index) => (
          <Card key={index}>
            <CardBody>
              <Skeleton className="w-3/4 rounded-lg">
                <div className="h-8 w-full bg-default-200 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-1/2 rounded-lg mt-2">
                <div className="h-4 w-full bg-default-200 rounded-lg" />
              </Skeleton>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
