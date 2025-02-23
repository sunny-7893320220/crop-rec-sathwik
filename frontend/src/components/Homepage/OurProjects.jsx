import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const CustomCarousel = () => {
  const slides = [
    {
      image: "/images/recently_completed_work/1.svg",
      title: "Farming with Technology",
      description: "Natural way of agriculture",
    },
    {
      image: "/images/recently_completed_work/2.svg",
      title: "Sustainable Agriculture",
      description: "Modern sustainable farming",
    },
    {
      image: "/images/recently_completed_work/3.svg",
      title: "Fresh Vegetables Market",
      description: "Fresh and healthy produce",
    },
    {
      image: "/images/recently_completed_work/4.svg",
      title: "Modern Harvesting",
      description: "Efficient harvesting techniques",
    },
  ]

  return (
    <Carousel
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      className="h-[350px] w-full"
      arrows={false}
      showDots={false}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative group w-full md:w-[318px] h-[350px] mx-2 md:mx-4 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 text-white">
            <h3 className="text-base md:text-lg font-semibold">{slide.title}</h3>
            <p className="text-xs md:text-sm mt-2">{slide.description}</p>
          </div>
          <div className="absolute bottom-4 right-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl font-bold">
            →
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default CustomCarousel

