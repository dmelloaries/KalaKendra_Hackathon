import { Button } from "@/components/ui/button";
import Carde from "./Carde";
import video from "../../assets/bg-video-vmake.mp4";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import bluePot from "../../assets/blue-pot.jpeg"; // Example image
import ring from "../../assets/ring.jpeg"; // Example image
import kashmiri from "../../assets/kashmiri.jpeg"; // Example image
import ring1 from "../../assets/ring1.jpeg"; // Example image
import bg1 from "../../assets/bg1.jpeg";

const categoriesWithIcon = [
  { id: "men", label: "All Products", icon: ShirtIcon },
  { id: "women", label: "Jewellery", icon: CloudLightning },
  { id: "kids", label: "Wall items", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Ariess", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

// Component: RecommendedCollections
//import React from 'react';
//import { Card, CardContent } from "@/components/ui/card";
//import bluePot from "../../assets/blue-pot.jpeg";
//import ring from "../../assets/ring.jpeg";
// import kashmiri from "../../assets/kashmiri.jpeg";
// import ring1 from "../../assets/ring1.jpeg";

const collections = [
  { id: "decor", label: "Decor", image: bluePot },
  { id: "jewellery", label: "Jewellery", image: ring },
  { id: "wall-items", label: "Wall Items", image: kashmiri },
  { id: "accessories", label: "Accessories", image: ring1 },
];

const RecommendedCollections = () => {
  return (
    <section className="py-12 text-center">
      <h2 className="text-4xl font-bold mb-6 text-orange-600" style={{ fontFamily: 'Brush Script MT, cursive' }}>
        Recommended Collections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <Card 
            key={collection.id}
            className="cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative group">
              <img 
                src={collection.image} 
                alt={collection.label} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Palatino, serif' }}>{collection.label}</h3>
                  <p className="text-sm font-bold uppercase tracking-wider">Explore Collection</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};


// Component: ShoppingHome
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // const featureImageList = [
  //   // { image: image1 }, // Image slide
  //   { video: video }, // Video slide
  //   // { image: image2 }, // Another image slide
  // ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Feature Video Carousel */}
      {/* Feature Video */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <video
          src={video}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) =>
              (prevSlide - 1 + featureImageList.length) %
              featureImageList.length
          )
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border-0 hover:bg-white/20"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide + 1) % featureImageList.length
          )
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-0 hover:bg-white/20"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>

      {/* Cards Section */}
      <div>
        <Carde />
      </div>

      <div
        className="bg-cover bg-center py-1"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        {/* Recommended Collections */}
        <RecommendedCollections />
      </div>

      {/* Feature Products */}
      <section className="py-1">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl text-center font-bold mb-6 text-orange-600"
            style={{ fontFamily: "Brush Script MT, cursive" }}
          >
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <a
        href="https://wa.me/918263954372"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* Product Details Dialog */}
      {openDetailsDialog && (
        <ProductDetailsDialog
          open={openDetailsDialog}
          onOpenChange={setOpenDetailsDialog}
          productDetails={productDetails}
          handleAddtoCart={handleAddtoCart}
        />
      )}

    
    </div>

    
  );
}

export default ShoppingHome;