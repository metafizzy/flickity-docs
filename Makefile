# @desandro only

zip:
	rm -rf build/flickity-docs.zip
	cp -r build flickity-docs
	zip -rq build/flickity-docs.zip flickity-docs/
	rm -rf flickity-docs

deploy:
	s3cmd -c ~/.s3cfg-fizzy sync build/. s3://flickity.metafizzy.co/

gulp:
	gulp

prod: gulp zip deploy
