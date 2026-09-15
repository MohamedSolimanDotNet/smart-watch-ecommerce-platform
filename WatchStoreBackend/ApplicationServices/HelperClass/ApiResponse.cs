namespace WatchStoreBackend.HelperClass
{
    public class APIResponse<T> where T : class
    {
        public T? Data { get; set; } = null;
        public int Status { get; set; } = (int)ResponseEnum.Unknown;
        public string Message { get; set; } = "";
    }
}
