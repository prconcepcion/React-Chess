# React Chess

![aws-ec2](https://img.shields.io/badge/AWS%20EC2-black?style=flat&logo=amazonec2)
![aws-ecr](https://img.shields.io/badge/AWS%20ECR-black?style=flat&logo=amazonwebservices)
![react](https://img.shields.io/badge/React.js-black?style=flat&logo=react)
![rtk](https://img.shields.io/badge/Redux%20Toolkit-black?style=flat&logo=redux)
![vite](https://img.shields.io/badge/Vite-black?style=flat&logo=vite)

## About

Chess made with React.js and Redux Toolkit. I used the HTML Drag and Drop API to move the pieces. The one thing that I did not implement is _**En passant**_ because I did not want to implement it. Castling is possible but the game does not prevent you from castling into a checkmate. 

The project can be played in this [link](http://13.229.113.162:8080/). I built the project using Vite then created a dockerfile to build an image. I pushed an Image on AWS ECR. I then pulled the image on an AWS EC2 Instance and ran it as a container.

I made this project with the following intentions:
1. Practice React.js
2. Learn How Redux Toolkit works.
3. See it on web the through AWS.

Though the project is not perfect, I am happy with what I was able to accomplish. I will one day make a better one.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/prconcepcion/chess-frontend.git
```

2. Install the dependcies.

```bash
npm install
```

3. Run the project

```bash
npm run dev
```
