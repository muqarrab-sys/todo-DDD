class HttpResponse {
  static ok(data: Object, message: string = 'Success') {
    return { data, message, success: true };
  }
}

export default HttpResponse;
