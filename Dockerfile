# For more information, please refer to https://aka.ms/vscode-docker-python
FROM golang

RUN apt-get update
RUN apt-get -y install python3
RUN apt-get -y install python3-setuptools
RUN apt-get -y install python3-pip

ENV VAR1=10

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY *.go /app
COPY go.mod /app

COPY /build /app/build

RUN go mod download

RUN go build -o songChord

WORKDIR /app
# COPY files ./files

WORKDIR /app
COPY transpose .

# Install & use pipenv
WORKDIR /app
RUN python3 -m pip install --upgrade pip
RUN pip install pipenv && pipenv install
RUN pip install pdfplumber
RUN pip install pychord


EXPOSE 3001

WORKDIR /
CMD [ "/app/songChord" ]