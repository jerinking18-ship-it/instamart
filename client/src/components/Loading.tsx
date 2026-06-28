import { Loader2Icon } from "lucide-react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-96 h-full w-full">
      <Loader2Icon className="animate-spin size-10 text-lime-950" />
    </div>
  );
};

export default Loading;
