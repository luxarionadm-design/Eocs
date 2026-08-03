# Eocs - Luxarion Documentation Server

Eocs is a comprehensive documentation and web server for the Luxarion utility library.

## Features

- 🚀 **Zero Dependencies** - Pure JavaScript
- 📚 **Complete Documentation** - Interactive web interface
- 🔧 **Utility Functions** - Helpers, converters, generators, formatters
- ✅ **Validators** - Email, URL, Phone, Password, UUID
- 📊 **Typed Arrays** - Hybrid, Flexible, Optimized
- 🌐 **HTTP Server** - Built-in web server

## Installation

```bash
git clone https://github.com/luxarionadm-design/Eocs.git
cd Eocs
npm install
```

## Usage

Start Server

```bash
npm start
```

## Development Mode

```bash
npm run dev
```

Run Tests

```bash
npm test
```

## Access

Open your browser and navigate to:

```
http://localhost:3000
```

## Project Structure

```
Eocs/
├── package.json          # Project configuration
├── server.js             # HTTP server
├── index.js              # Main entry point
├── public/               # Static files
│   ├── index.html        # Main page
│   ├── style.css         # Styles
│   └── script.js         # Client-side logic
├── src/                  # Source code
│   ├── core/             # Core classes
│   ├── constants/        # Constants
│   ├── utils/            # Utilities
│   ├── validators/       # Validators
│   ├── interfaces/       # Interfaces
│   └── enums/            # Enums
└── test/                 # Tests
    └── test.js           # Test runner
```

## API Documentation

Core Classes

· Luxarion - Main library class
· HybridTypedArray - Typed array with extra methods
· FlexibleTypedArray - Typed array with flexible types
· OptimizedTypedArray - Optimized typed array

Utilities

· helpers - deepClone, deepMerge, debounce, throttle
· converters - toNumber, toBase64, fromBase64
· generators - UUID, Token, OTP, Password
· formatters - Currency, Date, Time, Duration

Validators

· EmailValidator - Email validation
· URLValidator - URL validation
· PhoneValidator - Phone number validation
· PasswordValidator - Password strength validation
· UUIDValidator - UUID validation

## License

MIT

## Repository

https://github.com/luxarionadm-design/Eocs
