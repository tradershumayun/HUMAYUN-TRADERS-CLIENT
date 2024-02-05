import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <section className="flex items-center max-h-full p-16 bg-white">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="  text-center">
            <img
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--upMfnEaM--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/7aqcppklh6bexoa70320.jpg"
              alt="404 Error"
              className="mb-8 lg:w-1/2 mx-auto"
            />
            <h2 className="mb-8 font-extrabold text-9xl ">
              <span className="sr-only">Error</span>
            </h2>
            <p className="text-2xl font-semibold md:text-3xl ">
              দুঃখিত, আমরা এই পৃষ্ঠা খুঁজে পাচ্ছি না।
            </p>
            <p className="mt-4 mb-8  ">
            কিন্তু চিন্তা করবেন না, আপনি আমাদের হোমপেজে অনেক অন্যান্য জিনিস খুঁজতে পারবেন
            </p>
            <Link
              rel="noopener noreferrer"
              to="/"
              className="px-8 py-3 font-semibold rounded  text-white bg-blue-950  hover:bg-gray-600 btn"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page404;
