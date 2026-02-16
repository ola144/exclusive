const products: IProduct[] = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://www.techlandbd.com/cache/images/uploads/products/P1422506065/havit-gamepad-hv-g92-cover.webp',
      'https://www.techlandbd.com/cache/images/uploads/products/P1422506065/havit-gamepad-hv-g92-picture-1.webp',
      'https://cdn.bdstall.com/product-image/giant_258718.jpg',
      'https://cdn.bdstall.com/product-image/giant_258720.jpg',
    ],
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    category: 'gaming',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 120,
  },
  {
    id: 2,
    name: 'AK-900 Wired Keyboard',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://img.myipadbox.com/upload/store/detail_l/TBD0602123801_B6.jpg',
      'https://img.myipadbox.com/upload/store/detail_l/TBD0602123801_B1.jpg',
    ],
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    category: 'computer',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 960,
  },
  {
    id: 3,
    name: 'IPS LCD Gaming Monitor',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
    ],
    price: 370,
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
    category: 'computer',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 370,
  },
  {
    id: 4,
    name: 'Smart Watch',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
    ],
    price: 375,
    oldPrice: 400,
    discount: 25,
    rating: 4,
    reviews: 90,
    category: 'watch',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 375,
  },
];

const allProducts: IProduct[] = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://www.techlandbd.com/cache/images/uploads/products/P1422506065/havit-gamepad-hv-g92-cover.webp',
      'https://www.techlandbd.com/cache/images/uploads/products/P1422506065/havit-gamepad-hv-g92-picture-1.webp',
      'https://cdn.bdstall.com/product-image/giant_258718.jpg',
      'https://cdn.bdstall.com/product-image/giant_258720.jpg',
    ],
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    category: 'gaming',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 120,
  },
  {
    id: 2,
    name: 'AK-900 Wired Keyboard',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://img.myipadbox.com/upload/store/detail_l/TBD0602123801_B6.jpg',
      'https://img.myipadbox.com/upload/store/detail_l/TBD0602123801_B1.jpg',
    ],
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    category: 'computers',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 960,
  },
  {
    id: 3,
    name: 'IPS LCD Gaming Monitor',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
      'https://images.philips.com/is/image/philipsconsumer/2a4dbe9d0f8941be8e6cb2d500bbafba?$png$&wid=726&hei=726',
    ],
    price: 370,
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
    category: 'computers',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 370,
  },
  {
    id: 4,
    name: 'Smart Watch',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
      'https://images-cdn.ubuy.co.in/66176e0fa60fc66f9b067a50-smart-watch-1-7in-screen-smart-watches.jpg',
    ],
    price: 375,
    oldPrice: 400,
    discount: 25,
    rating: 4,
    reviews: 90,
    category: 'watch',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 375,
  },
  {
    id: 5,
    name: "Danami Men's Plan Round Neck T-Shirt",
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
    ],
    price: 100,
    rating: 3,
    reviews: 35,
    category: 'wears',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 100,
  },
  {
    id: 6,
    name: 'CANON EOS DSLR Camera',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      '/images/canon-camera.png',
      '/images/canon-camera.png',
      '/images/canon-camera.png',
      '/images/canon-camera.png',
    ],
    price: 360,
    rating: 4,
    reviews: 95,
    category: 'camera',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 360,
  },
  {
    id: 7,
    name: 'ASUS FHND Gaming Laptop',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      '/images/gaming-laptop.png',
      '/images/gaming-laptop.png',
      '/images/gaming-laptop.png',
      '/images/gaming-laptop.png',
    ],
    price: 700,
    rating: 5,
    reviews: 325,
    category: 'laptop',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 700,
  },
  {
    id: 8,
    name: 'Red & White Testured Shirt Combo',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
    ],
    price: 500,
    rating: 4,
    reviews: 145,
    category: 'wears',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 500,
  },
  {
    id: 9,
    name: 'Logitech Zone Vite 100 Wireless Headseet',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/24/6113352/1.jpg?5039',
      'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/24/6113352/1.jpg?5039',
      'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/24/6113352/1.jpg?5039',
      'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/24/6113352/1.jpg?5039',
    ],
    price: 960,
    rating: 5,
    reviews: 65,
    category: 'headphone',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 960,
  },
  {
    id: 10,
    name: 'Nike Air Zoom Mercurial Vapor XVI Elite x Vini Jr FG',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://www.prodirectsport.us/cdn/shop/files/1032344_main.jpg?v=1770681479&width=600',
      'https://www.prodirectsport.us/cdn/shop/files/1032344_gallery_1.jpg?v=1770681479&width=600',
      'https://www.prodirectsport.us/cdn/shop/files/1032344_gallery_2.jpg?v=1770681479&width=600',
      'https://www.prodirectsport.us/cdn/shop/files/1032344_gallery_4.jpg?v=1770681479&width=600',
    ],
    price: 1160,
    rating: 5,
    reviews: 35,
    category: 'wears',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 1160,
  },
  {
    id: 11,
    name: 'GP11 Shooter USB Gamepad',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      '/images/gamepad.png',
      '/images/gamepad.png',
      '/images/gamepad.png',
      '/images/gamepad.png',
    ],
    price: 660,
    rating: 4,
    reviews: 555,
    status: 'new',
    category: 'gaming',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 660,
  },
  {
    id: 12,
    name: 'Quilted Satin Jacket',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      '/images/statin-jacket.png',
      '/images/statin-jacket.png',
      '/images/statin-jacket.png',
      '/images/statin-jacket.png',
    ],
    price: 660,
    rating: 4,
    reviews: 55,
    category: 'wears',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 960,
  },
];

