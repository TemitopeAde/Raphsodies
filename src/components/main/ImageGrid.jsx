export default function ImageGrid() {
    return (
      <div className="grid grid-cols-7 gap-4">
        {/* First Image */}
        <div className="col-span-2 row-span-2 h-[177px] lg:h-full">
          <img
            src="/images/1.png"
            alt="Skin Temple Oil"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Second Image */}
        <div className="col-span-3">
          <img
           src="/images/2.png"
            alt="Oil 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Third Image */}
        <div className="col-span-2">
          <img
            src="/images/3.png"
            alt="Oil 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Fourth Image */}
        <div className="col-span-2">
          <img
            src="/images/4.png"
            alt="Oil 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Fifth Image */}
        <div className="col-span-3">
          <img
            src="/images/5.png"
            alt="Botanical Exfoliator"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    );
  }
  