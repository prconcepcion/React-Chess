# React Chess

## About

Chess made with React.js and Redux Toolkit. I used the HTML Drag and Drop API to move the pieces. The one thing that I did not implement is _**En passant**_ because I did not want to implement it. Castling is possible but the game does not prevent you from castling into a checkmate. 

The project can be played in this [link](http://13.229.113.162:8080/). I built the project using vite then created a dockerfile to build an image. I pushed an Image on AWS ECR. I then pulled the image on an AWS EC2 Instance and ran it as a container.

I made this project with the following intentions:
1. Practicing React.js
2. Learning How Redux Toolkit works.
3. Putting it on web the through AWS.

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