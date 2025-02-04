import Image from "next/image";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="relative bg-black text-white ">
      <div className=" mx-auto pt-10 flex flex-col md:flex-row justify-center items-center gap-20 ">
        <div className="text-center md:text-left  h-auto ">
          <h1 className="text-4xl md:text-6xl font-bold md:leading-normal mb-4 ">
            Learn, Grow, Slay. <br /> Your Future Starts Here.
          </h1>
          <p className="text-gray-400 px-3 text-sm md:text-base md:leading-snug leading-tight mb-6">
            Discover bite-sized courses, interactive tools, and a learning
            experience <br /> designed to match your rhythm and ambition.
          </p>
          <div className="flex flex-col gap-2   items-center md:flex-row">
            <Link href="/courses">
              <button className="bg-white text-black px-6 py-3 text rounded-full font-medium hover:bg-gray-200  transition">
                Explore Courses
              </button>
            </Link>
            <button className="border border-gray-500 ml-6 text-white px-6 py-3 text rounded-full font-medium hover:bg-gray-200 hover:text-black  transition">
              <Link href="/signup?role=instructor">Become An Instructor</Link>
            </button>
          </div>
        </div>
        <div className="relative ">
          <Image src="/hero-image.png" alt="Hero" width="500" height="500" />
        </div>
      </div>
    </section>
  );
}
