export default function ContactUs() {
    return (
      <div className="flex flex-col md:flex-row gap-[50px] md:gap-[133px] justify-center py-[50px] md:py-[100px] px-4 md:px-0">
        <div className="flex flex-col gap-[30px] md:gap-[50px]">
          <hgroup>
            <span className="uppercase text-sm md:text-base">CONTACT NOW</span>
            <h2 className="uppercase text-2xl md:text-4xl">GET IN TOUCH NOW</h2>
            <p className="w-full md:w-[643px] text-sm md:text-base">
              Lorem ipsum dolor sit amet, adipiscing elit. In hac habitasse platea dictumst. Duis porta,quam ut finibus
              ultrices.
            </p>
          </hgroup>
          <div className="flex flex-col gap-5 md:gap-10">
            <div className="flex flex-col gap-[7px]">
              <span className="uppercase text-xs md:text-sm">phone</span>
              <div className="flex flex-col gap-[10px] font-medium text-base md:text-xl">
                <small>99999999</small>
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <span className="uppercase text-xs md:text-sm">email</span>
              <div className="flex flex-col gap-[10px] font-medium text-base md:text-xl">
                <small>smartagro@gmail.com</small>
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <span className="uppercase text-xs md:text-sm">address</span>
              <div className="flex flex-col gap-[10px] font-medium text-base md:text-xl">
                <small>hyderabad</small>
              </div>
            </div>
          </div>
        </div>
        <form action="" className="flex flex-col gap-[20px] md:gap-[30px] w-full md:w-[494px] text-sm md:text-[16px]">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className="w-full max-w-[664px] rounded-[10px] px-[15px] md:px-[22px] py-[15px] md:py-[25px] bg-[#263C28]"
          />
          <input
            type="tel"
            name="tel"
            id="tel"
            placeholder="Phone Number"
            className="w-full max-w-[664px] rounded-[10px] px-[15px] md:px-[22px] py-[15px] md:py-[25px] bg-[#263C28]"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="w-full max-w-[664px] rounded-[10px] px-[15px] md:px-[22px] py-[15px] md:py-[25px] bg-[#263C28]"
          />
          <textarea
            name="msg"
            id="msg"
            placeholder="Your Message"
            className="w-full max-w-[664px] rounded-[10px] px-[15px] md:px-[22px] py-[15px] md:py-[25px] bg-[#263C28] resize-none h-[100px] md:h-[150px]"
          ></textarea>
          <button
            type="submit"
            className="w-fit uppercase rounded-[20px] px-[25px] md:px-[50px] py-[15px] md:py-[25px] text-black bg-[#F7C35F] text-sm md:text-base"
          >
            Send message
          </button>
        </form>
      </div>
    )
  }
  
  