// ================= DOM ELEMENTS =================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var input = document.getElementById("cityInput");
var button = document.getElementById("searchBtn");
var weatherBox = document.getElementById("weatherBox");
// ================= EVENT HANDLING =================
button.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var city, coords, weather;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = input.value.trim();
                if (!city)
                    return [2 /*return*/];
                weatherBox.innerHTML = "Loading...";
                return [4 /*yield*/, getCoordinates(city)];
            case 1:
                coords = _a.sent();
                if (!coords) {
                    weatherBox.innerHTML = "City not found";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, getWeather(coords.lat, coords.lon)];
            case 2:
                weather = _a.sent();
                showWeather(city, weather);
                return [2 /*return*/];
        }
    });
}); });
// ================= FUNCTIONS =================
// Get city coordinates
function getCoordinates(city) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://geocoding-api.open-meteo.com/v1/search?name=".concat(city, "&count=1"))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (!data.results)
                        return [2 /*return*/, null];
                    return [2 /*return*/, {
                            lat: data.results[0].latitude,
                            lon: data.results[0].longitude,
                        }];
            }
        });
    });
}
// Get weather data
function getWeather(lat, lon) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.open-meteo.com/v1/forecast?latitude=".concat(lat, "&longitude=").concat(lon, "&current_weather=true"))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.current_weather];
            }
        });
    });
}
// Display weather
function showWeather(city, weather) {
    weatherBox.innerHTML = "\n        <h3>".concat(city, "</h3>\n        <p>Temperature: ").concat(weather.temperature, " \u00B0C</p>\n        <p>Wind Speed: ").concat(weather.windspeed, " km/h</p>\n    ");
}
