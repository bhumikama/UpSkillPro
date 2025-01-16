import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const DashboardContent = () => {
  return (
    <div>
      <Card>
        <CardHeader className ="flex justify-between flex-row items-center">
          <CardTitle className="font-extrabold text-3xl">All Courses</CardTitle>
          <Button className="p-5">Create New Course</Button>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardContent;
