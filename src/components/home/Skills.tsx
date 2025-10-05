import React from "react";

function Skills() {
  const img = [
    "/icons/html.png",
    "/icons/css.png",
    "/icons/javascript.png",
    "/icons/react.png",
    "/icons/nextjs.png",
    "/icons/tailwind.png",
    "/icons/shadcn.png",
    "/icons/mongodb.png",
    "/icons/node.png",
    "/icons/express.png",
  ];
  return (
    <section className="max-w-7xl mx-auto md:px-6 py-16 text-center md:text-left flex flex-col items-start">
      <h2 className="text-2xl md:text-4xl font-bold text-center w-full mb-5">My Skills </h2>

      <div className="flex flex-wrap gap-10 mt-5 items-center justify-center">
        {img.map((i, index) => (
          <img
            key={index}
            className={`rounded-t-xl object-contain w-[4rem] md:w-[6rem] lg:w-[7rem] xl:w-[8rem] rounded-xl flex flex-col cursor-pointer hover:scale-105 duration-300 transition-all bg-[#161c27]`}
            src={i}
            alt="skills image"
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;