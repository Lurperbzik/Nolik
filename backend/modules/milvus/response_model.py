
class MilvusResponse():
    def __init__(self, status, message, data):
        self.status = status
        self.message = message
        self.data = data


    @staticmethod 
    def success(data, message):
        return MilvusResponse(200, message, data)

    @staticmethod
    def not_found():
        return MilvusResponse(404, "Collection not found", None)

    @staticmethod
    def already_exists():
        return MilvusResponse(400, "Collection already exists", None)
    
    @staticmethod
    def exception_error(e):
        return MilvusResponse(500, str(e), None)