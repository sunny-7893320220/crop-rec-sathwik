export default function Leader() {
    return (
      <div className="relative h-[200px] md:h-[313px] bg-[url(/images/we_are_leader/style.svg)] bg-cover">
        <div className="absolute top-1/2 left-4 md:left-[94px] transform -translate-y-1/2 flex flex-col md:flex-row gap-4 md:gap-[50px] items-center">
          <div className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-full flex justify-center items-center bg-[#344C31]">
            <img src="/images/we_are_leader/icon1.svg" alt="" className="w-8 h-8 md:w-[50px] md:h-[50px]" />
          </div>
          <span className="font-johnstowndemo text-2xl md:text-[50px] text-center md:text-left text-[#344C31]">
            We are Leader in Agriculture Market
          </span>
        </div>
        <button className="absolute bottom-4 right-4 md:top-[122px] md:right-[94px] uppercase bg-[#F7C35F] text-black rounded-[20px] px-4 py-2 md:px-[25px] md:py-[25px] text-sm md:text-base">
          discover more
        </button>
      </div>
    )
  }
  
  