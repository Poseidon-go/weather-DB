// 1. Constants & Element Selectors
const dataWeather = document.getElementById("data-city");
const darkMode = document.querySelector(".darkMode");
const darkModeIcon = document.querySelector(".darkMode i");

// 2. Weather Condition Mappings
const conditionMap = {
  "Sunny": "Nắng",
  "Clear": "Trời quang đãng",
  "Partly cloudy": "Trời ít mây",
  "Cloudy": "Nhiều mây",
  "Overcast": "U ám",
  "Mist": "Sương mù nhẹ",
  "Patchy rain possible": "Có thể có mưa rải rác",
  "Patchy snow possible": "Có thể có tuyết rải rác",
  "Patchy sleet possible": "Có thể có mưa tuyết rải rác",
  "Patchy freezing drizzle possible": "Có thể có mưa phùn đóng băng",
  "Thundery outbreaks possible": "Có thể có giông bão",
  "Blowing snow": "Tuyết thổi",
  "Blizzard": "Bão tuyết",
  "Fog": "Sương mù",
  "Freezing fog": "Sương mù băng giá",
  "Patchy light drizzle": "Mưa phùn nhẹ rải rác",
  "Light drizzle": "Mưa phùn nhẹ",
  "Freezing drizzle": "Mưa phùn đóng băng",
  "Heavy freezing drizzle": "Mưa phùn đóng băng nặng",
  "Patchy light rain": "Mưa nhẹ rải rác",
  "Light rain": "Mưa nhẹ",
  "Moderate rain at times": "Thỉnh thoảng mưa vừa",
  "Moderate rain": "Mưa vừa",
  "Heavy rain at times": "Thỉnh thoảng mưa to",
  "Heavy rain": "Mưa to",
  "Light freezing rain": "Mưa băng nhẹ",
  "Moderate or heavy freezing rain": "Mưa băng vừa hoặc to",
  "Light sleet": "Mưa tuyết nhẹ",
  "Moderate or heavy sleet": "Mưa tuyết vừa hoặc to",
  "Patchy light snow": "Tuyết nhẹ rải rác",
  "Light snow": "Tuyết nhẹ",
  "Patchy moderate snow": "Tuyết vừa rải rác",
  "Moderate snow": "Tuyết vừa",
  "Patchy heavy snow": "Tuyết to rải rác",
  "Heavy snow": "Tuyết to",
  "Ice pellets": "Viên băng",
  "Light rain shower": "Mưa rào nhẹ",
  "Moderate or heavy rain shower": "Mưa rào vừa hoặc to",
  "Torrential rain shower": "Mưa như trút nước",
  "Light sleet showers": "Mưa tuyết rào nhẹ",
  "Moderate or heavy sleet showers": "Mưa tuyết rào vừa hoặc to",
  "Light snow showers": "Tuyết rào nhẹ",
  "Moderate or heavy snow showers": "Tuyết rào vừa hoặc to",
  "Light showers of ice pellets": "Mưa viên băng nhẹ",
  "Moderate or heavy showers of ice pellets": "Mưa viên băng vừa hoặc to",
  "Patchy light rain with thunder": "Mưa nhẹ có sấm sét rải rác",
  "Moderate or heavy rain with thunder": "Mưa vừa hoặc to kèm sấm sét",
  "Patchy light snow with thunder": "Tuyết nhẹ có sấm sét rải rác",
  "Moderate or heavy snow with thunder": "Tuyết vừa hoặc to kèm sấm sét"
};

const handleCondition = (text) => {
  if (conditionMap[text]) {
    return conditionMap[text];
  }

  if (text.toLowerCase().includes("rain")) return "Trời mưa";
  if (text.toLowerCase().includes("snow")) return "Có tuyết";
  if (text.toLowerCase().includes("cloud")) return "Nhiều mây";
  if (text.toLowerCase().includes("sunny")) return "Trời nắng";
  if (text.toLowerCase().includes("fog")) return "Sương mù";
  return text;
}

