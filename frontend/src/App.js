// TODO: Change all <a> tags href
import './App.css';
// import axios from 'axios';
import React from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';
// import { useAuth } from './utils';

function App() {
  const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
  ]
  // const [data, setData] = useState({ results: [] });
  // const token = "token is generated after signup or login => find a way to store token secretly!"
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // };

  // Testing
  // const handleSubmit = (event) => {
  //   const fetchData = async () => {
  //     const result = await axios("http://localhost:8080/categories/", config);

  //     setData(result.data);
  //   };
  //   fetchData();
  //   console.log(data);
  //   event.preventDefault();
  // }


  return (
    <>
    <div class="min-h-full">
      <Navbar />
      <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden bg-white">
          <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div class="sm:max-w-lg">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Level up your collection!</h1>
                <p class="mt-4 text-xl text-gray-500">Dive into our latest lineup of exclusive anime figures, gaming gear, and digital artwork. Whether you're a seasoned collector or just starting out, Anime Arcade has everything you need to bring your favorite worlds to life.</p>
              </div>
            <div>
        <div class="mt-10">
            <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
              <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                      <img src="https://res.cloudinary.com/indonesiadesign/image/upload/f_auto,fl_progressive/ipad_pro_2019_best_table_for_art_and_design.jpg" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://assets.xboxservices.com/assets/f0/8d/f08dfa50-f2ef-4873-bc8f-bcb6c34e48c0.png?n=642227_Hero-Gallery-0_C2_857x676.png" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                  </div>
                  <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://i.ebayimg.com/00/s/MTYwMFgxMTk5/z/zasAAOSwxWdipVtJ/$_57.JPG?set_id=8800005007" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                  </div>
                  <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" alt="" class="h-full w-full object-cover object-center" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
                <a href="/" class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">Shop Collection</a>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </main>
    </div>
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
            <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
                <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
                    <div className="flex flex-col justify-center md:w-1/2">
                        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">Best Deal</h1>
                        <p className="text-base lg:text-xl text-gray-800 mt-2">
                            Save Up to <span className="font-bold">50%</span>
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
                        <img src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png" alt="" />
                    </div>
                </div>
                <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">Game Console</h1>
                        <p className="text-base lg:text-xl text-gray-800">
                            Save Up to <span className="font-bold">30%</span>
                        </p>
                    </div>
                    <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                        <img src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png" alt="" className="md:w-20 md:h-20 lg:w-full lg:h-full" />
                    </div>
                </div>
            </div>
        </div>
      
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best Sellers</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
}

export default App;
