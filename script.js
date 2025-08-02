// Configuration globale
const CONFIG = {
  CAROUSEL_AUTO_PLAY_INTERVAL: 5000,
  ANIMATION_DURATION: 300,
  LOADING_SCREEN_DELAY: 1000,
}

// État global des carousels
const carousels = new Map()

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  initializeLoadingScreen()
  initializeScrollEffects()
  initializeNavigation()
  initializeAnimations()
  initializeCarousels()
  initializeLightbox()
  initializeHeroImageRotation()
}

// Écran de chargement
function initializeLoadingScreen() {
  window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loadingScreen")
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, CONFIG.LOADING_SCREEN_DELAY)
  })
}

// Effets de scroll
function initializeScrollEffects() {
  const scrollProgress = document.getElementById("scrollProgress")
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    // Barre de progression
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercent = (scrollTop / scrollHeight) * 100
    scrollProgress.style.width = scrollPercent + "%"

    // Effet navbar
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Navigation smooth scroll
function initializeNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Animations au scroll
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })

  // Initialiser AOS si disponible
  const AOS = window.AOS // Declare AOS variable
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  }
}

// Rotation des images hero
function initializeHeroImageRotation() {
  const img1 = document.getElementById("heroImg1")
  const img2 = document.getElementById("heroImg2")

  if (!img1 || !img2) return

  let currentImg = 1

  setInterval(() => {
    if (currentImg === 1) {
      img1.classList.remove("active-img")
      img1.classList.add("hidden-img")
      img2.classList.remove("hidden-img")
      img2.classList.add("active-img")
      currentImg = 2
    } else {
      img2.classList.remove("active-img")
      img2.classList.add("hidden-img")
      img1.classList.remove("hidden-img")
      img1.classList.add("active-img")
      currentImg = 1
    }
  }, 4000)
}

// Système de carousel amélioré
function initializeCarousels() {
  // Initialiser le carousel DriveNow
  const driveNowImages = []
  for (let i = 1; i <= 14; i++) {
    driveNowImages.push({
      src: `./images/drivenow/D${i}.png`,
      alt: `DriveNow${i}`,
    })
  }
  initCarousel("drivenow", driveNowImages)

  // Initialiser le carousel Ehsan
  const ehsanImages = []
  for (let i = 1; i <= 9; i++) {
    ehsanImages.push({
      src: `./images/ehsan/Ehsan${i}.png`,
      alt: `Ehsan${i}`,
    })
  }
  initCarousel("ehsan", ehsanImages)

  // Initialiser le carousel E-commerce
  const ecommerceImages = [
    {
      src: "/placeholder.svg?height=280&width=500&text=E-commerce+Dashboard",
      alt: "E-commerce Dashboard",
    },
    {
      src: "/placeholder.svg?height=280&width=500&text=Product+Management",
      alt: "Product Management",
    },
    {
      src: "/placeholder.svg?height=280&width=500&text=Order+Processing",
      alt: "Order Processing",
    },
    {
      src: "/placeholder.svg?height=280&width=500&text=Analytics+View",
      alt: "Analytics View",
    },
  ]
  initCarousel("ecommerce", ecommerceImages)

  // Auto-play pour tous les carousels
  startAutoPlay()
}

function initCarousel(carouselId, images) {
  const track = document.getElementById(`carousel-track-${carouselId}`)
  const indicators = document.getElementById(`indicators-${carouselId}`)

  if (!track || !indicators) return

  const carousel = {
    currentSlide: 0,
    totalSlides: images.length,
    track: track,
    indicators: indicators,
    images: images,
  }

  carousels.set(carouselId, carousel)

  // Créer les slides
  images.forEach((image, index) => {
    const slide = document.createElement("div")
    slide.classList.add("carousel-slide")

    const img = document.createElement("img")
    img.src = image.src
    img.alt = image.alt
    img.classList.add("carousel-image")
    img.loading = "lazy"

    // Ajouter l'événement click pour la lightbox
    img.addEventListener("click", () => window.openLightbox(carouselId, index)) // Use window.openLightbox

    slide.appendChild(img)
    track.appendChild(slide)
  })

  // Créer les indicateurs
  images.forEach((_, index) => {
    const indicator = document.createElement("div")
    indicator.classList.add("carousel-indicator")
    if (index === 0) indicator.classList.add("active")
    indicator.addEventListener("click", () => goToSlide(carouselId, index))
    indicators.appendChild(indicator)
  })

  updateCarousel(carouselId)
}

