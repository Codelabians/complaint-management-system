const CommunityHero = () => {
  return (
    <div className="bg-grey text-white p-8 relative lg:w-1/2">
      <div className="w-40 mx-auto py-10">
        <img src="/public/img/community connect white.png" alt="" />
      </div>
      {/* Main Heading */}
      <div className="mb-8 text-center my-5 w-full mx-auto">
        <h1 className="text-3xl lg:text-4xl font-manrope leading-tight">
          Your Community
          <br />
          Journey{" "}
          <span className="text-orange font-semibold">Starts Here.</span>
        </h1>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 mx-auto py-10">
        {[
          "1b70580d5e005358f21fa76498c3506a825684a4.jpg",
          "30743351440c792a8877a0001d9486284f2ff679.jpg",
          "56ae7d0c5acad4b0bc4b33017e89e49b5b90ba25.jpg",
          "7d295d71609bbc4e6358fc109cd40864995a9020.jpg",
        ].map((img, i) => (
          <div key={i} className="rounded-lg overflow-hidden shrink-0 ">
            <img
              src={`/img/${img}`}
              alt={`Community image ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
   <div className="relative bg-white">
  <img src="/public/img/Sider.svg" alt="Edit" className="absolute top-0 right-0 w-6 h-6" />
</div>
   
    </div>
  );
};

export default CommunityHero;
