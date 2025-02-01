import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import styles from "./ProgressCard.module.css";

const ProgressCard = ({ course }) => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={course.imageUrl}
          alt={`image of ${course.title}`}
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          {course.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${course.progress}%` }}
            >
              {course.progress}%
            </div>
          </div>
        </div>
       
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
