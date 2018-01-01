# Node Express, React and Redux Boilerplate to get up and running quickly!
Simple boilerplate using Node, Express and set up to use some vanilla JavaScript as well as React on the frontend with an environment ready webpack 2 config. Thrown React in there as well in case the use case requires it but you can always just throw it out; or alternatively use it if you prefer.

## Why?
Whenever I start new projects I always spend time messing around getting things set up so thought instead if I keep this updated I've always got a good place to start! Feel free to fork / edit and make your own implementations, it's just a basis for how I like to start off smaller projects and freelance work.

This is also set up with the idea of deploying it in the future so comes with basic support for environment switching of environment variables and other config values etc. I tend to use [heroku](https://heroku.com) to deploy any of my projects and this boilerplate works great with it / they are just really good with a nice CLI, tons of addons and support for things like SSL with lets encrypt.

## Setting up
Make sure node `7.6.0`.

After forking / cloning the repository locally run the following:

```
npm install
npm start
```

Then navigate to `localhost:3000` and check out the blank page in all its glory (with added sweet console log).

## Development
Currently utilises watch mode in webpack and nodemon so any changes you make will automatically be built / updated on both the front and backend! In its current form this does require nodemon to be installed globally.

To get set up in dev mode run the following:
```
npm run local
```

And that's it! Watch as webpack updates the build and nodemon watches the backend as you make changes and create glorious projects!
