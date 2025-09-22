import React from "react";
import HeaderBg from "../../assets/images/SitesBg.webp";

const PageHeader = ({
  title,
  titleColor = "text-white",
  showUnderline = true,
}) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-[32rem] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeaderBg})`,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center ${titleColor}`}
        >
          {title}
        </h1>

        {/* Decorative Line */}
        {showUnderline && (
          <div className="mt-6 w-44 h-1 bg-white rounded-full" />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
