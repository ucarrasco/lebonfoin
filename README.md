# LeBonFoin
Custom web client for french ads website leboncoin.fr, with auto-refresh, high-res pictures &amp; description preview
### Install
* `yarn`
* Create a `.env` file with content like :
	```
	NODE_ENV=development
	DATABASE_URL=mongodb://localhost:27017/lebonfoin
	```

### Run
* `yarn start`
* app listens on `http://localhost:3000/`

### Convenient usage
* navigate on original website `leboncoin.fr` to a items list page
* replace `https://www.leboncoin.fr` with `http://localhost:3000/` in the url
