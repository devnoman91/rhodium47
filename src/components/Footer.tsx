import React from 'react'

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/footer.png')] bg-cover bg-center bg-no-repeat"></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgb(0_0_0/_71%)_0%,_rgb(0_0_0/_73%)_38%,_rgb(0_0_0/_84%)_78%,_rgba(0,_0,_0,_1)_100%)]"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="px-4 md:px-6 py-12 md:py-16 lg:py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-center text-[28px] md:text-[48px] lg:text-[72px] not-italic font-bold leading-[100%] tracking-[-0.56px] md:tracking-[-0.96px] lg:tracking-[-1.44px] font-helvetica mb-4 md:mb-6">
              Preserve the world&apos;s<br />
              spirit of adventure.
            </h1>
            <p className="text-white text-center text-[14px] md:text-[16px] not-italic font-medium leading-[160%] font-helvetica max-w-[280px] md:max-w-[530px] mx-auto mb-8 md:mb-12 lg:mb-[60px]">
              We dedicate ourselves to crafting a future worthy of our descendants
              and protecting the vehicles for centuries ahead
            </p>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl md:max-w-2xl mx-auto">
              <div className="flex-1">
                <label htmlFor="email" className="text-[#F8F9FA]  font-helvetica text-[14px] md:text-[16px] not-italic font-bold leading-[20px] md:leading-[22px] flex mb-3 md:mb-[18px]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Input your email in here"
                  className="rounded-[4px]  bg-[#2A2A2A] w-full px-3 md:px-4 py-2 md:py-3 border border-[#636D79]  focus:outline-none focus:border-white  placeholder-gray-400 text-sm md:text-base text-white font-helvetica text-[16px] not-italic font-normal leading-[22px]"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="zip" className="text-[#F8F9FA] font-helvetica text-[14px] md:text-[16px] not-italic font-bold leading-[20px] md:leading-[22px] flex mb-3 md:mb-[18px]">
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Input your zip code in here"
                  className="rounded-[4px]  bg-[#323232] w-full px-3 md:px-4 py-2 md:py-3  border border-[#636D79] focus:outline-none focus:border-white placeholder-gray-400 text-sm md:text-base text-white font-helvetica text-[16px] not-italic font-normal leading-[22px]"
                />
              </div>
              <div className="flex items-end">
                <button className="cursor-pointer px-[48px] py-[16px] bg-white rounded-full  hover:bg-gray-100 transition-colors duration-200 text-black font-helvetica text-[14px] not-italic font-medium leading-[150%]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info and Contact */}
        <div className="px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="RHODIUM 45 Logo"
                className="w-[140px] md:w-[180px] lg:w-[210px] h-[41px] md:h-[53px] lg:h-[62px] object-contain"
              />
            </div>
            <div className="text-white text-[18px] md:text-[24px] lg:text-[32px] not-italic font-normal leading-[24px] md:leading-[32px] lg:leading-[44px] tracking-[-0.36px] md:tracking-[-0.48px] lg:tracking-[-0.64px] font-helvetica text-center md:text-right">
              hello@yourdomain.com
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto border-t border-white pt-8 md:pt-12 lg:pt-[60px]">
            {/* Top Row - Responsive layout */}
            <div className="flex flex-col lg:grid lg:grid-cols-[35%_55%] gap-8 lg:gap-0 lg:justify-between">
              {/* Company Description */}
              <div>
              <div className="md:col-span-2 lg:col-span-1">
                <div>
                  <p className="text-white font-helvetica text-[18px] md:text-[20px] lg:text-[24px] not-italic font-normal leading-[28px] md:leading-[30px] lg:leading-[34px] tracking-[-0.36px] md:tracking-[-0.40px] lg:tracking-[-0.48px]">
                    Empowering your journey with the comfort solutions you seek, innovative and reliable.
                  </p>
                  <button className="cursor-pointer border-b border-white pt-3 md:pt-4 lg:pt-[14px] text-white font-helvetica text-[16px] md:text-[18px] lg:text-[20px] not-italic font-normal leading-[28px] md:leading-[30px] lg:leading-[34px] tracking-[-0.32px] md:tracking-[-0.36px] lg:tracking-[-0.4px]">
                    Learn more
                  </button>
                </div>


                {/* Bottom Row - Newsletter Subscription */}
                <div className="max-w-xl lg:max-w-2xl pt-6 md:pt-8">
                  <p className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px]">Stay updated with the latest news and offers!</p>
                  <div className="max-w-[320px] md:max-w-[370px] mt-3 md:mt-[14px] flex items-center px-4 md:px-[20px] py-3 md:py-[16px] gap-3 md:gap-[16px] self-stretch rounded-[70px] border border-white">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full focus:outline-none text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[20px] md:leading-[28px] tracking-[-0.28px] md:tracking-[-0.38px] bg-transparent placeholder-gray-400"
                    />
                    <button className="cursor-pointer w-4 md:w-[20px] h-5 md:h-[24px] flex-shrink-0">
                     <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M11.22 6.8L5.72 1.94L6.64 0.839999L12.68 6.06L11.22 6.8ZM0.36 6.78V5.32H11.36V6.78H0.36ZM6.62 11.24L5.7 10.14L11.22 5.3L12.68 6.06L6.62 11.24Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              </div>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12'>
              {/* Services */}
              <div>
                <h4 className="text-white text-[16px] md:text-[18px] not-italic font-medium leading-[26px] md:leading-[34px] font-helvetica tracking-[-0.32px] md:tracking-[-0.36px] mb-4 md:mb-6">Services</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Consultation</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Custom Design</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Maintenance / Service Centers</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Training</a></li>
                </ul>
              </div>

              {/* Technology */}
              <div>
                <h4 className="text-white text-[16px] md:text-[18px] not-italic font-medium leading-[26px] md:leading-[34px] font-helvetica tracking-[-0.32px] md:tracking-[-0.36px] mb-4 md:mb-6">Technology</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Rhodium 45 Armor</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">BR6+ Protection</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Hybrid Electric</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Security Systems</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white text-[16px] md:text-[18px] not-italic font-medium leading-[26px] md:leading-[34px] font-helvetica tracking-[-0.32px] md:tracking-[-0.36px] mb-4 md:mb-6">Company</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">About Us</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Texas Facility</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Career</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Support</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Find Us</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Customer Stories</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Events</a></li>
                </ul>
              </div>

              {/* Vehicles */}
              <div>
                <h4 className="text-white text-[16px] md:text-[18px] not-italic font-medium leading-[26px] md:leading-[34px] font-helvetica tracking-[-0.32px] md:tracking-[-0.36px] mb-4 md:mb-6">Vehicles</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Sentinel</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Guardian</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Fortress</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Phantom</a></li>
                  <li className="mb-0"><a href="#" className="opacity-80 text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.38px] hover:opacity-100 transition-opacity">Custom Builds</a></li>
                </ul>
              </div>
              </div>
            </div>
          </div>

        {/* Footer Bottom */}
          <div className="border-t border-white pt-6 md:pt-8 lg:pt-[40px] pb-[40px] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="text-white font-helvetica text-[14px] md:text-[16px] not-italic font-normal leading-[24px] md:leading-[34px] tracking-[-0.28px] md:tracking-[-0.32px] text-center md:text-left">
              Copyright © 2025. All rights reserved
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 md:space-x-4">
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 lg:w-[48px] lg:h-[48px] rounded-[100px] border border-[rgba(99,109,121,1)] bg-[#32323287] flex items-center justify-center hover:bg-[#42424280] transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4687H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92187 17.3438 4.92187V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4687H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 lg:w-[48px] lg:h-[48px] rounded-[100px] border border-[rgba(99,109,121,1)] bg-[#32323287] flex items-center justify-center hover:bg-[#42424280] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7.55016 21.7497C16.6045 21.7497 21.5583 14.2465 21.5583 7.74162C21.5583 7.53068 21.5536 7.31505 21.5442 7.10412C22.5079 6.40722 23.3395 5.54401 24 4.55505C23.1025 4.95436 22.1496 5.21514 21.1739 5.32849C22.2013 4.71266 22.9705 3.74523 23.3391 2.60552C22.3726 3.17831 21.3156 3.58237 20.2134 3.80037C19.4708 3.01132 18.489 2.48887 17.4197 2.31381C16.3504 2.13874 15.2532 2.32081 14.2977 2.83185C13.3423 3.3429 12.5818 4.15446 12.1338 5.14107C11.6859 6.12767 11.5754 7.23437 11.8195 8.29006C9.86249 8.19185 7.94794 7.68346 6.19998 6.79785C4.45203 5.91225 2.90969 4.66919 1.67297 3.14927C1.0444 4.233 0.852057 5.5154 1.13503 6.73585C1.418 7.95629 2.15506 9.0232 3.19641 9.71974C2.41463 9.69492 1.64998 9.48444 0.965625 9.10568V9.16662C0.964925 10.3039 1.3581 11.4063 2.07831 12.2865C2.79852 13.1667 3.80132 13.7703 4.91625 13.9947C4.19206 14.1929 3.43198 14.2218 2.69484 14.0791C3.00945 15.0572 3.62157 15.9126 4.44577 16.5261C5.26997 17.1395 6.26512 17.4804 7.29234 17.501C5.54842 18.8709 3.39417 19.6139 1.17656 19.6104C0.783287 19.6098 0.390399 19.5857 0 19.5382C2.25286 20.9835 4.87353 21.7511 7.55016 21.7497Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 lg:w-[48px] lg:h-[48px] rounded-[100px] border border-[rgba(99,109,121,1)] bg-[#32323287] flex items-center justify-center hover:bg-[#42424280] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_53_634)">
                      <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40938 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8688 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8063 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8063 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97188 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01563C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332813 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33438 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332813 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8688 7.05 23.925C8.32969 23.9813 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9813 16.9406 23.925C18.2156 23.8688 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01563C21.3188 1.35 20.6484 0.9375 19.8609 0.632813C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z" fill="white"/>
                      <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" fill="white"/>
                      <path d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_53_634">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 lg:w-[48px] lg:h-[48px] rounded-[100px] border border-[rgba(99,109,121,1)] bg-[#32323287] flex items-center justify-center hover:bg-[#42424280] transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_53_641)">
                    <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_53_641">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
      </div>
    </footer>
  )
}

export default Footer