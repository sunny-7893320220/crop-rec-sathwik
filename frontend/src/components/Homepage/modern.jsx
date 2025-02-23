const getItem = (imgPath, header, text) => (
    <div className="flex flex-col md:flex-row gap-[15px] md:gap-[30px] items-center md:items-start">
      <div className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-full bg-[#344C31] flex justify-center items-center">
        <img src={imgPath || "/placeholder.svg"} alt="" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
      </div>
      <div className="w-full md:w-[494px] flex flex-col gap-[7px] text-center md:text-left">
        <h3 className="font-semibold text-lg md:text-[24px]">{header}</h3>
        <p className="text-sm md:text-base">{text}</p>
      </div>
    </div>
  )
  
  export default function Modern() {
    return (
      <div className="relative flex flex-col md:flex-row gap-[50px] md:gap-[109px] bg-[#6D8C54] py-10 md:py-0">
        <div className="relative mx-auto md:mx-0">
          <img src="/images/modern_argriculture/1.svg" alt="" className="w-full max-w-[695px] h-auto" />
          <img
            src="/images/modern_argriculture/logo.svg"
            alt=""
            className="absolute top-[20px] md:top-[39px] -right-[18px] md:-right-[36px] w-[50px] md:w-[100px] h-auto"
          />
        </div>
        <img
          src="/images/modern_argriculture/style.svg"
          alt=""
          className="absolute bottom-0 right-0 w-[300px] md:w-[604px] h-auto"
        />
        <div className="absolute top-0 right-0 hidden md:block">
          <div className="relative w-[100px] md:w-[205px] h-[100px] md:h-[208px]">
            <div className="absolute top-0 right-0 w-[88px] md:w-[176px] h-[88px] md:h-[176px] bg-[#678551] rounded-bl-[10px]"></div>
            <div className="absolute bottom-0 left-0 w-[40px] md:w-[80px] h-[40px] md:h-[80px] bg-[#DDDDDD]/15 rounded-[10px]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] md:gap-[67px] py-5 md:py-10 z-10 px-4 md:px-0">
          <hgroup>
            <span className="text-sm md:text-base">MODERN AGRICULTURE</span>
            <h2 className="text-2xl md:text-4xl">
              Providing High Quality
              <br />
              Products
            </h2>
          </hgroup>
          <div className="flex flex-col gap-[15px] md:gap-[30px]">
            {getItem(
              "/images/modern_argriculture/icon1.svg",
              "Our Agriculture Growth",
              "Lorem ipsum dolor sit amet consectetur. Cursus purus at tempus arcu. Metus elit auctor",
            )}
            <div className="h-px bg-white/20"></div>
            {getItem(
              "/images/modern_argriculture/icon2.svg",
              "Making Healthy Foods",
              "Lorem ipsum dolor sit amet consectetur. Cursus purus at tempus arcu. Metus elit auctor interdum scelerisque",
            )}
          </div>
        </div>
      </div>
    )
  }
  
  