// 4. API Functions
async function getForecast(city) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=${city}&days=7`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    showError('Rất tiếc, không tìm thấy thành phố mà bạn muốn tìm, xin hãy nhập lại')
    console.error('Error:', error.message);
    throw error;
  }
}

async function getWeatherCurrent(city) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    showError('Rất tiếc, không tìm thấy thành phố mà bạn muốn tìm, xin hãy nhập lại')
    console.error('Error:', error.message);
    throw error;
  }
}

// 5. UI Update Functions
// show error
const showError = (message) => {
  const ErrorE = document.getElementById("Error-Show");
  const inputField = document.getElementById("data-city");
  if (!ErrorE) return;

  // Xóa các thông báo lỗi cũ nếu có
  ErrorE.innerHTML = '';

  ErrorE.style.display = "block";
  ErrorE.innerHTML = `
    <div id="Error">
      <div id="Error-noti">
        <i class='bx bx-alert-octagon'></i>
        <p>${message}</p>
      </div>
      <div id="Error-out">
        <button id="error-close">Thử lại</button>
      </div>
    </div>
  `;

  // Thêm xử lý đóng thông báo lỗi
  const closeBtn = document.getElementById('error-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      ErrorE.style.display = "none";
      ErrorE.innerHTML = '';
      if (inputField) {
        inputField.value = '';
        inputField.focus();
      }
    });
  }
};

const handleSearch = async (searchValue) => {
  try {
    const weatherTempE = document.getElementById("weather-temp");
    const weatherDescriptionE = document.getElementById("weather-description");
    const weatherCityE = document.querySelector("#weather-location p");
    const weatherCoutryE = document.querySelector("#weather-country p");
    const weatherDaysE = document.querySelector("#weather-days p");

    const windE = document.querySelector("#detail-wind__main p:last-child ");
    const humidityE = document.querySelector("#detail-Humidity__main p:last-child ");
    const pressureE = document.querySelector("#detail-Pressure__main p:last-child ");
    const visibilityE = document.querySelector("#detail-Visibility__main p:last-child ");
    const sunriseE = document.querySelector("#detail-Sunrise__main p:last-child");
    const sunsetE = document.querySelector("#detail-Sunset__main p:last-child");

    const city = await getWeatherCurrent(searchValue);
    const dataForeCast = await getForecast(searchValue);

    weatherTempE.innerHTML = `${city.current.temp_c}℃`;
    const conditionText = city.current.condition.text;
    weatherDescriptionE.innerHTML = handleCondition(conditionText);
    weatherCityE.innerHTML = city.location.name;
    weatherDaysE.innerHTML = city.current.last_updated;
    weatherCoutryE.innerHTML = city.location.country;

    windE.innerHTML = `${city.current.wind_kph} km/h`;
    humidityE.innerHTML = `${city.current.humidity} %`;
    pressureE.innerHTML = `${city.current.pressure_mb} hPa`;
    visibilityE.innerHTML = `${city.current.vis_km} km`;
    sunriseE.innerHTML = `${dataForeCast.forecast.forecastday[0].astro.sunrise}`;
    sunsetE.innerHTML = `${dataForeCast.forecast.forecastday[0].astro.sunset}`;

    // Xóa giá trị input sau khi tìm kiếm thành công
    dataWeather.value = '';
  } catch (error) {
    console.error('Search error:', error);
  }
};

async function getFirstData() {
  const weatherTempE = document.getElementById("weather-temp");
  if (!weatherTempE) return;
  const weatherDescriptionE = document.getElementById("weather-description");
  if (!weatherDescriptionE) return;
  const weatherCityE = document.querySelector("#weather-location p");
  if (!weatherCityE) return;
  const weatherDaysE = document.querySelector("#weather-days p");
  if (!weatherDaysE) return;

  const weatherCoutryE = document.querySelector("#weather-country p");
  if (!weatherCoutryE) return;



  const windE = document.querySelector("#detail-wind__main p:last-child ");
  const humidityE = document.querySelector("#detail-Humidity__main p:last-child ");
  const pressureE = document.querySelector("#detail-Pressure__main p:last-child ");
  const visibilityE = document.querySelector("#detail-Visibility__main p:last-child ");
  const sunriseE = document.querySelector("#detail-Sunrise__main p:last-child");
  const sunsetE = document.querySelector("#detail-Sunset__main p:last-child");


  const dataCurrent = await getWeatherCurrent("Ho Chi Minh City");
  const dataForecast = await getForecast("Ho Chi Minh City");


  weatherTempE.innerHTML = `${dataCurrent.current.temp_c}℃`;
  const conditionText = dataCurrent.current.condition.text;
  weatherDescriptionE.innerHTML = handleCondition(conditionText);
  weatherDaysE.innerHTML = `${dataCurrent.location.localtime}`;
  weatherCityE.innerHTML = dataCurrent.location.name;
  weatherCoutryE.innerHTML = dataCurrent.location.country;


  windE.innerHTML = `${dataCurrent.current.wind_kph} km/h`;
  humidityE.innerHTML = `${dataCurrent.current.humidity} %`;
  pressureE.innerHTML = `${dataCurrent.current.pressure_mb} hPa`;
  visibilityE.innerHTML = `${dataCurrent.current.vis_km} km`;
  sunriseE.innerHTML = `${dataForecast.forecast.forecastday[0].astro.sunrise}`;
  sunsetE.innerHTML = `${dataForecast.forecast.forecastday[0].astro.sunset}`;
}
getFirstData();


dataWeather.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await handleSearch(e.target.value);
  }
});

const searchButton = document.getElementById("search-icon");
searchButton.addEventListener("click", async () => {
  const searchValue = dataWeather.value.trim();
  if (searchValue) {
    await handleSearch(searchValue);
  }
});

function scrollUp() {
  const scrollBtn = document.querySelector("#scrollUp");

  // Hiển thị/ẩn nút scroll up
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // Thêm event listener cho nút scroll up
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Tạo hiệu ứng scroll mượt
    });
  });
}

scrollUp();


// darkMode
const initDarkMode = () => {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";

  // Set initial theme state
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    darkModeIcon.classList.remove("bx-moon");
    darkModeIcon.classList.add("bx-sun");
  }
}

// Call initialization on page load
initDarkMode();

darkMode.addEventListener("click", () => {
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Update localStorage
  localStorage.setItem("theme", newTheme);

  // Update UI
  if (newTheme === "dark") {
    body.classList.add("dark-mode");
    darkModeIcon.classList.remove("bx-moon");
    darkModeIcon.classList.add("bx-sun");
  } else {
    body.classList.remove("dark-mode");
    darkModeIcon.classList.add("bx-moon");
    darkModeIcon.classList.remove("bx-sun");
  }
});




// Firebase
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// // DOM
// const loginBtn = document.getElementById("login-btn");
// const logoutBtn = document.getElementById("logout-btn");
// const loginContainer = document.getElementById("login-container");
// const mainContent = document.getElementById("main");
// const userInfo = document.getElementById("user-info");
// const userName = document.getElementById("user-name");
// const headerContent = document.querySelector("header");

// // Xử lý sự kiện đăng nhập
// document.getElementById('login-btn').addEventListener('click', () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log('Đăng nhập thành công:', result.user.displayName);
//     })
//     .catch((error) => {
//       console.error('Lỗi đăng nhập:', error.message);
//     });
// });
// // Theo dõi trạng thái đăng nhập
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     loginContainer.style.display = "none";
//     mainContent.style.display = "block";
//     userInfo.style.display = "flex";
//     userName.textContent = `Xin chào, ${user.displayName}`;
//     headerContent.style.display = "inline-block";
//   } else {
//     loginContainer.style.display = "flex";
//     mainContent.style.display = "none";
//     userInfo.style.display = "none";
//     headerContent.style.display = "none";
//   }
// });


// // 3. Đăng xuất
// logoutBtn.addEventListener("click", () => {
//   signOut(auth)
//     .then(() => {
//       // Ví dụ: ẩn nội dung, hiện lại khối đăng nhập
//       document.getElementById("main").style.display = "none";
//       document.getElementById("login-container").style.display = "flex";
//     })
//     .catch((error) => {
//       console.error("Lỗi khi đăng xuất:", error.message);
//     });
// });


import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Cấu hình Google Provider với các scope cần thiết
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// DOM Elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginContainer = document.getElementById("login-container");
const mainContent = document.getElementById("main");
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");
const headerContent = document.querySelector("header");

// Phát hiện thiết bị và trình duyệt
const deviceInfo = {
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  isAndroid: /Android/.test(navigator.userAgent),
  isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  isSafari: /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
  isFirefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
};

console.log('Device Info:', deviceInfo);

// Set persistence để duy trì đăng nhập
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting persistence:', error);
});

// Hàm đăng nhập thông minh
async function smartGoogleSignIn() {
  try {
    // Hiển thị loading
    showLoading(true);

    // Strategy: Thử popup trước, fallback sang redirect
    if (deviceInfo.isIOS && deviceInfo.isSafari) {
      // iOS Safari: Luôn dùng redirect
      console.log('iOS Safari detected - using redirect');
      await signInWithRedirect(auth, googleProvider);
    } else if (deviceInfo.isMobile) {
      // Mobile khác: Thử popup, fallback redirect
      console.log('Mobile device detected - trying popup first');
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Mobile popup success:', result.user.displayName);
      } catch (popupError) {
        console.log('Mobile popup failed, trying redirect:', popupError.code);
        if (popupError.code === 'auth/popup-blocked' ||
          popupError.code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(auth, googleProvider);
        } else {
          throw popupError;
        }
      }
    } else {
      // Desktop: Ưu tiên popup
      console.log('Desktop detected - using popup');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Desktop popup success:', result.user.displayName);
    }
  } catch (error) {
    console.error('Sign in error:', error);
    handleAuthError(error);
  } finally {
    showLoading(false);
  }
}

// Xử lý kết quả redirect (quan trọng cho iOS và mobile)
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      console.log('Redirect sign-in successful:', result.user.displayName);
      showMessage('Đăng nhập thành công!', 'success');
    }
  })
  .catch((error) => {
    console.error('Redirect result error:', error);
    handleAuthError(error);
  });

// Event listener cho nút đăng nhập
loginBtn?.addEventListener('click', smartGoogleSignIn);

// Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Đăng nhập thành công
    loginContainer.style.display = "none";
    mainContent.style.display = "block";
    userInfo.style.display = "flex";
    userName.textContent = `Xin chào, ${user.displayName}`;
    headerContent.style.display = "inline-block";

    // Hiển thị avatar nếu có
    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar && user.photoURL) {
      userAvatar.src = user.photoURL;
      userAvatar.style.display = 'block';
    }

    console.log('User signed in:', {
      name: user.displayName,
      email: user.email,
      provider: user.providerData[0]?.providerId
    });
  } else {
    // Chưa đăng nhập
    loginContainer.style.display = "flex";
    mainContent.style.display = "none";
    userInfo.style.display = "none";
    headerContent.style.display = "none";
  }
});

// Đăng xuất
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log('Đăng xuất thành công');
    showMessage('Đã đăng xuất!', 'info');
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error.message);
    handleAuthError(error);
  }
});

// Hàm hiển thị loading
function showLoading(show) {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = show ? 'block' : 'none';
  }

  if (loginBtn) {
    loginBtn.disabled = show;
    loginBtn.textContent = show ? 'Đang đăng nhập...' : 'Đăng nhập với Google';
  }
}

// Hàm xử lý lỗi
function handleAuthError(error) {
  const errorMessages = {
    'auth/popup-blocked': 'Popup bị chặn. Vui lòng cho phép popup và thử lại.',
    'auth/popup-closed-by-user': 'Bạn đã đóng cửa sổ đăng nhập.',
    'auth/cancelled-popup-request': 'Đăng nhập bị hủy.',
    'auth/network-request-failed': 'Lỗi mạng. Vui lòng kiểm tra kết nối.',
    'auth/too-many-requests': 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
    'auth/user-disabled': 'Tài khoản đã bị vô hiệu hóa.',
    'auth/operation-not-allowed': 'Phương thức đăng nhập chưa được kích hoạt.',
    'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ.',
  };

  const message = errorMessages[error.code] || `Lỗi đăng nhập: ${error.message}`;
  showMessage(message, 'error');
}

// Hàm hiển thị thông báo
function showMessage(message, type = 'info') {
  const messageElement = document.getElementById('message');
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';

    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  } else {
    console.log(message);
  }
}

// Kiểm tra trạng thái mạng
window.addEventListener('online', () => {
  console.log('Network back online');
});

window.addEventListener('offline', () => {
  console.log('Network offline');
  showMessage('Mất kết nối mạng', 'error');
});

// Debug info
console.log('Firebase Auth initialized for:', {
  device: deviceInfo,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});