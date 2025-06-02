FROM python:3.12-slim 

RUN apt update && apt install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

WORKDIR /code  

COPY ./requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

COPY ./app/api /code/app/api 
COPY ./app/modules /code/app/modules
COPY ./app/models /code/app/models
EXPOSE 8000 

# Eliminar la opción --reload para producción
CMD ["uvicorn", "app.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
