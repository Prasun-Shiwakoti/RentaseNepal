import React from 'react';
import HostelCard from './HostelCard';
import '../style.css';
import hostels from '../data/hostels.json';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const FeaturedHostels = () => {
    return (
        <div className="featuredhostel-section">
            <h2>Featured Hostels</h2>

                <Swiper
                    style={{
                        padding:"60px",
                        overflow: "hidden"
                    }}
                    className="scrollable-cards-wrapper"
                    slidesPerView={3}
                    slidesPerGroup={3}
                    spaceBetween={25}
                    loop={true}
                    fadeEffect={true}
                    grabCursor={true}
                    pagination={{ clickable: true, dynamicBullets: true, }}
                    navigation={true}
                    breakpoints={{
                        0: {slidesPerView: 1,},
                        520: {slidesPerView: 2,},
                        950: {slidesPerView: 3,},
                    }}
                    modules={[Pagination, Navigation]}
                    >
                    {hostels.filter(hostel => hostel.isFeatured).map((hostel, index) => (
                        <SwiperSlide>
                            <HostelCard
                                key={index}
                                id={hostel.id}
                                image={hostel.image}
                                name={hostel.title}
                                isFeatured={hostel.isFeatured}
                                rating={hostel.rating}
                                location={hostel.location}
                                price={hostel.price}
                                gender={hostel.gender}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
        </div>
    );
};

export default FeaturedHostels;