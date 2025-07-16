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

// validation
const validationForm = () => {
  const inputs = document.querySelectorAll(".form-group input");
  if (!inputs.length) return;

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  if (!loginForm || !registerForm || !switchToRegister || !switchToLogin) return;

  const VALIDATION_RULES = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      minLength: 6,
      messages: {
        required: "Vui lòng nhập email",
        pattern: "Email không hợp lệ",
        minLength: "Email phải có ít nhất 6 ký tự"
      }
    },
    password: {
      required: true,
      minLength: 6,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      messages: {
        required: "Vui lòng nhập mật khẩu",
        minLength: "Mật khẩu phải có ít nhất 6 ký tự",
        pattern: "Mật khẩu phải có cả chữ và số"
      }
    },
    confirm: {
      required: true,
      match: true,
      messages: {
        required: "Vui lòng xác nhận mật khẩu",
        match: "Mật khẩu không khớp"
      }
    }
  };

  const validateInput = (input) => {
    let fieldType = 'password';
    if (input.id.includes('email')) {
      fieldType = 'email';
    } else if (input.id.includes('confirm')) {
      fieldType = 'confirm';
    }

    const rules = VALIDATION_RULES[fieldType];
    const errorElement = document.getElementById(`${input.id}-error`);
    const value = input.value.trim();

    // Reset styles
    input.style.borderColor = "";
    errorElement.innerHTML = "";

    // Required check
    if (!value) {
      input.style.borderColor = "var(--btn-error)";
      errorElement.innerHTML = rules.messages.required;
      return false;
    }

    // MinLength check for password and email
    if (rules.minLength && value.length < rules.minLength) {
      input.style.borderColor = "var(--btn-error)";
      errorElement.innerHTML = rules.messages.minLength;
      return false;
    }

    // Pattern check for password and email
    if (rules.pattern && !rules.pattern.test(value)) {
      input.style.borderColor = "var(--btn-error)";
      errorElement.innerHTML = rules.messages.pattern;
      return false;
    }

    // Confirm password check
    if (fieldType === 'confirm') {
      const passwordInput = document.getElementById('register-password');
      if (passwordInput && value !== passwordInput.value) {
        input.style.borderColor = "var(--btn-error)";
        errorElement.innerHTML = rules.messages.match;
        return false;
      }
    }

    // Validation passed
    input.style.borderColor = "var(--btn-success)";
    return true;
  };

  // Add event listeners to all inputs
  inputs.forEach(input => {
    // Validate on blur
    input.addEventListener("blur", () => {
      validateInput(input);
    });

    // Clear error on input
    input.addEventListener("input", () => {
      const errorElement = document.getElementById(`${input.id}-error`);
      input.style.borderColor = "";
      errorElement.innerHTML = "";
    });
  });

  // Form submit validation
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginInputs = loginForm.querySelectorAll("input");
    let isValid = true;

    loginInputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Proceed with login
      console.log("Form is valid - proceed with login");
    }
  });

  // Switch between login and register forms
  switchToRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    // Clear all inputs and errors
    inputs.forEach(input => {
      input.value = "";
      input.style.borderColor = "";
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) errorElement.innerHTML = "";
    });
  });

  switchToLogin.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    // Clear all inputs and errors
    inputs.forEach(input => {
      input.value = "";
      input.style.borderColor = "";
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) errorElement.innerHTML = "";
    });
  });
};

validationForm();

const handleTogglePassword = () => {
  // Lấy tất cả các toggle password
  const toggleButtons = document.querySelectorAll('[id$="-password-toggle"]');
  if (!toggleButtons) return;
  const confirmButton = document.getElementById("register-confirm-toggle");
  if (!confirmButton) return;
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const passwordField = button.parentElement.querySelector('input');

      // Toggle type của input
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        button.classList.remove('bx-eye-slash');
        button.classList.add('bx-eye');
      } else {
        passwordField.type = 'password';
        button.classList.remove('bx-eye');
        button.classList.add('bx-eye-slash');
      }
    });
  });

  confirmButton.addEventListener("click", () => {
    if (document.getElementById("register-confirm").type === "password") {
      document.getElementById("register-confirm").type = "text";
      confirmButton.classList.remove('bx-eye-slash');
      confirmButton.classList.add('bx-eye');
    } else {
      document.getElementById("register-confirm").type = "password";
      confirmButton.classList.add('bx-eye-slash');
      confirmButton.classList.remove('bx-eye');
    }
  })
};

handleTogglePassword();

// Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword  // Thêm dòng này
} from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// DOM
const authContainer = document.getElementById("auth-container");
const headerContent = document.querySelector("header");
const mainContent = document.getElementById("main");
const userName = document.getElementById("user-name");
const loginBtn = document.getElementById("logout-btn");


// DOM elements for registration form
const registerButton = document.getElementById('register-submit');
const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('register-email');
const passwordInput = document.getElementById('register-password');
const confirmPasswordInput = document.getElementById('register-confirm');


// DOM elements for login form
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginEmailError = document.getElementById('login-email-error');
const loginPasswordError = document.getElementById('login-password-error');
const loginButton = document.getElementById('login-submit');
const loginPasswordToggle = document.getElementById('login-password-toggle');
// Ui Alert

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("đang click đăng ký")

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();


  // Hiển thị loading state trước khi gọi API
  registerButton.disabled = true;
  registerButton.innerHTML = "Đang Đăng Ký...";
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User registered:', user.uid);

    // Show success message
    alert('Đăng ký thành công!');

    // Optionally, redirect to login page or clear form
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
  } catch (error) {
    console.log("đăng ký thất bại", error)
  } finally {
    registerButton.disabled = false;
    registerButton.innerHTML = "Đăng Ký";
  }
})

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Blur any focused input to hide keyboard
  document.activeElement.blur();

  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();


  // Disable button và show loading
  loginButton.disabled = true;
  loginButton.innerHTML = "Đang đăng nhập...";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const nameUser = user.email.slice(0, -10) || "Anonymous"
    console.log(user)

    // Show success message
    alert('Đăng nhập thành công!');

    // Clear form
    loginEmailInput.value = '';
    loginPasswordInput.value = '';

    if (user) {
      authContainer.style.display = "none";
      headerContent.style.display = "block";
      mainContent.style.display = "block";
      userName.innerHTML = `xin chào: ${nameUser}`;
    } else {
      authContainer.style.display = "flex";
      headerContent.style.display = "none";
      mainContent.style.display = "none";
    }
  } catch (error) {
    console.log("Lỗi", error)
  } finally {
    loginButton.disabled = false;
    loginButton.innerHTML = "Đăng Nhập";
  }
})

loginBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      authContainer.style.display = "flex";
      headerContent.style.display = "none";
      mainContent.style.display = "none";
    })
    .catch((error) => {
      console.log(error)
    })
})