# @desandro only

zip:
	rm -rf build/flickity-docs.zip
	cp -r build flickity-docs
	zip -rq build/flickity-docs.zip flickity-docs/
	rm -rf flickity-docs

deploy:
	netlify deploy --dir=build

gulp:
	gulp

gulp-export:
	rm -rf build/
	gulp export
	make zip

prod: gulp-export gulp deploy
