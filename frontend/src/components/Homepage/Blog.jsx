const getListItem = (topic, href, byUser, amountComments, date, imgName) => (
    <li className="w-full md:w-[460px] h-auto md:h-[514px] bg-[#2D442F] mb-6 md:mb-0">
      <a href={href}>
        <img src={`/images/from_the_blog/${imgName}.svg`} alt="" className="w-full h-auto md:h-[364px] object-cover" />
        <div className="relative flex flex-col gap-3 md:gap-5 p-4 md:p-5">
          <div className="flex gap-3 md:gap-5 flex-wrap">
            <div className="flex gap-[7px] items-center">
              <img src={`/images/from_the_blog/user.svg`} alt="" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-[14px]">by {byUser}</span>
            </div>
            <div className="flex gap-[7px] items-center">
              <img src={`/images/from_the_blog/comment.svg`} alt="" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-[14px]">{amountComments} Comments</span>
            </div>
          </div>
          <span className="font-bold text-lg md:text-[24px]">{topic}</span>
          <span className="absolute top-0 right-0 rounded-bl-[10px] bg-[#F7C35F] text-black px-3 md:px-5 py-1 md:py-[7px] text-xs md:text-[15px] font-bold">
            {date}
          </span>
        </div>
      </a>
    </li>
  )
  
  export default function Blog() {
    return (
      <div className="relative flex flex-col gap-[50px] md:gap-[100px] py-[50px] md:py-[100px]">
        <div className="h-[300px] md:h-[573px] absolute top-0 right-0 left-0 bg-[#263C28] -z-50">
          <div className="h-full bg-[url(/images/from_the_blog/bg.svg)] bg-cover bg-center"></div>
        </div>
        <hgroup className="flex flex-col items-center px-4 text-center">
          <span className="text-sm md:text-base">FROM THE BLOG</span>
          <h2 className="text-2xl md:text-4xl">News & Articles</h2>
        </hgroup>
        <ul className="flex flex-col md:flex-row justify-between gap-[30px] px-4 md:px-0">
          {getListItem("Taking seamless key indicators offline to", "/blog/1", "Kevin Martin", 2, "3 Sep, 2023", "1")}
          {getListItem("Override the digital divide with additional", "/blog/2", "Kevin Martin", 5, "3 Sep, 2023", "2")}
          {getListItem("Agriculture Matters to the Future of next", "/blog/1", "Kevin Martin", 1, "3 Sep, 2023", "3")}
        </ul>
      </div>
    )
  }
  
  