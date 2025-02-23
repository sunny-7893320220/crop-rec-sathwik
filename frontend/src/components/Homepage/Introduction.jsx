export default function Introduction() {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 md:gap-20 pt-[50px] md:pt-[100px] pb-[80px] md:pb-[159px] px-4 md:px-0">
      {/* Background Green Rectangle */}
    

      {/* Image and Overlay Elements */}
      <div className="relative h-fit mx-auto md:mx-0 max-w-[564px]">
      <div className="absolute top-0 left-0 w-full md:w-[512px] h-[300px] md:h-[497px] bg-[#701515] -z-50"></div>
        <img src="/images/our_introduction/1.svg" alt="Introduction" className="w-full h-auto" />
        <div className="absolute -left-2 md:-left-5 bottom-0 w-2 md:w-5 h-[128px] md:h-[258px] bg-[#F7C35F] rounded-l-[5px]"></div>
        <div className="absolute -bottom-[30px] md:-bottom-[59px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[428px] h-[100px] md:h-[140px] rounded-[10px] flex justify-evenly items-center bg-[#6D8C54]">
          <img src="/images/our_introduction/icon1.svg" alt="Achievement Icon" className="w-[38px] md:w-[76px] h-[35px] md:h-[70px]" />
          <div className="w-px h-[38px] md:h-[77px] bg-white/20"></div>
          <div className="flex flex-col gap-[3px] md:gap-[7px]">
            <span className="font-mistral text-[20px] md:text-[40px]">86,700</span>
            <p className="text-[12px] md:text-[16px]">Successfully Project Completed</p>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-[30px] md:gap-[55px] pt-[19px] items-start ">
        <div className="flex flex-col gap-3 md:gap-5">
          <span className="text-sm md:text-base uppercase">Our Introduction</span>
          <h2 className="text-2xl md:text-4xl font-bold">Pure Agriculture and Organic Form</h2>
        </div>
        <div className="flex flex-col gap-3 md:gap-5">
          <h3 className="text-[#F7C35F] font-medium text-lg md:text-xl">We're Leader in Agriculture Market</h3>
          <p className="text-sm md:text-base leading-relaxed max-w-[796px]">
            There are many variations of passages of available but the majority have suffered alteration in some form,
            by injected humou or randomised words even slightly believable.
          </p>
        </div>
        <ul className="flex flex-col gap-3 md:gap-5">
          {[
            "Organic food contains more vitamins",
            "Eat organic because supply meets demand",
            "Organic food is never irradiated",
          ].map((text, index) => (
            <li key={index} className="flex gap-3 md:gap-5 items-center">
              <img
                src="/images/our_introduction/icon2.svg"
                alt="Checkmark"
                className="w-[15px] md:w-[20px] h-[16px] md:h-[21px]"
              />
              <span className="text-sm md:text-base">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}