const cartItems: IProduct[] = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://www.techlandbd.com/cache/images/uploads/products/P1422506065/havit-gamepad-hv-g92-cover.webp',
      'https://www.techlandbd.com/cache/images/uploads/products/P1422506065/havit-gamepad-hv-g92-picture-1.webp',
      'https://cdn.bdstall.com/product-image/giant_258718.jpg',
      'https://cdn.bdstall.com/product-image/giant_258720.jpg',
    ],
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    category: 'gaming',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 120,
  },
  {
    id: 2,
    name: 'AK-900 Wired Keyboard',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://img.myipadbox.com/upload/store/detail_l/TBD0602123801_B6.jpg',
      'https://img.myipadbox.com/upload/store/detail_l/TBD0602123801_B1.jpg',
    ],
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    category: 'computer',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 960,
  },
];

const wishList: IProduct[] = [
  {
    id: 5,
    name: "Danami Men's Plan Round Neck T-Shirt",
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
      'https://danami.ng/wp-content/uploads/2023/10/Danami-Mens-Plain-Round-Neck-T-Shirt-White.jpg',
    ],
    price: 100,
    rating: 3,
    reviews: 35,
    category: 'wears',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 100,
  },
  {
    id: 6,
    name: 'CANON EOS DSLR Camera',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      '/images/canon-camera.png',
      '/images/canon-camera.png',
      '/images/canon-camera.png',
      '/images/canon-camera.png',
    ],
    price: 360,
    rating: 4,
    reviews: 95,
    category: 'camera',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 360,
  },
  {
    id: 7,
    name: 'ASUS FHND Gaming Laptop',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      '/images/gaming-laptop.png',
      '/images/gaming-laptop.png',
      '/images/gaming-laptop.png',
      '/images/gaming-laptop.png',
    ],
    price: 700,
    rating: 5,
    reviews: 325,
    category: 'laptop',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 700,
  },
  {
    id: 8,
    name: 'Red & White Testured Shirt Combo',
    description:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    image: [
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
      'https://cottonfolk.in/cdn/shop/files/Ivory_Iris_Shirt_Combo.jpg?v=1746022132&width=800',
    ],
    price: 500,
    rating: 4,
    reviews: 145,
    category: 'wears',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    quantity: 1,
    subtotal: 500,
  },
];

export { products, allProducts, cartItems, wishList };

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  status?: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  sizes: string[];
  quantity: number;
  subtotal: number | any;
}