function updateCarousel(carouselId) {
  const carousel = carousels.get(carouselId)
  if (!carousel) return

  const translateX = -carousel.currentSlide * 100
  carousel.track.style.transform = `translateX(${translateX}%)`

  // Mettre à jour les indicateurs
  carousel.indicators.querySelectorAll(".carousel-indicator").forEach((indicator, index) => {
    indicator.classList.toggle("active", index === carousel.currentSlide)
  })
}

function nextSlide(carouselId) {
  const carousel = carousels.get(carouselId)
  if (!carousel) return

  carousel.currentSlide = (carousel.currentSlide + 1) % carousel.totalSlides
  updateCarousel(carouselId)
}

function prevSlide(carouselId) {
  const carousel = carousels.get(carouselId)
  if (!carousel) return

  carousel.currentSlide = (carousel.currentSlide - 1 + carousel.totalSlides) % carousel.totalSlides
  updateCarousel(carouselId)
}

function goToSlide(carouselId, slideIndex) {
  const carousel = carousels.get(carouselId)
  if (!carousel) return

  carousel.currentSlide = slideIndex
  updateCarousel(carouselId)
}

function startAutoPlay() {
  setInterval(() => {
    carousels.forEach((carousel, carouselId) => {
      nextSlide(carouselId)
    })
  }, CONFIG.CAROUSEL_AUTO_PLAY_INTERVAL)
}

// Système de lightbox amélioré
function initializeLightbox() {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const closeBtn = document.querySelector(".lightbox-close")
  const nextBtn = document.querySelector(".lightbox-btn.next")
  const prevBtn = document.querySelector(".lightbox-btn.prev")
  const counter = document.getElementById("lightbox-counter")

  let currentLightboxCarousel = null
  let currentLightboxIndex = 0

  // Fermer la lightbox
  function closeLightbox() {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  }

  // Afficher l'image dans la lightbox
  function showLightboxImage() {
    if (!currentLightboxCarousel) return

    const carousel = carousels.get(currentLightboxCarousel)
    if (!carousel) return

    const image = carousel.images[currentLightboxIndex]
    lightboxImg.src = image.src
    lightboxImg.alt = image.alt

    if (counter) {
      counter.textContent = `${currentLightboxIndex + 1} / ${carousel.totalSlides}`
    }
  }

  // Ouvrir la lightbox
  window.openLightbox = (carouselId, imageIndex) => {
    currentLightboxCarousel = carouselId
    currentLightboxIndex = imageIndex
    showLightboxImage()
    lightbox.style.display = "flex"
    document.body.style.overflow = "hidden"
  }

  // Navigation dans la lightbox
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!currentLightboxCarousel) return
      const carousel = carousels.get(currentLightboxCarousel)
      if (!carousel) return

      currentLightboxIndex = (currentLightboxIndex + 1) % carousel.totalSlides
      showLightboxImage()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (!currentLightboxCarousel) return
      const carousel = carousels.get(currentLightboxCarousel)
      if (!carousel) return

      currentLightboxIndex = (currentLightboxIndex - 1 + carousel.totalSlides) % carousel.totalSlides
      showLightboxImage()
    })
  }

  // Fermer la lightbox
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox)
  }

  // Fermer en cliquant en dehors de l'image
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })
  }

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      switch (e.key) {
        case "Escape":
          closeLightbox()
          break
        case "ArrowLeft":
          prevBtn.click()
          break
        case "ArrowRight":
          nextBtn.click()
          break
      }
    }
  })
}

// Utilitaires
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Gestion des erreurs d'images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = "/placeholder.svg?height=280&width=500&text=Image+non+disponible"
    }
  },
  true,
)

// Performance: Lazy loading pour les images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Exposer les fonctions globalement pour les boutons HTML
window.nextSlide = nextSlide
window.prevSlide = prevSlide
window.goToSlide = goToSlide
