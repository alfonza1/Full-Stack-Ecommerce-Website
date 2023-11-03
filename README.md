Live Demo: http://snkrs-official-ui.s3-website-us-east-1.amazonaws.com/

![SNKRS](https://alfonzasportfolio.s3.amazonaws.com/SNKRSPhoto.png)

SNKRS eCommerce Website - Proof of Concept
Welcome to the SNKRS eCommerce website repository, the codebase for a sleek and responsive proof of concept (PoC) clothing store that showcases a modern stack and cloud-based architecture. Before diving into the technical details, please note that this platform is strictly a PoC and does not support actual purchases.

Overview
SNKRS is a cutting-edge e-commerce clothing platform, designed to offer a seamless shopping experience. Our products are dynamically fetched from a robust API, ensuring that the latest inventory is always at the fingertips of our users. This proof of concept was crafted using React for the frontend and Spring Boot for the backend, illustrating the power and flexibility of combining these frameworks.

Key Features:
Dynamic Product Fetching: All products are retrieved in real-time from an API connected to a MySQL database.
Performance-Optimized Browsing: With pagination, users can navigate through the product listings quickly, enhancing the site's performance.
Fully Responsive Design: SNKRS is tailored to provide an optimal viewing experience across all devices.
Interactive Shopping Cart: A fully functional shopping cart is integrated, emulating the real-world e-commerce experience.
Advanced Product Filtering: Users can filter products to quickly find what they're looking for.
Technical Stack
Frontend: React
Backend/API: Spring Boot
Database: MySQL, Amazon RDS
Serverless Functions: AWS Lambda
API Management: AWS API Gateway
Resource Deployment: AWS CloudFormation, SAM CLI
Identity Management: IAM
Storage: Amazon S3
Setup and Installation
To get the PoC up and running on your local environment, follow these steps:

Clone the repository:
sh
git clone https://github.com/your-username/Full-Stack-Ecommerce-Website.git
cd SNKRS
Install the necessary dependencies:
For the React frontend:

sh
cd snkrs-frontend
npm install
For the Spring Boot backend:

sh
cd backend
./mvnw clean install
Running the Application:
To run the React frontend:

sh
npm start
To run the Spring Boot backend:

sh
./mvnw spring-boot:run
API Reference
The API for this PoC is designed using Spring Boot and deployed using AWS technologies such as Lambda, API Gateway, and Amazon RDS. For security reasons, the deployed API is maintained in a private repository.

Please note that the API provided in this repository is not the one deployed for the live demo. The local version is to demonstrate the code structure and design patterns used.

Deployment
This PoC is set up to be deployed using AWS CloudFormation and the SAM CLI. Detailed instructions for deployment are beyond the scope of this README but can be found in the deployment directory.

Limitations
This is a proof of concept; as such:

No Real Transactions: The SNKRS platform is not intended for real transactions. No payment gateway integration is present, and the shopping cart is for demonstration purposes only.
Contributions
While this project is a PoC, contributions are welcome. If you have ideas on how to improve the code or implement new features, please open an issue or pull request.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Contact
For any further questions regarding this PoC, please submit an issue in the repository, and the maintainers will get back to you.

SNKRS is all about showcasing the capabilities of a modern eCommerce platform. Enjoy exploring the architecture and happy coding!
