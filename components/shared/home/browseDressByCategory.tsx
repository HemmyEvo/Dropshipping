/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';

interface DressStyle {
  name: string;
  image: string;
  link: string;
}

interface BrowseByDressStyleProps {
  styles?: DressStyle[];
}

const BrowseByDressStyle = ({ styles = [] }: BrowseByDressStyleProps) => {
  // Default styles in case the props are empty or incomplete
  const defaultStyles: DressStyle[] = [
    {
      name: "Casual",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
      link: "/dress-style/casual"
    },
    {
      name: "Formal",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
      link: "/dress-style/formal"
    },
    {
      name: "Party",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      link: "/dress-style/party"
    },
    {
      name: "Gym",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "/dress-style/gym"
    }
  ];


  // Use provided styles or fall back to defaults
  const displayStyles = styles.length >= 4 ? styles : defaultStyles;

  return (
    <section className="py-16 sm:px-4  md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl bg-gray-100 py-6 px-3 sm:px-10 rounded-xl mx-auto">
        {/* Heading - matches the exact style from the image */}
        <h2 className="font-integral text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 ">
          BROWSE BY DRESS STYLE
        </h2>
        
        {/* Grid layout for dress styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Casual - Large block on left */}
          <Link 
            href={displayStyles[0].link}
            className="relative h-80 md:h-full rounded-2xl overflow-hidden group"
          >
            <Image
              src={displayStyles[0].image}
              alt={displayStyles[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white text-2xl md:text-3xl font-bold">{displayStyles[0].name}</span>
            </div>
          </Link>
          
          {/* Right column with three smaller blocks */}
          <div className="grid grid-rows-2 gap-6">
            {/* Top right - Formal */}
            <Link 
              href={displayStyles[1].link}
              className="relative h-56 md:h-60 rounded-2xl overflow-hidden group"
            >
              <Image
                src={displayStyles[1].image}
                alt={displayStyles[1].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white text-xl md:text-2xl font-bold">{displayStyles[1].name}</span>
              </div>
            </Link>
            
            {/* Bottom right grid - Party and Gym */}
            <div className="grid grid-cols-2 gap-6">
              {/* Party */}
              <Link 
                href={displayStyles[2].link}
                className="relative h-56 md:h-60 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={displayStyles[2].image}
                  alt={displayStyles[2].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white text-lg md:text-xl font-bold">{displayStyles[2].name}</span>
                </div>
              </Link>
              
              {/* Gym */}
              <Link 
                href={displayStyles[3].link}
                className="relative h-56 md:h-60 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={displayStyles[3].image}
                  alt={displayStyles[3].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white text-lg md:text-xl font-bold">{displayStyles[3].name}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByDressStyle;