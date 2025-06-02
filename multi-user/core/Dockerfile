FROM python:3.12-slim 

RUN apt update && apt install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

WORKDIR /core

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY ./app ./app

EXPOSE 8000 

CMD ["uvicorn", "app.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
