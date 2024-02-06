# GeoCoding App
This Node.js web application is designed to geocode addresses provided in an Excel (xlsx) or CSV file for the city of Chelyabinsk. It utilizes a geocoding service with customizable API keys for accurate latitude and longitude retrieval.

## Features
* Address Geocoding: Upload an Excel or CSV file containing addresses, and the application will geocode each address to obtain its corresponding latitude and longitude.

* Customizable Geocoding Provider: Configure the geocoding provider and API key by setting the environment variables in the .env file.

* Output to Excel: The geocoded results are saved to a new Excel file, which is stored in the output folder.

### Prerequisites
* Node.js installed on your machine
* Geocoding provider account with an API key

#### Getting Started
1. Clone this repository:
```
bash
Copy code
git clone https://github.com/yourusername/geocoding-app.git
cd geocoding-app
```

2. Install dependencies:
```
bash
Copy code
npm install
```
3. Set up environment variables:
Create a .env file in the project root and add the following:
```
env
Copy code
GEOCODER_PROVIDER=your_geocoding_provider
GEOCODER_API_KEY=your_api_key
```
4. Start the application:
```
bash
Copy code
node app.js
```
The server will be running at http://localhost:3000.

#### Usage
1. Send a POST request to http://localhost:3000/upload with an attached Excel or CSV file containing addresses.

2. Retrieve the geocoded results saved in a new Excel file in the output folder.

#### Configuration
Customize the geocoding provider and API key by editing the .env file.
```
env
Copy code
GEOCODER_PROVIDER=your_geocoding_provider
GEOCODER_API_KEY=your_api_key
```
#### Important Note
Ensure the `.env` file is added to the project's .gitignore to prevent exposing sensitive information.

##### License
This project is licensed under the MIT License.

Feel free to contribute, report issues, or suggest improvements!