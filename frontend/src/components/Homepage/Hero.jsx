export default function Hero() {
  return (
    <section 
      className="
        bg-[url(/images/hero/1.svg)] 
        bg-cover 
        bg-center 
        bg-no-repeat
        min-h-[500px] md:min-h-[954px] 
        pt-[100px] md:pt-[290px] 
        -mt-[80px] md:-mt-[110px] 
        px-4 sm:px-6 md:px-8
      "
    >
      <div className="max-w-[730px]  h-auto">
        <div className="relative mb-4 md:mb-6">
          <img 
            src="/images/hero/underline1.svg" 
            alt="underline" 
            className="absolute -bottom-1 md:-bottom-2 left-0 w-[150px] sm:w-[180px] md:w-[215px] h-auto" 
          />
          <span className="relative text-lg md:text-[25px] leading-tight font-bold text-white z-20 block">
            Original & Natural
          </span>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex gap-2 items-center">
            <h1 className="text-[#F7C35F] text-3xl sm:text-4xl md:text-7xl font-bold leading-tight">
                Agriculture Matter
              </h1>
              <img
                src="/images/hero/icon1.svg"
                alt="icon"
                className="w-[50px] md:w-[75px] h-auto"
              />
           
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight">
              Good production
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-[730px] leading-relaxed">
              Dissuade ecstatic and properly saw entirely sir why laughter endeavor. 
              In on my jointure horrible margaret suitable he speedily.
            </p>
          </div>

          <a
            href="#"
            className="
              w-fit 
              rounded-[20px] 
              px-6 sm:px-8 md:px-12 
              py-3 sm:py-4 md:py-6 
              uppercase 
              text-black 
              bg-[#F7C35F] 
              text-sm sm:text-base md:text-lg 
              font-medium 
              hover:bg-[#e5b151] 
              transition-colors 
              duration-300
            "
            aria-label="Learn more about agriculture"
          >
            Discover More
          </a>
        </div>
      </div>
    </section>
  );
}