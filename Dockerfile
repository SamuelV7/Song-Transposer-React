# For more information, please refer to https://aka.ms/vscode-docker-python
# RUN apt-get update
# RUN apt-get -y install python3
# RUN apt-get -y install python3-setuptools
# RUN apt-get -y install python3-pip
FROM golang:1.18.4-alpine3.15 as go
WORKDIR /app
COPY *.go /app
COPY go.mod /app

COPY /build /app/build

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o songChord .

FROM python:alpine3.15
ENV VAR1=10

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1
# COPY files ./files

WORKDIR /app
COPY --from=go /app/songChord /app/songChord
COPY transpose .

# Install python dependencies needed for python in apline
WORKDIR /
RUN apk add --no-cache jpeg-dev zlib-dev && apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev
RUN apk add poppler-utils && apk add tesseract-ocr
# RUN apk add --no-cache --virtual .build-deps build-base linux-headers \
#     && pip install Pillow
RUN python3 -m pip install --upgrade pip && pip install pychord
# RUN pip install poppler-utils && pip install pdf2image && pip install pytesseract 
RUN pip install pdf2image && pip install pytesseract 

EXPOSE 8080
WORKDIR /
ENTRYPOINT [ "/app/songChord" ]