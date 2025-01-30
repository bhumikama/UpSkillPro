
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Link from "next/link";

const CourseCard = ({ course }) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.imageUrl}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-1">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.title}
          </h1>
          <p className="text-sm text-gray-500 line-clamp-1">
            {course.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="font-medium text-sm">Instructor:{" "}{course.instructor.name}</h1>
            </div>
          </div>
          <div className="text-lg font-bold flex justify-between items-center">
            <span>Dkk {course.price}</span>
            <Badge
              className={
                "bg-blue-600 text-white px-2 py-1 text-xs rounded-full"
              }
            >
              BestSeller
            </Badge>
          </div>
        </CardContent>
        
      </Card>
    </Link>
  );
};

export default CourseCard;
