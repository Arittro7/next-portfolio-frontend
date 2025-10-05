"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Project } from "@/types";

interface DialogModelProps {
  data: Project;
}

const DialogModel = ({ data }: DialogModelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-full mt-4 p-2 bg-gray-400 text-black font-bold rounded-sm hover:bg-gray-300 transition-all cursor-pointer">
          Details
        </button>
      </DialogTrigger>

      <DialogContent className="w-[800px] h-[80vh] overflow-y-scroll bg-[#0C0F11] text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{data.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {data.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <img className="w-full rounded-md" src={data?.thumbnail} alt="project thumbnail" />

          {/* Category */}
          <div>
            <h3 className="font-semibold text-lg text-gray-200">Category:</h3>
            <p className="text-gray-400">{data.category}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-xl text-gray-200">Features:</h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {data.features.map((t, index) => (
                <li key={index} className="text-gray-400 text-lg">
                  <span className="text-gray-200 font-semibold mr-1">
                    {index + 1}.
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-lg text-gray-200">Technologies:</h3>
            <div className="flex items-center gap-2 py-2 flex-wrap">
              {data.techStack.map((t, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-xs rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 pt-4">
            <a
              className="text-gray-500 hover:text-gray-300 font-semibold border-2 px-3 py-2 rounded-xl"
              href={data.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </a>
            <a
              className="text-gray-500 hover:text-gray-300 font-semibold border-2 px-3 py-2 rounded-xl"
              href={data.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 h-10 p-2 bg-gray-400 text-black font-bold rounded-sm hover:bg-gray-300 transition-all"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModel;
