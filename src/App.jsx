import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        setProducts(result?.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingUp(currentScrollY < prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <div>
      <header
        className={`w-full bg-black text-white py-8 ${
          scrollingUp ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 ease-in-out fixed top-0 left-0`}
      >
        <h1 className="text-4xl font-bold text-left">The Honest Company</h1>
      </header>
      <div className="container mx-auto mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products &&
            products?.length > 0 &&
            products?.map((item) => (
              <div key={item?.id} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={item?.thumbnail}
                  alt={`Image for item ${item?.id}`}
                  className="w-full h-auto max-h-60 object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-800 mt-2">
                  {item?.title}
                </h2>
                <p className="text-gray-600 py-6">{item?.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
