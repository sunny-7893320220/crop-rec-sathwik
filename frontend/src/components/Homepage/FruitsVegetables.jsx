const getCard = (item) => (
    <button className="w-full sm:w-[183px] h-[177px] rounded-[15px] flex flex-col gap-5 px-4 sm:px-[57px] py-[33px] bg-[#D9D9D9]/10 hover:bg-[#F7C35F]">
      <img src={`/images/fruits&vegtables/${item}.svg`} alt="Fruit" className="w-16 h-16 sm:w-24 sm:h-24 mx-auto" />
      <span className="capitalize text-center">{item}</span>
    </button>
  )
  
  export default function FruitsVegetables() {
    return (
      <div className="flex flex-col items-center gap-[50px] md:gap-[100px] pt-[40px] md:pt-[78px] pb-[100px] md:pb-[188px]">
        <hgroup className="flex flex-col gap-5 items-center text-center px-4">
          <span>Popular Foods And Vegetables</span>
          <h2 className="signika-font text-2xl md:text-4xl">Quality Fruits & Vegetables</h2>
        </hgroup>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
          {getCard("apple")}
          {getCard("blueberry")}
          {getCard("strawberry")}
          {getCard("eggplant")}
          {getCard("cabbage")}
          {getCard("carrot")}
        </div>
      </div>
    )
  }
  
  