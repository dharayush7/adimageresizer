# ADImageResizer

A desktop application built with Electron that allows users to easily resize images while maintaining their aspect ratio.

## Features

- Simple and intuitive user interface
- Drag and drop image support
- Custom width and height input
- Automatic aspect ratio maintenance
- Saves resized images to the Downloads folder
- Cross-platform support (Windows, macOS, Linux)
- About window with application information

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/adimageresizer.git
cd adimageresizer
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

## Usage

1. Launch the application
2. Drag and drop an image into the application window or use the file picker
3. Enter your desired width and height
4. Click the resize button
5. The resized image will be saved in your Downloads folder under "ADImageResizer"

## Development

### Project Structure

```
adimageresizer/
├── UI/                 # Frontend interface files
├── assets/            # Static assets
├── main.js            # Main Electron process
├── preload.js         # Preload script for security
└── package.json       # Project configuration and dependencies
```

### Technologies Used

- Electron ^31.2.0
- resize-img ^2.0.0
- toastify-js ^1.12.0

### Building for Production

To build the application for production:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

AYUSH DHAR

## Support

For support, please open an issue in the GitHub repository.
