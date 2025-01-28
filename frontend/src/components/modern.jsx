import React from 'react';

const getItem = (imgPath, header, text) => (
    <div className='flex gap-[30px] items-center'>
        <div className='w-[90px] h-[90px] rounded-full bg-[#344C31] flex justify-center items-center'>
            <img src={imgPath} alt="" width={50} height={50} />
        </div>
        <div className='w-[494px] flex flex-col gap-[7px]'>
            <h3 className='font-semibold text-[24px]'>{header}</h3>
            <p>{text}</p>
        </div>
    </div>
);

export default function Modern() {
    return (
        <div className="relative flex gap-[109px] bg-[#6D8C54]">
            <div className='relative'>
                <img src="/images/modern_argriculture/1.svg" alt="" width={695} height={559} />
                <img src="/images/modern_argriculture/logo.svg" alt="" width={100} height={100} className='absolute top-[39px] -right-[36px]' />
            </div>
            <img src="/images/modern_argriculture/style.svg" alt="" width={604} height={343} className='absolute bottom-0 right-0' />
            <div className='absolute top-0 right-0'>
                <div className='relative w-[205px] h-[208px]'>
                    <div className='absolute top-0 right-0 w-[176px] h-[176px] bg-[#678551] rounded-bl-[10px]'></div>
                    <div className='absolute bottom-0 left-0 w-[80px] h-[80px] bg-[#DDDDDD]/15 rounded-[10px]'></div>
                </div>
            </div>
            <div className='flex flex-col gap-[67px] py-10 z-10'>
                <hgroup>
                    <span>MODERN AGRICULTURE</span>
                    <h2>Providing High Quality<br />
                        Products</h2>
                </hgroup>
                <div className='flex flex-col gap-[30px]'>
                    {getItem('/images/modern_argriculture/icon1.svg', 'Our Agriculture Growth', 'Lorem ipsum dolor sit amet consectetur. Cursus purus at tempus arcu. Metus elit auctor')}
                    <div className='h-px bg-white/20'></div>
                    {getItem('/images/modern_argriculture/icon2.svg', 'Making Healthy Foods', 'Lorem ipsum dolor sit amet consectetur. Cursus purus at tempus arcu. Metus elit auctor interdum scelerisque')}
                </div>
            </div>
        </div>
    );
}
