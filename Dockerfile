#####################################################################
#																	#
#			Dockerfile template for node.js							#
#																	#
#####################################################################

FROM ubuntu:16.04

MAINTAINER ctc316 <mike.tc.chen101@gmail.com>

USER root

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update \
	&& apt-get -y install curl

# nvm & nodejs
ENV NVM_VERSION=0.33.1	\
	NVM_DIR=$HOME/.nvm \
	NODE_VERSION=7.7.3

RUN	curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash \
	&& source $NVM_DIR/nvm.sh \
	&& nvm install $NODE_VERSION 	\
	&& nvm use $NODE_VERSION 	\
	&& nvm alias default $NODE_VERSION

ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


# Build image
WORKDIR /srv/ubike-service