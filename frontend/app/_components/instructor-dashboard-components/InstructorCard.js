import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";

const InstructorCard = ({ course }) => {
  const router = useRouter();
  const handleOnClick = (id) => {
    router.push(`instructor-dashboard/courses/${id}/add-lecture`);
  };
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ">
      <div className="relative">
        <img
          src={course.imageUrl}
          alt={`Image of ${course.title}`}
          className="w-full h-auto object-cover aspect-video rounded-t-lg"
        />
      </div>
      <CardContent className="px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3">
        <h1 className="hover:underline font-bold text-base sm:text-lg truncate">
          {course.title}
        </h1>
        <button
          className="px-2 py-1.5 w-full sm:w-auto bg-black text-white text-sm rounded hover:bg-gray-700"
          onClick={() => handleOnClick(course.id)}
        >
          Add new lecture
        </button>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
