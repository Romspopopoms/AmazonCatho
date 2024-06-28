import React from "react";
import GenerateImageForm from "../components/GenerateImageForm";

const GenerationImages = () => {
  return (
    <div className="relative flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8">
      <GenerateImageForm />
    </div>
  );
};

export default GenerationImages;
