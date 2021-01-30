import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import dallas from '../images/dallas.webp';
import austin from '../images/austin.webp';
import newyork from '../images/newyork.webp';
import sanfrancisco from '../images/sanfrancisco.webp';
import beijing from '../images/beijing.webp';

const cities = [
  { name: 'Dallas', image: dallas },
  { name: 'Austin', image: austin },
  { name: 'New York', image: newyork },
  { name: 'San Francisco', image: sanfrancisco },
  { name: 'Beijing', image: beijing },
];

export const Hamburger = ({ state }) => {
  let menu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let revealMenu = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  const handleHover = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 3,
      ease: 'power3.inOut',
    });
  };
  const handleHoverExit = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: 'power3.inOut',
    });
  };

  const handleCity = (city) => {
    gsap.to(cityBackground, {
      height: '100%',
      duration: 0,
      background: `url(${city}) center center`,
    });

    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 1,
      ease: 'power3.inOut',
    });
    gsap.from(cityBackground, {
      duration: 0.4,
      skewY: 4,
      transformOrigin: 'right top',
    });
  };
  const handleCityReturn = () => {
    gsap.to(cityBackground, { duration: 0.4, opacity: 0 });
  };
  useEffect(() => {
    if (state.clicked === false) {
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.07,
        },
      });
      gsap.to(menu, { duration: 0.8, css: { display: 'none' } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.to(menu, { duration: 0.8, css: { display: 'block' } });
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0,
        height: '100%',
        opacity: 1,
      });
      staggerReveal(revealMenuBackground, revealMenu);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);
  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: 'right top',
      skewY: 2,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.1,
      },
    });
  };
  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 70,
      duration: 1,
      delay: 0.2,

      ease: 'power3.inOut',
    });
  };
  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8,
      y: 100,
      delay: 0.1,
      opacity: 0,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.3,
      },
    });
  };

  return (
    <div className='hamburger-menu' ref={(el) => (menu = el)}>
      <div
        className='menu-secondary-background-color'
        ref={(el) => (revealMenuBackground = el)}></div>
      <div className='menu-layer' ref={(el) => (revealMenu = el)}>
        <div
          className='menu-city-background'
          ref={(el) => (cityBackground = el)}></div>
        <div className='container'>
          <div className='wrapper'>
            <div className='menu-links'>
              <nav>
                <ul>
                  <li>
                    <Link
                      ref={(el) => (line1 = el)}
                      to='/opportunities'
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}>
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link
                      ref={(el) => (line2 = el)}
                      to='/solutions'
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}>
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      ref={(el) => (line3 = el)}
                      to='/contact-us'
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={(el) => (info = el)} className='info'>
                <h3>Our Promise</h3>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as desktop publishers bundled the text with
                  their software.
                </p>
              </div>
              <div className='locations'>
                Locations:
                {cities.map((el) => (
                  <span
                    key={el.name}
                    onMouseEnter={() => handleCity(el.image)}
                    onMouseOut={handleCityReturn}>
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hamburger;
