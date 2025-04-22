document.addEventListener('DOMContentLoaded', function() {
    function initSwiper() {
        if (typeof Swiper === 'undefined') {
          console.error('Swiper not loaded');
          return;
        }
        
        const swiperContainers = document.querySelectorAll('.no-bullshit .no-bullshit__banner-slider');
        if (!swiperContainers.length) return;
    
        swiperContainers.forEach(swiperContainer => {
          const swiper = new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: swiperContainer.dataset.sliderEffect,
            fadeEffect: {
              crossFade: true
            },
            navigation: {
              nextEl: swiperContainer.closest('.no-bullshit').querySelector('.swiper-navigation-button--next'),
              prevEl: swiperContainer.closest('.no-bullshit').querySelector('.swiper-navigation-button--prev'),
            },
            on: {
              init: function(swiper) {
                updateActiveLabel(swiper);
              },
              slideChange: function(swiper) {
                updateActiveLabel(swiper);
              }
            }
          });
    
          function updateActiveLabel(swiper) {
            if (!swiper || !swiper.slides || !swiper.slides[swiper.activeIndex]) return;
    
            const sectionContainer = swiperContainer.closest('.no-bullshit');
            const labels = sectionContainer.querySelectorAll('.no-bullshit__banner-label');
            labels.forEach(label => label.classList.remove('active'));
    
            const activeSlide = swiper.slides[swiper.activeIndex];
            const blockId = activeSlide ? activeSlide.getAttribute('block-id') : null;
    
            if (blockId) {
              const activeLabel = sectionContainer.querySelector(`.no-bullshit__banner-label[block-id="${blockId}"]`);
              if (activeLabel) {
                activeLabel.classList.add('active');
              }
            }
          }
    
          const sectionContainer = swiperContainer.closest('.no-bullshit');
          sectionContainer.querySelectorAll('.no-bullshit__banner-label').forEach(label => {
            label.addEventListener('click', function() {
              const blockId = this.getAttribute('block-id');
              if (!blockId) return;
    
              const slides = swiper.slides;
              for (let i = 0; i < slides.length; i++) {
                if (slides[i].getAttribute('block-id') === blockId) {
                  swiper.slideToLoop(i);
                  break;
                }
              }
            });
          });
        });
      }
    
      if (typeof Swiper !== 'undefined') {
        initSwiper();
      } else {
        let checkInterval = setInterval(function() {
          if (typeof Swiper !== 'undefined') {
            initSwiper();
            clearInterval(checkInterval);
          }
        }, 100);
    
        setTimeout(function() {
          clearInterval(checkInterval);
        }, 5000);
      }
});