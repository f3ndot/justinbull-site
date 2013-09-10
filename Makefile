.PHONY: all
.PHONY: help
.PHONY: install
.PHONY: bower_install

all: help

help:
	@echo ""
	@echo "justinbull-site Makefile"
	@echo "========================"
	@echo ""
	@echo "Makefile Commands:"
	@echo "------------------------"
	@echo "all      Display this help message"
	@echo "help     Display this help message"
	@echo "install  Install bower components and dependencies"
	@echo "compile  Compile site and bower components for deployment to production"
	@echo ""

install: bower_install

bower_install:
	bower install

compile:
	@echo "TODO!"
