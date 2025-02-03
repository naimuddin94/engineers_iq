/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAnalytics } from "@/hooks/auth.hook";

export const Analytics = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useAnalytics(userId);

  const { theme } = useTheme();

  if (error || !data) {
    return (
      <div className=" h-screen flex justify-center flex-col items-center -mt-32">
        <h2 className="text-center">There is no analytics data to display!</h2>
      </div>
    );
  }

  const chartData = data.data?.articlesSummary.map((article, index) => ({
    name: `Article ${index + 1}`,
    title: article.title.split(" ").slice(0, 4).join(" ") + " ...",
    views: article.views,
    claps: article.claps,
    comments: article.comments,
  }));

  const isDark = theme === "dark";
  const chartColor = isDark ? "#8884d8" : "#6366f1";
  const barColor = isDark ? "#00e5ff" : "#3b82f6";
  const axisColor = isDark ? "#888888" : "#4b5563";
  const tooltipBackground = isDark ? "#1f2937" : "#eee";
  const tooltipTextColor = isDark ? "#ffffff" : "#000000";

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Total Views", value: data?.data?.totalPostViews },
          { title: "Total Claps", value: data?.data?.totalClaps },
          { title: "Total Comments", value: data?.data?.totalComments },
        ].map((item, index) => (
          <Card key={index}>
            <CardBody>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-default-500">{item.title}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Views Summary</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <ResponsiveContainer height={200} width="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBackground,
                  border: "none",
                  borderRadius: "3px",
                  color: tooltipTextColor,
                }}
                formatter={(value, name, props) => {
                  return [`${value}`, props.payload.title];
                }}
              />
              <Line
                dataKey="views"
                stroke={chartColor}
                strokeWidth={3}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {["Claps", "Comments"].map((metric, index) => (
          <Card key={index}>
            <CardHeader>
              <h2 className="text-xl font-semibold">{metric} Summary</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <ResponsiveContainer height={200} width="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke={axisColor} />
                  <YAxis stroke={axisColor} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBackground,
                      border: "none",
                      color: tooltipTextColor,
                    }}
                    formatter={(value, name, props) => {
                      return [`${value}`, props.payload.title];
                    }}
                  />
                  <Bar dataKey={metric.toLowerCase()} fill={barColor} />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { title: "Total Posts", value: data?.data?.totalPosts },
          { title: "Total Duration in Month", value: data?.data?.totalMonths },
          {
            title: "Average Post Per Month",
            value: Math.round(data?.data?.averagePostsPerMonth),
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardBody>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-default-500">{item.title}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
