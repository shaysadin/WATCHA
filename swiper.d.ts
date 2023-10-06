declare module 'swiper/react' {
    interface SwiperOptions {
      navigation?: SwiperNavigationOptions;
    }
  
    interface SwiperNavigationOptions {
      nextEl?: string | HTMLElement;
      prevEl?: string | HTMLElement;
      hideOnClick?: boolean;
      disabledClass?: string;
      hiddenClass?: string;
      lockClass?: string;
      readyClass?: string;
      hidden?: boolean;
      lock?: boolean;
      ready?: boolean;
      /**
       * Custom CSS properties
       */
      custom?: {
        "--swiper-navigation-color"?: string;
        "--swiper-navigation-size"?: string;
      };
    }
  
    const Swiper: React.FC<SwiperProps>;
    const SwiperSlide: React.FC<SwiperSlideProps>;
  }