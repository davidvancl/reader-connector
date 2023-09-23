FROM fedora:39

LABEL author="vancl@wpj.cz"
LABEL version=0.0.1

RUN dnf -y upgrade
RUN dnf -y update

RUN dnf -y install nodejs
RUN npm install --global yarn
RUN dnf -y install git-all

ARG CONTAINER_USER=devuser
ARG CONTAINER_GROUP=devusers
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd -g $USER_UID $CONTAINER_GROUP
RUN useradd $CONTAINER_USER

RUN usermod -G $CONTAINER_GROUP $CONTAINER_USER

WORKDIR /ReaderWebExtension

CMD ["/bin/sh", "-c", "bash"]